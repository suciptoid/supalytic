import { pgEnum, pgTable, primaryKey, uuid, varchar } from 'drizzle-orm/pg-core';

export const website = pgTable('websites', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: varchar('name').notNull(),
	domain: varchar('domain').notNull()
});

export const websiteRole = pgEnum('roles', ['owner', 'admin', 'member']);

export const websiteUsers = pgTable(
	'website_users',
	{
		userId: uuid('user_id').notNull(),
		websiteId: uuid('website_id').notNull(),
		role: websiteRole('role').default('owner')
	},
	(table) => ({ pk: primaryKey(table.userId, table.websiteId) })
);
