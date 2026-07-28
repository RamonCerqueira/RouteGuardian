import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

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

  // 2. Create Users (RBAC)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@guardian.com',
      password: hashedPassword,
      name: 'Carlos Roberto (Admin)',
      role: 'ADMIN',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  const supervisor = await prisma.user.create({
    data: {
      email: 'supervisor@guardian.com',
      password: hashedPassword,
      name: 'Fernanda Lima (Supervisor)',
      role: 'SUPERVISOR',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });

  const driver = await prisma.user.create({
    data: {
      email: 'driver@guardian.com',
      password: hashedPassword,
      name: 'Gabriel Santos (Entregador)',
      role: 'DRIVER',
      status: 'ACTIVE',
      tenantId: tenant.id,
    },
  });
  console.log('Users created: Admin, Supervisor, Driver');

  // 3. Create Vehicles
  const fiorino = await prisma.vehicle.create({
    data: {
      plate: 'FIO-2C34',
      model: 'Fiat Fiorino 1.4',
      consumption: 11.5, // 11.5 km/l
      tenantId: tenant.id,
    },
  });

  const montana = await prisma.vehicle.create({
    data: {
      plate: 'MON-9D87',
      model: 'Chevrolet Montana 1.2',
      consumption: 13.0, // 13.0 km/l
      tenantId: tenant.id,
    },
  });
  console.log('Vehicles created: Fiorino, Montana');

  // 4. Create Clients (São Paulo - coordinates)
  const clientA = await prisma.client.create({
    data: {
      name: 'Supermercado Central',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
      latitude: -23.5616,
      longitude: -46.6560,
      geofenceRadius: 50.0, // 50m
      tenantId: tenant.id,
    },
  });

  const clientB = await prisma.client.create({
    data: {
      name: 'Farmácia Pague Menos',
      address: 'Av. Brigadeiro Luís Antônio, 2500 - Jardim Paulista, São Paulo - SP',
      latitude: -23.5682,
      longitude: -46.6504,
      geofenceRadius: 30.0, // 30m
      tenantId: tenant.id,
    },
  });

  const clientC = await prisma.client.create({
    data: {
      name: 'Padaria Bella Paulista',
      address: 'R. Haddock Lobo, 354 - Cerqueira César, São Paulo - SP',
      latitude: -23.5592,
      longitude: -46.6609,
      geofenceRadius: 50.0, // 50m
      tenantId: tenant.id,
    },
  });

  console.log('Clients created: A, B, C');

  // 5. Create a planned Route for today
  const route = await prisma.route.create({
    data: {
      name: 'Rota Centro-Paulista Diária',
      status: 'PLANNED',
      plannedDistance: 8.5, // 8.5 km expected
      plannedTime: 45.0, // 45 minutes expected
      driverId: driver.id,
      vehicleId: fiorino.id,
      tenantId: tenant.id,
      deliveries: {
        create: [
          {
            sequence: 1,
            status: 'PENDING',
            clientId: clientA.id,
            tenantId: tenant.id,
          },
          {
            sequence: 2,
            status: 'PENDING',
            clientId: clientB.id,
            tenantId: tenant.id,
          },
          {
            sequence: 3,
            status: 'PENDING',
            clientId: clientC.id,
            tenantId: tenant.id,
          },
        ],
      },
    },
  });
  console.log(`Route created: ${route.name} with 3 deliveries`);

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
