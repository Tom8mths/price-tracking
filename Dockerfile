# Step 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
ARG VITE_API_BASE_URL
ENV VITE_API_URL=https://price-tracking-api-docker-293372619781.us-central1.run.app

RUN npm install && npm run build
RUN cp .env.production .env

# Step 2: Serve the app
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist /app/dist
CMD ["serve", "-s", "dist", "-l", "8080"]