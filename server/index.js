import "dotenv/config";
import crypto from "node:crypto";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { pool } from "./db.js";
import { initializeDatabase } from "./seed.js";

const app = express();
const port = Number(process.env.PORT || 3001);
const sessionSecret = process.env.SESSION_SECRET || "development-only-secret";

app.use(cors());
app.use(express.json());

function createToken(userId) {
  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(userId)
    .digest("hex");
  return `${userId}.${signature}`;
}

function getUserId(request) {
  const token = request.headers.authorization?.replace("Bearer ", "");
  if (!token) return null;
  const [userId, signature] = token.split(".");
  if (!userId || !signature) return null;
  const expected = crypto
    .createHmac("sha256", sessionSecret)
    .update(userId)
    .digest("hex");
  if (signature.length !== expected.length) return null;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ? userId
    : null;
}

function requireUser(request, response, next) {
  const userId = getUserId(request);
  if (!userId)
    return response.status(401).json({ error: "Please sign in to continue." });
  request.userId = userId;
  next();
}

function publicUser(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    farmName: row.farm_name,
    email: row.email,
    accountType: row.account_type,
  };
}

function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name,
    sku: row.sku,
    category: row.category,
    categoryName: row.category_name,
    image: row.image,
    gallery: row.gallery,
    price: Number(row.price),
    unit: row.unit,
    stock: row.stock,
    rating: Number(row.rating),
    reviewsCount: row.reviews_count,
    badge: row.badge,
    badgeType: row.badge_type,
    highlight: row.highlight,
    description: row.description,
    npk: row.npk,
    specs: row.specs,
    volumeTiers: row.volume_tiers,
    tags: row.tags,
    applicationMethod: row.application_method,
    certifications: row.certifications,
  };
}

app.get("/api/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({ ok: true });
  } catch {
    response.status(503).json({ ok: false, error: "Database unavailable." });
  }
});

app.get("/api/products", async (_request, response) => {
  const { rows } = await pool.query(
    "SELECT * FROM products ORDER BY created_at, name",
  );
  response.json(rows.map(mapProduct));
});

app.post("/api/auth/signup", async (request, response) => {
  const {
    fullName,
    farmName,
    email,
    phone,
    password,
    operationType,
    primaryCrop,
    farmAcres,
    deliveryAddress,
    state,
    accountType = "retail",
  } = request.body;
  if (!fullName || !farmName || !email || !phone || !password) {
    return response
      .status(400)
      .json({ error: "Please complete all required account fields." });
  }
  if (password.length < 8)
    return response
      .status(400)
      .json({ error: "Password must be at least 8 characters." });

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const { rows } = await pool.query(
      `INSERT INTO users (full_name, farm_name, email, phone, password_hash, operation_type, primary_crop, farm_acres, delivery_address, state, account_type)
       VALUES ($1, $2, LOWER($3), $4, $5, $6, $7, NULLIF($8, '')::numeric, $9, $10, $11)
       RETURNING id, full_name, farm_name, email, account_type`,
      [
        fullName,
        farmName,
        email,
        phone,
        passwordHash,
        operationType,
        primaryCrop,
        String(farmAcres ?? ""),
        deliveryAddress,
        state,
        accountType,
      ],
    );
    const user = publicUser(rows[0]);
    response.status(201).json({ user, token: createToken(user.id) });
  } catch (error) {
    if (error.code === "23505")
      return response
        .status(409)
        .json({ error: "An account with that email already exists." });
    console.error(error);
    response.status(500).json({ error: "Unable to create your account." });
  }
});

app.post("/api/auth/signin", async (request, response) => {
  const { accountId, password } = request.body;
  if (!accountId || !password)
    return response
      .status(400)
      .json({ error: "Email and password are required." });
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR id::text = $1 LIMIT 1",
    [accountId],
  );
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return response
      .status(401)
      .json({ error: "Invalid account ID or password." });
  }
  response.json({ user: publicUser(user), token: createToken(user.id) });
});

async function getOrCreateCart(userId, client = pool) {
  const { rows } = await client.query(
    "INSERT INTO carts (user_id) VALUES ($1) ON CONFLICT (user_id) DO UPDATE SET updated_at = NOW() RETURNING id",
    [userId],
  );
  return rows[0].id;
}

app.get("/api/cart", requireUser, async (request, response) => {
  const { rows } = await pool.query(
    `SELECT ci.quantity, row_to_json(p) AS product
     FROM cart_items ci JOIN carts c ON c.id = ci.cart_id JOIN products p ON p.id = ci.product_id
     WHERE c.user_id = $1 ORDER BY p.name`,
    [request.userId],
  );
  response.json(
    rows.map((row) => ({
      quantity: row.quantity,
      product: mapProduct(row.product),
    })),
  );
});

app.put(
  "/api/cart/items/:productId",
  requireUser,
  async (request, response) => {
    const quantity = Number(request.body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1)
      return response
        .status(400)
        .json({ error: "Quantity must be a positive integer." });
    const cartId = await getOrCreateCart(request.userId);
    await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)
     ON CONFLICT (cart_id, product_id) DO UPDATE SET quantity = EXCLUDED.quantity`,
      [cartId, request.params.productId, quantity],
    );
    response.status(204).end();
  },
);

app.delete(
  "/api/cart/items/:productId",
  requireUser,
  async (request, response) => {
    await pool.query(
      "DELETE FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1) AND product_id = $2",
      [request.userId, request.params.productId],
    );
    response.status(204).end();
  },
);

app.delete("/api/cart", requireUser, async (request, response) => {
  await pool.query(
    "DELETE FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1)",
    [request.userId],
  );
  response.status(204).end();
});

app.post("/api/orders", requireUser, async (request, response) => {
  const {
    name,
    phone,
    address,
    paymentMethod,
    paymentDetails = {},
  } = request.body;
  if (!name || !phone || !address || !paymentMethod) {
    return response.status(400).json({
      error: "Name, phone, delivery address, and payment method are required.",
    });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const paymentResult = await client.query(
      "SELECT id FROM payment_methods WHERE id = $1 AND active = TRUE",
      [paymentMethod],
    );
    if (paymentResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return response.status(400).json({ error: "Invalid payment method." });
    }
    if (paymentMethod === "upi" && !paymentDetails.upiId) {
      await client.query("ROLLBACK");
      return response.status(400).json({ error: "UPI ID is required." });
    }
    if (
      paymentMethod === "card" &&
      !/^\d{4}$/.test(String(paymentDetails.cardLast4 || ""))
    ) {
      await client.query("ROLLBACK");
      return response
        .status(400)
        .json({ error: "Valid card details are required." });
    }

    const { rows: items } = await client.query(
      `SELECT ci.quantity, p.id, p.name, p.price
       FROM cart_items ci
       JOIN carts c ON c.id = ci.cart_id
       JOIN products p ON p.id = ci.product_id
       WHERE c.user_id = $1
       FOR UPDATE`,
      [request.userId],
    );
    if (items.length === 0) {
      await client.query("ROLLBACK");
      return response.status(400).json({ error: "Your cart is empty." });
    }

    const totalBags = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
    const discountRate = totalBags >= 40 ? 0.12 : totalBags >= 20 ? 0.08 : 0;
    const discountAmount = subtotal * discountRate;
    const freightCost = totalBags >= 100 ? 0 : 75;
    const totalAmount = Math.max(0, subtotal - discountAmount + freightCost);
    const orderNumber = `NSA-${crypto.randomInt(100000, 1000000)}`;
    const paymentStatus = paymentMethod === "cod" ? "not_required" : "pending";

    const orderResult = await client.query(
      `INSERT INTO orders (
        order_number, user_id, payment_method_id, customer_name, customer_phone,
        delivery_address, payment_status, payment_details, subtotal, discount_amount, freight_cost, total_amount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING order_number, status, payment_status, total_amount, created_at`,
      [
        orderNumber,
        request.userId,
        paymentMethod,
        name,
        phone,
        address,
        paymentStatus,
        JSON.stringify(
          paymentMethod === "upi"
            ? { upiId: paymentDetails.upiId }
            : paymentMethod === "card"
              ? { cardLast4: String(paymentDetails.cardLast4) }
              : {},
        ),
        subtotal.toFixed(2),
        discountAmount.toFixed(2),
        freightCost.toFixed(2),
        totalAmount.toFixed(2),
      ],
    );

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total)
         VALUES ((SELECT id FROM orders WHERE order_number = $1), $2, $3, $4, $5, $6)`,
        [
          orderNumber,
          item.id,
          item.name,
          item.price,
          item.quantity,
          (Number(item.price) * item.quantity).toFixed(2),
        ],
      );
    }

    await client.query(
      "DELETE FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1)",
      [request.userId],
    );
    await client.query("COMMIT");
    response.status(201).json({ order: orderResult.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    response.status(500).json({ error: "Unable to create the order." });
  } finally {
    client.release();
  }
});

initializeDatabase()
  .then(() => {
    app.listen(port, () =>
      console.log(`Naturotopia API listening on http://localhost:${port}`),
    );
  })
  .catch(async (error) => {
    console.error("Could not initialize PostgreSQL:", error.message);
    await pool.end();
    process.exit(1);
  });
