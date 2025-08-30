import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Créer des utilisateurs
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Dupont',
      password: '123456'
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Martin',
      password:'000000'
    },
  });

  // Créer des tags
  const tag1 = await prisma.tag.create({
    data: {
      name: 'Personnel',
      createdAt: new Date(),
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: 'Travail',
      createdAt: new Date(),
    },
  });

  const tag3 = await prisma.tag.create({
    data: {
      name: 'Urgent',
      createdAt: new Date(),
    },
  });

  // Créer des notes
  await prisma.note.create({
    data: {
      title: 'Ma première note',
      content: 'Ceci est le contenu de ma première note personnelle.',
      createdAt: new Date(),
      authorId: user1.id,
      tags: {
        connect: [{ id: tag1.id }],
      },
    },
  });

  await prisma.note.create({
    data: {
      title: 'Réunion équipe',
      content: 'Points à aborder lors de la réunion de demain.',
      createdAt: new Date(),
      authorId: user1.id,
      tags: {
        connect: [{ id: tag2.id }, { id: tag3.id }],
      },
    },
  });

  await prisma.note.create({
    data: {
      title: 'Liste de courses',
      content: 'Pain, lait, œufs, fromage.',
      createdAt: new Date(),
      authorId: user2.id,
      tags: {
        connect: [{ id: tag1.id }],
      },
    },
  });

  await prisma.note.create({
    data: {
      title: 'Idées de projet',
      content: 'Application mobile pour la gestion des tâches.',
      createdAt: new Date(),
      authorId: user2.id,
      tags: {
        connect: [{ id: tag2.id }],
      },
    },
  });

  console.log('✅ Seeding terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });