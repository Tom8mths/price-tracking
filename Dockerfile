# Step 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
ARG VITE_API_KEY
ENV VITE_API_KEY=a5617e2a

RUN npm install && npm run build

# Step 2: Serve the app
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist /app/dist
CMD ["serve", "-s", "dist", "-l", "8080"]