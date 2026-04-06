const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sisfs.com' },
    update: { password: hashedPassword },
    create: {
      name: 'Admin',
      email: 'admin@sisfs.com',
      phone: '9999999999',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin created:', admin);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
