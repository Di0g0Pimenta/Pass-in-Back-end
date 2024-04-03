import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "bdf68048-4c06-4495-9459-0f6df86d4fa2",
      title: "Unite Submit",
      slug: "unite-submmit",
      details: "Um evento para programadores apaixonados por programar",
      maxAttendees: 120,
    },
  });
}
seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
