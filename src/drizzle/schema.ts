import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
export const UserRole = pgEnum('userRole', ['ADMIN', 'BASIC']);
export const User = pgTable(
  'user',
  {
    // id: serial('id').primaryKey()
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    role: UserRole('userRole').default('BASIC').notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex('emailIndex').on(table.email),
      //   uniqueNameAndAge: unique('uniqueNameAndAge').on(table.name, table.age),
    };
  },
);

//One to one
export const UserPreferences = pgTable('userPreferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  emailUpdates: boolean('emailUpdates').notNull().default(false),
  userId: uuid('userId')
    .references(() => User.id, { onDelete: 'cascade' })
    .notNull(),
});

//One to many
export const Post = pgTable('post', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  avarageRating: real('avarageRating').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  userId: uuid('userId')
    .references(() => User.id, { onDelete: 'set null' })
    .notNull(),
});

//Many to many
export const Category = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
});
export const PostCategory = pgTable(
  'postCategory',
  {
    postId: uuid('postId')
      .references(() => Post.id, { onDelete: 'cascade' })
      .notNull(),
    categoryId: uuid('categoryId')
      .references(() => Category.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  },
);

//Relations
export const UserRelations = relations(User, ({ one, many }) => {
  return {
    preferences: one(UserPreferences),
    posts: many(Post),
  };
});
export const UserPreferencesRelations = relations(UserPreferences, ({ one }) => {
  return {
    user: one(User, {
      fields: [UserPreferences.userId],
      references: [User.id],
    }),
  };
});

export const CategoryRelation = relations(Category, ({ many }) => {
  return {
    postCategories: many(PostCategory),
  };
});
export const PostRelations = relations(Post, ({ one, many }) => {
  return {
    user: one(User, {
      fields: [Post.userId],
      references: [User.id],
    }),
    postCategories: many(PostCategory),
  };
});
export const PostCategoryRelations = relations(PostCategory, ({ one }) => {
  return {
    post: one(Post, {
      fields: [PostCategory.postId],
      references: [Post.id],
    }),
    category: one(Category, {
      fields: [PostCategory.categoryId],
      references: [Category.id],
    }),
  };
});
