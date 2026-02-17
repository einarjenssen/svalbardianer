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
RUN pnpm ci

# Copies all files and directories from your local project into the container's /app directory.
COPY . .

# Runs the build script defined in your package.json, which typically builds your SvelteKit app for production.
RUN pnpm run build

# Removes development dependencies, keeping only the production dependencies. This reduces the size of the node_modules directory.
RUN pnpm prune --production


# Stage 2: Production stage

# Starts a new build stage using the same base image. This stage will contain only the necessary files to run your app.
FROM node:22.15.1-alpine

# Sets the working directory to /app.
WORKDIR /app

# Copies the build directory and node_modules from the builder stage into the final image. Also copies package.json.
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
#COPY static static/
#COPY src src/
#COPY *config* .

# Copies your debug.env file into the container as .env. This file contains environment variables needed at runtime.
# MAKE SURE .env CONTAINS THE host.docker.internal address instead of localhost!!11
COPY .env.docker .env

# Sets the NODE_ENV environment variable to production.
ENV NODE_ENV=production
ENV PORT=8080
# Change ownership of application files to node user and switch to non-root user
RUN chown -R 1000:1000 /app
USER 1000
# Specifies the command to run when the container starts. In this case, it runs node build, which starts your SvelteKit app.
ENTRYPOINT ["node", "build"]