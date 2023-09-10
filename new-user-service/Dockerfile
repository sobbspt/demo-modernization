# Stage 1: Build the NestJS application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma/ ./prisma/

RUN ls /app/prisma

# Expose the port your NestJS application is running on (default is 3000)
EXPOSE 3333

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
