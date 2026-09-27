import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "./db.js";
import { products } from "../src/data/products.js";

const directory = path.dirname(fileURLToPath(import.meta.url));

export async function initializeDatabase() {
  const schema = await fs.readFile(path.join(directory, "schema.sql"), "utf8");
  await pool.query(schema);

  for (const product of products) {
    await pool.query(
      `INSERT INTO products (
        id, name, short_name, sku, category, category_name, image, gallery, price, unit, stock,
        rating, reviews_count, badge, badge_type, highlight, description, npk, specs, volume_tiers,
        tags, application_method, certifications
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name, short_name = EXCLUDED.short_name, sku = EXCLUDED.sku,
        category = EXCLUDED.category, category_name = EXCLUDED.category_name, image = EXCLUDED.image,
        gallery = EXCLUDED.gallery, price = EXCLUDED.price, unit = EXCLUDED.unit, stock = EXCLUDED.stock,
        rating = EXCLUDED.rating, reviews_count = EXCLUDED.reviews_count, badge = EXCLUDED.badge,
        badge_type = EXCLUDED.badge_type, highlight = EXCLUDED.highlight, description = EXCLUDED.description,
        npk = EXCLUDED.npk, specs = EXCLUDED.specs, volume_tiers = EXCLUDED.volume_tiers,
        tags = EXCLUDED.tags, application_method = EXCLUDED.application_method, certifications = EXCLUDED.certifications`,
      [
        product.id,
        product.name,
        product.shortName,
        product.sku,
        product.category,
        product.categoryName,
        product.image,
        JSON.stringify(product.gallery ?? []),
        product.price,
        product.unit,
        product.stock,
        product.rating,
        product.reviewsCount,
        product.badge,
        product.badgeType,
        product.highlight,
        product.description,
        JSON.stringify(product.npk ?? {}),
        JSON.stringify(product.specs ?? {}),
        JSON.stringify(product.volumeTiers ?? []),
        JSON.stringify(product.tags ?? []),
        product.applicationMethod,
        JSON.stringify(product.certifications ?? []),
      ],
    );
  }

  console.log(`Database ready. Seeded ${products.length} products.`);
}

if (path.basename(process.argv[1] || "") === "seed.js") {
  initializeDatabase()
    .then(() => pool.end())
    .catch(async (error) => {
      console.error(error);
      await pool.end();
      process.exit(1);
    });
}
