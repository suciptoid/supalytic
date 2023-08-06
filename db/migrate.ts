import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const db = drizzle(pool);

migrate(db, { migrationsFolder: './db/migrations' })
	.then(() => console.log('migrated'))
	.catch(console.error);
