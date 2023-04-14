FROM node:16-alpine as builder

RUN npm i -g pnpm

ENV NODE_ENV build

#USER node
WORKDIR /home/node

COPY package*.json ./
RUN pnpm install

COPY --chown=node:node . .
RUN pnpm build

# ---

FROM node:16-alpine

ENV NODE_ENV dev

RUN npm i -g pnpm

#USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["pnpm", "start:prod"]
