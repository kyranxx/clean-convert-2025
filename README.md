# Clean-Convert

## Deployment Setup

1. Create a new PostgreSQL database in Vercel:
   - Go to your project in Vercel Dashboard
   - Navigate to Storage tab
   - Create a new Vercel Postgres database
   - Copy the `DATABASE_URL` from the integration settings

2. Set up environment variables in Vercel:
   Required variables from Vercel Postgres:
   - `POSTGRES_PRISMA_URL`: Connection string with connection pooling
   - `POSTGRES_URL_NON_POOLING`: Direct connection string for migrations
   - `POSTGRES_USER`: Database user
   - `POSTGRES_HOST`: Database host
   - `POSTGRES_PASSWORD`: Database password
   - `POSTGRES_DATABASE`: Database name

   Authentication variables:
   - `NEXTAUTH_SECRET`: Generate a secure random string
   - `NEXTAUTH_URL`: Set to `https://${VERCEL_URL}` to use Vercel's automatic URL
   
   Note: VERCEL_URL is automatically provided by Vercel in production

3. Local Development Setup:
   ```bash
   # Install dependencies
   npm install

   # Pull environment variables from Vercel
   vercel env pull .env

   # Run migrations
   npx prisma migrate dev

   # Start development server
   npm run dev
   ```

## Database Configuration

The application uses Vercel Postgres for both development and production environments. This ensures consistency across environments and simplifies the development workflow.

### Key Features:
- Vercel Postgres for reliable, scalable database hosting
- Connection pooling for improved performance
- Automatic SSL encryption for secure connections
- Prisma ORM for type-safe database operations
- Automated migrations during deployment

### Database Schema:
- User management with role-based access
- Credit system for tracking usage
- Conversion history tracking
- Detailed credit transaction history

## Important Notes

- Development uses Vercel Postgres (no local database required)
- Environment variables are managed through Vercel
- Database migrations are handled automatically during deployment
- Use `vercel env pull` to sync local environment
