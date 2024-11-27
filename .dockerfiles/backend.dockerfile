FROM node:20-alpine AS builder

WORKDIR /app
COPY backend/package.json ./

COPY backend/tsconfig.json ./

RUN ["npm", "install", "--legacy-peer-deps"]

COPY backend/src ./src

RUN npm run build

FROM node:20-alpine

COPY backend/package.json ./

COPY backend/tsconfig.json ./

COPY backend/src ./src

WORKDIR /app

RUN npm install

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]