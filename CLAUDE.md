# MeltShop Web - CLAUDE.md

## 프로젝트 개요

코스프레 가발 스타일링 전문 샵 **멜트샵(meltshop.kr)** 의 소개 사이트를 Nuxt 4 + Vue 3으로 재구축하는 프로젝트.

상품 판매 사이트가 아닌 **샵 소개 및 포트폴리오 전시** 목적의 사이트.

---

## 기술 스택

| 구분 | 기술 |
|---|---|
| 프레임워크 | Nuxt 4 + Vue 3 |
| 스타일링 | TailwindCSS (`@nuxtjs/tailwindcss`) |
| ORM | Prisma (`prisma-client-js`) |
| DB | AWS Lightsail PostgreSQL |
| 이미지 스토리지 | Cloudflare R2 |
| 배포 | AWS Lightsail App Instance |

---

## 사이트 구조

### 페이지
- `/` — 메인 페이지 (Hero → About → Notice → Contact 싱글페이지)
- `/portfolio` — 작업물 갤러리
- `/portfolio/[id]` — 작업물 상세 모달 (공유 가능한 URL)
- `/admin` — 관리자 게시판
- `/admin/login` — 관리자 로그인
- `/admin/portfolio/[id]` — 관리자 상세 편집

### 메인 페이지 섹션
1. **Hero** — 슬로건 "당신의 캐릭터를 완성시켜드릴게요" + 견적 문의 버튼
2. **About** — 샵 소개 + 4가지 핵심 가치 (정밀한 스타일링, 원작 충실 재현, 안전한 배송, 친절한 상담)
3. **Notice** — 제작 기간 안내 + 6단계 주문 절차 + 필독사항
4. **Contact** — 카카오톡 오픈채팅 링크

### 포트폴리오 페이지
- 최신순(order desc) 정렬, 페이지당 6개 페이지네이션
- 이미지는 Cloudflare R2에서 가져옴
- 카드 구성: 캐릭터명 + 작품명 + 이미지
- 카드 클릭 시 상세 모달 (대표 이미지 + 추가 이미지 썸네일 + 설명문)

---

## 디자인 톤

- 따뜻한 주황/골드 계열 포인트 컬러
- 흰색 / 연한 크림(#FEFCE8) 배경 번갈아 섹션 구분
- Nunito 폰트 (둥근 볼드체)
- 이모지 활용한 친근하고 캐주얼한 톤
- 커스텀 마우스 커서 (기본/클릭/로딩)

---

## DB 스키마

```prisma
model mt_portfolio {
  id            Int      @id @default(autoincrement())
  characterName String
  workTitle     String
  imageUrl      String
  order         Int      @default(0)
  published     Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @default(now()) @updatedAt
  description   String?  @db.VarChar(200)
  mt_portfolio_image mt_portfolio_image[]
}

model mt_portfolio_image {
  id          Int      @id @default(autoincrement())
  portfolioId Int
  imageUrl    String
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  mt_portfolio mt_portfolio @relation(fields: [portfolioId], references: [id], onDelete: Cascade)
}
```

- 테이블명 prefix: `mt_`
- 신규 작업물 등록 시 order = id 로 설정 (등록순 정렬)

---

## 환경변수 (.env)

```
DATABASE_URL         AWS Lightsail PostgreSQL 연결 문자열
R2_ACCOUNT_ID        Cloudflare R2 계정 ID
R2_ACCESS_KEY_ID     Cloudflare R2 액세스 키
R2_SECRET_ACCESS_KEY Cloudflare R2 시크릿 키
R2_BUCKET_NAME       R2 버킷명
R2_PUBLIC_URL        R2 공개 URL
ADMIN_ID             관리자 아이디
ADMIN_PASSWORD       관리자 비밀번호
```

R2 경로 구조: `meltshop/portfolio/{포트폴리오id}/{랜덤UUID}.{ext}`

---

## 주요 기술 결정 및 트러블슈팅

### Prisma 버전
- **Prisma 6 사용** (6.19.3)
- Prisma 7은 `datasource` URL 관리 방식이 변경되어 Nuxt 4와 호환성 문제 발생
- Prisma 7에서는 `datasources` 옵션이 제거되고 `prisma.config.ts` 에서만 URL 관리
- Nuxt 서버 환경에서 `prisma.config.ts` 를 제대로 읽지 못하는 문제로 **Prisma 6으로 고정**

### DB 테이블 관리 방식
- DBeaver로 직접 테이블 생성 후 `prisma db pull` 로 스키마 반영 (방법 B)
- 계정 분리: `meltshop_dev`(DDL 전체 권한) / `meltshop_app`(CRUD만)
- app 계정은 시퀀스 권한(`USAGE, SELECT ON SEQUENCES`) 별도 부여 필요

### server/utils/db.ts import 경로
- `~/server/utils/db` 는 Nuxt 4에서 경로 오류 발생
- `../utils/db` 상대경로 사용

### 관리자 인증
- 환경변수 계정(ADMIN_ID/ADMIN_PASSWORD) + 세션 쿠키 방식
- 세션 토큰은 로그인마다 랜덤 UUID 발급 (server/utils/session.ts, 메모리 저장)
- `app/middleware/admin.ts` 에서 화면 접근 제어 (쿠키를 useRequestHeaders로 전달)
- `server/utils/auth.ts` 의 requireAdmin() 으로 API 접근 제어

### SQL 주의사항
- `order` 는 PostgreSQL 예약어 → DBeaver에서 직접 쿼리 시 `"order"` 로 감싸야 함

---

## 작업 방식

- Claude는 코드를 **파일에 직접 작성하지 않는다.**
- 코드 블록으로 **노출 + 설명**을 제공하고, 사용자가 **직접 복사 붙여넣기**로 작업한다.
- 단, 설정 파일이나 초기 세팅처럼 사용자가 명시적으로 요청한 경우는 예외로 직접 작성할 수 있다.
