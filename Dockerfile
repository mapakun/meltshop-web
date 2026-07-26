# 1. 빌드 스테이지
FROM node:22-alpine AS builder

WORKDIR /app

# 의존성 설치 (캐시 최적화)
COPY package*.json ./
RUN npm ci

# Prisma 클라이언트 생성을 위한 스키마 복사
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

# 소스 전체 복사 후 빌드
COPY . .
RUN npm run build

# 2. 실행 스테이지
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 빌드 결과물만 복사
COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]