# Step 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
ARG VITE_API_KEY
ENV VITE_API_KEY=a5617e2a
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=https://api.hgbrasil.com

RUN npm install && npm run build
RUN cp .env.production .env

# Step 2: Serve the app
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist /app/dist
CMD ["serve", "-s", "dist", "-l", "8080"]