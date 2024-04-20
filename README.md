# Blog API with Drizzle Example

This is a simple API for a blog application, demonstrating various types of relations using Drizzle while developing APIs for your projects. The API includes tables for Users, UserPreferences, Posts, and Categories.

## Getting Started

To run this application locally, follow these steps:

1. Install PostgreSQL on your PC.
2. Set up your database URL in the `.env` file. You can use the provided example in `.env-example`.
3. Run one of the following scripts:

```bash
npm run dev         # Start the development server with nodemon
npm run db:generate # Generate PostgreSQL database with drizzle-kit
npm run db:migrate  # Migrate the database schema
npm run db:studio   # Open drizzle-kit studio
```

## Endpoints

### Users

- `GET /api/user`: Get all users.
- `POST /api/user`: Create a new user.
- `GET /api/user/emails`: Get all user emails.
- `GET /api/user/:id`: Get user by ID.

### Posts

- `GET /api/post`: Get all posts.
- `POST /api/post`: Create a new post.
- `GET /api/post/:id`: Get post by ID.
- `PUT /api/post/:id`: Update post by ID.
- `DELETE /api/post/:id`: Delete post by ID.

### User Preferences

- `POST /api/user-preferences`: Create user preferences.

### Categories

- `GET /api/categories`: Get all categories.
- `POST /api/categories`: Create a new category.