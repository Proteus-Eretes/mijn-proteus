# Use the NodeJS image as builder
FROM node:lts AS builder

# Create the workspace
WORKDIR /usr/src/app

# Copy over the package, and install the dependencies
COPY package.json .
RUN yarn

# Copy over the other files.
COPY assets ./assets
COPY components ./components
COPY layouts ./layouts
COPY logic ./logic
COPY pages ./pages
COPY prisma ./prisma
COPY public ./public
COPY server ./server
COPY app.vue .
COPY nuxt.config.ts .
COPY tsconfig.json .
COPY .env .

# Build the application
RUN yarn build

# The actual server, this builds the final image
FROM node:lts

# Create the workspace
WORKDIR /usr/src/app

# Copy the output of the builder
COPY --from=builder /usr/src/app/.output ./.output

# Start
ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE 80
CMD ["node", ".output/server/index.mjs"]
