FROM node:20-alpine AS builder

WORKDIR /app
COPY server/package.json ./

RUN ["npm", "install", "--legacy-peer-deps"]

COPY server/src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]