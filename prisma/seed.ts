import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding clean database (Users only)...');

  // Clean database
  await prisma.locationLog.deleteMany();
  await prisma.delivery.deleteMany();
  await prisma.route.deleteMany();
  await prisma.client.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();
  await prisma.tenant.deleteMany();

  // 1. Create Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Logística Expressa Ltda',
    },
  });
  const trialStartedAt = new Date();
  const trialEndsAt = new Date(trialStartedAt.getTime() + 7 * 24 * 60 * 60 * 1000);

  try {
    await prisma.$executeRawUnsafe(
      `UPDATE "Tenant" SET "subscriptionStatus" = 'TRIALING', "trialStartedAt" = $1, "trialEndsAt" = $2 WHERE id = $3`,
      trialStartedAt,
      trialEndsAt,
      tenant.id
    );
  } catch (e) {
    console.log('Trial SQL update fallback:', e);
  }

  console.log(`Tenant created: ${tenant.name} (${tenant.id})`);

  // Hashed password
  const hashedPassword = bcrypt.hashSync('password123', 10);

  // 2. Create Initial Login Users Only
  await prisma.user.create({
    data: {
      email: 'admin@guardian.com',
      password: hashedPassword,
      name: 'Carlos Roberto (Admin)',
      role: 'ADMIN',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  await prisma.user.create({
    data: {
      email: 'supervisor@guardian.com',
      password: hashedPassword,
      name: 'Fernanda Lima (Supervisor)',
      role: 'SUPERVISOR',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  await prisma.user.create({
    data: {
      email: 'driver@guardian.com',
      password: hashedPassword,
      name: 'Gabriel Santos (Entregador)',
      role: 'DRIVER',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  console.log('Clean database seeded successfully (Login Users Only: Admin, Supervisor, Driver). Zero mock clients/routes/vehicles!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
