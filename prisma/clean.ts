import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log('🧹 Limpando dados do banco de dados...');

  try {
    // Delete dependent records first to respect foreign keys
    const deletedLocationLogs = await prisma.locationLog.deleteMany();
    console.log(`- ${deletedLocationLogs.count} logs de localização apagados.`);

    const deletedDeliveries = await prisma.delivery.deleteMany();
    console.log(`- ${deletedDeliveries.count} entregas apagadas.`);

    const deletedRoutes = await prisma.route.deleteMany();
    console.log(`- ${deletedRoutes.count} rotas apagadas.`);

    const deletedClients = await prisma.client.deleteMany();
    console.log(`- ${deletedClients.count} clientes apagados.`);

    const deletedVehicles = await prisma.vehicle.deleteMany();
    console.log(`- ${deletedVehicles.count} veículos apagados.`);

    const deletedTokens = await prisma.refreshToken.deleteMany();
    console.log(`- ${deletedTokens.count} refresh tokens apagados.`);

    const deletedUsers = await prisma.user.deleteMany();
    console.log(`- ${deletedUsers.count} usuários apagados.`);

    const deletedTenants = await prisma.tenant.deleteMany();
    console.log(`- ${deletedTenants.count} empresas/tenants apagados.`);

    console.log('✅ Banco de dados zerado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao limpar o banco de dados:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanDatabase();
