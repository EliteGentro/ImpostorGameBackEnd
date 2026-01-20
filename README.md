# Impostor Game Backend

A NestJS backend for the Impostor Word Game, a mobile-first social deduction game. This backend provides RESTful APIs for managing game categories and words, using TypeORM for database operations with Supabase PostgreSQL.

## Features

- **RESTful API**: Endpoints for categories and random word generation
- **TypeORM Integration**: Migration-based schema management with PostgreSQL
- **Supabase Database**: Managed PostgreSQL instance with connection pooling
- **CORS Enabled**: Configured for frontend integration
- **Validation**: Global validation pipes for request data
- **Seeding**: Database seeding with sample categories and words

## Tech Stack

- **Framework**: NestJS 10.3.0
- **ORM**: TypeORM 0.3.28 with @nestjs/typeorm
- **Database**: PostgreSQL (Supabase)
- **Language**: TypeScript 5.3.0
- **Build Tool**: Nest CLI
- **Package Manager**: npm

## Project Structure

```
backend/
├── src/
│   ├── app.module.ts          # Root application module
│   ├── main.ts                # Application bootstrap
│   ├── categories/            # Categories module
│   │   ├── categories.controller.ts
│   │   ├── categories.service.ts
│   │   ├── categories.module.ts
│   │   └── entities/
│   │       └── category.entity.ts
│   ├── words/                 # Words module
│   │   ├── words.controller.ts
│   │   ├── words.service.ts
│   │   ├── words.module.ts
│   │   ├── dto/
│   │   │   └── get-random-word.dto.ts
│   │   └── entities/
│   │       └── word.entity.ts
│   ├── migrations/            # Database migrations
│   │   └── 1768875738887-InitialSchema.ts
│   └── seeds/                 # Database seeding
│       └── seed.ts
├── data-source.ts             # TypeORM data source configuration
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── nest-cli.json              # Nest CLI configuration
```

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd ImpostorGame/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Copy the `.env` file and configure your database connection:
   ```bash
   cp .env.example .env  # If .env.example exists, otherwise create .env
   ```

   Required environment variables:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   PORT=3001

   # Database Configuration (TypeORM)
   DATABASE_URL=postgresql://postgres.your-project:Astronomo!-S@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true
   DIRECT_URL=postgresql://postgres.your-project:Astronomo!-S@aws-0-us-west-2.pooler.supabase.com:5432/postgres
   ```

## Database Setup

### Run Migrations
Execute the initial schema migration to create tables:
```bash
npm run migration:run
```

### Seed Database
Populate the database with sample data:
```bash
npm run seed
```

This will create:
- 8 categories (Animals, Food, Sports, Technology, Professions, Countries, Movies, Music)
- 192 words distributed across categories

## Running the Application

### Development Mode
```bash
npm run start:dev
```
The application will start on `http://localhost:3001` with hot reload enabled.

### Production Mode
```bash
npm run build
npm run start:prod
```

### Watch Mode
```bash
npm run start:dev
```

## API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### GET /api/categories
Retrieve all active categories.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Animals",
    "description": "Animals and creatures",
    "isActive": true,
    "createdAt": "2026-01-19T..."
  }
]
```

#### GET /api/words/random
Get random words from specified categories.

**Query Parameters:**
- `categoryIds` (required): Comma-separated list of category UUIDs
- `count` (optional): Number of words to return (default: 6)

**Example Request:**
```
GET /api/words/random?categoryIds=119b6a99-2c94-4bc7-9127-40b1e644cb76&count=5
```

**Response:**
```json
[
  {
    "id": "uuid",
    "value": "Lion",
    "categoryId": "uuid",
    "difficulty": "medium",
    "isActive": true,
    "createdAt": "2026-01-19T..."
  }
]
```

## Database Schema

### Categories Table
```sql
CREATE TABLE "categories" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" text NOT NULL,
    "description" text,
    "is_active" boolean NOT NULL DEFAULT true,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "UQ_categories_name" UNIQUE ("name"),
    CONSTRAINT "PK_categories" PRIMARY KEY ("id")
);
```

### Words Table
```sql
CREATE TABLE "words" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "value" text NOT NULL,
    "is_active" boolean NOT NULL DEFAULT true,
    "category_id" uuid NOT NULL,
    "difficulty" text,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT "PK_words" PRIMARY KEY ("id")
);
```

**Foreign Key:**
```sql
ALTER TABLE "words"
ADD CONSTRAINT "FK_words_category"
FOREIGN KEY ("category_id")
REFERENCES "categories"("id")
ON DELETE CASCADE
ON UPDATE NO ACTION;
```

**Indexes:**
- `IDX_words_category_id` on words(category_id)
- `IDX_words_is_active` on words(is_active)
- `IDX_categories_is_active` on categories(is_active)
- `IDX_words_unique_value_per_category` on words(category_id, LOWER(value))

## Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode with watch |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start the production build |
| `npm run build` | Build the application |
| `npm run format` | Format code with Prettier |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run migration:create` | Create a new migration |
| `npm run migration:run` | Run pending migrations |
| `npm run migration:revert` | Revert the last migration |
| `npm run seed` | Run database seeding |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `PORT` | Server port (default: 3001) | No |
| `DATABASE_URL` | Pooled database connection URL | Yes |
| `DIRECT_URL` | Direct database connection URL for migrations | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## Development

### Code Style
- **Linting**: ESLint with recommended rules
- **Formatting**: Prettier
- **TypeScript**: Strict mode enabled

### Adding New Features
1. Create entities in `src/entities/`
2. Create modules, controllers, and services
3. Add routes and validation
4. Create migrations for schema changes
5. Update tests

### Database Changes
1. Modify entities
2. Generate migration: `npm run migration:create`
3. Run migration: `npm run migration:run`

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Run migrations on production database:
   ```bash
   npm run migration:run
   ```

4. Start the application:
   ```bash
   npm run start:prod
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.