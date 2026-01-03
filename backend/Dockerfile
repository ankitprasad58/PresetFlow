# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install OpenSSL and wait-for-it dependencies
RUN apk add --no-cache openssl bash

# Install dependencies
COPY package*.json ./
RUN npm ci

# Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Copy source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 4000

# Create a wait script
RUN echo '#!/bin/sh\nset -e\necho "Waiting for MySQL at mysql:3306..."\nwhile ! nc -z mysql 3306; do\n  echo "MySQL is unavailable - sleeping"\n  sleep 1\ndone\necho "MySQL is up - executing migrations..."\nnpx prisma migrate deploy\necho "Seeding database..."\nnpx prisma db seed\necho "Starting application..."\nnpm run dev' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]