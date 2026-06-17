-- ============================================================
-- 검단ABA AAC maker — Supabase 테이블 생성 SQL
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 RUN 하세요.
-- (통합 시스템과 같은 프로젝트 vdubgrxwijydwfabwpnk 에서 실행)
-- ============================================================

-- 모든 사용자가 공유하는 데이터 (계정 DB, 카테고리, 공유 히스토리)
create table if not exists public.aac_shared_store (
  key   text primary key,
  value text,
  updated_at timestamptz default now()
);

-- 선생님 개인 데이터 (작업 중 카드 draft 등)
create table if not exists public.aac_teacher_store (
  key   text primary key,
  value text,
  updated_at timestamptz default now()
);

-- RLS 활성화
alter table public.aac_shared_store  enable row level security;
alter table public.aac_teacher_store enable row level security;

-- anon 키로 읽기/쓰기 허용 (통합 시스템과 동일한 정책)
-- 주의: 앱 자체 로그인으로 접근을 통제하므로 anon 전체 허용
create policy "aac_shared_all"  on public.aac_shared_store
  for all using (true) with check (true);
create policy "aac_teacher_all" on public.aac_teacher_store
  for all using (true) with check (true);
