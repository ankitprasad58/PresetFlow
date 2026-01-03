const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Seed products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "LUT Color Grading Pack",
        description:
          "Professional color grading lookup tables for video editing",
        price: 99.99,
        category: "Color Grading",
        fileUrl: "https://example.com/lut-pack.zip",
      },
      {
        name: "Cinematic Transitions",
        description: "50 premium cinematic transition effects",
        price: 49.99,
        category: "Transitions",
        fileUrl: "https://example.com/transitions.zip",
      },
      {
        name: "Film Grain & Textures",
        description: "Authentic film grain and texture overlays",
        price: 34.99,
        category: "Effects",
        fileUrl: "https://example.com/film-grain.zip",
      },
      {
        name: "Motion Graphics Pack",
        description: "Ready-to-use motion graphics templates",
        price: 79.99,
        category: "Motion Graphics",
        fileUrl: "https://example.com/motion-graphics.zip",
      },
      {
        name: "Audio Effects Bundle",
        description: "Professional audio transitions and effects",
        price: 59.99,
        category: "Audio",
        fileUrl: "https://example.com/audio-effects.zip",
      },
    ],
  });

  console.log(`✅ Seeded ${products.count} products`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
