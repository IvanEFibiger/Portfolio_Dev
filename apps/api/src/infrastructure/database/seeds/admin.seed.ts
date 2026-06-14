import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'portfolio',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'portfolio_ivan',
    synchronize: false,
  });

  await dataSource.initialize();

  const email = process.env.ADMIN_EMAIL ?? 'admin@portfolio.com';
  const password = process.env.ADMIN_PASSWORD ?? 'admin123';
  const displayName = process.env.ADMIN_DISPLAY_NAME ?? 'Iván Fibiger';

  const existing = await dataSource.query('SELECT id FROM admin_users WHERE email = $1', [email]);

  if (existing.length > 0) {
    console.log(`Admin user already exists: ${email}`);
    await dataSource.destroy();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await dataSource.query(
    `INSERT INTO admin_users (id, email, password_hash, display_name, role, is_active, created_at, updated_at)
     VALUES (gen_random_uuid(), $1, $2, $3, 'admin', true, NOW(), NOW())`,
    [email, passwordHash, displayName],
  );

  console.log(`Admin user created: ${email}`);
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
