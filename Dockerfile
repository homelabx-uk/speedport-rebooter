FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production
ENTRYPOINT ["node", "--enable-source-maps", "dist/main.js"]
