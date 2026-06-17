# 검단ABA AAC maker — 배포 가이드

통합 시스템(`aba-geomdan/aba-geomdan`)과 분리된 독립 앱으로, GitHub Pages + Supabase에 배포합니다.
최종 주소: **https://aba-geomdan.github.io/aac-maker/**

---

## 큰 그림

1. Supabase에 AAC 전용 테이블 2개 생성
2. GitHub에 새 레포 `aac-maker` 생성 + 코드 push
3. GitHub Secrets에 Supabase 주소·키 등록
4. Settings → Pages에서 Source를 "GitHub Actions"로
5. push하면 자동 빌드·배포

데이터는 통합 시스템과 같은 Supabase 프로젝트(`vdubgrxwijydwfabwpnk`)를 쓰되,
`aac_shared_store` / `aac_teacher_store` 테이블을 따로 써서 기존 데이터와 섞이지 않습니다.

---

## 1단계 — Supabase 테이블 만들기

1. https://supabase.com/dashboard → 기존 프로젝트(`vdubgrxwijydwfabwpnk`) 선택
2. 왼쪽 메뉴 **SQL Editor** → **New query**
3. `supabase-setup.sql` 내용을 통째로 붙여넣고 **Run**
4. 왼쪽 **Table Editor** 에서 `aac_shared_store`, `aac_teacher_store` 두 테이블이 보이면 성공

> anon key 찾는 곳: Settings → API → Project API keys → `anon` `public` 키.
> Project URL도 같은 화면에 있습니다 (`https://vdubgrxwijydwfabwpnk.supabase.co`).

---

## 2단계 — GitHub 새 레포 만들기 + push

GitHub에서 `aba-geomdan` 계정으로 **aac-maker** 라는 이름의 새(빈) 레포를 만든 뒤,
이 폴더에서 아래를 실행하세요.

```bash
git init
git add .
git commit -m "AAC maker 최초 배포"
git branch -M main
git remote add origin https://github.com/aba-geomdan/aac-maker.git
git push -u origin main
```

---

## 3단계 — GitHub Secrets 등록 (Supabase 키 보호)

키를 코드에 넣지 않고 빌드 때만 주입합니다.

1. 레포 → **Settings → Secrets and variables → Actions**
2. **New repository secret** 으로 아래 2개 추가:

| 이름 | 값 |
|------|-----|
| `VITE_SUPABASE_URL` | `https://vdubgrxwijydwfabwpnk.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | (Supabase의 anon public 키) |

---

## 4단계 — GitHub Pages 켜기

1. 레포 → **Settings → Pages**
2. **Source** 드롭다운에서 **GitHub Actions** 선택

---

## 5단계 — 배포

`main`에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드·배포합니다.
레포의 **Actions** 탭에서 진행 상황을 볼 수 있고, 초록 체크가 뜨면 완료입니다.

주소: **https://aba-geomdan.github.io/aac-maker/**

이후 코드를 고치고 다시 push하면 자동으로 재배포됩니다.

---

## 로컬에서 미리 보기 (선택)

```bash
npm install

# Supabase 연동 테스트하려면 .env 파일을 만들고 (git에 안 올라감):
#   VITE_SUPABASE_URL=https://vdubgrxwijydwfabwpnk.supabase.co
#   VITE_SUPABASE_ANON_KEY=...
npm run dev
```

`.env` 없이 실행하면 Supabase 없이 localStorage(기기별 저장)로만 동작합니다.

---

## 참고

- 관리자 계정: `abageomdan` / `abageomdan1121`
- Supabase 연결 실패 시 자동으로 localStorage로 폴백하므로, 오프라인/장애 중에도 카드 작업은 가능합니다.
- 저작권: 민다혜 (BCBA) / 검단ABA 언어행동연구소
