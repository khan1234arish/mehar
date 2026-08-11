import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('====================================================');
  console.log('  MEHAR Platform — Secure Super Admin Account Setup');
  console.log('====================================================\n');

  // Read email from env or CLI
  let email = process.env.INITIAL_ADMIN_EMAIL?.trim();
  if (!email) {
    email = await prompt('Enter Admin Email Address: ');
  }

  if (!email || !email.includes('@')) {
    console.error('Error: A valid email address is required.');
    process.exit(1);
  }

  // Read password from env or CLI
  let password = process.env.INITIAL_ADMIN_PASSWORD;
  if (!password) {
    password = await prompt('Enter Initial Admin Password (min 10 chars): ');
  }

  if (!password || password.length < 10) {
    console.error('Error: Password must be at least 10 characters long.');
    process.exit(1);
  }

  const name = process.env.INITIAL_ADMIN_NAME?.trim() || 'MEHAR Super Admin';

  console.log('\nHashing credentials with bcrypt (12 rounds)...');
  const passwordHash = await bcrypt.hash(password, 12);

  console.log(`Configuring Super Admin user for ${email}...`);

  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email,
      name,
      passwordHash,
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      mustChangePassword: true,
    },
    update: {
      passwordHash,
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      mustChangePassword: true,
      failedLoginAttempts: 0,
      lockedUntil: null,
    },
  });

  console.log(`\n✓ Super Admin account successfully configured for: ${user.email}`);
  console.log('✓ Security Notice: "mustChangePassword" is set to TRUE. The user will be required to choose a new password upon first login.\n');
}

main()
  .catch((e) => {
    console.error('Error creating super admin account:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
