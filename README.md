# PresetFlow - Video Preset Store

A modern e-commerce platform for buying and selling video presets (LUTs, transitions, effects, etc.).

## 🚀 Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Stripe Payment Integration

**Backend:**
- NestJS
- Prisma ORM
- MySQL 8.0
- JWT Authentication
- Stripe API

## 📋 Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

## 🔧 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/PresetFlow.git
cd PresetFlow
```

### 2. Environment Setup

Create `.env` files from examples:

**Backend (.env)**
```bash
cp .env.example .env
# Edit .env with your values
```

**Frontend (.env.local)**
```bash
cd frontend
cp .env.example .env.local
# Edit with your Stripe keys
```

### 3. Start Development

**Option A: Docker (Recommended)**
```bash
# Terminal 1 - Backend + Database
docker compose up -d backend mysql
docker compose logs -f backend

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

**Option B: Local Setup**
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 📱 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000/api
- **API Docs**: http://localhost:4000/api

## 🗂️ Project Structure

```
PresetFlow/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication
│   │   ├── products/       # Product management
│   │   ├── orders/         # Order management
│   │   ├── payments/       # Stripe integration
│   │   └── users/          # User management
│   └── prisma/             # Database schema
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Auth context
│   │   └── api/            # API client
│   └── public/             # Static assets
└── docker-compose.yml      # Docker configuration
```

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Environment variables for secrets
- 256-bit SSL encryption
- Secure payment with Stripe
- CORS protection

## 📦 Available Scripts

**Backend:**
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Run production build
npm run test      # Run tests
```

**Frontend:**
```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🗄️ Database

### Prisma Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Deploy migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### MySQL Access

```bash
docker exec -it preset-mysql mysql -u preset_user -p preset_store
# Password: preset_password
```

## 💳 Stripe Integration

1. Get API keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLIC_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## 🚢 Deployment

### Docker Production Build

```bash
docker compose -f docker-compose.prod.yml up -d
```

### Environment Variables for Production

```
NODE_ENV=production
JWT_SECRET=strong-random-string
DATABASE_URL=mysql://user:pass@host:3306/db
STRIPE_SECRET_KEY=sk_live_...
FRONTEND_URL=https://yourdomain.com
```

## 📝 API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Orders
- `GET /api/orders/:id` - Get order details

### Payments
- `POST /api/payments/create-checkout` - Create Stripe checkout
- `POST /api/payments/webhook` - Stripe webhook

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/YOUR_USERNAME)

## 🆘 Support

For support, email support@presetflow.com or open an issue.