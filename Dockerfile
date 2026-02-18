# Stage 1: Builder stage

# This line sets the base image for the builder stage to Node.js version 20.9.0 running on Alpine Linux
FROM node:22.15.1-alpine AS builder
RUN npm install -g pnpm 

# Sets the working directory inside the container to /app. All subsequent commands will be run from this directory.
WORKDIR /app

# Documents that the container listens on port 8080 at runtime. Note that EXPOSE doesn't actually publish the port; it's just metadata.
EXPOSE 8080

# Copies package.json and package-lock.json (if it exists) from your local machine to the container's /app directory.
COPY package*.json .

#  Installs dependencies based on the package-lock.json file. Using npm ci is beneficial for reproducible builds
RUN pnpm install

# Copies all files and directories from your local project into the container's /app directory.
COPY . .

# Runs the build script defined in your package.json, which typically builds your SvelteKit app for production.
RUN pnpm run build

# Removes development dependencies, keeping only the production dependencies. This reduces the size of the node_modules directory.
RUN pnpm prune --production


# Stage 2: Production stage

# Starts a new build stage using the same base image. This stage will contain only the necessary files to run your app.
FROM node:22.15.1-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

ENV NODE_ENV=production
ENV PORT=8080

RUN chown -R 1000:1000 /app
USER 1000

ENTRYPOINT ["node", "build/index.js"]