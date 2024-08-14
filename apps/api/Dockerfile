FROM node:18-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

COPY .env .env
COPY --from=builder /app/out/json/ .
RUN yarn install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

RUN npx prisma migrate dev --schema=./apps/api/prisma/schema.prisma 
RUN yarn turbo build --filter=api...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/api/dist/index.js