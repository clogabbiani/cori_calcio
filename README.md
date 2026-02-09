# Cori Calcio - Global Football Anthems

A web application to hear the most popular songs for each football team, with grouping by leagues and countries.

## Features
- **Dark Stadium Theme**: A premium look and feel inspired by football stadiums.
- **Adaptive Team Colors**: Team pages adapt their accent colors to match the club's identity.
- **Global Search**: Find your favorite teams, leagues, or countries.
- **User Submissions**: Users can submit new song links for review.
- **Admin Moderation**: Admins can approve or reject song submissions.

## Tech Stack
- **Frontend**: Next.js 16 (App Router), Tailwind CSS 4, Framer Motion, Lucide React.
- **Backend**: Next.js Server Actions, NextAuth.js v5.
- **Database**: Prisma 7 with SQLite.

## Local Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   AUTH_SECRET="your-secret-here"
   ```

3. **Initialize Database**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed Data**:
   ```bash
   npm run db:seed
   ```
   *Admin Credentials*: `admin@coricalcio.com` / `admin123`

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

6. **View the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.
