FROM node:19 AS builder

RUN npm i -g pnpm

WORKDIR /app

COPY . .

RUN pnpm build

FROM node:16-alpine

RUN npm i -g pnpm

WORKDIR /app

ENV NODE_ENV dev

COPY --from=builder /app ./

CMD ["pnpm", "start:prod"]
