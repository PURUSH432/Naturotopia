export const products = [
  {
    id: "nsa-feed-ps50",
    name: "NSA Pre-Starter Feed 50kg (Healthy Chick Growth)",
    shortName: "NSA Pre-Starter Feed",
    sku: "NSA-FEED-PS50",
    category: "poultry-feed",
    categoryName: "Poultry Feeds",
    image: "/assets/Img1.png",
    price: 38.50,
    unit: "50 kg Bag",
    stock: 520,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Pre-Starter",
    badgeType: "secondary",
    highlight: "High Nutrition",
    description: "Complete balanced nutrition specially formulated for young broiler and layer chicks from Day 1 to Day 10. Enriched with vital micro-minerals, digestible proteins, amino acids, and natural immune boosters to ensure exceptional survival rates and strong early skeletal vigor.",
    npk: { n: "23%", p: "4.5%", k: "1.2%" },
    specs: {
      "Crude Protein": "Min 23.0%",
      "Crude Fat": "Min 4.0%",
      "Crude Fiber": "Max 3.5%",
      "Moisture": "Max 11.0%",
      "Calcium": "1.05%",
      "Available Phosphorus": "0.52%",
      "Form": "Micro-Crumbs (1.2mm)",
      "Target Age": "0 to 10 Days"
    },
    volumeTiers: [
      { range: "1 - 19 Bags", price: 38.50 },
      { range: "20 - 49 Bags", price: 35.00 },
      { range: "50+ Bags (Truckload)", price: 32.50 }
    ],
    tags: ["High Survival", "Micro-Crumbs", "Immunity Boost", "Broiler Chicks"],
    applicationMethod: "Foliar / Direct Feed",
    certifications: ["ISO 9001 Certified", "Lab Tested Pure"]
  },
  {
    id: "nsa-feed-st50",
    name: "NSA Starter Feed 50kg (Stronger Growth & Bone Health)",
    shortName: "NSA Starter Feed",
    sku: "NSA-FEED-ST50",
    category: "poultry-feed",
    categoryName: "Poultry Feeds",
    image: "/assets/Img2.png",
    price: 36.00,
    unit: "50 kg Bag",
    stock: 420,
    rating: 4.9,
    reviewsCount: 189,
    badge: "Starter Feed",
    badgeType: "tertiary",
    highlight: "Bone Support",
    description: "Scientifically balanced nutrition formulated for juvenile poultry from Day 11 to Day 24. Maximizes skeletal bone density, accelerates healthy muscle development, and ensures an industry-leading Feed Conversion Ratio (FCR).",
    npk: { n: "21%", p: "4.0%", k: "1.1%" },
    specs: {
      "Crude Protein": "Min 21.0%",
      "Crude Fat": "Min 4.5%",
      "Crude Fiber": "Max 4.0%",
      "Moisture": "Max 11.0%",
      "Metabolizable Energy": "3,100 kcal/kg",
      "Form": "Coarse Crumbs / Mini Pellets",
      "Target Age": "11 to 24 Days"
    },
    volumeTiers: [
      { range: "1 - 19 Bags", price: 36.00 },
      { range: "Pallet (40 Bags)", price: 33.00 },
      { range: "Bulk Truckload", price: 30.50 }
    ],
    tags: ["Crude Protein: 21%", "Rapid FCR", "Bone Density", "Optimal Digestion"],
    applicationMethod: "Direct Feed",
    certifications: ["ISO 9001 Certified", "Quality Assayed"]
  },
  {
    id: "nsa-feed-fn50",
    name: "NSA Finisher Feed 50kg (Better Weight & Meat Quality)",
    shortName: "NSA Finisher Feed",
    sku: "NSA-FEED-FN50",
    category: "poultry-feed",
    categoryName: "Poultry Feeds",
    image: "/assets/Img3.png",
    price: 34.50,
    unit: "50 kg Heavy Duty Bag",
    stock: 650,
    rating: 4.8,
    reviewsCount: 215,
    badge: "Finisher Feed",
    badgeType: "primary",
    highlight: "High Weight Gain",
    description: "High-energy density finishing diet engineered for broilers from Day 25 to market age. Formulated to enhance lean muscular weight gain, superior dressing percentage, tender meat texture, and strong immune resilience right through harvest.",
    npk: { n: "19%", p: "3.8%", k: "1.0%" },
    specs: {
      "Crude Protein": "Min 19.5%",
      "Crude Fat": "Min 5.5%",
      "Crude Fiber": "Max 4.0%",
      "Metabolizable Energy": "3,200 kcal/kg",
      "Form": "Steam Pellets (3.0mm)",
      "Target Age": "25 Days to Market"
    },
    volumeTiers: [
      { range: "1 - 19 Bags", price: 34.50 },
      { range: "Pallet (40 Bags)", price: 31.50 },
      { range: "Hopper Truck (24 Ton)", price: 29.00 }
    ],
    tags: ["Crude Fat: 5.5%", "Pellet 3mm", "Lean Meat", "Rapid Weight Gain"],
    applicationMethod: "Direct Feed",
    certifications: ["ISO 9001 Certified"]
  },
  {
    id: "nsa-fert-man50",
    name: "NSA Poultry Manure Organic Fertilizer 50kg (100% Natural)",
    shortName: "Organic Poultry Manure",
    sku: "NSA-FERT-MAN50",
    category: "organic-fertilizer",
    categoryName: "Organic Fertilizers",
    image: "/assets/img4.png",
    gallery: ["/assets/img4.png", "/assets/img5.png"],
    price: 22.00,
    unit: "50 kg Poly Bag",
    stock: 890,
    rating: 5.0,
    reviewsCount: 312,
    badge: "100% Organic",
    badgeType: "secondary",
    highlight: "Microorganism Rich",
    description: "Fully aerobically composted poultry manure fertilizer containing over 65% active organic matter. Packed with beneficial mycorrhizae, indigenous soil flora, and slow-release nitrogen, phosphorus, and potassium. Restores degraded soils and stimulates sustained vegetative vigor.",
    npk: { n: "4.5%", p: "3.2%", k: "2.8%" },
    specs: {
      "Organic Matter": "> 65% w/w",
      "Nitrogen (N)": "4.5% slow-release",
      "Phosphorus (P₂O₅)": "3.2%",
      "Potassium (K₂O)": "2.8%",
      "Calcium (Ca)": "6.0%",
      "pH Range": "6.8 - 7.4 (Balanced)",
      "Composting Process": "Aerobic Heat Stabilized (>60°C)",
      "Weed Seed & Pathogen Free": "100% Certified"
    },
    volumeTiers: [
      { range: "1 - 10 Bags", price: 22.00 },
      { range: "11 - 39 Bags", price: 19.50 },
      { range: "Full Pallet (40 Bags)", price: 17.00 },
      { range: "Bulk Truckload (20 Ton)", price: 14.50 }
    ],
    tags: ["Organic Matter > 65%", "Composted", "Soil Microbes", "All Crops Safe"],
    applicationMethod: "Broadcast Granular / Soil Drench",
    certifications: ["OMRI Listed Organic", "USDA Organic Compliant", "Lab Assayed"]
  },
  {
    id: "nsa-fruit-mng",
    name: "100% Natural Fresh Mangoes (New Variety Orchards)",
    shortName: "Natural Fresh Mangoes",
    sku: "NSA-FRUIT-MNG",
    category: "fresh-produce",
    categoryName: "Farm Fresh Produce",
    image: "/assets/img7.png",
    price: 28.00,
    unit: "10 kg Export Crate",
    stock: 120,
    rating: 4.9,
    reviewsCount: 96,
    badge: "Farm Fresh Harvest",
    badgeType: "tertiary",
    highlight: "Naturally Sweet",
    description: "Hand-picked, tree-ripened premium variety mangoes grown with 100% natural organic poultry manure and zero synthetic chemical sprays. Boasting exceptional natural sweetness, rich beta-carotene, and delectable smooth orchard aroma.",
    npk: { n: "Pure Fruit", p: "Vitamin C", k: "Rich Brix" },
    specs: {
      "Brix Sweetness Level": "18° - 21° Brix",
      "Cultivation Mode": "100% Chemical-Free Organic Manure",
      "Ripening Process": "Natural Tree & Straw Ripened",
      "Packaging": "10 kg Foam-Cushioned Export Carton",
      "Origin": "NSA Dedicated Orchard Agro Hub"
    },
    volumeTiers: [
      { range: "1 - 5 Crates", price: 28.00 },
      { range: "6 - 20 Crates", price: 25.00 },
      { range: "Bulk Wholesale (50+ Crates)", price: 22.00 }
    ],
    tags: ["Brix: 18°+", "Chemical Free", "Fresh Picked", "Delicious Aroma"],
    applicationMethod: "Fresh Consumption / Wholesale",
    certifications: ["100% Natural", "No Carbide", "Zero Pesticide"]
  },
  {
    id: "nsa-med-wholesale",
    name: "Poultry Medicine & Veterinary Health (Wholesale Supply)",
    shortName: "Poultry Veterinary Medicines",
    sku: "NSA-MED-WHOLESALE",
    category: "poultry-medicine",
    categoryName: "Veterinary Health",
    image: "/assets/img6.png",
    price: 145.00,
    unit: "Commercial Wholesale Kit",
    stock: 240,
    rating: 4.9,
    reviewsCount: 167,
    badge: "Wholesale Supply",
    badgeType: "primary",
    highlight: "Genuine Brands",
    description: "Complete wholesale supply of certified veterinary medicines, broad-spectrum poultry antibiotics, live vaccines, liver tonics, gut health probiotics, anti-stress electrolytes, and growth vitamins sourced directly from leading licensed pharmaceutical manufacturers.",
    npk: { n: "Rx Grade", p: "Immune Core", k: "Bio-Shield" },
    specs: {
      "Included Classes": "Vaccines, Antibiotics, Probiotics, Electrolytes",
      "Quality Standard": "GMP & Veterinary Licensed Brands",
      "Storage Requirement": "Dry & Cold Chain Compliant",
      "Application Mode": "Drinking Water & Feed Additive",
      "Target Species": "Broiler, Layer, Breeder & Native Poultry"
    },
    volumeTiers: [
      { range: "Standard Kit (1x)", price: 145.00 },
      { range: "Farm Case (5+ Kits)", price: 130.00 },
      { range: "Distributor Bulk (20+)", price: 115.00 }
    ],
    tags: ["Vaccines", "Antibiotics", "Liver Tonics", "Electrolytes", "Vitamins"],
    applicationMethod: "Drinking Water / Tank Mix",
    certifications: ["GMP Certified", "Vet Regulatory Approved"]
  }
];

export const cropPrescriptions = [
  {
    id: "corn",
    title: "Corn & Grains",
    headline: "High Nitrogen & Phosphorus Starter Regimen",
    stage: "V3 Vegetative Flush to Tasseling",
    description: "Optimal balance of fast-acting nitrogen and microbial soil conditioning ensures robust root crowns and thick stalk diameter against lodging.",
    recommendedProductId: "nsa-fert-man50",
    dosage: "350 - 450 kg / hectare",
    targetPh: "6.0 - 6.8",
    growthCycle: "80 - 120 Days",
    npkRatio: "12 - 48 - 8 + Organic Humus",
    benefits: [
      "Accelerated primary brace root anchorage",
      "Enhanced chlorophyll synthesis in early vegetative flush",
      "Superior kernel row counts and heavy test weights"
    ]
  },
  {
    id: "berries",
    title: "Berries & Fruit Trees",
    headline: "High Potassium & Organic Bio-Stimulant Boost",
    stage: "Bud Break to Fruit Swell",
    description: "Nutrient protocol tailored for high-brix sugar formation, disease resistance, and extended post-harvest shelf resilience.",
    recommendedProductId: "nsa-fert-man50",
    dosage: "250 - 350 kg / hectare",
    targetPh: "5.5 - 6.5",
    growthCycle: "Perennial / Seasonal Flush",
    npkRatio: "4.5 - 3.2 - 2.8 + Microelements",
    benefits: [
      "Boosts soluble brix sugars by +2.5°",
      "Strengthens cell wall structure to prevent blossom end rot",
      "Sustained microbial nutrient release over 90 days"
    ]
  },
  {
    id: "tomatoes",
    title: "Greenhouse Tomatoes",
    headline: "Precision Fertigation & Calcium-Enhanced Feed",
    stage: "First Truss Flowering to Continuous Harvest",
    description: "Ultra-clean bio-available nutrients designed for high-density protected cultivation with uniform cluster filling.",
    recommendedProductId: "nsa-fert-man50",
    dosage: "200 - 300 kg / greenhouse acre",
    targetPh: "6.2 - 6.8",
    growthCycle: "Continuous Cycle",
    npkRatio: "High P & Natural Ca / Mg",
    benefits: [
      "Prevents blossom end rot and radial cracking",
      "Increases fruit firmness and uniform deep red color",
      "Stimulates beneficial root zone trichoderma"
    ]
  },
  {
    id: "greens",
    title: "Leafy Greens & Brassicas",
    headline: "Nitrogen Solubles & Gentle Organic Humus",
    stage: "Rapid Foliar Canopy Expansion",
    description: "Supports crisp leaf tissue formation with low nitrate accumulation and tender, nutrient-dense culinary qualities.",
    recommendedProductId: "nsa-fert-man50",
    dosage: "200 - 280 kg / hectare",
    targetPh: "6.5 - 7.2",
    growthCycle: "35 - 55 Days",
    npkRatio: "Rapid Organic Nitrogen & Sulphur",
    benefits: [
      "Uniform dark emerald green leaf pigmentation",
      "Vigorous cut-and-come-again regrowth",
      "Zero burn risk even in warm weather irrigation"
    ]
  },
  {
    id: "turf",
    title: "Turf & Pasture",
    headline: "Dense Root Knitting & Sward Regeneration",
    stage: "Spring Wake-up & Heavy Grazing Recovery",
    description: "Deep rooting fertilizer regimen that withstands high hoof traffic and accelerates biomass recovery after livestock rotation.",
    recommendedProductId: "nsa-fert-man50",
    dosage: "300 - 500 kg / hectare",
    targetPh: "6.0 - 7.0",
    growthCycle: "Continuous Pasture Rotation",
    npkRatio: "Balanced Slow-Release Multi-Nutrient",
    benefits: [
      "Rapid grass tillering and dense stolon spread",
      "Enhanced drought tolerance via deeper root architecture",
      "Safe for livestock grazing immediately after settling"
    ]
  }
];
