import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  console.log('⏳ Testando conexão com o banco de dados Supabase...');
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log(`📊 Total de usuários encontrados: ${users.length}`);
    console.log('👥 Lista de usuários:');
    users.forEach((u) => {
      console.log(`   - ${u.name} (${u.email}) [Role: ${u.role}]`);
    });
  } catch (error) {
    console.error('❌ Erro de conexão com o banco:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
