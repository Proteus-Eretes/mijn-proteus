# Use the NodeJS v18 image
FROM node:18

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
COPY tailwind.config.js .
COPY .env .

# Build the application
RUN yarn build

# Start
ENV HOST 0.0.0.0
ENV PORT 80

EXPOSE 80
CMD ["node", ".output/server/index.mjs"]
