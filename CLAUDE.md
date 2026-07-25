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

### 메인 페이지 섹션
1. **Hero** — 슬로건 "당신의 캐릭터를 완성시켜드릴게요" + 견적 문의 버튼
2. **About** — 샵 소개 + 4가지 핵심 가치 (정밀한 스타일링, 원작 충실 재현, 안전한 배송, 친절한 상담)
3. **Notice** — 제작 기간 안내 + 6단계 주문 절차 + 필독사항
4. **Contact** — 카카오톡 오픈채팅 링크

### 포트폴리오 페이지
- 카테고리별 갤러리 (게임, 애니메이션, 만화, 기타)
- 이미지는 Cloudflare R2에서 가져옴
- 카드 구성: 캐릭터명 + 작품명 + 이미지

---

## 디자인 톤

- 따뜻한 주황/골드 계열 포인트 컬러
- 흰색 배경, 검정 텍스트
- 이모지 활용한 친근하고 캐주얼한 톤
- 구분선(✦) 으로 섹션 분리

---

## DB 스키마

```prisma
model Portfolio {
  id            Int      @id @default(autoincrement())
  characterName String   // 캐릭터명
  workTitle     String   // 작품명
  category      Category @default(ETC)
  imageUrl      String   // Cloudflare R2 URL
  order         Int      @default(0)
  published     Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum Category {
  GAME
  ANIME
  COMIC
  ETC
}
```

---

## 환경변수 (.env)

```
DATABASE_URL        AWS Lightsail PostgreSQL 연결 문자열
R2_ACCOUNT_ID       Cloudflare R2 계정 ID
R2_ACCESS_KEY_ID    Cloudflare R2 액세스 키
R2_SECRET_ACCESS_KEY Cloudflare R2 시크릿 키
R2_BUCKET_NAME      R2 버킷명
R2_PUBLIC_URL       R2 공개 URL
```

---

## 주요 기술 결정 및 트러블슈팅

### Prisma 버전
- **Prisma 6 사용** (6.19.3)
- Prisma 7은 `datasource` URL 관리 방식이 변경되어 Nuxt 4와 호환성 문제 발생
- Prisma 7에서는 `datasources` 옵션이 제거되고 `prisma.config.ts` 에서만 URL 관리
- Nuxt 서버 환경에서 `prisma.config.ts` 를 제대로 읽지 못하는 문제로 **Prisma 6으로 고정**

### DB 테이블 관리 방식
- DBeaver로 직접 테이블 생성 후 `prisma db pull` 로 스키마 반영 (방법 B)
- 테이블명 prefix: `mt_` (예: `mt_portfolio`)

### server/utils/db.ts import 경로
- `~/server/utils/db` 는 Nuxt 4에서 경로 오류 발생
- `../utils/db` 상대경로 사용

---

## 작업 방식

- Claude는 코드를 **파일에 직접 작성하지 않는다.**
- 코드 블록으로 **노출 + 설명**을 제공하고, 사용자가 **직접 복사 붙여넣기**로 작업한다.
- 단, 설정 파일이나 초기 세팅처럼 사용자가 명시적으로 요청한 경우는 예외로 직접 작성할 수 있다.
