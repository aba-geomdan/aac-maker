/**
 * 검단ABA 언어행동연구소 AAC 카드 메이커
 * © 검단ABA 언어행동연구소 · 민다혜 (BCBA)
 *
 * 본 자료는 검단ABA언어행동연구소의 지적재산입니다.
 * 무단 복제·배포·재판매·온라인 게시를 엄격히 금지합니다.
 */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Upload, X, Plus, Image as ImageIcon, Type, Settings2, Trash2, Copy, FileDown, History, ChevronDown, ChevronUp, Pencil, Search, Share2, FolderOpen, Lock, LogOut, UserPlus, Users, Shield, Eye, EyeOff, RotateCw, FlipHorizontal, GripVertical, Folder, FolderPlus, Edit3, HelpCircle, ArrowRight, Tag, RefreshCw, ArrowUpDown, Crop, Sparkles, Check, Menu } from 'lucide-react';

/* ================================================================
   도메인 잠금 (지적재산 보호)
   허용 host 외에서는 앱 렌더링 차단
================================================================ */
(function domainGuard() {
  try {
    var host = window.location.hostname;
    var allowed =
      host === 'aba-geomdan.github.io' ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '' ||
      /\.local$/.test(host);
    if (allowed) return;
    document.documentElement.innerHTML =
      '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;' +
      'background:#FFF0F3;font-family:system-ui,-apple-system,sans-serif;padding:24px;">' +
      '<div style="text-align:center;max-width:420px;">' +
      '<div style="font-size:20px;font-weight:700;color:#D4728A;margin-bottom:12px;">접근할 수 없는 페이지</div>' +
      '<div style="font-size:14px;color:#D4728A;line-height:1.6;">검단ABA언어행동연구소의 지적재산입니다.</div>' +
      '</div></div>';
    throw new Error('Unauthorized host');
  } catch (e) {
    if (e && e.message === 'Unauthorized host') throw e;
  }
})();


const LOGO_DATA_URL = "data:image/png;base64,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";

// ============================================================
// 검단ABA 언어행동연구소 AAC maker — 개선 버전
// 핵심 개선: 그림 업로드 즉시 그 옆에서 라벨 입력
// 그리드 미리보기 + 라벨 위치/크기/스타일 조절 + PDF 출력
// 로그인 시스템: 관리자가 선생님 계정 등록/관리
// ============================================================

// ─────────────────────────────────────────────────────────────
// 디버그 로그 토글
// ─────────────────────────────────────────────────────────────
// 평소(false): 콘솔에 아무것도 출력 안 함. 동료 BCBA가 콘솔 열어볼 일 없으므로 깨끗하게 유지
// 문제 신고받을 때: 본인이 이 값을 true로 바꿔 재배포하면 모든 내부 동작 로그가 콘솔에 표시됨
// safeAlert로 사용자에게 알리는 진짜 중요한 에러는 콘솔과 별개로 항상 표시됨
const DEBUG = false;
const devLog = (...args) => { if (DEBUG) console.log(...args); };
const devWarn = (...args) => { if (DEBUG) console.warn(...args); };
const devError = (...args) => { if (DEBUG) console.error(...args); };
const devInfo = (...args) => { if (DEBUG) console.info(...args); };

// =====================================================================
// Supabase 연결 설정 (A방식: Supabase Auth + RLS)
// anon/URL은 빌드 시 GitHub Secrets → Vite env 로 주입 (소스에 비번/키 하드코딩 없음)
// =====================================================================
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

// =====================================================================
// Auth 세션 관리 (Supabase Auth) — sessionStorage 기반 (탭 닫으면 로그아웃)
// =====================================================================
const AUTH_SESSION_KEY = 'sb-auth-session';

function getStoredSession() {
  try {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    // 만료 확인 (5분 여유 → refresh 필요 판단)
    if (s.expires_at && s.expires_at * 1000 < Date.now() + 5 * 60 * 1000) return null;
    return s;
  } catch (e) { return null; }
}

function saveSession(session) {
  try {
    if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else sessionStorage.removeItem(AUTH_SESSION_KEY);
    // 과거 localStorage 자동로그인 흔적 제거 (보안)
    localStorage.removeItem(AUTH_SESSION_KEY);
  } catch (e) {}
}

async function refreshSession(refreshToken) {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    if (data.access_token) { saveSession(data); return data; }
    return null;
  } catch (e) { return null; }
}

async function getValidAccessToken() {
  let session = getStoredSession();
  if (session?.access_token) return session.access_token;
  const raw = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (raw) {
    try {
      const old = JSON.parse(raw);
      if (old.refresh_token) {
        const refreshed = await refreshSession(old.refresh_token);
        if (refreshed?.access_token) return refreshed.access_token;
      }
    } catch (e) {}
  }
  return null;
}

async function authHeaders() {
  const token = await getValidAccessToken();
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': token ? `Bearer ${token}` : `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  };
}

// =====================================================================
// Auth API
// =====================================================================
async function signInWithPassword(email, password) {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ email, password }),
    });
    const data = await r.json();
    if (!r.ok) return { error: data.error_description || data.msg || data.error || '로그인 실패' };
    saveSession(data);
    return { session: data, user: data.user };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function signOutAuth() {
  try {
    const token = await getValidAccessToken();
    if (token) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${token}` },
      });
    }
  } catch (e) {}
  saveSession(null);
}

async function getCurrentAuthUser() {
  try {
    const token = await getValidAccessToken();
    if (!token) return null;
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${token}` },
    });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

// 관리자 여부 (is_admin() RPC — 공유 인프라)
async function checkIsAdmin() {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/is_admin`, {
      method: 'POST', headers, body: '{}',
    });
    if (!r.ok) return false;
    return (await r.json()) === true;
  } catch (e) { return false; }
}

// =====================================================================
// 관리자용 사용자 관리 (admin-users Edge Function + admin_list_users RPC — 공유 인프라)
// =====================================================================
async function adminCreateUser(email, password, displayName) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'create', email, password, display_name: displayName || email.split('@')[0] }),
    });
    const data = await r.json();
    if (!r.ok) return { error: data.error || '계정 생성 실패' };
    return { user: data.user };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function adminDeleteUser(userId) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'delete', user_id: userId }),
    });
    if (!r.ok) { const data = await r.json().catch(() => ({})); return { error: data.error || '삭제 실패' }; }
    return { ok: true };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function adminUpdateUserPassword(userId, newPassword) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/functions/v1/admin-users`, {
      method: 'POST', headers,
      body: JSON.stringify({ action: 'update_password', user_id: userId, password: newPassword }),
    });
    const data = await r.json();
    if (!r.ok) return { error: data.error || '비번 변경 실패' };
    return { ok: true };
  } catch (e) { return { error: '네트워크 오류: ' + e.message }; }
}

async function adminListUsers() {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_list_users`, {
      method: 'POST', headers, body: '{}',
    });
    if (!r.ok) return [];
    return await r.json();
  } catch (e) { return []; }
}

// 관리자용: 특정 유저의 aac_data 전체 조회 (admin_get_aac_data RPC)
async function adminGetAacData(userId) {
  try {
    const headers = await authHeaders();
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_get_aac_data`, {
      method: 'POST', headers,
      body: JSON.stringify({ target_user_id: userId }),
    });
    if (!r.ok) return [];
    return await r.json();
  } catch (e) { return []; }
}

// =====================================================================
// 데이터 저장/조회 (aac_data 테이블 — RLS로 본인 데이터만 접근)
// 스키마: (user_id uuid, key text, value text, updated_at) — SCERTS v2 scerts_data 동일
// =====================================================================
async function dataGet(key, userIdOverride) {
  try {
    const headers = await authHeaders();
    let uid = userIdOverride;
    if (!uid) { const u = await getCurrentAuthUser(); uid = u?.id; }
    if (!uid) return null;
    const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${uid}&key=eq.${encodeURIComponent(key)}&select=key,value`;
    const r = await fetch(url, { headers });
    if (!r.ok) return null;
    const rows = await r.json();
    if (rows && rows.length > 0) return { key: rows[0].key, value: rows[0].value };
    return null;
  } catch (e) { return null; }
}

async function dataSet(key, value) {
  try {
    const headers = await authHeaders();
    const u = await getCurrentAuthUser();
    if (!u?.id) return null;
    const r = await fetch(`${SUPABASE_URL}/rest/v1/aac_data?on_conflict=user_id,key`, {
      method: 'POST',
      headers: { ...headers, 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ user_id: u.id, key, value, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return null;
    return { key, value };
  } catch (e) { return null; }
}

async function dataDelete(key) {
  try {
    const headers = await authHeaders();
    const u = await getCurrentAuthUser();
    if (!u?.id) return null;
    const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${u.id}&key=eq.${encodeURIComponent(key)}`;
    await fetch(url, { method: 'DELETE', headers });
    return { key, deleted: true };
  } catch (e) { return null; }
}

async function dataList(prefix, userIdOverride) {
  try {
    const headers = await authHeaders();
    let uid = userIdOverride;
    if (!uid) { const u = await getCurrentAuthUser(); uid = u?.id; }
    if (!uid) return { keys: [], rows: [] };
    const filter = prefix ? `&key=like.${encodeURIComponent(prefix)}*` : '';
    // 응답이 크면(이미지 base64 다수) 한 번에 받다가 실패하므로, limit/offset으로 나눠 받음
    const PAGE = 40;
    let all = [];
    let offset = 0;
    for (let guard = 0; guard < 200; guard++) {
      const url = `${SUPABASE_URL}/rest/v1/aac_data?user_id=eq.${uid}&select=key,value${filter}&order=key.asc&limit=${PAGE}&offset=${offset}`;
      const r = await fetch(url, { headers });
      if (!r.ok) {
        if (offset === 0) return { keys: [], rows: [], _error: true };
        break;
      }
      const rows = await r.json();
      if (!Array.isArray(rows) || rows.length === 0) break;
      all = all.concat(rows);
      if (rows.length < PAGE) break; // 마지막 페이지
      offset += PAGE;
    }
    return { keys: all.map((row) => row.key), rows: all };
  } catch (e) {
    return { keys: [], rows: [], _error: true };
  }
}

// 히스토리: 인덱스 + 개별 묶음 분리 저장
const HISTORY_INDEX_KEY = 'aac_history_index';
const HISTORY_ITEM_PREFIX = 'aac_history_item:';
const CATEGORIES_KEY = 'aac_categories';
// ───── 라이브러리(영구 보관) 저장 키 ─────
// 카테고리별로 분리 저장: aac_library:{categoryId}  (카테고리 없음 = __none__)
// 각 값 = JSON 배열 [{ id, image, originalImage, label, categoryId }]
const LIBRARY_PREFIX = 'aac_library:';   // (구) 카테고리 통째 저장 — 로드 호환용으로만 사용
const LIBRARY_NONE = '__none__';
const LIBRARY_KEY = (categoryId) => `${LIBRARY_PREFIX}${categoryId || LIBRARY_NONE}`;
// (신) 카드 1장 = 1행 저장. 값이 작아 크기 초과 없음.
const LIBCARD_PREFIX = 'aac_libcard:';
const LIBCARD_KEY = (cardId) => `${LIBCARD_PREFIX}${cardId}`;
const DRAFT_KEY_PREFIX = 'aac_draft:'; // 작업 중 카드 자동 저장 (사용자별, localStorage만)
const SESSION_HOURS = 24; // 로그인 유효 시간

// ───── 통합 저장소 (window.storage 우선, localStorage 폴백) ─────
// window.storage가 있으면 공유 저장소로 사용 (모든 사용자 동기화)
// 서버 오류 / rate limit 시 자동으로 localStorage로 폴백
let hasClaudeStorage = typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function';

// rate limit 감지 - 한 번 걸리면 그 세션 동안은 window.storage 안 씀
let rateLimitHit = false;
const isRateLimitError = (e) => {
  const msg = (e?.message || e?.toString() || '').toLowerCase();
  return msg.includes('rate limit') || msg.includes('429');
};
const disableSharedStorage = () => {
  if (rateLimitHit) return;
  rateLimitHit = true;
  hasClaudeStorage = false;
  devWarn('🔴 Rate limit 감지 - 이 세션은 localStorage만 사용합니다');
};

const store = {
  // 데이터 읽기
  // localStorage를 우선 - 항상 최신 (모든 set은 localStorage 즉시 + window.storage 시도)
  // window.storage가 실패할 수 있어서 localStorage가 더 신뢰 가능
  async get(key, shared = false) {
    // 1) localStorage 먼저 확인 - 최신 상태 보장
    try {
      const local = localStorage.getItem(key);
      if (local !== null) return local;
    } catch {}
    // 2) localStorage에 없으면 window.storage에서 가져오기 (첫 사용 또는 다른 기기 데이터)
    if (hasClaudeStorage) {
      try {
        const result = await window.storage.get(key, shared);
        if (result?.value !== undefined && result?.value !== null) {
          // 가져온 값을 localStorage에 캐싱
          try { localStorage.setItem(key, result.value); } catch {}
          return result.value;
        }
      } catch (e) {
        if (isRateLimitError(e)) disableSharedStorage();
      }
    }
    return null;
  },

  // 데이터 쓰기
  async set(key, value, shared = false) {
    // localStorage에는 무조건 즉시 저장 (백업)
    try { localStorage.setItem(key, value); } catch {}
    if (hasClaudeStorage) {
      try {
        await window.storage.set(key, value, shared);
        return true;
      } catch (e) {
        if (isRateLimitError(e)) disableSharedStorage();
        // localStorage엔 이미 저장됐으니 OK
        return true;
      }
    }
    return true;
  },

  async delete(key, shared = false) {
    try { localStorage.removeItem(key); } catch {}
    if (hasClaudeStorage) {
      try {
        await window.storage.delete(key, shared);
      } catch (e) {
        if (isRateLimitError(e)) disableSharedStorage();
      }
    }
    return true;
  },
};

// JSON 헬퍼
const storeGetJSON = async (key, shared = false, fallback = null) => {
  const raw = await store.get(key, shared);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const storeSetJSON = (key, value, shared = false) => store.set(key, JSON.stringify(value), shared);

// ───── 디바운싱 저장 (rate limit 회피) ─────
// 같은 키에 짧은 시간 안에 여러 번 저장 시도가 들어오면 마지막 것만 저장
const debouncedTimers = new Map();
const DEBOUNCE_MS = 800; // 800ms 동안 변경 없으면 저장

const debouncedStoreSet = (key, value, shared = false) => {
  // localStorage에는 즉시 백업 (rate limit과 무관)
  try { localStorage.setItem(key, value); } catch {}
  // 기존 타이머 취소
  if (debouncedTimers.has(key)) {
    clearTimeout(debouncedTimers.get(key));
  }
  // 새 타이머 설정 - 일정 시간 후 한 번만 저장
  const timer = setTimeout(() => {
    debouncedTimers.delete(key);
    store.set(key, value, shared).catch(e => devWarn('디바운스 저장 실패:', key, e));
  }, DEBOUNCE_MS);
  debouncedTimers.set(key, timer);
};

const debouncedStoreSetJSON = (key, value, shared = false) => debouncedStoreSet(key, JSON.stringify(value), shared);

// ───── 히스토리 전용 저장 헬퍼 (인덱스 + 개별 항목 분리) ─────
// 인덱스는 메타 정보만 (가벼움) - 카드 이미지는 포함 안 함
// 카드 본문은 'aac_history_item:<id>' 키에 따로 저장

// 잠금 메커니즘은 제거됨 (rate limit 회피용) - no-op 함수 유지로 기존 호출 호환
const acquireHistoryLock = async () => true;
const releaseHistoryLock = async () => {};

// 인덱스 = 메타 정보만 ({id, ownerUsername, ownerName, name, date, timestamp, sizeMm, labelPos, cardCount, thumbnails})
// 본문 = 카드 배열 + 설정
const summarizeForIndex = (snapshot) => ({
  id: snapshot.id,
  name: snapshot.name,
  date: snapshot.date,
  timestamp: snapshot.timestamp,
  ownerUsername: snapshot.ownerUsername,
  ownerName: snapshot.ownerName,
  sizeMm: snapshot.sizeMm,
  labelPos: snapshot.labelPos,
  fontId: snapshot.fontId,
  labelSize: snapshot.labelSize,
  cardCount: snapshot.cards?.length || 0,
  // 미리보기용 썸네일 (최대 4장만, 인덱스 가볍게 유지)
  thumbnails: (snapshot.cards || []).slice(0, 4).map(c => c.image).filter(Boolean),
});

// ─────────────────────────────────────────────────────────────
// 히스토리 저장 모델 (A방식 · aac_data)
//   key   = 'aac_history_item:<id>'
//   value = JSON { id, title, cards, sizeMm, labelPos, fontId, labelSize,
//                  categoryId, ownerName, createdAt, timestamp }
//   RLS가 본인(user_id) 것만 반환 → 별도 인덱스 키/owner 필터 불필요
//   관리자가 특정 선생님 것을 볼 때만 admin_get_aac_data(target) 사용
// ─────────────────────────────────────────────────────────────
const HISTORY_INDEX_PREFIX = 'aac_history_index:';
const HISTORY_KEY = (id) => `${HISTORY_ITEM_PREFIX}${id}`;
const HISTORY_IDX_KEY = (id) => `${HISTORY_INDEX_PREFIX}${id}`;

// 인덱스 payload(메타+썸네일)에서 UI stub 생성 — 전체 카드 없이 가벼움
const indexRowToStub = (key, value) => {
  let d = {};
  try { d = JSON.parse(value) || {}; } catch (e) { d = {}; }
  const id = d.id || key.slice(HISTORY_INDEX_PREFIX.length);
  const thumbs = Array.isArray(d.thumbnails) ? d.thumbnails.filter(Boolean) : [];
  return {
    id,
    ownerUsername: d.ownerUsername || '',
    ownerName: d.ownerName || '',
    title: d.title || d.name || '',
    name: d.title || d.name || '',
    date: d.createdAt || d.date || '',
    timestamp: d.timestamp || (d.createdAt ? new Date(d.createdAt).getTime() : 0),
    cardCount: d.cardCount != null ? d.cardCount : thumbs.length,
    sizeMm: d.sizeMm,
    labelPos: d.labelPos,
    fontId: d.fontId,
    labelSize: d.labelSize,
    categoryId: d.categoryId,
    thumbnails: thumbs,
    cards: thumbs.length ? [{ image: thumbs[0], label: '' }] : [],
    _isStub: true,
  };
};

// 인덱스 로드 (썸네일 stub). 인덱스 행(aac_history_index:)만 읽어 가벼움.
//  - 일반 선생님: 본인 것만 (RLS)
//  - 관리자: 모든 선생님의 인덱스를 admin_get_aac_data 로 수집 (owner별 폴더뷰용)
//  - auth._adminTargetId: 특정 선생님 하나만 (관리자 대리 조회)
const loadHistoryIndex = async (auth) => {
  if (!auth) return [];

  // 관리자: 전체 선생님 순회 수집
  if (auth.role === 'admin' && !auth._adminTargetId) {
    const users = await adminListUsers();
    const teachers = users || [];
    const collected = [];
    for (const t of teachers) {
      try {
        const rows = await adminGetAacData(t.user_id);
        const ownerLabel = t.email || '';
        const ownerName = t.display_name || (t.email ? t.email.split('@')[0] : '');
        (rows || [])
          .filter(r => r.key && r.key.startsWith(HISTORY_INDEX_PREFIX))
          .forEach(r => {
            const stub = indexRowToStub(r.key, r.value);
            stub.ownerUsername = ownerLabel; // 폴더 그룹핑 키(계정 기준)
            stub.ownerName = stub.ownerName || ownerName;
            stub._ownerId = t.user_id; // 본문 로드 시 admin_get_aac_data 대상
            collected.push(stub);
          });
      } catch (e) { /* 개별 선생님 실패는 건너뜀 */ }
    }
    return collected.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  }

  // 특정 선생님 하나만 (관리자 대리 조회) 또는 일반 선생님 본인 것
  let rows = [];
  if (auth._adminTargetId) {
    const all = await adminGetAacData(auth._adminTargetId);
    rows = (all || []).filter(r => r.key && r.key.startsWith(HISTORY_INDEX_PREFIX));
  } else {
    const res = await dataList(HISTORY_INDEX_PREFIX);
    rows = res.rows || [];
  }
  return rows
    .map(r => indexRowToStub(r.key, r.value))
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
};

// 특정 묶음 본문 로드 (전체 카드) — 본문 행(aac_history_item:)만.
//  ownerId 지정(관리자가 특정 선생님 카드 열람) 시 admin_get_aac_data 로 조회
const loadHistoryItem = async (id, auth, ownerId) => {
  if (!auth) return null;
  let value = null;
  const targetId = ownerId || auth._adminTargetId;
  if (targetId && auth.role === 'admin') {
    const all = await adminGetAacData(targetId);
    const hit = (all || []).find(r => r.key === HISTORY_KEY(id));
    value = hit?.value || null;
  } else {
    const row = await dataGet(HISTORY_KEY(id));
    value = row?.value || null;
  }
  if (!value) { devWarn('getBundle 실패: 없음', id); return null; }
  try {
    const d = JSON.parse(value) || {};
    return { cards: d.cards || [] };
  } catch (e) { return { cards: [] }; }
};

// 묶음 추가/저장 (upsert) — 인덱스 행 + 본문 행 2개로 분리 저장
const addHistoryItem = async (snapshot, auth) => {
  if (!auth) return;
  if (auth._adminTargetId) return; // 관리자 대리 조회 모드에선 저장 안 함
  const now = new Date();
  const cards = snapshot.cards || [];
  const meta = {
    id: snapshot.id,
    title: snapshot.title || snapshot.name || '',
    sizeMm: snapshot.sizeMm,
    labelPos: snapshot.labelPos,
    fontId: snapshot.fontId,
    labelSize: snapshot.labelSize,
    categoryId: snapshot.categoryId,
    ownerUsername: auth.email || '',
    ownerName: auth.name || '',
    cardCount: cards.length,
    // 썸네일 최대 4장 (목록 미리보기용)
    thumbnails: cards.slice(0, 4).map(c => c.image).filter(Boolean),
    createdAt: snapshot.date || now.toISOString(),
    timestamp: snapshot.timestamp || now.getTime(),
  };
  // 본문: 전체 카드
  const body = { id: snapshot.id, cards };
  const r1 = await dataSet(HISTORY_KEY(snapshot.id), JSON.stringify(body));
  const r2 = await dataSet(HISTORY_IDX_KEY(snapshot.id), JSON.stringify(meta));
  if (!r1 || !r2) devWarn('saveBundle 실패:', snapshot.id);
};

// 묶음 삭제 — 인덱스 행 + 본문 행 둘 다 제거
const deleteHistoryItem = async (id, auth) => {
  if (!auth || auth._adminTargetId) return;
  const r1 = await dataDelete(HISTORY_KEY(id));
  const r2 = await dataDelete(HISTORY_IDX_KEY(id));
  if (!r1 && !r2) devWarn('deleteBundle 실패:', id);
};

// 묶음 메타 업데이트 (이름/카테고리 변경) — 인덱스 행만 갱신 (본문 카드는 그대로)
const updateHistoryMeta = async (id, updates, auth) => {
  if (!auth || auth._adminTargetId) return;
  const row = await dataGet(HISTORY_IDX_KEY(id));
  if (!row?.value) { devWarn('updateMeta: 인덱스 조회 실패'); return; }
  let d = {};
  try { d = JSON.parse(row.value) || {}; } catch (e) { return; }
  if (updates.title !== undefined) d.title = updates.title;
  else if (updates.name !== undefined) d.title = updates.name;
  if (updates.categoryId !== undefined) d.categoryId = updates.categoryId;
  const r = await dataSet(HISTORY_IDX_KEY(id), JSON.stringify(d));
  if (!r) devWarn('updateMeta 실패:', id);
};

// 묶음 순서 변경 - timestamp 기준 정렬. UI 즉시 반영만 (재저장 불필요).
const moveHistoryToTop = async (id, newDate, newTimestamp, auth) => {
  devLog('moveHistoryToTop: 클라이언트 UI 정렬만 처리');
};

// 전체 비우기 (본인 것만) — 인덱스+본문 행 모두 제거
const clearHistory = async (ownerFilter, auth) => {
  if (!auth || auth._adminTargetId) return;
  const idxRes = await dataList(HISTORY_INDEX_PREFIX);
  const itemRes = await dataList(HISTORY_ITEM_PREFIX);
  const keys = [...(idxRes.rows || []), ...(itemRes.rows || [])].map(r => r.key);
  await Promise.all(keys.map(k => dataDelete(k).catch(() => {})));
};

// ───── 라이브러리(영구 보관) 저장소 ─────
// 카드 1장 = aac_data 한 행(aac_libcard:{cardId}). 값이 작아 크기 초과 없음.
// 각 값 = JSON { id, image, originalImage, label, categoryId }

// 카드 한 장 저장. 성공하면 true, 실패하면 false 반환 (호출부에서 사용자 알림).
const saveLibraryCard = async (card) => {
  const body = {
    id: card.id,
    image: card.image,
    originalImage: card.originalImage || null,
    label: card.label || '',
    categoryId: card.categoryId || null,
  };
  const r = await dataSet(LIBCARD_KEY(card.id), JSON.stringify(body));
  return !!r;
};

// 여러 장 저장. { okCount, failCount, saved } 반환. saved=저장 성공한 카드 배열.
const saveLibraryCards = async (cards) => {
  let okCount = 0, failCount = 0;
  const saved = [];
  for (const c of (cards || [])) {
    const ok = await saveLibraryCard(c).catch(() => false);
    if (ok) { okCount++; saved.push(c); } else failCount++;
  }
  return { okCount, failCount, saved };
};

// 카드 한 장 삭제
const deleteLibraryCard = async (cardId) => {
  return dataDelete(LIBCARD_KEY(cardId)).catch(() => null);
};

// 전체 라이브러리 로드 → { [categoryId or '__none__']: cards[] } 맵
// 신규(카드 단위) + 구버전(카테고리 통째) 둘 다 읽어 합침 (호환).
const loadLibraryAll = async () => {
  const map = {}; // { catKey: cards[] }
  let hadError = false;
  const push = (catKey, card) => {
    if (!map[catKey]) map[catKey] = [];
    map[catKey].push(card);
  };
  try {
    // 신규: 카드 단위 행
    const cardRes = await dataList(LIBCARD_PREFIX);
    if (cardRes._error) hadError = true;
    for (const r of (cardRes.rows || [])) {
      try {
        const c = JSON.parse(r.value);
        if (c && c.image) push(c.categoryId || LIBRARY_NONE, c);
      } catch {}
    }
  } catch (e) { devWarn('라이브러리(카드) 로드 실패:', e); hadError = true; }
  try {
    // 구버전: 카테고리 통째 행 (있으면 흡수)
    const oldRes = await dataList(LIBRARY_PREFIX);
    for (const r of (oldRes.rows || [])) {
      const catKey = r.key.slice(LIBRARY_PREFIX.length);
      try {
        const arr = JSON.parse(r.value);
        if (Array.isArray(arr)) arr.forEach(c => { if (c && c.image) push(catKey, c); });
      } catch {}
    }
  } catch {}
  return { map, hadError };
};

// 라이브러리에서 카테고리 하나의 카드 전부 삭제 (카테고리 자체를 지울 때)
const deleteLibraryCategoryCards = async (cards) => {
  await Promise.all((cards || []).map(c => deleteLibraryCard(c.id)));
};

// 구버전(카테고리 통째 행)을 신규(카드 1장=1행)로 이전.
// 구버전 행이 있으면: 각 카드를 신규 키로 저장 → 구버전 행 삭제. 이전한 게 있으면 true 반환.
const migrateLegacyLibrary = async () => {
  let migrated = false;
  try {
    const oldRes = await dataList(LIBRARY_PREFIX);
    for (const r of (oldRes.rows || [])) {
      const catKey = r.key.slice(LIBRARY_PREFIX.length); // categoryId 또는 __none__
      let arr = [];
      try { arr = JSON.parse(r.value); } catch { arr = []; }
      if (!Array.isArray(arr)) arr = [];
      const categoryId = (catKey === LIBRARY_NONE) ? null : catKey;
      // 각 카드를 신규 카드 키로 저장
      for (const c of arr) {
        if (!c || !c.image) continue;
        const card = {
          id: c.id || `lib_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          image: c.image,
          originalImage: c.originalImage || null,
          label: c.label || '',
          categoryId,
        };
        await saveLibraryCard(card).catch(() => {});
      }
      // 구버전 통째 행 삭제
      await dataDelete(r.key).catch(() => {});
      migrated = true;
    }
  } catch (e) { devWarn('라이브러리 이전 실패:', e); }
  return migrated;
};



// 미리보기/iframe 환경에서 confirm/alert이 차단되는 경우 대비 안전 래퍼
// sandbox iframe에서는 confirm()이 에러도 안 내고 undefined를 반환하며 무시됨
// 그래서 결과가 undefined면 "차단된 환경"으로 간주하고 true(확인) 반환
const safeConfirm = (msg) => {
  try {
    const result = window.confirm(msg);
    // sandbox iframe에서 confirm이 무시되면 undefined 반환됨
    if (result === undefined) {
      devWarn('confirm 차단됨 (sandbox), 기본 동작 진행:', msg);
      return true;
    }
    return result;
  } catch (e) {
    devWarn('confirm 차단됨, 기본 동작 진행:', msg);
    return true;
  }
};

const safeAlert = (msg) => {
  // 1) 일반 alert 시도 (배포 환경)
  try {
    window.alert(msg);
    return;
  } catch (e) {
    devWarn('alert 차단됨:', msg);
  }
  // 2) sandbox 환경이라 alert 차단 - 화면 내 toast로 표시
  try {
    const existing = document.getElementById('__safe_alert_toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = '__safe_alert_toast';
    toast.style.cssText = `
      position: fixed; top: 80px; left: 50%; transform: translateX(-50%);
      background: rgba(28, 25, 23, 0.95); color: white;
      padding: 12px 20px; border-radius: 12px;
      font-size: 13px; font-weight: 500; z-index: 9999;
      max-width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      white-space: pre-line; text-align: center;
      font-family: "Pretendard", "Noto Sans KR", sans-serif;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  } catch (e) {
    devWarn('toast 표시 실패:', e);
  }
};

const safePrompt = (msg, defaultVal = '') => {
  try {
    const result = window.prompt(msg, defaultVal);
    if (result === undefined) {
      // sandbox에서 차단됨 - 기본값 반환 (아무것도 안 함과 같음)
      devWarn('prompt 차단됨 (sandbox):', msg);
      return null;
    }
    return result;
  } catch (e) {
    devWarn('prompt 차단됨:', msg);
    return null;
  }
};

// (A방식: 비밀번호 해싱/하드코딩 관리자 계정 제거됨 — Supabase Auth가 인증 전담)

// ============================================================

const SIZE_OPTIONS = [
  { mm: 50, label: '50mm', desc: '큰 카드' },
  { mm: 45, label: '45mm', desc: '표준' },
  { mm: 40, label: '40mm', desc: '작은 카드' },
  { mm: 30, label: '30mm', desc: '미니' },
];

const LABEL_POS = [
  { id: 'bottom', label: '아래' },
  { id: 'top', label: '위' },
  { id: 'inside-bottom', label: '내부 하단' },
  { id: 'none', label: '없음' },
];

const FONT_OPTIONS = [
  { id: 'sans', label: '고딕', css: '"Pretendard", "Noto Sans KR", sans-serif' },
  { id: 'serif', label: '명조', css: '"Noto Serif KR", serif' },
  { id: 'round', label: '둥근', css: '"Jua", "Pretendard", sans-serif' },
];

const MM_TO_PX = 3.78; // 1mm ≈ 3.78px (96dpi 기준)

// A4 크기 (mm)
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 10;
const HEADER_HEIGHT_MM = 7; // 페이지 상단 헤더 영역 ('검단ABA 언어행동연구소 · N/M' 텍스트 + 아래 여백, 안전 마진 포함)

// 고유 ID 생성
let _idCounter = 0;
const newId = () => `card_${Date.now()}_${++_idCounter}`;

// ─────────────────────────────────────────────────────────────
// 이미지를 정사각형으로 자르기 (Canvas)
// ─────────────────────────────────────────────────────────────
const cropToSquare = (dataUrl, outputSize = 400) => {
  return new Promise((resolve, reject) => {
    // 입력 검증: 빈 문자열이나 잘못된 타입이면 즉시 실패
    if (!dataUrl || typeof dataUrl !== 'string') {
      reject(new Error('이미지 데이터가 비어있습니다'));
      return;
    }
    const img = new Image();
    let settled = false;
    const settle = (fn, val) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(val);
    };
    // 손상된 파일에서 onload/onerror 둘 다 안 불릴 가능성 - 10초 타임아웃
    const timer = setTimeout(() => {
      settle(reject, new Error('이미지 처리 시간 초과'));
    }, 10000);
    img.onload = () => {
      try {
        const size = Math.min(img.width, img.height);
        // 0×0 이미지(손상된 SVG 등) 거부
        if (size <= 0) {
          settle(reject, new Error('이미지 크기가 0이거나 손상된 파일입니다'));
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = outputSize;
        canvas.height = outputSize;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outputSize, outputSize);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, outputSize, outputSize);
        // JPEG 0.82로 압축 - 화질 충분, 용량 약 절반
        settle(resolve, canvas.toDataURL('image/jpeg', 0.82));
      } catch (err) {
        settle(reject, err);
      }
    };
    img.onerror = () => settle(reject, new Error('이미지 디코딩 실패 - 손상되었거나 지원하지 않는 형식'));
    img.src = dataUrl;
  });
};

// 원본 이미지도 적당히 축소 (편집용으로만 사용, 너무 클 필요 없음)
const downscaleImage = (dataUrl, maxSide = 800, quality = 0.85) => {
  return new Promise((resolve, reject) => {
    if (!dataUrl || typeof dataUrl !== 'string') {
      reject(new Error('이미지 데이터가 비어있습니다'));
      return;
    }
    const img = new Image();
    let settled = false;
    const settle = (fn, val) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(val);
    };
    const timer = setTimeout(() => {
      settle(reject, new Error('이미지 처리 시간 초과'));
    }, 10000);
    img.onload = () => {
      try {
        let w = img.width;
        let h = img.height;
        if (w <= 0 || h <= 0) {
          settle(reject, new Error('이미지 크기가 0이거나 손상된 파일입니다'));
          return;
        }
        // 큰 변을 maxSide로 맞춤 (작은 이미지는 그대로)
        if (w > maxSide || h > maxSide) {
          if (w > h) {
            h = Math.round(h * (maxSide / w));
            w = maxSide;
          } else {
            w = Math.round(w * (maxSide / h));
            h = maxSide;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        // ⚠️ JPEG는 투명도 지원 안 함 - 투명 배경은 검정으로 변하므로 흰색으로 먼저 채움
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        settle(resolve, canvas.toDataURL('image/jpeg', quality));
      } catch (err) {
        settle(reject, err);
      }
    };
    img.onerror = () => settle(reject, new Error('이미지 디코딩 실패 - 손상되었거나 지원하지 않는 형식'));
    img.src = dataUrl;
  });
};

// ─────────────────────────────────────────────────────────────
// localStorage quota 회복: 다른 사용자의 오래된 draft만 정리
// ─────────────────────────────────────────────────────────────
// 절대 건드리지 않는 것: 본인 draft, 히스토리 본문(aac_history_item:*),
//                     히스토리 인덱스, 카테고리, 사용자 DB, 인증 세션
// 같은 기기를 여러 BCBA가 공유하는 경우, 다른 사람 작업 중 임시 데이터만 정리됨
// draft는 어차피 새로고침 보호용 임시 데이터이지 영구 저장이 아니므로 안전
const cleanupOldDrafts = (currentUsername) => {
  let cleanedCount = 0;
  try {
    const targetKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;
      // 다른 사용자의 draft만 대상 (본인 것은 제외)
      if (k.startsWith(DRAFT_KEY_PREFIX) && k !== `${DRAFT_KEY_PREFIX}${currentUsername}`) {
        targetKeys.push(k);
      }
    }
    for (const k of targetKeys) {
      try {
        localStorage.removeItem(k);
        cleanedCount++;
      } catch {
        // 개별 키 삭제 실패는 무시 (다음 키 계속 시도)
      }
    }
  } catch {
    // localStorage 접근 자체가 차단되면 정리 못 함 - 호출자에서 처리
  }
  return cleanedCount;
};

// ─────────────────────────────────────────────────────────────
// 카드 한 장 (편집용)
// ─────────────────────────────────────────────────────────────
// 카드 한 장 컴포넌트 - React.memo로 불필요한 리렌더링 방지
// 카드 1장 라벨 입력 시 다른 카드들이 리렌더링되지 않게 함
const CardEditor = React.memo(({ card, onUpdate, onDelete, onDuplicate, onEditImage, sizeMm, labelPos, font, labelSize, categories, isDragging, onDragStart, onDragOver, onDragEnd, onDrop, dragOverIndex, index }) => {
  const sizePx = sizeMm * MM_TO_PX * 1.4; // 편집 화면에서는 좀 더 크게
  const showLabel = labelPos !== 'none';
  const labelInside = labelPos === 'inside-bottom';

  const rotation = card.rotation || 0;
  const flipH = card.flipH ? -1 : 1;
  const imgTransform = `rotate(${rotation}deg) scaleX(${flipH})`;

  const rotateRight = () => onUpdate(card.id, { ...card, rotation: (rotation + 90) % 360 });
  const flip = () => onUpdate(card.id, { ...card, flipH: !card.flipH });

  // 카테고리 색상
  const cat = categories?.find(c => c.id === card.categoryId);
  // 카테고리가 있으면 테두리도 그 색으로 (드래그/오버 상태가 아닐 때만)
  const borderStyle = cat && !isDragging && dragOverIndex !== index
    ? { borderColor: cat.color + '60' } // 60 = 약 38% 투명
    : undefined;

  // draggable은 외부 컨테이너에 두지 않고, 핸들에만 둠
  // 드롭 영역은 카드 전체
  return (
    <div
      onDragOver={(e) => onDragOver?.(e, index)}
      onDrop={(e) => onDrop?.(e, index)}
      onDragEnd={onDragEnd}
      style={borderStyle}
      className={`group relative bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
        isDragging
          ? 'border-amber-400 opacity-50 scale-95'
          : dragOverIndex === index
            ? 'border-amber-500 ring-2 ring-amber-200 shadow-lg'
            : cat
              ? 'hover:shadow-lg'
              : 'border-stone-200 hover:border-stone-300 hover:shadow-lg'
      }`}
    >
      {/* 카테고리 색 띠 (좀 더 두껍게) */}
      {cat && (
        <div className="h-1.5 w-full" style={{ backgroundColor: cat.color }} />
      )}

      {/* 드래그 핸들 (좌측 상단) - 이 영역에서만 드래그 시작 */}
      <div
        draggable
        onDragStart={(e) => onDragStart?.(e, index)}
        className="hidden sm:block absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        style={{ cursor: 'grab' }}
        title="드래그해서 순서 변경"
      >
        <div className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm">
          <GripVertical className="w-3.5 h-3.5 text-stone-500" />
        </div>
      </div>

      {/* 카드 미리보기 */}
      <div className="p-4 pb-3 flex flex-col items-center">
        <div
          className="relative bg-stone-50 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
        >
          {card.image ? (
            <img
              src={card.image}
              alt={card.label || ''}
              className="w-full h-full object-cover"
              style={{ transform: imgTransform }}
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-stone-300" strokeWidth={1.5} />
          )}

          {/* 내부 라벨 */}
          {showLabel && labelInside && card.label && (
            <div
              className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm text-center py-1 px-1"
              style={{ fontFamily: font.css, fontSize: `${labelSize}px`, fontWeight: 600 }}
            >
              {card.label}
            </div>
          )}

          {/* 회전/뒤집기/편집 버튼 (이미지 위에 hover시) */}
          {card.image && (
            <div className="absolute bottom-1 left-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-1">
              <button
                onClick={rotateRight}
                className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm"
                title="90도 회전"
                aria-label="이미지 90도 회전"
              >
                <RotateCw className="w-3 h-3 text-stone-600" />
              </button>
              <button
                onClick={flip}
                className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm"
                title="좌우 반전"
                aria-label="이미지 좌우 반전"
              >
                <FlipHorizontal className="w-3 h-3 text-stone-600" />
              </button>
              {onEditImage && (
                <button
                  onClick={() => onEditImage(card)}
                  className="w-6 h-6 rounded-md bg-white/95 border border-stone-200 hover:bg-amber-50 flex items-center justify-center shadow-sm"
                  title="이미지 편집 (자르기/밝기/대비)"
                  aria-label="이미지 편집 (자르기, 밝기, 대비 조절)"
                >
                  <Crop className="w-3 h-3 text-stone-600" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* 외부 라벨 (카드 위/아래) */}
        {showLabel && !labelInside && (
          <div
            className={`text-center px-2 mt-2 ${labelPos === 'top' ? 'order-first mb-2 mt-0' : ''}`}
            style={{ fontFamily: font.css, fontSize: `${labelSize}px`, fontWeight: 600, minHeight: `${labelSize + 4}px`, color: '#1c1917' }}
          >
            {card.label || <span className="text-stone-300 font-normal">라벨 없음</span>}
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-amber-300 transition">
          <Type className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={card.label}
            onChange={(e) => onUpdate(card.id, { ...card, label: e.target.value })}
            placeholder="글자 입력..."
            className="flex-1 bg-transparent text-base font-medium outline-none text-stone-900 placeholder-stone-400 min-w-0"
            maxLength={20}
            style={{ fontFamily: font?.css }}
          />
        </div>

        {/* 카테고리 선택 */}
        {categories && categories.length > 0 && (
          <select
            value={card.categoryId || ''}
            onChange={(e) => onUpdate(card.id, { ...card, categoryId: e.target.value || null })}
            className="mt-2 w-full text-xs bg-stone-50 border border-stone-200 rounded-md px-2 py-1.5 outline-none focus:border-amber-400 cursor-pointer"
            style={cat ? { borderLeftColor: cat.color, borderLeftWidth: '4px' } : {}}
          >
            <option value="">카테고리 없음</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        )}
      </div>

      {/* 삭제/복제 버튼 */}
      <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={() => onDuplicate(card.id)}
          className="w-7 h-7 rounded-md bg-white/95 border border-stone-200 hover:bg-stone-50 flex items-center justify-center shadow-sm"
          title="복제"
          aria-label="카드 복제"
        >
          <Copy className="w-3.5 h-3.5 text-stone-600" />
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="w-7 h-7 rounded-md bg-white/95 border border-stone-200 hover:bg-red-50 hover:border-red-200 flex items-center justify-center shadow-sm"
          title="삭제"
          aria-label="카드 삭제"
        >
          <X className="w-3.5 h-3.5 text-stone-600 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// PDF 페이지 미리보기 (인쇄용)
// ─────────────────────────────────────────────────────────────
const PrintPreview = ({ cards, sizeMm, labelPos, font, labelSize, gap, showCutLines, cutLineWidth, cutLineStyle, cutLineColor, cardRadius = 0, safetyMargin = 0, doubleSided = false, backDesign = 'label', backColor = '#fef3c7', logoUrl = '' }) => {
  // A4에 들어가는 카드 수 계산 (코팅 여백 포함)
  const cardWithLabelMm = labelPos === 'none' || labelPos === 'inside-bottom'
    ? sizeMm
    : sizeMm + (labelSize / MM_TO_PX) + 2;

  const cardWidthWithMargin = sizeMm + safetyMargin * 2;
  const cardHeightWithMargin = cardWithLabelMm + safetyMargin * 2;

  const usableWidthMm = A4_WIDTH_MM - PAGE_MARGIN_MM * 2;
  // 헤더 영역('검단ABA · N/M')만큼 빼야 카드가 페이지 경계 안 넘김
  const usableHeightMm = A4_HEIGHT_MM - PAGE_MARGIN_MM * 2 - HEADER_HEIGHT_MM;
  const colsPerPage = Math.max(1, Math.floor((usableWidthMm + gap) / (cardWidthWithMargin + gap)));
  const rowsPerPage = Math.max(1, Math.floor((usableHeightMm + gap) / (cardHeightWithMargin + gap)));
  const cardsPerPage = colsPerPage * rowsPerPage;

  // 페이지로 나누기 (앞면)
  const frontPages = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    frontPages.push(cards.slice(i, i + cardsPerPage));
  }
  if (frontPages.length === 0) frontPages.push([]);

  // 양면 인쇄: 앞면 페이지마다 뒷면 페이지 생성 (좌우 반전해서 정렬)
  // 종이를 짧은 쪽으로 뒤집어 다시 넣었을 때 카드 위치가 맞도록 각 행을 좌우 반전
  const allPages = [];
  if (doubleSided) {
    frontPages.forEach((pageCards) => {
      allPages.push({ cards: pageCards, isBack: false });
      // 뒷면: 같은 페이지 카드들을 좌우 반전 정렬
      // 한 줄씩 분리해서 reverse한 후 다시 합침
      const backOrdered = [];
      for (let r = 0; r < rowsPerPage; r++) {
        const rowCards = pageCards.slice(r * colsPerPage, (r + 1) * colsPerPage);
        // 빈 자리는 빈 카드로 채워서 줄 끝을 정렬
        while (rowCards.length < colsPerPage) {
          rowCards.push({ id: `empty_${r}_${rowCards.length}`, image: null, label: '' });
        }
        backOrdered.push(...rowCards.reverse());
      }
      allPages.push({ cards: backOrdered, isBack: true });
    });
  } else {
    frontPages.forEach((pageCards) => allPages.push({ cards: pageCards, isBack: false }));
  }

  return (
    <div className="space-y-6">
      {allPages.map((page, pageIdx) => (
        <PrintablePage
          key={pageIdx}
          pageNum={pageIdx + 1}
          totalPages={allPages.length}
          cards={page.cards}
          cols={colsPerPage}
          sizeMm={sizeMm}
          labelPos={labelPos}
          font={font}
          labelSize={labelSize}
          gap={gap}
          showCutLines={showCutLines}
          cutLineWidth={cutLineWidth}
          cutLineStyle={cutLineStyle}
          cutLineColor={cutLineColor}
          cardRadius={cardRadius}
          safetyMargin={safetyMargin}
          isBack={page.isBack}
          backDesign={backDesign}
          backColor={backColor}
          logoUrl={logoUrl}
        />
      ))}
    </div>
  );
};

const PrintablePage = ({ pageNum, totalPages, cards, cols, sizeMm, labelPos, font, labelSize, gap, showCutLines, cutLineWidth, cutLineStyle, cutLineColor, cardRadius = 0, safetyMargin = 0, isBack = false, backDesign = 'label', backColor = '#fef3c7', logoUrl = '' }) => {
  return (
    <div className="bg-white shadow-md mx-auto print:shadow-none print:m-0" data-print-page="true"
         style={{
           width: `${A4_WIDTH_MM}mm`,
           height: `${A4_HEIGHT_MM}mm`,
           padding: `${PAGE_MARGIN_MM}mm`,
           boxSizing: 'border-box', // padding 포함 정확히 A4 297mm 유지
           overflow: 'hidden',       // 만에 하나 카드가 넘쳐도 다음 페이지로 흘리지 않음
         }}>
      <div className="text-[8px] text-stone-400 mb-2 print:text-stone-300 flex justify-between" style={{ fontFamily: font.css }}>
        <span>검단ABA 언어행동연구소{isBack ? ' · 뒷면' : ''}</span>
        <span>{pageNum} / {totalPages}</span>
      </div>

      <div className="grid" style={{
        gridTemplateColumns: `repeat(${cols}, ${sizeMm + safetyMargin * 2}mm)`,
        gap: `${gap}mm`,
        justifyContent: 'flex-start',
      }}>
        {cards.map((card) => (
          <PrintCard
            key={card.id}
            card={card}
            sizeMm={sizeMm}
            labelPos={labelPos}
            font={font}
            labelSize={labelSize}
            showCutLines={showCutLines}
            cutLineWidth={cutLineWidth}
            cutLineStyle={cutLineStyle}
            cutLineColor={cutLineColor}
            cardRadius={cardRadius}
            safetyMargin={safetyMargin}
            isBack={isBack}
            backDesign={backDesign}
            backColor={backColor}
            logoUrl={logoUrl}
          />
        ))}
      </div>
    </div>
  );
};

const PrintCard = ({ card, sizeMm, labelPos, font, labelSize, showCutLines, cutLineWidth, cutLineStyle, cutLineColor, cardRadius = 0, safetyMargin = 0, isBack = false, backDesign = 'label', backColor = '#fef3c7', logoUrl = '' }) => {
  const showLabel = labelPos !== 'none';
  const labelInside = labelPos === 'inside-bottom';
  // 자르는 선 두께를 mm로 변환 (CSS 명세: 1px ≈ 0.265mm @ 96dpi 기준)
  // px 그대로 두면 600dpi 프린터에서 너무 얇게 출력될 가능성 - mm로 명시해서 인쇄 결과 안정화
  const cutBorder = showCutLines
    ? `${((cutLineWidth || 1) * 0.265).toFixed(3)}mm ${cutLineStyle || 'dashed'} ${cutLineColor || '#cbd5e1'}`
    : 'none';

  // 이미지 회전/뒤집기 transform
  const rotation = card.rotation || 0;
  const flipH = card.flipH ? -1 : 1;
  const imgTransform = `rotate(${rotation}deg) scaleX(${flipH})`;

  // 카드 박스 공통 스타일
  const cardBoxStyle = {
    width: `${sizeMm}mm`,
    height: `${sizeMm}mm`,
    border: cutBorder,
    background: '#fff',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: cardRadius > 0 ? `${cardRadius}mm` : 0,
    boxSizing: 'border-box',
  };
  // 코팅 여백을 위한 wrapper 스타일 (border-box로 카드 자체 크기는 유지)
  const wrapperStyle = {
    width: `${sizeMm + safetyMargin * 2}mm`,
    padding: safetyMargin > 0 ? `${safetyMargin}mm` : 0,
    boxSizing: 'border-box',
  };

  // ───── 뒷면 렌더링 ─────
  if (isBack) {
    let backContent;
    if (backDesign === 'logo') {
      backContent = logoUrl ? (
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '4mm',
          background: '#fafaf9',
        }}>
          <img src={logoUrl} alt="" style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain' }} />
        </div>
      ) : (
        <div style={{ width: '100%', height: '100%', background: '#fafaf9' }} />
      );
    } else if (backDesign === 'solid') {
      backContent = <div style={{ width: '100%', height: '100%', background: backColor }} />;
    } else if (backDesign === 'pattern') {
      // 사선 줄무늬 패턴
      backContent = (
        <div style={{
          width: '100%', height: '100%',
          background: `repeating-linear-gradient(45deg, ${backColor}, ${backColor} 3mm, #fff 3mm, #fff 6mm)`,
        }} />
      );
    } else {
      // 'label' - 글자만 (정답/단서 카드용)
      backContent = (
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '3mm',
          background: '#fff',
        }}>
          <span style={{
            fontFamily: font.css,
            fontSize: `${Math.min(labelSize * 1.8, sizeMm * 2)}px`,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
            color: '#1c1917',
          }}>
            {card.label || ''}
          </span>
        </div>
      );
    }
    return (
      <div style={wrapperStyle}>
        <div style={cardBoxStyle}>
          {backContent}
        </div>
      </div>
    );
  }

  // ───── 앞면 렌더링 (기존 로직 + radius/margin) ─────
  if (labelPos === 'top' && showLabel) {
    return (
      <div style={wrapperStyle}>
        <div style={{
          fontFamily: font.css,
          fontSize: `${labelSize}px`,
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: '1mm',
          minHeight: `${labelSize + 2}px`,
          lineHeight: 1.1,
        }}>
          {card.label || ''}
        </div>
        <div style={cardBoxStyle}>
          {card.image && <img src={card.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: imgTransform }} />}
        </div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={cardBoxStyle}>
        {card.image && <img src={card.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: imgTransform }} />}
        {showLabel && labelInside && card.label && (
          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            background: 'rgba(255,255,255,0.92)',
            textAlign: 'center',
            fontFamily: font.css,
            fontSize: `${labelSize}px`,
            fontWeight: 600,
            padding: '1mm 0.5mm',
            lineHeight: 1.1,
          }}>
            {card.label}
          </div>
        )}
      </div>
      {showLabel && labelPos === 'bottom' && (
        <div style={{
          fontFamily: font.css,
          fontSize: `${labelSize}px`,
          fontWeight: 600,
          textAlign: 'center',
          marginTop: '1mm',
          minHeight: `${labelSize + 2}px`,
          lineHeight: 1.1,
        }}>
          {card.label || ''}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 로그인 화면
// ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      // Supabase Auth 로그인 (이메일+비번). 비번은 Auth가 서버에서 검증.
      const result = await signInWithPassword(email.trim(), password);
      if (result.error || !result.user) {
        setError(result.error || '이메일 또는 비밀번호가 올바르지 않습니다.');
        setLoading(false);
        return;
      }
      const u = result.user;
      const isAdmin = await checkIsAdmin();
      onLogin({
        id: u.id,
        email: u.email,
        role: isAdmin ? 'admin' : 'teacher',
        name: u.user_metadata?.display_name || u.email?.split('@')[0] || u.email,
      });
    } catch (err) {
      setError('로그인 처리 중 오류가 발생했습니다.');
      devError(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-rose-50 flex items-center justify-center p-6"
         style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg p-3 mb-4">
            <img src={LOGO_DATA_URL} alt="검단ABA" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-xl font-bold text-stone-900">검단ABA AAC maker</h1>
          <p className="text-xs text-stone-500 mt-1">언어행동연구소 직원 전용</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-7">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-stone-700" />
            <h2 className="text-sm font-bold text-stone-900">로그인</h2>
          </div>

          <div className="space-y-3">
            {/* 브라우저 자동완성 차단용 미끼 필드 (화면에 보이지 않음) */}
            <input type="text" name="username" tabIndex={-1} aria-hidden="true" autoComplete="username" style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', zIndex: -1 }} />
            <input type="password" name="password" tabIndex={-1} aria-hidden="true" autoComplete="current-password" style={{ position: 'absolute', opacity: 0, height: 0, width: 0, pointerEvents: 'none', zIndex: -1 }} />
            <div>
              <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 block">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                autoFocus
                autoComplete="off"
                inputMode="email"
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 outline-none focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                placeholder="이메일 주소"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 block">비밀번호</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                  autoComplete="new-password"
                  className="w-full px-3 py-2.5 pr-10 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 outline-none focus:bg-white focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                  placeholder="비밀번호"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-sm font-bold rounded-lg shadow-sm transition mt-2"
            >
              {loading ? '확인 중...' : '로그인'}
            </button>
          </div>

          <p className="text-[11px] text-stone-400 text-center mt-5 leading-relaxed">
            계정이 필요하신 분은<br/>관리자에게 문의해주세요
          </p>
        </div>

        {/* 처음 사용 안내 */}
        <div className="mt-4 text-center">
          <p className="text-xs text-stone-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 inline-block leading-relaxed">
            💬 처음 사용하시거나 문제가 있으면<br/>
            <span className="font-semibold">민다혜 선생님께 문의</span>해주세요
          </p>
        </div>

        <div className="mt-6 text-center text-[10px] text-stone-400 leading-relaxed">
          <p className="font-medium text-stone-500">© 검단ABA 언어행동연구소 · 민다혜 (BCBA)</p>
          <p className="mt-1.5">본 자료는 검단ABA언어행동연구소의 지적재산입니다.</p>
          <p>무단 복제·배포·재판매·온라인 게시를 엄격히 금지합니다.</p>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 사용자 관리 (관리자 전용)
// ─────────────────────────────────────────────────────────────
const UserManagement = ({ users, onUpdate, onClose, currentUser }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [resetPwUser, setResetPwUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 컴포넌트 마운트 시 admin_list_users RPC로 사용자 목록 가져오기
  useEffect(() => {
    let cancelled = false;
    const loadUsers = async () => {
      setLoading(true);
      const list = await adminListUsers();
      if (cancelled) return;
      onUpdate(list || []);
      setLoading(false);
    };
    loadUsers();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUser = async () => {
    setError('');
    const em = newUser.email.trim();
    const n = newUser.name.trim() || em.split('@')[0];
    const p = newUser.password;

    if (!em || !p) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }
    if (p.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (users.some(usr => usr.email === em)) {
      setError('이미 등록된 이메일입니다.');
      return;
    }

    const result = await adminCreateUser(em, p, n);
    if (result.error) {
      setError(result.error || '추가 실패');
      return;
    }
    const list = await adminListUsers();
    onUpdate(list || []);
    setNewUser({ email: '', name: '', password: '' });
    setShowAddForm(false);
    safeAlert(`"${n}" 선생님 계정이 추가되었습니다.\n이메일: ${em}\n비밀번호: ${p}\n\n선생님께 안전하게 전달해주세요.`);
  };

  const deleteUser = async (userId, displayName) => {
    if (userId === currentUser.id) {
      safeAlert('자기 자신은 삭제할 수 없습니다.');
      return;
    }
    if (!safeConfirm(`"${displayName}" 계정을 정말 삭제할까요?`)) return;
    const result = await adminDeleteUser(userId);
    if (result.error) {
      safeAlert(result.error || '삭제 실패');
      return;
    }
    const list = await adminListUsers();
    onUpdate(list || []);
  };

  const resetPassword = async (user, newPassword) => {
    if (!newPassword || newPassword.length < 6) {
      safeAlert('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    const result = await adminUpdateUserPassword(user.user_id, newPassword);
    if (result.error) {
      safeAlert(result.error || '비밀번호 변경 실패');
      return;
    }
    const list = await adminListUsers();
    onUpdate(list || []);
    setResetPwUser(null);
    const displayName = user.display_name || user.email;
    safeAlert(`"${displayName}" 선생님의 비밀번호가 변경되었습니다.\n새 비밀번호: ${newPassword}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">선생님 계정 관리</h2>
            <span className="text-xs text-stone-500">({users.length}명)</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 새 계정 추가 */}
          {!showAddForm ? (
            <button
              onClick={() => { setShowAddForm(true); setError(''); }}
              className="w-full py-3 mb-4 border-2 border-dashed border-stone-300 hover:border-amber-400 hover:bg-amber-50 rounded-xl text-sm font-semibold text-stone-600 hover:text-amber-700 transition flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              새 선생님 계정 추가
            </button>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4" />
                새 계정 만들기
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1">이메일</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                    placeholder="teacher@example.com"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1">선생님 이름</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                    placeholder="홍길동"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1">초기 비밀번호</label>
                <input
                  type="text"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                  placeholder="6자 이상 (선생님께 알려줄 비밀번호)"
                />
              </div>
              {error && (
                <div className="text-xs text-red-600 bg-red-50 rounded px-2 py-1.5 mb-2">{error}</div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={addUser}
                  className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
                >
                  추가
                </button>
                <button
                  onClick={() => { setShowAddForm(false); setNewUser({ email: '', name: '', password: '' }); setError(''); }}
                  className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium rounded-lg transition"
                >
                  취소
                </button>
              </div>
            </div>
          )}

          {/* 사용자 목록 */}
          <div className="space-y-2">
            {users.map((u) => {
              const isAdminUser = u.email === 'abageomdan@gmail.com';
              const isMe = u.user_id === currentUser.id;
              const dispName = u.display_name || u.email;
              return (
              <div key={u.user_id} className="bg-stone-50 hover:bg-white rounded-xl p-3 border border-stone-200 transition">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isAdminUser ? 'bg-amber-100' : 'bg-stone-200'}`}>
                      {isAdminUser ? (
                        <Shield className="w-4 h-4 text-amber-700" />
                      ) : (
                        <Users className="w-4 h-4 text-stone-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-stone-900 truncate">{dispName}</p>
                        {isMe && (
                          <span className="text-[9px] font-semibold bg-amber-200 text-amber-800 rounded px-1.5 py-0.5">나</span>
                        )}
                        {isAdminUser && (
                          <span className="text-[9px] font-semibold bg-stone-700 text-white rounded px-1.5 py-0.5">관리자</span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500">{u.email} · 등록 {u.created_at ? u.created_at.slice(0, 10) : '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setResetPwUser(u)}
                      className="px-2.5 py-1.5 bg-white hover:bg-blue-50 border border-stone-200 hover:border-blue-200 text-stone-600 hover:text-blue-600 text-[11px] font-medium rounded transition"
                      title="비밀번호 재설정"
                    >
                      <Lock className="w-3 h-3" />
                    </button>
                    {!isMe && !isAdminUser && (
                      <button
                        onClick={() => deleteUser(u.user_id, dispName)}
                        className="px-2.5 py-1.5 bg-white hover:bg-red-50 border border-stone-200 hover:border-red-200 text-stone-600 hover:text-red-500 text-[11px] font-medium rounded transition"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 비밀번호 재설정 폼 */}
                {resetPwUser?.user_id === u.user_id && (
                  <div className="mt-3 pt-3 border-t border-stone-200">
                    <label className="text-[10px] font-semibold text-stone-600 uppercase block mb-1.5">새 비밀번호</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        autoFocus
                        placeholder="새 비밀번호 입력 (6자 이상)"
                        className="flex-1 px-2.5 py-2 bg-white border border-stone-200 rounded-lg text-xs outline-none focus:border-amber-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') resetPassword(u, e.target.value);
                          if (e.key === 'Escape') setResetPwUser(null);
                        }}
                        id={`pw-input-${u.user_id}`}
                      />
                      <button
                        onClick={() => {
                          const input = document.getElementById(`pw-input-${u.user_id}`);
                          if (input) resetPassword(u, input.value);
                        }}
                        className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
                      >
                        변경
                      </button>
                      <button
                        onClick={() => setResetPwUser(null)}
                        className="px-3 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium rounded-lg transition"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>

        {/* 푸터 안내 */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 text-center rounded-b-2xl">
          💡 새 계정 만들 때 알려드린 비밀번호는 안전한 방법으로 선생님께 전달해주세요
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 카테고리 관리 모달
// ─────────────────────────────────────────────────────────────
const CATEGORY_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#78716c',
];

const CategoryManager = ({ categories, onUpdate, onClose }) => {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(CATEGORY_COLORS[0]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const addCategory = () => {
    const name = newName.trim();
    if (!name) return;
    if (categories.some(c => c.name === name)) {
      safeAlert('같은 이름의 카테고리가 이미 있습니다.');
      return;
    }
    onUpdate([
      ...categories,
      { id: `cat_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, name, color: newColor },
    ]);
    setNewName('');
    setNewColor(CATEGORY_COLORS[(categories.length + 1) % CATEGORY_COLORS.length]);
  };

  const updateCategory = (id, updates) => {
    onUpdate(categories.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCategory = (id) => {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    if (!safeConfirm(`"${cat.name}" 카테고리를 삭제할까요? (이 카테고리의 카드들은 카테고리 없음 상태가 됩니다)`)) return;
    onUpdate(categories.filter(c => c.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">카테고리 관리</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* 새 카테고리 추가 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
            <p className="text-xs font-semibold text-amber-900 mb-2">새 카테고리</p>
            <div className="flex gap-1.5 mb-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                placeholder="예: 동물, 음식, 행동"
                className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs outline-none focus:border-amber-400"
                maxLength={15}
              />
              <button
                onClick={addCategory}
                className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded transition flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />추가
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {CATEGORY_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`w-5 h-5 rounded-full border-2 transition ${
                    newColor === c ? 'border-stone-900 ring-2 ring-stone-300 scale-110' : 'border-white shadow-sm'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* 기존 카테고리 목록 */}
          {categories.length === 0 ? (
            <p className="text-xs text-stone-400 text-center py-8">아직 카테고리가 없습니다</p>
          ) : (
            <div className="space-y-1.5">
              {categories.map((c) => (
                <div key={c.id} className="bg-stone-50 rounded-lg p-2.5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const next = CATEGORY_COLORS[(CATEGORY_COLORS.indexOf(c.color) + 1) % CATEGORY_COLORS.length];
                      updateCategory(c.id, { color: next });
                    }}
                    className="w-7 h-7 rounded-md border-2 border-white shadow-sm flex-shrink-0 hover:scale-110 transition"
                    style={{ backgroundColor: c.color }}
                    title="색깔 바꾸기"
                  />
                  {editingId === c.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && editName.trim()) {
                          updateCategory(c.id, { name: editName.trim() });
                          setEditingId(null);
                        }
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      onBlur={() => {
                        if (editName.trim()) updateCategory(c.id, { name: editName.trim() });
                        setEditingId(null);
                      }}
                      autoFocus
                      className="flex-1 px-2 py-1 text-sm bg-white border border-amber-300 rounded outline-none"
                      maxLength={15}
                    />
                  ) : (
                    <button
                      onClick={() => { setEditingId(c.id); setEditName(c.name); }}
                      className="flex-1 text-left text-sm font-bold text-stone-800 hover:text-amber-700 truncate"
                    >
                      {c.name}
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="p-1.5 hover:bg-red-50 hover:text-red-500 text-stone-500 rounded transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 text-center rounded-b-2xl">
          💡 카테고리는 카드 정리에 도움됩니다. 색깔 동그라미를 누르면 색이 바뀝니다.
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 라이브러리 화면 (영구 보관 카드를 카테고리별로 보고 골라 담기)
// ─────────────────────────────────────────────────────────────
const LibraryView = ({
  library, categories, libraryCatId, setLibraryCatId,
  selected, setSelected, onAddToPrint, onAddImagesClick, onImportClick, onManageCategories, onDeleteCard, onDeleteSelected, onDiagnose, diagResult, cardSearch, setCardSearch,
}) => {
  // 탭 목록: 카테고리들 + 미분류
  const NONE = '__none__';
  const currentKey = libraryCatId || NONE;
  const cardsInCat = library[currentKey] || [];
  const q = (cardSearch || '').trim().toLowerCase();
  // 검색어가 있으면 "모든 카테고리"에서 찾고, 없으면 현재 카테고리만 보여줌
  const allCards = q
    ? Object.entries(library).flatMap(([catKey, arr]) =>
        (arr || []).map(c => ({ ...c, _catKey: catKey })))
    : [];
  const visible = q
    ? allCards.filter(c => (c.label || '').toLowerCase().includes(q))
    : cardsInCat;

  const countOf = (key) => (library[key] || []).length;
  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const selectedCount = selected.size;

  return (
    <div className="flex flex-col h-full">
      {/* 헤더: 카테고리 관리 버튼 */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-stone-500">카테고리를 골라 카드를 보관하고, 인쇄판에 담아 쓰세요</p>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onDiagnose}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
            title="저장 상태 진단"
          >
            🔍 진단
          </button>
          <button
            onClick={onManageCategories}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
          >
            <Settings2 className="w-3.5 h-3.5" /> 카테고리 관리
          </button>
        </div>
      </div>

      {/* 진단 결과 배너 */}
      {diagResult && (
        <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 whitespace-pre-wrap" style={{ fontFamily: 'monospace' }}>
          {diagResult}
        </div>
      )}

      {/* 카테고리 선택 (드롭다운) */}
      <div className="mb-3">
        <select
          value={currentKey}
          onChange={(e) => {
            const v = e.target.value;
            setLibraryCatId(v === NONE ? null : v);
            setCardSearch('');
          }}
          className="w-full px-3 py-2.5 rounded-lg border border-stone-300 bg-white text-sm font-bold text-stone-800 outline-none focus:border-stone-500 transition cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({countOf(cat.id)})
            </option>
          ))}
          <option value={NONE}>미분류 ({countOf(NONE)})</option>
          {/* categories에 없는데 카드가 저장된 키(떠도는 카드) - 안전하게 표시 */}
          {Object.keys(library)
            .filter(k => k !== NONE && !categories.some(c => c.id === k) && (library[k] || []).length > 0)
            .map(k => (
              <option key={k} value={k}>
                (미연결) {(library[k] || []).length}개
              </option>
            ))}
        </select>
      </div>

      {/* 액션 바: 이 카테고리에 카드 추가 / 묶음 불러오기 */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onAddImagesClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" /> 이미지 추가
        </button>
        <button
          onClick={onImportClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold rounded-lg transition"
        >
          <FolderOpen className="w-3.5 h-3.5" /> 묶음 불러오기
        </button>
        <span className="text-[11px] text-stone-400 ml-auto hidden sm:block">
          여기서 추가하면 이 카테고리에 저장돼요
        </span>
      </div>

      {/* 검색 (전체 카테고리에서 찾음) */}
      <div className="mb-3 flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2">
        <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <input
          type="text"
          value={cardSearch}
          onChange={(e) => setCardSearch(e.target.value)}
          placeholder="전체 카테고리에서 검색..."
          className="flex-1 bg-transparent text-sm outline-none text-stone-800"
        />
        {cardSearch && (
          <button onClick={() => setCardSearch('')} className="p-1 hover:bg-stone-100 rounded transition flex-shrink-0">
            <X className="w-3 h-3 text-stone-500" />
          </button>
        )}
      </div>
      {q && (
        <p className="text-[11px] text-stone-500 mb-2 -mt-1">
          전체 카테고리에서 "{cardSearch}" 검색 결과 {visible.length}개
        </p>
      )}

      {/* 카드 격자 */}
      <div className="flex-1 overflow-y-auto pb-24">
        {visible.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <Folder className="w-12 h-12 mx-auto mb-3 text-stone-200" strokeWidth={1.5} />
            <p className="text-sm mb-1">
              {q ? `"${cardSearch}"에 해당하는 카드가 없습니다` : '이 카테고리에 저장된 카드가 없습니다'}
            </p>
            {!q && (
              <button
                onClick={onAddImagesClick}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" /> 이 카테고리에 카드 추가
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {visible.map((card) => {
              const isSel = selected.has(card.id);
              return (
                <div
                  key={card.id}
                  onClick={() => toggle(card.id)}
                  role="button"
                  tabIndex={0}
                  className={`relative rounded-xl overflow-hidden border-2 transition text-left cursor-pointer ${
                    isSel ? 'border-amber-500 ring-2 ring-amber-200' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="aspect-square bg-white">
                    {card.image ? (
                      <img src={card.image} alt={card.label || ''} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  {card.label && (
                    <div className="px-1.5 py-1 text-center text-xs font-semibold text-stone-700 truncate bg-stone-50">
                      {card.label}
                    </div>
                  )}
                  {/* 체크 표시 */}
                  <div className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition ${
                    isSel ? 'bg-amber-500 text-white' : 'bg-white/80 text-stone-300 border border-stone-200'
                  }`}>
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  {/* 삭제 (버튼 중첩 방지 위해 span role=button) */}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => { e.stopPropagation(); onDeleteCard?.(card.id); }}
                    className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-white/80 border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition"
                    title="이 카드 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 하단 담기 바 (선택된 게 있을 때만) */}
      {selectedCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-stone-200 shadow-lg px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSelected(new Set())}
            className="text-xs text-stone-500 hover:text-stone-700 font-medium"
          >
            선택 해제
          </button>
          <div className="flex-1 text-sm font-bold text-stone-800 text-center tabular-nums">
            {selectedCount}장 선택됨
          </div>
          <button
            onClick={onDeleteSelected}
            className="px-4 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-sm font-bold rounded-lg transition flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> 선택 삭제
          </button>
          <button
            onClick={onAddToPrint}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold rounded-lg transition flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" /> 인쇄판에 담기
          </button>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 일괄 라벨 편집 모달
// ─────────────────────────────────────────────────────────────
const BulkLabelEditor = ({ cards, categories, onUpdate, onClose }) => {
  const [edited, setEdited] = useState(cards.map(c => ({ ...c })));

  const updateRow = (idx, key, value) => {
    setEdited(prev => prev.map((c, i) => i === idx ? { ...c, [key]: value } : c));
  };

  const applyAll = () => {
    onUpdate(edited);
    onClose();
  };

  const fillSequence = () => {
    const prefix = safePrompt('번호 앞에 붙일 단어를 입력하세요 (없으면 빈칸):', '');
    if (prefix === null) return;
    setEdited(prev => prev.map((c, i) => ({
      ...c,
      label: prefix ? `${prefix}${i + 1}` : `${i + 1}`,
    })));
  };

  const setAllCategory = (categoryId) => {
    setEdited(prev => prev.map(c => ({ ...c, categoryId: categoryId || null })));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">일괄 라벨 편집</h2>
            <span className="text-xs text-stone-500">({cards.length}장)</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* 일괄 도구 */}
        <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 flex items-center gap-2 flex-wrap">
          <button
            onClick={fillSequence}
            className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-200 text-xs font-semibold rounded-lg transition flex items-center gap-1"
          >
            <Tag className="w-3 h-3" />
            번호 자동 채우기
          </button>
          {categories && categories.length > 0 && (
            <select
              onChange={(e) => { if (e.target.value) setAllCategory(e.target.value); e.target.value = ''; }}
              className="px-3 py-1.5 bg-white border border-stone-200 text-xs font-semibold rounded-lg outline-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>전체 카테고리 일괄 변경...</option>
              <option value="__none__">카테고리 없음</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          )}
          <span className="text-[11px] text-amber-800 ml-auto">💡 Tab 키로 다음 칸 이동</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1.5">
            {edited.map((card, idx) => {
              const cat = categories?.find(c => c.id === card.categoryId);
              return (
                <div key={card.id} className="flex items-center gap-2 bg-stone-50 hover:bg-white rounded-lg p-2 border border-transparent hover:border-stone-200 transition">
                  <span className="text-[10px] font-bold text-stone-400 w-6 text-center flex-shrink-0">{idx + 1}</span>
                  <div className="w-10 h-10 rounded bg-white border border-stone-200 overflow-hidden flex-shrink-0">
                    {card.image ? (
                      <img src={card.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-stone-300" />
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={card.label}
                    onChange={(e) => updateRow(idx, 'label', e.target.value)}
                    placeholder="라벨..."
                    className="flex-1 px-2.5 py-1.5 bg-white border border-stone-200 rounded text-sm outline-none focus:border-amber-400 min-w-0"
                    maxLength={20}
                  />
                  {categories && categories.length > 0 && (
                    <select
                      value={card.categoryId || ''}
                      onChange={(e) => updateRow(idx, 'categoryId', e.target.value || null)}
                      className="text-xs bg-white border border-stone-200 rounded px-2 py-1.5 outline-none cursor-pointer flex-shrink-0"
                      style={cat ? { borderLeftColor: cat.color, borderLeftWidth: '3px' } : {}}
                    >
                      <option value="">없음</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-3 border-t border-stone-200 flex items-center justify-end gap-2 rounded-b-2xl bg-stone-50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-medium rounded-lg transition"
          >
            취소
          </button>
          <button
            onClick={applyAll}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition"
          >
            모두 적용
          </button>
        </div>
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────────────────────
// 이미지 편집 모달 (자르기 + 배경 제거)
// ─────────────────────────────────────────────────────────────
const ImageEditor = ({ card, onSave, onClose }) => {
  const sourceImage = card.originalImage || card.image;
  const [imgDimensions, setImgDimensions] = useState({ w: 0, h: 0 });

  // 자르기 영역 (원본 비율 0~1)
  const [crop, setCrop] = useState({ x: 0, y: 0, size: 1 });
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [dragMode, setDragMode] = useState(null);
  const [dragStart, setDragStart] = useState(null);

  // 도구 모드: 'crop' (자르기) / 'bg' (배경 제거)
  const [tool, setTool] = useState('crop');

  // 배경 제거 - 클릭으로 색 추가 (여러 색 누적 제거 가능)
  const [bgColors, setBgColors] = useState([]); // [{r,g,b}, ...]
  const [bgTolerance, setBgTolerance] = useState(40); // 허용 오차 0~100
  const [bgFeather, setBgFeather] = useState(10); // 경계 부드러움 0~30
  const [history, setHistory] = useState([]); // 색 추가 히스토리 (되돌리기용)

  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const sourceCanvasRef = useRef(null); // 원본 이미지를 그려둔 캔버스 (색 추출용)
  const [processing, setProcessing] = useState(false);

  // 원본 이미지 크기 + 초기 크롭 영역 + 색 추출용 캔버스
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgDimensions({ w: img.naturalWidth, h: img.naturalHeight });
      // 초기 크롭: 짧은 변 기준 정사각형
      const minSide = Math.min(img.naturalWidth, img.naturalHeight);
      if (img.naturalWidth > img.naturalHeight) {
        const xRatio = (img.naturalWidth - minSide) / 2 / img.naturalWidth;
        setCrop({ x: xRatio, y: 0, size: minSide / img.naturalWidth });
      } else {
        const yRatio = (img.naturalHeight - minSide) / 2 / img.naturalHeight;
        setCrop({ x: 0, y: yRatio, size: minSide / img.naturalHeight });
      }
      // 색 추출용 캔버스 (보이지 않음)
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      sourceCanvasRef.current = c;
    };
    img.src = sourceImage;
  }, [sourceImage]);

  // 배경 제거 적용 (캔버스에서)
  const applyBgRemoval = (ctx, w, h) => {
    if (bgColors.length === 0) return;
    const tol = bgTolerance * 2.55; // 0~255
    const featherRange = bgFeather * 2.55; // 부드러움 추가 범위
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      // 등록된 모든 배경색 중 가장 가까운 거리 찾기
      let minDist = Infinity;
      for (const target of bgColors) {
        const dr = r - target.r, dg = g - target.g, db = b - target.b;
        const dist = Math.sqrt(dr*dr + dg*dg + db*db);
        if (dist < minDist) minDist = dist;
      }
      if (minDist < tol) {
        // 완전 제거 (투명)
        data[i+3] = 0;
      } else if (minDist < tol + featherRange) {
        // 경계 영역 - 부드럽게 (반투명)
        const t = (minDist - tol) / featherRange;
        data[i+3] = Math.round(data[i+3] * t);
      }
    }
    ctx.putImageData(imgData, 0, 0);
  };

  // 미리보기 캔버스 렌더링
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imgDimensions.w || !img.complete) return;

    const OUT_SIZE = 400;
    canvas.width = OUT_SIZE;
    canvas.height = OUT_SIZE;
    const ctx = canvas.getContext('2d');
    // 투명 배경을 보이게 하기 위한 체커보드 패턴
    if (bgColors.length > 0) {
      const checker = 16;
      for (let y = 0; y < OUT_SIZE; y += checker) {
        for (let x = 0; x < OUT_SIZE; x += checker) {
          ctx.fillStyle = ((x / checker) + (y / checker)) % 2 === 0 ? '#f5f5f4' : '#e7e5e4';
          ctx.fillRect(x, y, checker, checker);
        }
      }
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, OUT_SIZE, OUT_SIZE);
    }

    // 크롭 영역 계산
    const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
    const cropSize = crop.size * shortSide;
    const cropX = crop.x * imgDimensions.w;
    const cropY = crop.y * imgDimensions.h;

    // 임시 캔버스에 크롭된 이미지 그리기 (배경 제거 처리용)
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = OUT_SIZE;
    tmpCanvas.height = OUT_SIZE;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.drawImage(img, cropX, cropY, cropSize, cropSize, 0, 0, OUT_SIZE, OUT_SIZE);
    if (bgColors.length > 0) {
      applyBgRemoval(tmpCtx, OUT_SIZE, OUT_SIZE);
    }
    ctx.drawImage(tmpCanvas, 0, 0);
  }, [crop, imgDimensions, bgColors, bgTolerance, bgFeather]);

  // 이미지 클릭 → 그 픽셀 색 추출 → 배경색 목록에 추가
  const handleImageClick = (e) => {
    if (tool !== 'bg') return;
    if (!sourceCanvasRef.current || !imgDimensions.w) return;
    // 컨테이너 좌표 → 원본 이미지 좌표
    const rect = containerRef.current.getBoundingClientRect();
    // 이미지가 object-contain이라 실제 표시 영역 계산
    const containerRatio = rect.width / rect.height;
    const imageRatio = imgDimensions.w / imgDimensions.h;
    let displayW, displayH, offsetX, offsetY;
    if (imageRatio > containerRatio) {
      displayW = rect.width;
      displayH = rect.width / imageRatio;
      offsetX = 0;
      offsetY = (rect.height - displayH) / 2;
    } else {
      displayH = rect.height;
      displayW = rect.height * imageRatio;
      offsetX = (rect.width - displayW) / 2;
      offsetY = 0;
    }
    const point = e.touches ? e.touches[0] : e;
    const localX = point.clientX - rect.left - offsetX;
    const localY = point.clientY - rect.top - offsetY;
    if (localX < 0 || localY < 0 || localX > displayW || localY > displayH) return;
    const imgX = Math.floor((localX / displayW) * imgDimensions.w);
    const imgY = Math.floor((localY / displayH) * imgDimensions.h);
    const data = sourceCanvasRef.current.getContext('2d').getImageData(imgX, imgY, 1, 1).data;
    const newColor = { r: data[0], g: data[1], b: data[2] };
    // 비슷한 색이 이미 있으면 추가 안 함
    const exists = bgColors.some(c => {
      const dr = c.r - newColor.r, dg = c.g - newColor.g, db = c.b - newColor.b;
      return Math.sqrt(dr*dr + dg*dg + db*db) < 15;
    });
    if (exists) return;
    setHistory(prev => [...prev, bgColors]);
    setBgColors(prev => [...prev, newColor]);
  };

  // 크롭 드래그 핸들러
  const onCropMouseDown = (e, mode = 'move') => {
    e.stopPropagation();
    e.preventDefault();
    if (!containerRef.current || !imgDimensions.w) return;
    const rect = containerRef.current.getBoundingClientRect();
    setIsDraggingCrop(true);
    setDragMode(mode);
    const point = e.touches ? e.touches[0] : e;
    setDragStart({
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
      crop: { ...crop },
      rectW: rect.width,
      rectH: rect.height,
    });
  };

  const onMouseMove = (e) => {
    if (!isDraggingCrop || !dragStart) return;
    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = point.clientX - rect.left;
    const currentY = point.clientY - rect.top;
    const dx = (currentX - dragStart.x) / dragStart.rectW;
    const dy = (currentY - dragStart.y) / dragStart.rectH;

    if (dragMode === 'move') {
      const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
      const cropPxSize = dragStart.crop.size * shortSide;
      const cropWRatio = cropPxSize / imgDimensions.w;
      const cropHRatio = cropPxSize / imgDimensions.h;
      let newX = Math.max(0, Math.min(dragStart.crop.x + dx, 1 - cropWRatio));
      let newY = Math.max(0, Math.min(dragStart.crop.y + dy, 1 - cropHRatio));
      setCrop({ ...dragStart.crop, x: newX, y: newY });
    } else if (dragMode === 'resize-br') {
      const delta = Math.max(dx, dy);
      let newSize = Math.max(0.1, Math.min(1, dragStart.crop.size + delta));
      const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
      const cropPxSize = newSize * shortSide;
      const cropWRatio = cropPxSize / imgDimensions.w;
      const cropHRatio = cropPxSize / imgDimensions.h;
      let newX = dragStart.crop.x;
      let newY = dragStart.crop.y;
      if (newX + cropWRatio > 1) newX = Math.max(0, 1 - cropWRatio);
      if (newY + cropHRatio > 1) newY = Math.max(0, 1 - cropHRatio);
      setCrop({ x: newX, y: newY, size: newSize });
    }
  };

  const onMouseUp = () => {
    setIsDraggingCrop(false);
    setDragStart(null);
  };

  useEffect(() => {
    if (!isDraggingCrop) return;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onMouseMove, { passive: false });
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDraggingCrop, dragStart]);

  const handleSave = async () => {
    setProcessing(true);
    try {
      const canvas = previewCanvasRef.current;
      if (!canvas) { onClose(); return; }
      // 배경 제거가 있으면 PNG (투명도 유지), 아니면 JPEG
      const mime = bgColors.length > 0 ? 'image/png' : 'image/jpeg';
      const quality = bgColors.length > 0 ? undefined : 0.92;
      const result = canvas.toDataURL(mime, quality);
      onSave({ ...card, image: result });
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    // 크롭 + 배경 제거 모두 초기화
    if (imgDimensions.w >= imgDimensions.h) {
      const xRatio = (imgDimensions.w - imgDimensions.h) / 2 / imgDimensions.w;
      setCrop({ x: xRatio, y: 0, size: imgDimensions.h / imgDimensions.w });
    } else {
      const yRatio = (imgDimensions.h - imgDimensions.w) / 2 / imgDimensions.h;
      setCrop({ x: 0, y: yRatio, size: imgDimensions.w / imgDimensions.h });
    }
    setBgColors([]);
    setHistory([]);
  };

  const restoreOriginal = () => {
    if (!safeConfirm('편집을 모두 취소하고 처음 업로드한 상태로 돌아갈까요?')) return;
    onSave({ ...card, image: card.originalImage || card.image });
  };

  const undoBgColor = () => {
    if (history.length === 0) return;
    setBgColors(history[history.length - 1]);
    setHistory(prev => prev.slice(0, -1));
  };

  // 크롭 박스 표시 스타일
  const cropOverlayStyle = (() => {
    if (!imgDimensions.w) return { display: 'none' };
    const shortSide = Math.min(imgDimensions.w, imgDimensions.h);
    const cropPxSize = crop.size * shortSide;
    return {
      left: `${crop.x * 100}%`,
      top: `${crop.y * 100}%`,
      width: `${(cropPxSize / imgDimensions.w) * 100}%`,
      height: `${(cropPxSize / imgDimensions.h) * 100}%`,
    };
  })();

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-stone-700" />
            <h2 className="text-base font-bold text-stone-900">이미지 편집</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition">
            <X className="w-4 h-4 text-stone-600" />
          </button>
        </div>

        {/* 도구 탭 */}
        <div className="px-4 sm:px-5 pt-3 flex items-center gap-1.5 border-b border-stone-100 pb-3">
          <button
            onClick={() => setTool('crop')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tool === 'crop'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Crop className="w-3.5 h-3.5" />
            자르기
          </button>
          <button
            onClick={() => setTool('bg')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              tool === 'bg'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            배경 제거
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* 좌측: 원본 + 크롭 / 배경 클릭 */}
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
              {tool === 'crop' ? '원본 (드래그로 자르기)' : '원본 (없앨 배경 클릭)'}
            </div>
            <div
              ref={containerRef}
              className={`relative bg-stone-100 rounded-lg overflow-hidden select-none ${tool === 'bg' ? 'cursor-crosshair' : ''}`}
              style={{ aspectRatio: imgDimensions.w ? `${imgDimensions.w} / ${imgDimensions.h}` : '1 / 1' }}
              onClick={tool === 'bg' ? handleImageClick : undefined}
            >
              <img
                ref={imgRef}
                src={sourceImage}
                alt="원본"
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
              {/* 자르기 모드: 크롭 박스 */}
              {tool === 'crop' && (
                <>
                  <div className="absolute inset-0 bg-stone-900/40 pointer-events-none" />
                  <div
                    className="absolute border-2 border-amber-400 cursor-move bg-transparent"
                    style={cropOverlayStyle}
                    onMouseDown={(e) => onCropMouseDown(e, 'move')}
                    onTouchStart={(e) => onCropMouseDown(e, 'move')}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={sourceImage}
                        alt=""
                        className="pointer-events-none absolute"
                        draggable={false}
                        style={{
                          width: `${(1 / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.w)) * 100}%`,
                          height: `${(1 / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.h)) * 100}%`,
                          left: `${-(crop.x / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.w)) * 100}%`,
                          top: `${-(crop.y / (crop.size * Math.min(imgDimensions.w, imgDimensions.h) / imgDimensions.h)) * 100}%`,
                          maxWidth: 'none',
                        }}
                      />
                    </div>
                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 bg-amber-400 border-2 border-white rounded-full cursor-nwse-resize translate-x-1/2 translate-y-1/2"
                      onMouseDown={(e) => onCropMouseDown(e, 'resize-br')}
                      onTouchStart={(e) => onCropMouseDown(e, 'resize-br')}
                    />
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/50" />
                      <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/50" />
                      <div className="absolute top-1/3 left-0 right-0 h-px bg-white/50" />
                      <div className="absolute top-2/3 left-0 right-0 h-px bg-white/50" />
                    </div>
                  </div>
                </>
              )}
            </div>
            <p className="text-[10px] text-stone-500 mt-1 text-center">
              {tool === 'crop'
                ? '박스 안쪽 드래그: 이동 · 우하단 점: 크기 조절'
                : '없앨 배경 색깔을 클릭하세요 · 여러 번 클릭 가능'}
            </p>
          </div>

          {/* 우측: 결과 미리보기 + 컨트롤 */}
          <div>
            <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">미리보기 (실제 카드)</div>
            <div className="bg-stone-100 rounded-lg overflow-hidden aspect-square">
              <canvas ref={previewCanvasRef} className="w-full h-full" />
            </div>

            {/* 배경 제거 모드일 때만 슬라이더 표시 */}
            {tool === 'bg' && (
              <div className="mt-4 space-y-3">
                {/* 선택된 배경색들 */}
                {bgColors.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-stone-600 mb-1.5">선택된 색 ({bgColors.length}개)</div>
                    <div className="flex flex-wrap gap-1 items-center">
                      {bgColors.map((c, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded border-2 border-white shadow-sm"
                          style={{ backgroundColor: `rgb(${c.r},${c.g},${c.b})` }}
                          title={`RGB(${c.r}, ${c.g}, ${c.b})`}
                        />
                      ))}
                      <button
                        onClick={undoBgColor}
                        disabled={history.length === 0}
                        className="ml-1 px-2 py-1 text-[10px] font-medium text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed border border-stone-200 rounded"
                        title="마지막 선택 취소"
                      >
                        ↶ 되돌리기
                      </button>
                      <button
                        onClick={() => { setHistory(prev => [...prev, bgColors]); setBgColors([]); }}
                        disabled={bgColors.length === 0}
                        className="px-2 py-1 text-[10px] font-medium text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed border border-red-200 rounded"
                      >
                        모두 지우기
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-stone-600">허용 범위</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">{bgTolerance}</span>
                  </div>
                  <input
                    type="range" min="5" max="100" value={bgTolerance}
                    onChange={(e) => setBgTolerance(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[9px] text-stone-400 mt-0.5">
                    <span>정확하게</span>
                    <span>넓게</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-stone-600">경계 부드러움</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">{bgFeather}</span>
                  </div>
                  <input
                    type="range" min="0" max="30" value={bgFeather}
                    onChange={(e) => setBgFeather(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="flex justify-between text-[9px] text-stone-400 mt-0.5">
                    <span>날카롭게</span>
                    <span>자연스럽게</span>
                  </div>
                </div>

                {bgColors.length === 0 && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1.5 leading-snug">
                    💡 왼쪽 이미지에서 없애고 싶은 배경 색깔을 클릭하세요
                  </p>
                )}
              </div>
            )}

            {tool === 'crop' && (
              <div className="mt-4 text-[10px] text-stone-500 leading-relaxed bg-stone-50 rounded px-2 py-2">
                💡 자르기는 정사각형으로만 가능합니다. <br/>
                카드 비율에 맞춰 출력됩니다.
              </div>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <div className="px-4 sm:px-5 py-3 border-t border-stone-200 flex items-center justify-between gap-2 rounded-b-2xl bg-stone-50 flex-wrap">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-[11px] font-medium rounded transition"
              title="크롭+배경 제거 초기화"
            >
              <RefreshCw className="w-3 h-3 inline mr-1" />
              초기화
            </button>
            {card.originalImage && card.originalImage !== card.image && (
              <button
                onClick={restoreOriginal}
                className="px-2.5 py-1.5 bg-white border border-stone-200 hover:bg-blue-50 hover:border-blue-200 text-blue-600 text-[11px] font-medium rounded transition"
                title="처음 업로드한 상태로"
              >
                원본 복원
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-medium rounded-lg transition"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              disabled={processing}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {processing ? '처리 중...' : '적용'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 첫 사용 튜토리얼
// ─────────────────────────────────────────────────────────────
const TutorialOverlay = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      icon: ImageIcon,
      title: '환영합니다! 👋',
      desc: '검단ABA AAC maker는 ABA 치료에 사용할 카드를 쉽게 만들 수 있는 도구예요. 그림과 글자가 들어간 카드를 PDF로 출력하면 됩니다.',
    },
    {
      icon: Upload,
      title: '1. 이미지 올리기',
      desc: '메인 화면 위쪽 영역에 이미지를 끌어다 놓거나 클릭해서 선택하세요. 한 번에 여러 장 가능해요. 파일명이 자동으로 라벨이 됩니다.',
    },
    {
      icon: Type,
      title: '2. 글자 입력',
      desc: '각 카드 아래 입력칸에 글자를 입력하세요. 그림을 보면서 바로 옆에 글자를 쓸 수 있어 편해요.',
    },
    {
      icon: Settings2,
      title: '3. 카드 설정',
      desc: '왼쪽 사이드바에서 카드 크기 (50/45/40/30mm), 글자 위치, 글씨체, 자르는 선 등을 조절할 수 있어요.',
    },
    {
      icon: GripVertical,
      title: '4. 카드 정리',
      desc: '카드를 드래그해서 순서를 바꿀 수 있어요. 카드에 마우스를 올리면 회전(↻)/뒤집기 버튼도 나옵니다.',
    },
    {
      icon: Folder,
      title: '5. 카테고리 (선택)',
      desc: '"동물 / 음식 / 행동" 같은 카테고리를 만들고 카드를 분류할 수 있어요. 사이드바의 카테고리 버튼에서 관리합니다.',
    },
    {
      icon: FileDown,
      title: '6. PDF로 출력',
      desc: '인쇄판에서 "인쇄 / PDF 저장" 버튼을 누르면 인쇄 대화상자가 열립니다. 인쇄 대상에서 "PDF로 저장"을 선택하면 끝! (미리 확인하려면 상단 "인쇄 미리보기" 탭)',
    },
    {
      icon: History,
      title: '7. 이전 인쇄 묶음',
      desc: '인쇄한 카드 묶음은 자동으로 사이드바 "이전 인쇄 묶음"에 저장돼요. 다음에 같은 묶음 다시 쓸 때 [추가] 버튼 한 번이면 됩니다.',
    },
    {
      icon: Share2,
      title: '8. 다른 선생님과 공유',
      desc: '내 카드 묶음을 .json 파일로 내보내서 카톡으로 동료에게 보낼 수 있어요. 받은 분은 "묶음 불러오기" 버튼으로 추가하면 끝!',
    },
  ];

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[60] bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
           style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
        <div className="bg-gradient-to-br from-amber-100 via-rose-50 to-orange-100 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-4">
            <Icon className="w-7 h-7 text-amber-700" strokeWidth={2} />
          </div>
          <h2 className="text-lg font-bold text-stone-900 mb-2">{current.title}</h2>
          <p className="text-sm text-stone-700 leading-relaxed">{current.desc}</p>
        </div>

        {/* 진행 표시 */}
        <div className="px-6 pt-4 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-amber-500' : i < step ? 'w-1.5 bg-amber-300' : 'w-1.5 bg-stone-200'
              }`}
            />
          ))}
        </div>

        <div className="p-5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-medium text-stone-500 hover:text-stone-700 px-3 py-1.5 rounded transition"
          >
            건너뛰기
          </button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-lg transition"
              >
                이전
              </button>
            )}
            <button
              onClick={() => isLast ? onClose() : setStep(step + 1)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
            >
              {isLast ? '시작하기' : '다음'}
              {!isLast && <ArrowRight className="w-3 h-3" />}
            </button>
          </div>
        </div>

        <div className="px-5 pb-3 text-center">
          <span className="text-[10px] text-stone-400">{step + 1} / {steps.length}</span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────────────────────
export default function App() {
  // ───── 인증 상태 ─────
  const [currentUser, setCurrentUser] = useState(null); // null이면 로그인 안 됨
  const [users, setUsers] = useState([]); // Edge Function에서 동적으로 로드
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // 초기 세션 체크 완료 여부

  // 앱 시작 시 Auth 세션 복원 (sb-auth-session → getCurrentAuthUser)
  useEffect(() => {
    let cancelled = false;

    const loadInitialData = async () => {
      try {
        const authUser = await getCurrentAuthUser();
        if (authUser?.id && !cancelled) {
          const isAdmin = await checkIsAdmin();
          if (!cancelled) {
            setCurrentUser({
              id: authUser.id,
              email: authUser.email,
              role: isAdmin ? 'admin' : 'teacher',
              name: authUser.user_metadata?.display_name || authUser.email?.split('@')[0] || authUser.email,
            });
          }
        }
      } catch (e) {
        devWarn('세션 복원 실패:', e);
      }
      if (!cancelled) setAuthChecked(true);
    };

    loadInitialData();
    return () => { cancelled = true; };
  }, []);

  const handleLogin = (user) => {
    // Auth 세션은 signInWithPassword에서 이미 sessionStorage에 저장됨.
    // 여기선 앱 상태(currentUser)만 세팅.
    setCurrentUser(user);
  };

  const handleLogout = () => {
    // 로그아웃 전: 현재 작업 중인 카드를 마지막으로 저장 (디바운싱 우회)
    if (currentUser && cards.length > 0 && draftKey) {
      try {
        const draft = { cards, sizeMm, labelPos, fontId, labelSize, savedAt: Date.now() };
        localStorage.setItem(draftKey, JSON.stringify(draft));
      } catch {}
    }
    setCards([]);
    setCurrentUser(null);
    setShowUserManagement(false);
    signOutAuth(); // Auth 세션 정리 (sb-auth-session 제거 + 서버 logout)
  };

  // ───── 기존 AAC maker 상태 ─────
  const [cards, setCards] = useState([]);
  const [sizeMm, setSizeMm] = useState(45);
  const [labelPos, setLabelPos] = useState('bottom');
  const [fontId, setFontId] = useState('round');
  const [labelSize, setLabelSize] = useState(14);
  const [gap, setGap] = useState(3);
  const [showCutLines, setShowCutLines] = useState(true);
  const [cutLineWidth, setCutLineWidth] = useState(1); // 자르는 선 굵기 (px)
  const [cutLineStyle, setCutLineStyle] = useState('dashed'); // 'solid' | 'dashed' | 'dotted'
  const cutLineColor = '#1c1917'; // 검정 고정
  // 인쇄 옵션 확장
  const [cardRadius, setCardRadius] = useState(0); // 카드 모서리 둥글기 (mm)
  const [safetyMargin, setSafetyMargin] = useState(0); // 코팅 여백 (mm)
  const [doubleSided, setDoubleSided] = useState(false); // 양면 인쇄
  const [backDesign, setBackDesign] = useState('label'); // 'label' | 'logo' | 'solid' | 'pattern'
  const [backColor, setBackColor] = useState('#fef3c7'); // 뒷면 단색 (amber-100)
  const [view, setView] = useState('edit'); // 'edit' | 'preview'
  // 인쇄 미리보기 진입 시 폰트 로딩 상태 - Google Fonts는 비동기로 로딩되므로 명시적으로 대기
  // false 동안 안내 박스에 "폰트 로딩 중" 표시 + 인쇄 직전에도 한 번 더 대기
  const [fontsReady, setFontsReady] = useState(false);
  // 이미지 추가 처리 중 표시 - 사용자가 여러 장 선택했을 때 "버튼 안 눌리나?" 오해 방지
  // null: 처리 중 아님, { current, total }: 진행률
  const [imageProcessing, setImageProcessing] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState([]); // 인쇄한 카드 묶음 보관
  const [showHistory, setShowHistory] = useState(false); // 히스토리 패널 펼치기
  const [historySearch, setHistorySearch] = useState(''); // 히스토리 검색어

  // 카테고리 (전역 - 모든 카드가 공유)
  const [categories, setCategories] = useState([]);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false); // 사이드바 카테고리 펼침 여부 (기본 접힘)
  const [settingsOpen, setSettingsOpen] = useState(false); // 사이드바 설정 펼침 여부 (기본 접힘)
  const [showBundleLoader, setShowBundleLoader] = useState(false); // 묶음 불러오기 모달
  const [bundleLoaderTab, setBundleLoaderTab] = useState('saved'); // 'saved' | 'file'
  const [expandedOwners, setExpandedOwners] = useState({}); // {ownerUsername: bool} - 선생님 폴더 펼침 여부

  // 카테고리 필터 (편집 화면에서만 - 보여줄 카드 필터링)
  const [filterCategoryId, setFilterCategoryId] = useState(null); // null이면 전체
  const [cardSearch, setCardSearch] = useState(''); // 카드 검색어 (라벨로)
  const [sortMode, setSortMode] = useState('default'); // 'default' | 'label' | 'category' | 'shortest' | 'longest'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // 모바일 사이드바 토글
  const [editingImageCard, setEditingImageCard] = useState(null); // 이미지 편집 중인 카드
  const [settingsTab, setSettingsTab] = useState('card'); // 'card' | 'print' - 사이드바 탭

  // 일괄 라벨 편집 모달
  const [showBulkEditor, setShowBulkEditor] = useState(false);

  // ───── 라이브러리(영구 보관) 상태 ─────
  const [viewMode, setViewMode] = useState('print'); // 'print'(인쇄판) | 'library'(라이브러리)
  const [library, setLibrary] = useState({}); // { [categoryId or '__none__']: cards[] }
  const libraryLoadedRef = useRef(false); // 로드 완료 전 저장 금지 (덮어쓰기 방지)
  const [libraryCatId, setLibraryCatId] = useState(null); // 라이브러리에서 보고 있는 카테고리 (null=미분류)
  const [librarySelected, setLibrarySelected] = useState(() => new Set()); // 체크된 카드 id
  const [librarySearch, setLibrarySearch] = useState(''); // 카테고리 화면 전용 검색어 (인쇄판과 분리)
  const [diagResult, setDiagResult] = useState(null); // 진단 결과 (화면 표시용)

  // 튜토리얼
  const [showTutorial, setShowTutorial] = useState(false);

  // 드래그 정렬 상태
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const fileInputRef = useRef(null);
  const libraryImageInputRef = useRef(null); // 카테고리 화면 전용 이미지 추가 인풋

  // 자동 저장 quota 초과 알림 - 세션당 1회만 (디바운스마다 토스트 띄우면 짜증남)
  const draftQuotaWarnedRef = useRef(false);

  const font = FONT_OPTIONS.find(f => f.id === fontId) || FONT_OPTIONS[0];

  // 앱 시작 시 히스토리 인덱스 + 카테고리 불러오기
  // 인덱스만 먼저 로드 (썸네일 포함, 카드 본문은 사용 시점에 로드)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const indexed = await loadHistoryIndex(currentUser);
        if (!cancelled && Array.isArray(indexed)) setHistory(indexed);
      } catch (e) {
        devWarn('히스토리 인덱스 불러오기 실패:', e);
      }
      try {
        // 카테고리: 본인 aac_data 에 저장 (RLS로 본인 것만)
        const row = await dataGet(CATEGORIES_KEY);
        if (!cancelled && row?.value) {
          const parsed = JSON.parse(row.value);
          if (Array.isArray(parsed)) setCategories(parsed);
        }
      } catch {}
      // 로드가 끝난 뒤에만 저장을 허용 (로드 전 빈 배열이 저장돼 덮어쓰는 문제 방지)
      if (!cancelled) categoriesLoadedRef.current = true;
    })();
    return () => { cancelled = true; categoriesLoadedRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // 카테고리 변경 시 본인 aac_data 에 저장
  const categoriesSaveTimerRef = useRef(null);
  const categoriesLoadedRef = useRef(false); // 로드 완료 전에는 저장 금지 (빈 배열 덮어쓰기 방지)
  useEffect(() => {
    if (!authChecked || !currentUser) return;
    if (!categoriesLoadedRef.current) return; // 아직 로드 안 끝났으면 저장 스킵
    if (categoriesSaveTimerRef.current) clearTimeout(categoriesSaveTimerRef.current);
    categoriesSaveTimerRef.current = setTimeout(() => {
      dataSet(CATEGORIES_KEY, JSON.stringify(categories)).catch(e => devWarn('카테고리 저장 실패:', e));
    }, 800);
    return () => {
      if (categoriesSaveTimerRef.current) clearTimeout(categoriesSaveTimerRef.current);
    };
  }, [categories, authChecked, currentUser]);

  // ───── 라이브러리 로드 (로그인 후 1회) ─────
  useEffect(() => {
    if (!currentUser || !authChecked) return;
    let cancelled = false;
    libraryLoadedRef.current = false;
    (async () => {
      // 초기 로드 타이밍(토큰 준비 전) 문제 대비: 카드를 받을 때까지 몇 번 재시도
      for (let attempt = 0; attempt < 6; attempt++) {
        if (cancelled) return;
        try {
          const { map, hadError } = await loadLibraryAll();
          if (cancelled) return;
          const gotCount = Object.values(map || {}).reduce((s, a) => s + (a?.length || 0), 0);
          if (gotCount > 0) {
            setLibrary(map);
            break; // 성공 → 종료
          }
          // 0개인데 에러였으면 재시도, 진짜 0개(에러 아님)면 첫 시도 후 종료
          if (!hadError && attempt >= 1) {
            setLibrary(map || {});
            break;
          }
        } catch (e) {
          devWarn('라이브러리 로드 실패(재시도):', e);
        }
        // 재시도 전 대기 (점점 길게: 0.5s, 1s, 1.5s...)
        await new Promise(res => setTimeout(res, 500 * (attempt + 1)));
      }
      if (!cancelled) libraryLoadedRef.current = true;
    })();
    return () => { cancelled = true; libraryLoadedRef.current = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, authChecked]);
  useEffect(() => {
    if (filterCategoryId) setCategoryOpen(true);
  }, [filterCategoryId]);

  // ───── 작업 중 카드 자동 저장 (drafts) ─────
  // 사용자별로 localStorage에만 저장 (브라우저별 분리, 새로고침 시 복구)
  const draftKey = currentUser ? `${DRAFT_KEY_PREFIX}${currentUser.email}` : null;

  // 로그인 후 한 번: 작업 중이던 카드 복구
  useEffect(() => {
    if (!currentUser || !authChecked) return;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed?.cards) && parsed.cards.length > 0) {
          setCards(parsed.cards);
          // 작업 중이던 설정도 복구 (있으면)
          if (parsed.sizeMm) setSizeMm(parsed.sizeMm);
          if (parsed.labelPos) setLabelPos(parsed.labelPos);
          if (parsed.fontId) setFontId(parsed.fontId);
          if (typeof parsed.labelSize === 'number') setLabelSize(parsed.labelSize);
          devLog(`✅ 작업 중이던 카드 ${parsed.cards.length}장 복구됨`);
        }
      }
    } catch (e) {
      devWarn('초안 복구 실패:', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email, authChecked]); // 로그인 변경 시에만

  // 작업 중인 카드 자동 저장 - 디바운싱으로 부담 최소화
  // 주의: 카드 0장이어도 자동으로 draft를 지우진 않음 (로그아웃 시 race 방지)
  // draft 삭제는 명시적인 사용자 액션(clearAll, loadFromHistory 등)에서만 처리
  useEffect(() => {
    if (!authChecked || !currentUser || !draftKey) return;
    // 카드 0장이면 저장 안 하지만 기존 draft는 유지 (다른 곳에서 명시적으로 삭제)
    if (cards.length === 0) return;
    // 디바운싱: 2.5초간 변화 없으면 저장
    // (카드가 많으면 stringify 비용이 큼 - 너무 자주 저장하면 입력 끊김 느낌)
    const timer = setTimeout(() => {
      const draft = { cards, sizeMm, labelPos, fontId, labelSize, savedAt: Date.now() };
      const json = JSON.stringify(draft);
      try {
        localStorage.setItem(draftKey, json);
        // 저장 성공: 이전에 경고 띄웠다면 리셋 (용량 확보됐다는 뜻)
        if (draftQuotaWarnedRef.current) draftQuotaWarnedRef.current = false;
      } catch (e) {
        // 1차 실패: 다른 사용자의 오래된 draft 정리 후 재시도
        devWarn('자동 저장 실패 - 다른 사용자 draft 정리 후 재시도:', e);
        const cleaned = cleanupOldDrafts(currentUser.email);
        try {
          localStorage.setItem(draftKey, json);
          if (cleaned > 0) {
            devInfo(`다른 사용자 draft ${cleaned}개 정리 후 저장 성공`);
          }
          if (draftQuotaWarnedRef.current) draftQuotaWarnedRef.current = false;
        } catch (e2) {
          // 정리해도 실패: 본인 카드 데이터 자체가 너무 큼 - 사용자에게 백업 권유
          devWarn('자동 저장 재시도도 실패:', e2);
          if (!draftQuotaWarnedRef.current) {
            draftQuotaWarnedRef.current = true;
            safeAlert('⚠️ 자동 저장 실패\n브라우저 저장 공간이 부족합니다.\n사이드바 "현재 카드 내보내기"로 .json 파일 백업을 권장합니다.');
          }
        }
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [cards, sizeMm, labelPos, fontId, labelSize, authChecked, currentUser, draftKey]);

  // 인쇄 미리보기 진입 시 폰트 로딩 명시 트리거
  // Google Fonts @import만으론 즉시 로드 안 됨 - 인쇄 시점에 fallback 폰트로 나갈 위험
  // document.fonts.load()로 실제 사용 폰트만 우선 로드 후 ready 보장
  useEffect(() => {
    if (view !== 'preview') {
      setFontsReady(false);
      return;
    }
    let cancelled = false;
    const loadFonts = async () => {
      try {
        if (typeof document === 'undefined' || !document.fonts) {
          // 구형 브라우저 등 Font Loading API 미지원 - 그냥 ready 처리 (fallback 폰트로 인쇄됨)
          if (!cancelled) setFontsReady(true);
          return;
        }
        // 실제 사용하는 폰트만 명시 로드 (모든 weight 다 받지 않음 - 트래픽 절약)
        await Promise.all([
          document.fonts.load('700 16px "Jua"'),
          document.fonts.load('600 16px "Noto Sans KR"'),
          document.fonts.load('700 16px "Noto Sans KR"'),
          document.fonts.load('400 16px "Noto Serif KR"'),
          document.fonts.load('600 16px "Noto Serif KR"'),
        ]);
        // 다른 폰트도 로딩 중일 수 있으니 전체 ready 한 번 더 대기
        await document.fonts.ready;
        if (!cancelled) setFontsReady(true);
      } catch (e) {
        // 로딩 실패해도 인쇄 차단하지 않음 (fallback 폰트로라도 출력 가능)
        devWarn('폰트 로딩 실패 (fallback 폰트로 인쇄됨):', e);
        if (!cancelled) setFontsReady(true);
      }
    };
    loadFonts();
    return () => { cancelled = true; };
  }, [view]);

  // 전역 Esc 키 핸들러 - 열려있는 모달을 위에서부터 하나씩 닫음
  // 사용자 가장 빈번한 답답함(매번 X 버튼 찾기) 해소
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      // 한국어 IME 조합 중에는 IME 취소가 우선
      if (e.isComposing) return;
      // 우선순위: 가장 안쪽/최근 열린 것부터 닫음
      if (editingImageCard) { setEditingImageCard(null); e.preventDefault(); return; }
      if (showBulkEditor) { setShowBulkEditor(false); e.preventDefault(); return; }
      if (showCategoryManager) { setShowCategoryManager(false); e.preventDefault(); return; }
      if (showBundleLoader) { setShowBundleLoader(false); e.preventDefault(); return; }
      if (showUserManagement) { setShowUserManagement(false); e.preventDefault(); return; }
      if (showTutorial) { setShowTutorial(false); e.preventDefault(); return; }
      if (mobileSidebarOpen) { setMobileSidebarOpen(false); e.preventDefault(); return; }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editingImageCard, showBulkEditor, showCategoryManager, showBundleLoader, showUserManagement, showTutorial, mobileSidebarOpen]);

  // 사용자별 튜토리얼 1회 표시 (개인 - 브라우저별)
  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    let timerId = null;
    try {
      const key = `aac_tutorial_seen_${currentUser.email}`;
      const seen = localStorage.getItem(key);
      if (!seen) {
        timerId = setTimeout(() => {
          if (!cancelled) setShowTutorial(true);
        }, 800);
      }
    } catch {}
    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email]); // username만 의존 - 객체 참조 변경 무시

  const closeTutorial = () => {
    setShowTutorial(false);
    if (currentUser) {
      try {
        localStorage.setItem(`aac_tutorial_seen_${currentUser.email}`, '1');
      } catch {}
    }
  };

  // 다른 세션의 변경사항을 가져와서 화면에 반영 (수동 새로고침용)
  const refreshHistory = async () => {
    try {
      const indexed = await loadHistoryIndex(currentUser);
      if (Array.isArray(indexed)) setHistory(indexed);
    } catch (e) {
      devWarn('히스토리 새로고침 실패:', e);
    }
  };

  // 이미지 추가 (여러 장 한꺼번에)
  const handleFiles = useCallback(async (files) => {
    // ─── 사전 검증 정책 ───
    const ALLOWED_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const ALLOWED_EXT = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB (폰 카메라 사진 충분히 수용)

    const rawArr = Array.from(files);
    const fileArr = [];
    const preFiltered = []; // 사전 검증 실패 { name, reason }

    for (const f of rawArr) {
      // 1) 형식 검증 (MIME + 확장자 이중 체크 - SVG/HEIC 등 차단)
      const ext = (f.name.split('.').pop() || '').toLowerCase();
      const validExt = ALLOWED_EXT.includes(ext);
      const validMime = ALLOWED_MIME.includes((f.type || '').toLowerCase());
      if (!validMime || !validExt) {
        preFiltered.push({ name: f.name, reason: '지원하지 않는 형식' });
        continue;
      }
      // 2) 빈 파일 거부
      if (f.size === 0) {
        preFiltered.push({ name: f.name, reason: '빈 파일' });
        continue;
      }
      // 3) 크기 상한
      if (f.size > MAX_FILE_SIZE) {
        preFiltered.push({ name: f.name, reason: '20MB 초과' });
        continue;
      }
      fileArr.push(f);
    }

    if (fileArr.length === 0 && preFiltered.length === 0) {
      safeAlert('이미지 파일이 없습니다.\nJPG, PNG, WebP, GIF 형식만 가능합니다.');
      return;
    }

    // 처리 중 표시 시작 (사용자에게 "진행 중" 시각 피드백)
    if (fileArr.length > 0) {
      setImageProcessing({ current: 0, total: fileArr.length });
    }

    const newCards = [];
    const failed = []; // 처리 중 실패 { name, reason }
    try {
      for (const file of fileArr) {
        try {
          // FileReader 단계도 에러 처리 (예: 권한 없는 파일, 손상된 파일)
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            const readTimer = setTimeout(() => reject(new Error('파일 읽기 시간 초과')), 15000);
            reader.onload = (e) => {
              clearTimeout(readTimer);
              resolve(e.target.result);
            };
            reader.onerror = () => {
              clearTimeout(readTimer);
              reject(new Error('파일을 읽을 수 없습니다'));
            };
            reader.onabort = () => {
              clearTimeout(readTimer);
              reject(new Error('파일 읽기가 중단되었습니다'));
            };
            reader.readAsDataURL(file);
          });
          // 원본도 적당히 축소 (편집용, 800px면 충분)
          const compressedOriginal = await downscaleImage(dataUrl, 800, 0.85);
          // 카드 표시용은 400px (인쇄 50mm = 약 472px이므로 충분)
          const cropped = await cropToSquare(compressedOriginal, 400);
          // 라벨은 항상 비워둠 (사용자가 직접 입력)
          // 자동 추출은 부정확한 경우가 많아서 제거함
          const autoLabel = '';
          newCards.push({
            id: newId(),
            image: cropped,
            originalImage: compressedOriginal, // 압축된 원본 (편집용)
            label: autoLabel,
            categoryId: filterCategoryId || null, // 특정 카테고리 보고 있을 때 추가하면 그 카테고리로
          });
        } catch (err) {
          failed.push({ name: file.name, reason: err?.message || '알 수 없는 오류' });
        }
        // 진행률 업데이트 (성공/실패 무관 - 한 파일 처리 완료)
        setImageProcessing(prev => prev ? { ...prev, current: prev.current + 1 } : null);
      }
    } finally {
      // 무슨 일이 있어도 처리 중 표시 제거 (예외 발생해도 끝나는 보장)
      setImageProcessing(null);
    }
    if (newCards.length > 0) {
      if (viewMode === 'library') {
        // 라이브러리 모드: 지금 보고 있는 카테고리에 카드 단위로 저장 (성공분만 화면 반영)
        const NONE = '__none__';
        const key = libraryCatId || NONE;
        const tagged = newCards.map(c => ({ ...c, categoryId: libraryCatId || null }));
        const { failCount, saved } = await saveLibraryCards(tagged);
        if (saved.length > 0) {
          setLibrary(prev => ({ ...prev, [key]: [...(prev[key] || []), ...saved] }));
        }
        if (failCount > 0) {
          safeAlert(`${failCount}장이 저장되지 않았습니다.\n이미지 용량이 클 수 있어요. 다시 시도하거나 더 적게 나눠서 추가해보세요.`);
        }
      } else {
        setCards(prev => [...prev, ...newCards]);
      }
    }
    // 결과 피드백: 사전검증 실패 + 처리 중 실패를 사유별로 그룹화
    const allFailed = [...preFiltered, ...failed];
    if (allFailed.length > 0) {
      const grouped = {};
      for (const f of allFailed) {
        if (!grouped[f.reason]) grouped[f.reason] = 0;
        grouped[f.reason]++;
      }
      const lines = Object.entries(grouped).map(([reason, cnt]) => `· ${reason} (${cnt}장)`);
      if (newCards.length > 0) {
        safeAlert(`${newCards.length}장 추가됨\n실패 ${allFailed.length}장:\n${lines.join('\n')}`);
      } else {
        safeAlert(`이미지를 추가할 수 없습니다.\n${lines.join('\n')}`);
      }
    }
  }, [filterCategoryId, viewMode, libraryCatId]);

  const onFileChange = (e) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = '';
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  // 라이브러리에서 선택한 카드들을 인쇄판(cards)에 복사해 담기 (원본은 보존)
  // 라이브러리에 카드 추가 (특정 카테고리로) + Supabase 저장 (카드 단위)
  // newCards: [{ image, originalImage?, label? }]  categoryId: null이면 미분류
  const addCardsToLibrary = useCallback(async (newCards, categoryId) => {
    const NONE = '__none__';
    const key = categoryId || NONE;
    const prepared = (newCards || []).map(c => ({
      id: c.id || newId(),
      image: c.image,
      originalImage: c.originalImage || null,
      label: c.label || '',
      categoryId: categoryId || null,
    }));
    if (prepared.length === 0) return { okCount: 0, failCount: 0 };
    // 저장 성공한 카드만 화면에 반영 (저장 안 된 게 보이는 착각 방지)
    const { okCount, failCount, saved } = await saveLibraryCards(prepared);
    if (saved.length > 0) {
      setLibrary(prev => ({ ...prev, [key]: [...(prev[key] || []), ...saved] }));
    }
    return { okCount, failCount };
  }, []);

  // 카테고리 탭 진입 시: 카드가 들어있는 첫 카테고리를 우선 선택 (없으면 첫 카테고리)
  useEffect(() => {
    if (viewMode !== 'library' || libraryCatId !== null) return;
    if (categories.length === 0) return;
    // 카드가 실제로 있는 카테고리를 먼저 찾음
    const withCards = categories.find(c => (library[c.id] || []).length > 0);
    if (withCards) {
      setLibraryCatId(withCards.id);
    } else if ((library['__none__'] || []).length > 0) {
      // 미분류에 카드가 있으면 미분류(null) 유지 — 이미 null이므로 setState 불필요
    } else {
      setLibraryCatId(categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, categories, library]);
  const handleCategoriesUpdate = useCallback((nextCategories) => {
    const nextIds = new Set((nextCategories || []).map(c => c.id));
    const removedIds = categories.map(c => c.id).filter(id => !nextIds.has(id));
    setCategories(nextCategories);
    if (removedIds.length > 0) {
      removedIds.forEach(catId => {
        const cardsInCat = library[catId] || [];
        deleteLibraryCategoryCards(cardsInCat).catch(e => devWarn('카테고리 카드 정리 실패:', e));
        setLibrary(prev => {
          const next = { ...prev };
          delete next[catId];
          return next;
        });
      });
      if (removedIds.includes(libraryCatId)) setLibraryCatId(null);
    }
  }, [categories, library, libraryCatId]);

  const addSelectedToPrint = useCallback(() => {
    const picked = [];
    Object.values(library).forEach(arr => {
      (arr || []).forEach(c => {
        if (librarySelected.has(c.id)) {
          picked.push({
            id: newId(),
            image: c.image,
            originalImage: c.originalImage || null,
            label: c.label || '',
            categoryId: c.categoryId || null,
          });
        }
      });
    });
    if (picked.length === 0) return;
    setCards(prev => [...prev, ...picked]);
    setLibrarySelected(new Set());
    setViewMode('print');
    safeAlert(`${picked.length}장을 인쇄판에 담았습니다.`);
  }, [library, librarySelected]);

  // 라이브러리 카드 한 장 삭제 (DB + 화면 + 선택목록)
  const deleteLibraryCardById = useCallback(async (cardId) => {
    if (!safeConfirm('이 카드를 카테고리에서 삭제할까요?')) return;
    await deleteLibraryCard(cardId).catch(e => devWarn('카드 삭제 실패:', e));
    setLibrary(prev => {
      const next = {};
      for (const [k, arr] of Object.entries(prev)) {
        next[k] = (arr || []).filter(c => c.id !== cardId);
      }
      return next;
    });
    setLibrarySelected(prev => {
      if (!prev.has(cardId)) return prev;
      const n = new Set(prev); n.delete(cardId); return n;
    });
  }, []);

  // 선택한 카드 여러 장 한꺼번에 삭제
  // 진단: DB에 실제 저장된 라이브러리 카드 수를 조회해 알려줌
  const diagnoseLibrary = useCallback(async () => {
    setDiagResult('진단 중...');
    try {
      // 1) DB에서 카드 조회
      const res = await dataList(LIBCARD_PREFIX);
      const dbCount = (res.rows || []).length;
      const err = res._error ? ' ⚠️로드오류' : '';
      const byCat = {};
      for (const r of (res.rows || [])) {
        try {
          const c = JSON.parse(r.value);
          const k = c.categoryId || '미분류';
          byCat[k] = (byCat[k] || 0) + 1;
        } catch {}
      }
      const screenCount = Object.values(library).reduce((s, a) => s + (a?.length || 0), 0);

      // 첫 행의 실제 구조 확인 (parse 되는지)
      let sample = '없음';
      if ((res.rows || []).length > 0) {
        const first = res.rows[0];
        const vtype = typeof first.value;
        let parsed = null, perr = '';
        try { parsed = JSON.parse(first.value); } catch (e) { perr = 'parse실패:' + e.message; }
        if (parsed) {
          sample = `key=${first.key} | 필드=[${Object.keys(parsed).join(',')}] | categoryId=${parsed.categoryId} | image길이=${(parsed.image||'').length}`;
        } else {
          sample = `key=${first.key} | value타입=${vtype} | ${perr} | 앞부분=${String(first.value).slice(0,50)}`;
        }
      }

      // 2) 저장 테스트: 작은 테스트 카드 하나 저장 시도
      let saveTest = '?';
      try {
        const testCard = { id: 'diagtest_' + Date.now(), image: 'data:image/png;base64,test', label: '진단테스트', categoryId: null };
        const ok = await saveLibraryCard(testCard);
        saveTest = ok ? '성공' : '실패';
        if (ok) await deleteLibraryCard(testCard.id); // 테스트 카드 삭제
      } catch (e) { saveTest = '에러:' + (e?.message || e); }

      const catList = categories.map(c => `${c.name}: ${byCat[c.id] || 0}`).join(', ');
      setDiagResult(
        `DB저장 카드수: ${dbCount}${err} | 화면: ${screenCount} | 저장테스트: ${saveTest}\n` +
        `첫카드: ${sample}\n` +
        `카테고리별: ${catList} | 미분류: ${byCat['미분류'] || 0}`
      );
    } catch (e) {
      setDiagResult('진단 실패: ' + (e?.message || String(e)));
    }
  }, [categories, library]);

  const deleteSelectedLibraryCards = useCallback(async () => {
    const ids = Array.from(librarySelected);
    if (ids.length === 0) return;
    if (!safeConfirm(`선택한 ${ids.length}장을 삭제할까요?`)) return;
    const idSet = new Set(ids);
    await Promise.all(ids.map(id => deleteLibraryCard(id).catch(e => devWarn('카드 삭제 실패:', e))));
    setLibrary(prev => {
      const next = {};
      for (const [k, arr] of Object.entries(prev)) {
        next[k] = (arr || []).filter(c => !idSet.has(c.id));
      }
      return next;
    });
    setLibrarySelected(new Set());
  }, [librarySelected]);

  // useCallback으로 감싸서 함수 참조 안정화 (React.memo의 CardEditor가 불필요하게 리렌더링되는 것 방지)
  const updateCard = useCallback((id, updated) => {
    setCards(prev => prev.map(c => c.id === id ? updated : c));
  }, []);

  const deleteCard = useCallback((id) => {
    setCards(prev => prev.filter(c => c.id !== id));
  }, []);

  const duplicateCard = useCallback((id) => {
    setCards(prev => {
      const idx = prev.findIndex(c => c.id === id);
      if (idx === -1) return prev;
      const copy = { ...prev[idx], id: newId() };
      return [...prev.slice(0, idx + 1), copy, ...prev.slice(idx + 1)];
    });
  }, []);

  const clearAll = () => {
    if (cards.length === 0) return;
    if (safeConfirm(`카드 ${cards.length}장을 모두 삭제할까요?`)) {
      setCards([]);
      // 명시적인 사용자 삭제 액션이므로 draft도 함께 삭제
      if (draftKey) {
        try { localStorage.removeItem(draftKey); } catch {}
      }
    }
  };

  // 이미지 편집 모달 열기 - 함수 참조 안정화 (React.memo와 함께 동작)
  const openImageEditor = useCallback((card) => {
    setEditingImageCard(card);
  }, []);

  // ───── 드래그 정렬 ───── (useCallback으로 함수 참조 안정화)
  const handleCardDragStart = useCallback((e, idx) => {
    setDraggingIndex(idx);
    e.dataTransfer.effectAllowed = 'move';
    if (e.currentTarget) {
      e.dataTransfer.setData('text/plain', String(idx));
    }
  }, []);

  const handleCardDragOver = useCallback((e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    // 자기 위로 드래그할 때는 표시 안 함 - setDragOverIndex가 자동 처리
    setDragOverIndex(idx);
  }, []);

  const handleCardDrop = useCallback((e, dropIdx) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === dropIdx) {
      setDraggingIndex(null);
      setDragOverIndex(null);
      return;
    }
    setCards(prev => {
      const visible = filterCategoryId
        ? prev.filter(c => c.categoryId === filterCategoryId)
        : prev;
      const fromCard = visible[draggingIndex];
      const toCard = visible[dropIdx];
      if (!fromCard || !toCard) return prev;
      const fromRealIdx = prev.findIndex(c => c.id === fromCard.id);
      const toRealIdx = prev.findIndex(c => c.id === toCard.id);
      if (fromRealIdx === -1 || toRealIdx === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromRealIdx, 1);
      next.splice(toRealIdx, 0, moved);
      return next;
    });
    setDraggingIndex(null);
    setDragOverIndex(null);
  }, [draggingIndex, filterCategoryId]);

  const handleCardDragEnd = useCallback(() => {
    setDraggingIndex(null);
    setDragOverIndex(null);
  }, []);

  // 일괄 편집 적용 (라벨 + 카테고리 한꺼번에)
  const applyBulkEdit = (editedCards) => {
    setCards(editedCards);
  };

  // 카드 필터링 (카테고리 + 검색어) - useMemo로 캐싱하여 매 렌더링마다 재계산 방지
  const filteredCards = useMemo(() => {
    let result = filterCategoryId
      ? cards.filter(c => c.categoryId === filterCategoryId)
      : cards;
    const q = cardSearch.trim().toLowerCase();
    if (q) {
      result = result.filter(c => (c.label || '').toLowerCase().includes(q));
    }
    return result;
  }, [cards, filterCategoryId, cardSearch]);

  // 정렬 (실제 cards 배열은 그대로, 화면 표시만 정렬) - useMemo로 캐싱
  const visibleCards = useMemo(() => {
    if (sortMode === 'default') return filteredCards;
    const sorted = [...filteredCards];
    // 한국어 정렬을 위해 localeCompare 사용
    const collator = new Intl.Collator('ko', { sensitivity: 'base', numeric: true });
    if (sortMode === 'label') {
      sorted.sort((a, b) => collator.compare(a.label || '', b.label || ''));
    } else if (sortMode === 'category') {
      // 카테고리 이름순 → 그 안에서 라벨 가나다순
      const catName = (cid) => categories.find(c => c.id === cid)?.name || 'zzz_없음';
      sorted.sort((a, b) => {
        const catCmp = collator.compare(catName(a.categoryId), catName(b.categoryId));
        if (catCmp !== 0) return catCmp;
        return collator.compare(a.label || '', b.label || '');
      });
    } else if (sortMode === 'shortest') {
      sorted.sort((a, b) => (a.label || '').length - (b.label || '').length);
    } else if (sortMode === 'longest') {
      sorted.sort((a, b) => (b.label || '').length - (a.label || '').length);
    }
    return sorted;
  }, [filteredCards, sortMode, categories]);

  // 히스토리 권한 필터링
  // 관리자: 전체 / 선생님: 자기가 만든 것만 (개인정보 보호)
  const isAdmin = currentUser?.role === 'admin';
  const visibleHistory = isAdmin
    ? history
    : history.filter(h => h.ownerUsername === currentUser?.email);

  // ───── 인쇄 히스토리 관리 ─────

  // 두 카드 묶음이 같은 내용인지 비교 (이미지 + 라벨 + 순서)
  const isSameCardSet = (a, b) => {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if ((a[i].label || '') !== (b[i].label || '')) return false;
      if ((a[i].image || '') !== (b[i].image || '')) return false;
    }
    return true;
  };

  // 묶음 이름 자동 생성 헬퍼
  // 우선순위: 1) 카테고리 이름 (전부 같은 카테고리면) 2) 의미있는 짧은 라벨 3) "카드 N장"
  const generateBundleName = (cardsToName) => {
    if (!cardsToName || cardsToName.length === 0) return '빈 묶음';

    // 1) 모든 카드가 같은 카테고리면 카테고리 이름 사용
    const catIds = [...new Set(cardsToName.map(c => c.categoryId).filter(Boolean))];
    if (catIds.length === 1) {
      const cat = categories.find(c => c.id === catIds[0]);
      if (cat) {
        return cardsToName.length > 1
          ? `${cat.name} (${cardsToName.length}장)`
          : `${cat.name}`;
      }
    }

    // 1.5) 여러 카테고리가 있으면 카테고리 이름 조합
    if (catIds.length >= 2 && catIds.length <= 3) {
      const catNames = catIds
        .map(id => categories.find(c => c.id === id)?.name)
        .filter(Boolean);
      if (catNames.length >= 2) {
        return `${catNames.join('·')} (${cardsToName.length}장)`;
      }
    }

    // 2) 의미있는 짧은 라벨 찾기 (파일명 같은 긴 텍스트 거르기)
    const meaningfulLabels = cardsToName
      .map(c => (c.label || '').trim())
      .filter(l => {
        if (!l) return false;
        if (l.length > 15) return false; // 너무 긴 건 파일명 가능성 높음
        // 파일명 패턴 거르기
        if (/^(img|image|photo|pic|chatgpt|dall.?e|midjourney|sd|untitled|naver|screenshot|capture|스크린샷|캡처|사진|이미지)/i.test(l)) return false;
        if (/^(20\d{2}|19\d{2})[년\-\s\.]/.test(l)) return false;
        if (/^\d+$/.test(l)) return false; // 숫자만
        if (/\.(jpg|jpeg|png|gif|webp)$/i.test(l)) return false;
        return true;
      });

    if (meaningfulLabels.length > 0) {
      const first = meaningfulLabels[0];
      if (cardsToName.length === 1) return first;
      // 2개 이상이면 처음 2개 라벨 + 외 N장
      if (meaningfulLabels.length >= 2) {
        const second = meaningfulLabels[1];
        const remaining = cardsToName.length - 2;
        if (remaining > 0) {
          return `${first}·${second} 외 ${remaining}장`;
        }
        return `${first}·${second}`;
      }
      return `${first} 외 ${cardsToName.length - 1}장`;
    }

    // 3) 의미있는 라벨 없으면 날짜+시간 + 카드 수
    const now = new Date();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const h = now.getHours();
    const min = String(now.getMinutes()).padStart(2, '0');
    return `${m}/${d} ${h}:${min} 카드 ${cardsToName.length}장`;
  };

  const saveCurrentToHistory = async (customName) => {
    // 필터링 중이면 보이는 카드만, 아니면 전체
    const cardsToSave = visibleCards;
    if (cardsToSave.length === 0) return;
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const autoName = (customName && customName.trim()) ? customName.trim() : generateBundleName(cardsToSave);

    const snapshot = {
      id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: autoName,
      date: dateStr,
      timestamp: now.getTime(),
      cards: cardsToSave.map(c => ({ ...c })),
      sizeMm,
      labelPos,
      fontId,
      labelSize,
      ownerUsername: currentUser?.email || 'unknown',
      ownerName: currentUser?.name || '알 수 없음',
    };

    // 본인 묶음 중 중복 검사 - 본문 비교 필요하므로 본인 묶음만 본문 로드
    // 단, 아이 이름으로 저장할 땐 항상 새로 저장 (이름이 다르면 별개 세트로)
    const myStubs = (customName && customName.trim())
      ? []
      : history.filter(h => h.ownerUsername === currentUser?.email);
    let duplicateId = null;
    for (const stub of myStubs) {
      // 인덱스 카드 수와 다르면 본문 로드 안 해도 됨
      if (stub.cardCount !== cardsToSave.length) continue;
      // 본문 로드해서 비교
      const item = await loadHistoryItem(stub.id, currentUser);
      if (item && isSameCardSet(item.cards, cardsToSave)) {
        duplicateId = stub.id;
        break;
      }
    }

    if (duplicateId) {
      // 중복 - 메타만 갱신 (맨 앞으로)
      await moveHistoryToTop(duplicateId, dateStr, now.getTime(), currentUser);
    } else {
      // 새 추가
      await addHistoryItem(snapshot, currentUser);
    }

    // UI 갱신 - 인덱스 다시 로드
    await refreshHistory();
  };

  const loadFromHistory = async (snapshot) => {
    if (!snapshot) return;
    // 인덱스 stub인 경우 본문 로드
    let cardsToAdd = snapshot.cards;
    if (snapshot._isStub) {
      const item = await loadHistoryItem(snapshot.id, currentUser, snapshot._ownerId);
      if (!item || !Array.isArray(item.cards)) {
        safeAlert('이 묶음의 카드 데이터를 불러올 수 없습니다.');
        return;
      }
      cardsToAdd = item.cards;
    }
    if (!Array.isArray(cardsToAdd) || cardsToAdd.length === 0) return;
    const newCards = cardsToAdd.map(c => ({ ...c, id: newId() }));
    setCards(prev => [...prev, ...newCards]);
    setShowHistory(false);
    safeAlert(`"${snapshot.name}" 묶음에서 ${newCards.length}장 추가했습니다.`);
  };

  const deleteFromHistory = async (id) => {
    const target = history.find(h => h.id === id);
    if (!target) return;
    // 권한 체크: 삭제는 본인 소유 묶음만 (관리자도 남의 것은 조회만 가능)
    if (target.ownerUsername !== currentUser?.email) {
      safeAlert('다른 선생님의 묶음은 삭제할 수 없습니다. (조회만 가능)');
      return;
    }
    setHistory(prev => prev.filter(h => h.id !== id));
    try {
      await deleteHistoryItem(id, currentUser);
    } catch (e) {
      devWarn('저장소 삭제 실패:', e);
    }
  };

  const renameHistory = async (id, currentName) => {
    const target = history.find(h => h.id === id);
    if (!target) return;
    // 이름변경도 본인 소유만
    if (target.ownerUsername !== currentUser?.email) {
      safeAlert('다른 선생님의 묶음은 이름을 바꿀 수 없습니다. (조회만 가능)');
      return;
    }
    const newName = safePrompt('이 묶음의 이름을 정해주세요:', currentName);
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) return;
    await updateHistoryMeta(id, { name: trimmed.slice(0, 30) });
    await refreshHistory();
  };

  // ───── 내보내기 / 불러오기 ─────

  // 묶음 한 개 또는 여러 개를 .json 파일로 다운로드
  const exportBundle = (bundles, filename) => {
    const data = {
      app: '검단ABA AAC maker',
      version: 1,
      exportedAt: new Date().toISOString(),
      bundles: bundles.map(b => ({
        name: b.name,
        date: b.date,
        cards: b.cards.map(c => ({ image: c.image, label: c.label })),
        sizeMm: b.sizeMm,
        labelPos: b.labelPos,
        fontId: b.fontId,
        labelSize: b.labelSize,
      })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportSingle = async (h) => {
    // stub이면 본문 로드
    let cards = h.cards;
    if (h._isStub) {
      const item = await loadHistoryItem(h.id, currentUser, h._ownerId);
      if (!item || !Array.isArray(item.cards)) {
        safeAlert('본문을 불러올 수 없습니다.');
        return;
      }
      cards = item.cards;
    }
    const bundle = { ...h, cards };
    const safeName = h.name.replace(/[\\/:*?"<>|]/g, '_').slice(0, 30);
    exportBundle([bundle], `AAC_${safeName}_${h.date.replace(/[\/: ]/g, '-')}.json`);
  };

  const exportAll = async () => {
    // 권한 필터링: 관리자는 전체, 선생님은 자기 것만
    const myHistory = currentUser?.role === 'admin'
      ? history
      : history.filter(h => h.ownerUsername === currentUser?.email);
    if (myHistory.length === 0) {
      safeAlert('내보낼 묶음이 없습니다.');
      return;
    }
    // 모든 묶음의 본문 로드 (병렬)
    const withCards = await Promise.all(myHistory.map(async (h) => {
      if (h._isStub) {
        const item = await loadHistoryItem(h.id, currentUser, h._ownerId);
        return { ...h, cards: item?.cards || [] };
      }
      return h;
    }));
    const today = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    exportBundle(withCards, `AAC_전체묶음_${withCards.length}개_${dateStr}.json`);
  };

  // 현재 편집 중인 카드 내보내기 (화면 정렬 + 필터 그대로 반영)
  const exportCurrent = () => {
    if (cards.length === 0) {
      safeAlert('내보낼 카드가 없습니다.');
      return;
    }
    // visibleCards = 카테고리 필터 + 정렬 + 검색 적용된 카드들
    const cardsToExport = visibleCards.length > 0 ? visibleCards : cards;
    const autoName = generateBundleName(cardsToExport);
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const safeName = autoName.replace(/[\\/:*?"<>|]/g, '_').slice(0, 30);
    exportBundle([{
      name: autoName,
      date: dateStr,
      cards: cardsToExport,
      sizeMm,
      labelPos,
      fontId,
      labelSize,
    }], `AAC_${safeName}.json`);
  };

  // .json 파일에서 묶음 불러오기 (히스토리에 추가)
  const importBundles = async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!data || !Array.isArray(data.bundles)) {
        safeAlert('이 파일은 검단ABA AAC maker 파일이 아닙니다.');
        return;
      }

      let addedCount = 0;
      let skippedCount = 0;

      // 본인 묶음 본문을 미리 로드해서 중복 검사
      const myStubs = history.filter(h => h.ownerUsername === currentUser?.email);

      for (const b of data.bundles) {
        if (!Array.isArray(b.cards) || b.cards.length === 0) continue;

        // 본인 묶음 중 카드 수 일치하는 것만 본문 로드해서 비교
        let isDup = false;
        for (const stub of myStubs) {
          if (stub.cardCount !== b.cards.length) continue;
          const item = await loadHistoryItem(stub.id, currentUser);
          if (item && isSameCardSet(item.cards, b.cards)) {
            isDup = true;
            break;
          }
        }

        if (isDup) {
          skippedCount++;
          continue;
        }

        const now = new Date();
        const snapshot = {
          id: `hist_${Date.now()}_${Math.random().toString(36).slice(2, 6)}_${addedCount}`,
          name: b.name || '불러온 묶음',
          date: b.date || `${now.getMonth() + 1}/${now.getDate()}`,
          timestamp: now.getTime() + addedCount,
          cards: b.cards.map(c => ({
            id: newId(),
            image: c.image || '',
            label: c.label || '',
          })),
          sizeMm: b.sizeMm || 45,
          labelPos: b.labelPos || 'bottom',
          fontId: b.fontId || 'round',
          labelSize: b.labelSize || 14,
          ownerUsername: currentUser?.email || 'unknown',
          ownerName: currentUser?.name || '알 수 없음',
        };
        await addHistoryItem(snapshot, currentUser);
        addedCount++;
      }

      await refreshHistory();

      const msg = [];
      if (addedCount > 0) msg.push(`${addedCount}개 묶음을 추가했습니다.`);
      if (skippedCount > 0) msg.push(`이미 있는 묶음 ${skippedCount}개는 건너뛰었습니다.`);
      if (msg.length === 0) msg.push('새로 추가된 묶음이 없습니다.');
      safeAlert(msg.join('\n'));
      setShowHistory(true);
    } catch (e) {
      devError('불러오기 실패:', e);
      safeAlert('파일을 읽을 수 없습니다. 올바른 .json 파일인지 확인해주세요.');
    }
  };

  const importFileRef = useRef(null);
  const handleImportClick = () => importFileRef.current?.click();
  const handleImportChange = (e) => {
    const file = e.target.files?.[0];
    if (file) importBundles(file);
    e.target.value = '';
  };

  // ───── 라이브러리로 묶음(.json) 불러오기 ─────
  // 파일 안 모든 묶음의 카드를 "지금 보고 있는 라이브러리 카테고리"에 넣음
  const importToLibrary = async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data || !Array.isArray(data.bundles)) {
        safeAlert('이 파일은 검단ABA AAC maker 파일이 아닙니다.');
        return;
      }
      const incoming = [];
      for (const b of data.bundles) {
        if (!Array.isArray(b.cards)) continue;
        for (const c of b.cards) {
          if (!c.image) continue;
          incoming.push({ id: newId(), image: c.image, originalImage: c.originalImage || null, label: c.label || '' });
        }
      }
      if (incoming.length === 0) { safeAlert('불러올 카드가 없습니다.'); return; }
      const { okCount, failCount } = await addCardsToLibrary(incoming, libraryCatId);
      const catName = libraryCatId
        ? (categories.find(c => c.id === libraryCatId)?.name || '카테고리')
        : '미분류';
      if (failCount > 0) {
        safeAlert(`"${catName}"에 ${okCount}장 저장됨.\n${failCount}장은 저장 실패(용량 문제일 수 있음).`);
      } else {
        safeAlert(`"${catName}"에 ${okCount}장을 추가했습니다.`);
      }
    } catch (e) {
      devError('라이브러리 불러오기 실패:', e);
      safeAlert('파일을 읽을 수 없습니다. 올바른 .json 파일인지 확인해주세요.');
    }
  };
  const libraryImportFileRef = useRef(null);
  const handleLibraryImportClick = () => libraryImportFileRef.current?.click();
  const handleLibraryImportChange = (e) => {
    const file = e.target.files?.[0];
    if (file) importToLibrary(file);
    e.target.value = '';
  };

  // 인쇄 (PDF 저장은 브라우저 인쇄 → PDF로 저장)
  // 1단계: 미리보기 화면으로 이동 (sandbox에서는 window.print 차단되므로 사용자가 직접 누르도록)
  const handlePrint = async () => {
    if (cards.length === 0) {
      safeAlert('카드를 먼저 추가해주세요!');
      return;
    }
    if (visibleCards.length === 0) {
      safeAlert('지금 필터링 중인 카테고리에는 카드가 없습니다.\n전체 카드를 인쇄하려면 "전체 카드" 필터를 선택해주세요.');
      return;
    }
    // 미리보기 화면으로 이동
    setView('preview');
    // 인쇄 직전 히스토리에 자동 저장 (백그라운드)
    saveCurrentToHistory().catch(err => devWarn('히스토리 저장 실패:', err));
    // 미리보기 영역 맨 위로 스크롤
    // Claude 산출물 sandbox 환경에서는 window.print()가 차단되므로 사용자가 Ctrl+P를 직접 눌러야 함
    // 미리보기 화면에 큰 안내 메시지가 있음
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // 키보드 포커스를 메인 영역으로 옮겨 Ctrl+P가 잘 작동하도록
      try { document.activeElement?.blur(); } catch {}
    }, 100);
  };

  // 미리보기 화면에서 실제 인쇄 실행 (사용자가 명시적으로 클릭)
  const doActualPrint = async () => {
    // 인쇄 직전 폰트 로딩 한 번 더 보장 (미리보기 진입 직후 바로 클릭한 경우 대비)
    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
    } catch {
      // 폰트 대기 실패해도 인쇄는 계속 시도
    }
    // 방법 1: window.print() 직접
    try {
      window.print();
      return;
    } catch (err) {
      devWarn('방법 1 실패 (window.print):', err);
    }

    // 방법 2: parent window의 print 호출 (iframe 안일 때 부모로 시도)
    try {
      if (window.parent && window.parent !== window) {
        window.parent.print();
        return;
      }
    } catch (err) {
      devWarn('방법 2 실패 (parent.print):', err);
    }

    // 방법 3: 키보드 이벤트로 Ctrl+P 시뮬레이션 시도
    try {
      const event = new KeyboardEvent('keydown', {
        key: 'p',
        code: 'KeyP',
        keyCode: 80,
        which: 80,
        ctrlKey: true,
        metaKey: false,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(event);
      window.dispatchEvent(event);
      // 일반적으로 안 됨 (브라우저는 합성 키 이벤트로 인쇄 안 띄움) 하지만 시도는 함
    } catch (err) {
      devWarn('방법 3 실패 (synthetic keypress):', err);
    }

    // 방법 4: 위 모든 게 안 됐을 때 — 토스트로 키보드 안내
    safeAlert('🖨️ 인쇄 대화상자가 자동으로 안 열리네요.\n\n키보드의 Ctrl+P (Mac: Cmd+P)를 직접 눌러주세요.\n인쇄 대상에서 "PDF로 저장"을 선택하면 됩니다.');
  };

  // ───── 로그인 안 된 경우 ─────
  if (!authChecked) {
    // 초기 세션 체크 중 - 빈 화면
    return <div className="min-h-screen bg-stone-50" />;
  }
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 print:min-h-0" style={{ fontFamily: font.css }}>
      {/* 이미지 처리 중 배너 - 우상단 고정. 사용자가 여러 장 추가했을 때 "안 눌렸나?" 오해 방지 */}
      {imageProcessing && (
        <div
          className="fixed top-20 right-4 z-[60] bg-white border border-stone-300 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 no-print"
          role="status"
          aria-live="polite"
        >
          <span className="inline-block w-4 h-4 border-2 border-stone-700 border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
          <span className="text-sm text-stone-800 font-medium">
            이미지 처리 중 ({imageProcessing.current} / {imageProcessing.total})
          </span>
        </div>
      )}

      {/* 사용자 관리 모달 (관리자 전용) */}
      {showUserManagement && currentUser.role === 'admin' && (
        <UserManagement
          users={users}
          currentUser={currentUser}
          onUpdate={setUsers}
          onClose={() => setShowUserManagement(false)}
        />
      )}

      {/* 카테고리 관리 모달 */}
      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          onUpdate={handleCategoriesUpdate}
          onClose={() => setShowCategoryManager(false)}
        />
      )}

      {/* 첫 사용 튜토리얼 */}
      {showTutorial && (
        <TutorialOverlay onClose={closeTutorial} />
      )}

      {/* 일괄 라벨 편집 모달 */}
      {showBulkEditor && cards.length > 0 && (
        <BulkLabelEditor
          cards={cards}
          categories={categories}
          onUpdate={applyBulkEdit}
          onClose={() => setShowBulkEditor(false)}
        />
      )}

      {/* 이미지 편집 모달 */}
      {editingImageCard && (
        <ImageEditor
          card={editingImageCard}
          onSave={(updatedCard) => {
            updateCard(updatedCard.id, updatedCard);
            setEditingImageCard(null);
          }}
          onClose={() => setEditingImageCard(null)}
        />
      )}


      {/* 묶음 불러오기 모달 (자동 저장 + 외부 파일) */}
      {showBundleLoader && (() => {
        const visibleHistory = currentUser?.role === 'admin'
          ? history
          : history.filter(h => h.ownerUsername === currentUser?.email);
        const filtered = historySearch.trim()
          ? visibleHistory.filter(h =>
              h.name.toLowerCase().includes(historySearch.toLowerCase()) ||
              (h.ownerName || '').toLowerCase().includes(historySearch.toLowerCase())
            )
          : visibleHistory;
        return (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                 style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
              {/* 헤더 */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-stone-700" />
                  <h2 className="text-base font-bold text-stone-900">묶음 불러오기</h2>
                </div>
                <button onClick={() => setShowBundleLoader(false)} className="p-2 hover:bg-stone-100 rounded-lg transition">
                  <X className="w-4 h-4 text-stone-600" />
                </button>
              </div>

              {/* 탭 */}
              <div className="px-5 pt-3 border-b border-stone-100">
                <div className="flex gap-1 bg-stone-100 rounded-lg p-1">
                  <button
                    onClick={() => setBundleLoaderTab('saved')}
                    className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition relative ${
                      bundleLoaderTab === 'saved'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                  >
                    저장된 묶음
                    {visibleHistory.length > 0 && (
                      <span className="ml-1 text-[10px] font-bold text-white bg-amber-500 rounded-full px-1.5 py-0.5 tabular-nums">
                        {visibleHistory.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setBundleLoaderTab('file')}
                    className={`flex-1 px-3 py-2 text-xs font-semibold rounded-md transition ${
                      bundleLoaderTab === 'file'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                    }`}
                  >
                    파일에서 불러오기
                  </button>
                </div>
                <p className="text-[10px] text-stone-500 mt-2 px-1">
                  {bundleLoaderTab === 'saved'
                    ? (isAdmin ? '관리자: 모든 선생님의 묶음을 봅니다' : '내가 인쇄한 카드 묶음을 다시 불러올 수 있어요')
                    : '다른 선생님이 카톡으로 보내준 .json 파일을 불러오기'}
                </p>
              </div>

              {/* 본문 */}
              <div className="flex-1 overflow-y-auto p-4">
                {bundleLoaderTab === 'saved' ? (
                  <>
                    {/* 검색 */}
                    {visibleHistory.length > 3 && (
                      <div className="mb-3 flex items-center gap-1.5 bg-stone-100 rounded-lg px-3 py-2">
                        <Search className="w-3.5 h-3.5 text-stone-400" />
                        <input
                          type="text"
                          value={historySearch}
                          onChange={(e) => setHistorySearch(e.target.value)}
                          placeholder="이름으로 검색"
                          className="flex-1 bg-transparent text-xs outline-none text-stone-800"
                        />
                      </div>
                    )}

                    {/* 목록 */}
                    {filtered.length === 0 ? (
                      <div className="py-12 text-center">
                        <History className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                        <p className="text-sm text-stone-500">
                          {historySearch ? '검색 결과가 없습니다' : '아직 저장된 묶음이 없습니다'}
                        </p>
                        {!historySearch && (
                          <p className="text-xs text-stone-400 mt-1">PDF로 저장할 때 자동으로 보관됩니다</p>
                        )}
                      </div>
                    ) : isAdmin ? (
                      // ───── 관리자: 선생님별 폴더 그룹화 ─────
                      (() => {
                        // 선생님별로 그룹화
                        const groups = {};
                        filtered.forEach(h => {
                          const owner = h.ownerUsername || 'unknown';
                          if (!groups[owner]) {
                            groups[owner] = { name: h.ownerName || '알 수 없음', items: [] };
                          }
                          groups[owner].items.push(h);
                        });
                        // 본인 묶음을 맨 위로, 나머지는 이름순
                        const sortedOwners = Object.keys(groups).sort((a, b) => {
                          if (a === currentUser?.email) return -1;
                          if (b === currentUser?.email) return 1;
                          return groups[a].name.localeCompare(groups[b].name);
                        });
                        return (
                          <div className="space-y-2">
                            {sortedOwners.map(owner => {
                              const group = groups[owner];
                              const isOpen = expandedOwners[owner] !== false; // 기본 펼침
                              const isMine = owner === currentUser?.email;
                              return (
                                <div key={owner} className="bg-stone-50 border border-stone-200 rounded-lg overflow-hidden">
                                  {/* 폴더 헤더 */}
                                  <button
                                    onClick={() => setExpandedOwners(prev => ({ ...prev, [owner]: !isOpen }))}
                                    className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-stone-100 transition"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                        isMine ? 'bg-amber-100 text-amber-700' : 'bg-stone-200 text-stone-600'
                                      }`}>
                                        {(group.name || '?').charAt(0)}
                                      </div>
                                      <div className="text-left">
                                        <div className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                                          {group.name}
                                          {isMine && (
                                            <span className="text-[9px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">나</span>
                                          )}
                                        </div>
                                        <div className="text-[10px] text-stone-500">{group.items.length}개 묶음</div>
                                      </div>
                                    </div>
                                    {isOpen ? (
                                      <ChevronUp className="w-4 h-4 text-stone-400" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-stone-400" />
                                    )}
                                  </button>

                                  {/* 폴더 내용 */}
                                  {isOpen && (
                                    <div className="px-2 pb-2 space-y-1.5 bg-white">
                                      {group.items.map((h) => (
                                        <div key={h.id} className="bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-300 transition">
                                          <div className="flex items-start gap-3 mb-2">
                                            {/* 썸네일 */}
                                            <div className="flex-shrink-0 grid grid-cols-2 gap-0.5 w-12 h-12">
                                              {(h.thumbnails || h.cards?.slice(0, 4).map(c => c.image) || []).slice(0, 4).map((thumb, i) => (
                                                thumb ? (
                                                  <img key={i} src={thumb} alt="" className="w-full h-full object-cover rounded-sm" />
                                                ) : (
                                                  <div key={i} className="w-full h-full bg-stone-100 rounded-sm" />
                                                )
                                              ))}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                              <p className="text-sm font-bold text-stone-900 truncate">{h.name}</p>
                                              <p className="text-[10px] text-stone-500">
                                                {h.date} · {h.cardCount || h.cards?.length || 0}장 · {h.sizeMm}mm
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1 mt-2">
                                            <button
                                              onClick={() => { loadFromHistory(h); setShowBundleLoader(false); }}
                                              className="flex-1 min-w-0 px-2 py-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold rounded transition flex items-center justify-center gap-1"
                                            >
                                              <Plus className="w-3 h-3" strokeWidth={2.5} />
                                              추가
                                            </button>
                                            <button
                                              onClick={() => exportSingle(h)}
                                              className="p-2 bg-white hover:bg-blue-50 hover:border-blue-200 border border-stone-200 text-stone-600 hover:text-blue-600 rounded transition flex-shrink-0"
                                              title="이 묶음 파일로 내보내기"
                                            >
                                              <Share2 className="w-3.5 h-3.5" />
                                            </button>
                                            {isMine && (
                                            <button
                                              onClick={() => renameHistory(h.id, h.name)}
                                              className="p-2 bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 rounded transition flex-shrink-0"
                                              title="이름 바꾸기"
                                            >
                                              <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            )}
                                            {isMine && (
                                            <button
                                              onClick={() => deleteFromHistory(h.id)}
                                              className="p-2 bg-white hover:bg-red-50 hover:border-red-200 border border-stone-200 text-stone-600 hover:text-red-500 rounded transition flex-shrink-0"
                                              title="삭제"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()
                    ) : (
                      // ───── 선생님: 자기 묶음만 평탄한 리스트 ─────
                      <div className="space-y-2">
                        {filtered.map((h) => (
                          <div key={h.id} className="bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-300 transition">
                            <div className="flex items-start gap-3 mb-2">
                              {/* 썸네일 */}
                              <div className="flex-shrink-0 grid grid-cols-2 gap-0.5 w-12 h-12">
                                {(h.thumbnails || h.cards?.slice(0, 4).map(c => c.image) || []).slice(0, 4).map((thumb, i) => (
                                  thumb ? (
                                    <img key={i} src={thumb} alt="" className="w-full h-full object-cover rounded-sm" />
                                  ) : (
                                    <div key={i} className="w-full h-full bg-stone-100 rounded-sm" />
                                  )
                                ))}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-stone-900 truncate">{h.name}</p>
                                <p className="text-[10px] text-stone-500">
                                  {h.date} · {h.cardCount || h.cards?.length || 0}장 · {h.sizeMm}mm
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-2">
                              <button
                                onClick={() => { loadFromHistory(h); setShowBundleLoader(false); }}
                                className="flex-1 min-w-0 px-2 py-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold rounded transition flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3 h-3" strokeWidth={2.5} />
                                추가
                              </button>
                              <button
                                onClick={() => exportSingle(h)}
                                className="p-2 bg-white hover:bg-blue-50 hover:border-blue-200 border border-stone-200 text-stone-600 hover:text-blue-600 rounded transition flex-shrink-0"
                                title="이 묶음 파일로 내보내기"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => renameHistory(h.id, h.name)}
                                className="p-2 bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 rounded transition flex-shrink-0"
                                title="이름 바꾸기"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteFromHistory(h.id)}
                                className="p-2 bg-white hover:bg-red-50 hover:border-red-200 border border-stone-200 text-stone-600 hover:text-red-500 rounded transition flex-shrink-0"
                                title="삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* 파일 탭 */
                  <div className="py-8">
                    <button
                      onClick={() => {
                        handleImportClick();
                        setShowBundleLoader(false);
                      }}
                      className="w-full py-12 border-2 border-dashed border-stone-300 hover:border-amber-400 hover:bg-amber-50 rounded-lg transition flex flex-col items-center justify-center gap-3"
                    >
                      <Upload className="w-12 h-12 text-stone-400" />
                      <div>
                        <p className="text-sm font-bold text-stone-900">.json 파일 선택</p>
                        <p className="text-[11px] text-stone-500 mt-1">카톡 등으로 받은 묶음 파일</p>
                      </div>
                    </button>
                    <div className="mt-6 bg-stone-50 rounded-lg p-3">
                      <p className="text-[11px] font-bold text-stone-700 mb-1">📤 파일 만들기</p>
                      <p className="text-[10px] text-stone-600 leading-relaxed">
                        저장된 묶음에서 <Share2 className="w-3 h-3 inline mx-0.5" /> 아이콘을 누르거나, 사이드바 "현재 카드 내보내기"를 눌러서 .json 파일로 저장할 수 있어요.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* 인쇄 전용 스타일 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@400;500;600;700&family=Noto+Serif+KR:wght@400;600&display=swap');

        @media print {
          @page { size: A4; margin: 0; }
          html, body { min-height: 0 !important; height: auto !important; margin: 0 !important; padding: 0 !important; background: white !important; }
          body { background: white !important; }
          .no-print { display: none !important; }
          [data-print-page] { page-break-after: always; box-shadow: none !important; margin: 0 !important; }
          [data-print-page]:last-child { page-break-after: auto; }
        }
      `}</style>

      {/* 상단 바 */}
      <header className="no-print sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink">
            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-stone-100 rounded-md transition flex-shrink-0"
              title="메뉴"
              aria-label="메뉴 열기"
            >
              <Menu className="w-5 h-5 text-stone-700" />
            </button>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm overflow-hidden p-1 flex-shrink-0">
              <img src={LOGO_DATA_URL} alt="검단ABA" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-stone-900 leading-tight truncate">검단ABA AAC maker</h1>
              <p className="hidden sm:block text-[11px] text-stone-500 leading-tight truncate">
                언어행동연구소
                {cards.length > 0 && (
                  <>
                    {' · '}
                    <span className="font-semibold text-stone-700">{cards.length}장</span>
                    {cards.filter(c => c.label.trim()).length < cards.length && (
                      <span className="text-amber-600">
                        {' '}(글자 {cards.filter(c => c.label.trim()).length}장)
                      </span>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 flex-nowrap">
            <div className="hidden md:flex items-center bg-stone-100 rounded-lg p-0.5">
              <button
                onClick={() => setView('edit')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${view === 'edit' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                편집
              </button>
              <button
                onClick={() => setView('preview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${view === 'preview' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                인쇄 미리보기
              </button>
            </div>
            {/* 모바일: 편집/미리보기 단일 토글 버튼 */}
            <button
              onClick={() => setView(view === 'edit' ? 'preview' : 'edit')}
              className="md:hidden p-2 hover:bg-stone-100 rounded-md transition"
              title={view === 'edit' ? '인쇄 미리보기' : '편집으로'}
            >
              <Eye className="w-4 h-4 text-stone-700" />
            </button>
            <button
              onClick={() => setShowBundleLoader(true)}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold rounded-lg shadow-sm transition relative"
              title="저장된 묶음 / 파일 불러오기"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">묶음 불러오기</span>
              {history.filter(h => currentUser?.role === 'admin' || h.ownerUsername === currentUser?.email).length > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] font-bold text-white bg-amber-500 rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center tabular-nums">
                  {history.filter(h => currentUser?.role === 'admin' || h.ownerUsername === currentUser?.email).length}
                </span>
              )}
            </button>
            <input
              ref={importFileRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImportChange}
              className="hidden"
            />

            {/* 구분선 */}
            <div className="hidden sm:block h-6 w-px bg-stone-200 mx-1 flex-shrink-0" />

            {/* 사용자 메뉴 */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${currentUser.role === 'admin' ? 'bg-amber-100' : 'bg-stone-200'}`}>
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                ) : (
                  <span className="text-[10px] font-bold text-stone-600">
                    {(currentUser.name || currentUser.email || '?').charAt(0)}
                  </span>
                )}
              </div>
              {/* 사용자 이름 - 넓은 화면에서만 표시, 좁으면 자동 숨김 */}
              <div className="hidden md:block leading-tight pr-1 max-w-[80px] overflow-hidden">
                <p className="text-[11px] font-bold text-stone-900 truncate whitespace-nowrap">{currentUser.name || currentUser.email}</p>
                <p className="text-[9px] text-stone-500 whitespace-nowrap">
                  {currentUser.role === 'admin' ? '관리자' : '선생님'}
                </p>
              </div>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setShowUserManagement(true)}
                  className="p-1.5 hover:bg-stone-100 rounded-md transition flex-shrink-0"
                  title="선생님 계정 관리"
                >
                  <Users className="w-3.5 h-3.5 text-stone-600" />
                </button>
              )}
              <button
                onClick={() => setShowTutorial(true)}
                className="hidden sm:flex p-1.5 hover:bg-stone-100 rounded-md transition flex-shrink-0"
                title="사용법 다시 보기"
              >
                <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
              </button>
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-md transition text-stone-600 flex-shrink-0"
                title="로그아웃"
                aria-label="로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6 grid grid-cols-12 gap-3 sm:gap-6 print:max-w-none print:p-0 print:m-0 print:block print:gap-0">
        {/* 모바일 백드롭 */}
        {mobileSidebarOpen && (
          <div
            className="no-print md:hidden fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* 왼쪽 설정 패널 - 데스크탑에선 sticky 사이드바, 모바일에선 슬라이드 패널 */}
        <aside className={`no-print col-span-12 md:col-span-3 space-y-4 ${
          mobileSidebarOpen
            ? 'fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-stone-50 overflow-y-auto p-4 shadow-2xl md:static md:p-0 md:bg-transparent md:shadow-none md:overflow-visible'
            : 'hidden md:block'
        }`}>
          {/* 모바일 사이드바 헤더 (닫기 버튼) */}
          {mobileSidebarOpen && (
            <div className="md:hidden flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <h2 className="text-base font-bold text-stone-900">메뉴</h2>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 hover:bg-stone-200 rounded-md transition"
              >
                <X className="w-5 h-5 text-stone-700" />
              </button>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition"
            >
              <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-stone-700" />
                <h2 className="text-sm font-bold text-stone-900">설정</h2>
                {(doubleSided || cardRadius > 0 || safetyMargin > 0 || !showCutLines || cutLineStyle !== 'dashed') && (
                  <span className="text-[10px] font-medium text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
                    인쇄 옵션 적용 중
                  </span>
                )}
              </div>
              {settingsOpen ? (
                <ChevronUp className="w-4 h-4 text-stone-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {settingsOpen && (
              <div className="px-5 pb-5 border-t border-stone-100 pt-4">
            {/* 탭 헤더 */}
            <div className="flex gap-1 bg-stone-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setSettingsTab('card')}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                  settingsTab === 'card'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                카드 설정
              </button>
              <button
                onClick={() => setSettingsTab('print')}
                className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md transition relative ${
                  settingsTab === 'print'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                인쇄 옵션
                {(doubleSided || cardRadius > 0 || safetyMargin > 0 || !showCutLines || cutLineStyle !== 'dashed') && (
                  <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                )}
              </button>
            </div>

            {/* 탭 내용: 카드 설정 */}
            {settingsTab === 'card' && (
              <div>
                {/* 크기 */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2 block">크기</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt.mm}
                        onClick={() => setSizeMm(opt.mm)}
                        className={`px-2 py-2 rounded-lg text-xs font-semibold transition border ${
                          sizeMm === opt.mm
                            ? 'bg-amber-50 border-amber-300 text-amber-900'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        <div>{opt.label}</div>
                        <div className="text-[10px] font-normal opacity-70">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 라벨 위치 */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2 block">글자 위치</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {LABEL_POS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setLabelPos(opt.id)}
                        className={`px-2 py-2 rounded-lg text-xs font-medium transition border ${
                          labelPos === opt.id
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 폰트 */}
                <div className="mb-5">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2 block">글씨체</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {FONT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setFontId(opt.id)}
                        style={{ fontFamily: opt.css }}
                        className={`px-2 py-2 rounded-lg text-sm font-semibold transition border ${
                          fontId === opt.id
                            ? 'bg-amber-50 border-amber-300 text-amber-900'
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 글자 크기 */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">글자 크기</label>
                    <span className="text-xs font-bold text-stone-700 tabular-nums">{labelSize}px</span>
                  </div>
                  <input
                    type="range" min="8" max="24" value={labelSize}
                    onChange={(e) => setLabelSize(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* 카드 간격 */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">카드 간격</label>
                    <span className="text-xs font-bold text-stone-700 tabular-nums">{gap}mm</span>
                  </div>
                  <input
                    type="range" min="0" max="10" value={gap}
                    onChange={(e) => setGap(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            )}

            {/* 탭 내용: 인쇄 옵션 */}
            {settingsTab === 'print' && (
              <div className="space-y-4">
                {/* 자르는 선 */}
                <div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-stone-900">자르는 선</div>
                      <div className="text-[10px] text-stone-500">카드 자를 때 따라가는 선</div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={showCutLines}
                        onChange={(e) => setShowCutLines(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-200 peer-checked:bg-amber-500 rounded-full transition" />
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition shadow" />
                    </div>
                  </label>
                  {showCutLines && (
                    <div className="mt-2.5 space-y-2.5 pl-1">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-semibold text-stone-600">선 굵기</label>
                          <span className="text-[10px] font-bold text-stone-700 tabular-nums">{cutLineWidth}px</span>
                        </div>
                        <input
                          type="range" min="0.5" max="3" step="0.5" value={cutLineWidth}
                          onChange={(e) => setCutLineWidth(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-stone-600 block mb-1">선 종류</label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: 'dashed', label: '점선', preview: '╌╌' },
                            { id: 'dotted', label: '도트', preview: '⋯⋯' },
                            { id: 'solid', label: '실선', preview: '──' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setCutLineStyle(opt.id)}
                              className={`px-1 py-1.5 rounded text-[10px] font-semibold transition border ${
                                cutLineStyle === opt.id
                                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                              }`}
                            >
                              <div className="text-sm leading-none mb-0.5">{opt.preview}</div>
                              <div>{opt.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 모서리 둥글기 */}
                <div className="border-t border-stone-100 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-stone-900">모서리 둥글기</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">
                      {cardRadius === 0 ? '없음' : `${cardRadius}mm`}
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="8" value={cardRadius}
                    onChange={(e) => setCardRadius(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <p className="text-[10px] text-stone-500 mt-0.5">가위질 후 모서리 안전</p>
                </div>

                {/* 코팅 여백 */}
                <div className="border-t border-stone-100 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-stone-900">코팅 여백</label>
                    <span className="text-[11px] font-bold text-stone-700 tabular-nums">
                      {safetyMargin === 0 ? '없음' : `${safetyMargin}mm`}
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="5" value={safetyMargin}
                    onChange={(e) => setSafetyMargin(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <p className="text-[10px] text-stone-500 mt-0.5">코팅 후 자르기용 여백</p>
                </div>

                {/* 양면 인쇄 */}
                <div className="border-t border-stone-100 pt-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <div className="text-xs font-bold text-stone-900">양면 인쇄</div>
                      <div className="text-[10px] text-stone-500">앞면 + 뒷면 인쇄</div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={doubleSided}
                        onChange={(e) => setDoubleSided(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-stone-200 peer-checked:bg-amber-500 rounded-full transition" />
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition shadow" />
                    </div>
                  </label>

                  {doubleSided && (
                    <div className="mt-2.5 space-y-2.5 pl-1">
                      <div>
                        <label className="text-[10px] font-semibold text-stone-600 block mb-1">뒷면 디자인</label>
                        <div className="grid grid-cols-2 gap-1">
                          {[
                            { id: 'label', label: '글자만' },
                            { id: 'logo', label: '로고' },
                            { id: 'solid', label: '단색' },
                            { id: 'pattern', label: '패턴' },
                          ].map(opt => (
                            <button
                              key={opt.id}
                              onClick={() => setBackDesign(opt.id)}
                              className={`px-2 py-1.5 text-[10px] font-medium rounded border transition ${
                                backDesign === opt.id
                                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                                  : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {(backDesign === 'solid' || backDesign === 'pattern') && (
                        <div>
                          <label className="text-[10px] font-semibold text-stone-600 block mb-1">뒷면 색</label>
                          <div className="flex gap-1 flex-wrap">
                            {['#fef3c7', '#fee2e2', '#dbeafe', '#dcfce7', '#f3e8ff', '#f5f5f4', '#1c1917'].map(c => (
                              <button
                                key={c}
                                onClick={() => setBackColor(c)}
                                className={`w-6 h-6 rounded-md border-2 transition ${
                                  backColor === c ? 'border-stone-900 scale-110' : 'border-stone-200'
                                }`}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-[9px] text-amber-700 bg-amber-50 rounded px-2 py-1.5 leading-snug">
                        💡 짝수 페이지를 뒤집어 다시 넣기
                      </p>
                    </div>
                  )}
                </div>

                {/* 기본값으로 */}
                <button
                  onClick={() => {
                    setCardRadius(0);
                    setSafetyMargin(0);
                    setDoubleSided(false);
                    setBackDesign('label');
                    setBackColor('#fef3c7');
                    setShowCutLines(true);
                    setCutLineWidth(1);
                    setCutLineStyle('dashed');
                  }}
                  className="w-full px-3 py-2 mt-2 text-[11px] font-medium text-stone-600 bg-stone-50 hover:bg-stone-100 rounded-lg transition"
                >
                  ↺ 인쇄 옵션 기본값으로
                </button>
              </div>
            )}
              </div>
            )}
          </div>

          {/* 카드 정렬 */}
          {cards.length > 1 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpDown className="w-4 h-4 text-stone-700" />
                <h2 className="text-sm font-bold text-stone-900">카드 정렬</h2>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'default', label: '원래 순서', desc: '추가한대로' },
                  { id: 'label', label: '가나다순', desc: 'ㄱ→ㅎ' },
                  { id: 'category', label: '카테고리순', desc: '같은것끼리' },
                  { id: 'shortest', label: '짧은 라벨', desc: '글자 적은순' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortMode(opt.id)}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold transition border ${
                      sortMode === opt.id
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div>{opt.label}</div>
                    <div className="text-[10px] font-normal opacity-70">{opt.desc}</div>
                  </button>
                ))}
              </div>
              {sortMode !== 'default' && (
                <p className="text-[10px] text-amber-700 bg-amber-50 rounded px-2 py-1.5 mt-2 leading-snug">
                  💡 정렬된 순서대로 인쇄/저장됩니다 · 원본 카드 순서는 그대로 유지
                </p>
              )}
            </div>
          )}

          {/* 카드 액션 (카드가 있을 때만) */}
          {cards.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
              <button
                onClick={() => setShowBulkEditor(true)}
                className="w-full py-2 text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-700 border border-stone-200 hover:border-amber-200 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Edit3 className="w-3 h-3" />
                일괄 라벨 편집
              </button>
              <button
                onClick={exportCurrent}
                className="w-full py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3 h-3" />
                현재 카드 내보내기
              </button>
              <button
                onClick={clearAll}
                className="w-full py-2 text-xs font-medium text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3 h-3" />
                전체 삭제
              </button>
            </div>
          )}

          {/* 카테고리 패널 (접기 가능) — 라이브러리 도입으로 숨김. 카테고리 관리는 상단 '카테고리' 탭에서. */}
          {false && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition"
            >
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-stone-700" />
                <h2 className="text-sm font-bold text-stone-900">카테고리</h2>
                {categories.length > 0 && (
                  <span className="text-[10px] font-bold text-white bg-amber-500 rounded-full px-1.5 py-0.5 tabular-nums min-w-[18px] text-center">
                    {categories.length}
                  </span>
                )}
                {filterCategoryId && (
                  <span className="text-[10px] font-medium text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">
                    필터 중
                  </span>
                )}
              </div>
              {categoryOpen ? (
                <ChevronUp className="w-4 h-4 text-stone-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-400" />
              )}
            </button>

            {categoryOpen && (
              <div className="px-5 pb-5 border-t border-stone-100">
                <div className="flex justify-end mb-3 mt-3">
                  <button
                    onClick={() => setShowCategoryManager(true)}
                    className="p-1.5 hover:bg-stone-100 rounded transition"
                    title="카테고리 관리"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-stone-600" />
                  </button>
                </div>

            {categories.length === 0 ? (
              <button
                onClick={() => setShowCategoryManager(true)}
                className="w-full py-3 text-xs font-medium text-stone-500 hover:text-amber-700 border-2 border-dashed border-stone-200 hover:border-amber-300 hover:bg-amber-50 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                카테고리 만들기
              </button>
            ) : (
              <>
                {/* 필터 버튼들 */}
                <div className="space-y-1">
                  <button
                    onClick={() => setFilterCategoryId(null)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition flex items-center justify-between ${
                      filterCategoryId === null
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <span>전체 카드</span>
                    <span className="text-[10px] opacity-70 tabular-nums">{cards.length}</span>
                  </button>
                  {categories.map((c) => {
                    const count = cards.filter(card => card.categoryId === c.id).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setFilterCategoryId(c.id === filterCategoryId ? null : c.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition flex items-center gap-2 ${
                          filterCategoryId === c.id
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: c.color }}
                        />
                        <span className="flex-1 truncate">{c.name}</span>
                        <span className="text-[10px] opacity-70 tabular-nums flex-shrink-0">{count}</span>
                      </button>
                    );
                  })}
                </div>
                {filterCategoryId && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 rounded px-2 py-1 mt-2 text-center">
                    💡 필터링 중 - 인쇄 시 보이는 카드만 출력됩니다
                  </p>
                )}
              </>
            )}
              </div>
            )}
          </div>
          )}

        </aside>

        {/* 메인 영역 */}
        <main className="col-span-12 md:col-span-9">
          {/* 인쇄판 ⇄ 라이브러리 전환 토글 */}
          <div className="no-print flex items-center gap-1 bg-stone-100 rounded-xl p-1 mb-4">
            <button
              onClick={() => setViewMode('print')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                viewMode === 'print' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <FileDown className="w-4 h-4" /> 인쇄판
              {cards.length > 0 && <span className="tabular-nums opacity-70">{cards.length}</span>}
            </button>
            <button
              onClick={() => setViewMode('library')}
              className={`flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
                viewMode === 'library' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <Folder className="w-4 h-4" /> 카테고리
            </button>
          </div>

          {viewMode === 'library' ? (
            <>
            <input
              ref={libraryImportFileRef}
              type="file"
              accept="application/json,.json"
              onChange={handleLibraryImportChange}
              className="hidden"
            />
            <input
              ref={libraryImageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={onFileChange}
              className="hidden"
            />
            <LibraryView
              library={library}
              categories={categories}
              libraryCatId={libraryCatId}
              setLibraryCatId={setLibraryCatId}
              selected={librarySelected}
              setSelected={setLibrarySelected}
              onAddToPrint={addSelectedToPrint}
              onAddImagesClick={() => libraryImageInputRef.current?.click()}
              onImportClick={handleLibraryImportClick}
              onManageCategories={() => setShowCategoryManager(true)}
              onDiagnose={diagnoseLibrary}
              diagResult={diagResult}
              onDeleteCard={deleteLibraryCardById}
              onDeleteSelected={deleteSelectedLibraryCards}
              cardSearch={librarySearch}
              setCardSearch={setLibrarySearch}
            />
            </>
          ) : view === 'edit' ? (
            <>
              {/* 업로드 영역 - 카드 있으면 작게, 없으면 크게 */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`no-print cursor-pointer rounded-2xl border-2 border-dashed transition text-center ${
                  cards.length > 0
                    ? 'p-2 sm:p-3 mb-3'  // 카드 있을 때: 작게
                    : 'p-4 sm:p-8 mb-4 sm:mb-6'  // 카드 없을 때: 크게
                } ${
                  isDragging
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-stone-300 bg-white hover:border-stone-400 hover:bg-stone-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={onFileChange}
                  className="hidden"
                />
                {cards.length > 0 ? (
                  // 작은 버전: 한 줄로 표시
                  <div className="flex items-center justify-center gap-2 text-stone-600 hover:text-stone-800">
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                    <span className="text-xs sm:text-sm font-semibold">이미지 추가</span>
                    <span className="hidden sm:inline text-[10px] text-stone-400">(드래그/클릭, 여러 장 가능)</span>
                  </div>
                ) : (
                  // 큰 버전: 처음 사용자용
                  <>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full bg-stone-100 flex items-center justify-center">
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" strokeWidth={2} />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-stone-800 mb-1">
                      <span className="hidden sm:inline">이미지를 끌어다 놓거나 클릭해서 선택</span>
                      <span className="sm:hidden">탭해서 이미지 선택</span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-stone-500">
                      여러 장 한꺼번에 가능 · 파일명이 자동으로 라벨이 됩니다
                    </p>
                  </>
                )}
              </div>

              {/* 인쇄 버튼 (카드 있을 때만) - 누르면 이름 물어보고 저장+인쇄 */}
              {cards.length > 0 && (
                <div className="no-print flex items-center justify-center gap-2 mb-4 flex-wrap">
                  <button
                    onClick={() => {
                      if (visibleCards.length === 0) { safeAlert('인쇄할 카드가 없습니다.'); return; }
                      const name = safePrompt('아이 이름(또는 세트 이름)을 적어주세요.\n비워두면 이름 없이 인쇄만 합니다.', '');
                      if (name === null) return; // 취소 → 아무것도 안 함
                      // 이름 있으면 그 이름으로, 없으면 자동 이름으로 저장
                      saveCurrentToHistory(name.trim() || undefined).catch(err => devWarn('저장 실패:', err));
                      // 미리보기로 전환 후, 렌더가 끝날 시간을 주고 인쇄창 실행
                      setView('preview');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'auto' });
                        doActualPrint();
                      }, 400);
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
                  >
                    <FileDown className="w-4 h-4" />
                    인쇄 / PDF 저장
                  </button>
                </div>
              )}

              {/* 카드 그리드 */}
              {cards.length === 0 ? (
                <div className="py-10 px-4 text-center">
                  <div className="text-5xl mb-3">👋</div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-800 mb-1">
                    안녕하세요{currentUser ? `, ${currentUser.name || currentUser.email}` : ''} 선생님!
                  </h2>
                  <p className="text-sm text-stone-500 mb-5">첫 카드를 만들어볼까요?</p>

                  {/* 3단계 흐름 */}
                  <div className="max-w-md mx-auto mb-5 bg-white border border-stone-200 rounded-xl p-4">
                    <div className="flex items-center justify-between gap-1 sm:gap-2">
                      <div className="flex-1 text-center">
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">1</div>
                        <p className="text-[11px] sm:text-xs text-stone-700 font-medium">사진 추가</p>
                      </div>
                      <ArrowRight className="w-3 h-3 text-stone-300 flex-shrink-0 mt-[-14px]" />
                      <div className="flex-1 text-center">
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">2</div>
                        <p className="text-[11px] sm:text-xs text-stone-700 font-medium">이름 입력</p>
                        <p className="text-[9px] sm:text-[10px] text-stone-400">(예: 사과)</p>
                      </div>
                      <ArrowRight className="w-3 h-3 text-stone-300 flex-shrink-0 mt-[-14px]" />
                      <div className="flex-1 text-center">
                        <div className="w-8 h-8 mx-auto mb-1.5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">3</div>
                        <p className="text-[11px] sm:text-xs text-stone-700 font-medium">PDF 저장</p>
                      </div>
                    </div>
                  </div>

                  {/* 큰 시작 버튼 - 클릭 시 파일 선택 다이얼로그 즉시 열림 */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg shadow-md transition"
                  >
                    <ImageIcon className="w-5 h-5" />
                    사진 추가해서 시작
                  </button>
                  <p className="text-[11px] text-stone-400 mt-3">클릭하면 사진을 고를 수 있어요</p>
                </div>
              ) : (
                <>
                  {/* 카드 검색 (카드 5장 이상일 때만) */}
                  {cards.length >= 5 && (
                    <div className="mb-3 flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2">
                      <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={cardSearch}
                        onChange={(e) => setCardSearch(e.target.value)}
                        placeholder="라벨로 카드 검색..."
                        className="flex-1 bg-transparent text-sm outline-none text-stone-800"
                      />
                      {cardSearch && (
                        <>
                          <span className="text-[10px] text-stone-500 tabular-nums">
                            {filteredCards.length}장
                          </span>
                          <button
                            onClick={() => setCardSearch('')}
                            className="p-1 hover:bg-stone-100 rounded transition flex-shrink-0"
                            title="검색어 지우기"
                          >
                            <X className="w-3 h-3 text-stone-500" />
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* 검색 결과 없음 */}
                  {visibleCards.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <Search className="w-10 h-10 mx-auto mb-2 text-stone-300" strokeWidth={1.5} />
                      <p className="text-sm">"{cardSearch}"에 해당하는 카드가 없습니다</p>
                      <button
                        onClick={() => setCardSearch('')}
                        className="mt-2 text-xs text-amber-700 hover:underline"
                      >
                        검색어 지우기
                      </button>
                    </div>
                  ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                  {visibleCards.map((card, idx) => (
                    <CardEditor
                      key={card.id}
                      card={card}
                      index={idx}
                      sizeMm={sizeMm}
                      labelPos={labelPos}
                      font={font}
                      labelSize={labelSize}
                      categories={categories}
                      isDragging={sortMode === 'default' && draggingIndex === idx}
                      dragOverIndex={sortMode === 'default' ? dragOverIndex : null}
                      onDragStart={sortMode === 'default' ? handleCardDragStart : undefined}
                      onDragOver={sortMode === 'default' ? handleCardDragOver : undefined}
                      onDrop={sortMode === 'default' ? handleCardDrop : undefined}
                      onDragEnd={sortMode === 'default' ? handleCardDragEnd : undefined}
                      onUpdate={updateCard}
                      onDelete={deleteCard}
                      onDuplicate={duplicateCard}
                      onEditImage={openImageEditor}
                    />
                  ))}
                </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="bg-stone-100 -mx-6 px-6 py-8 print:bg-white print:m-0 print:p-0">
              {cards.length === 0 ? (
                <div className="text-center py-16 text-stone-400">
                  <p className="text-sm">미리볼 카드가 없습니다</p>
                </div>
              ) : (
                <>
                  {/* 인쇄 액션 - GitHub Pages 배포 환경이라 window.print() 정상 작동, 큰 안내 박스 불필요 */}
                  <div className="no-print max-w-[210mm] mx-auto mb-4 flex flex-col items-center gap-2">
                    {/* 폰트 로딩 표시 - 로딩 중일 때만 작게 표시 */}
                    {!fontsReady && (
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span className="inline-block w-3 h-3 border-2 border-stone-400 border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
                        <span>한글 폰트 로딩 중...</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (visibleCards.length === 0) { safeAlert('인쇄할 카드가 없습니다.'); return; }
                          const name = safePrompt('아이 이름(또는 세트 이름)을 적어주세요.\n비워두면 이름 없이 인쇄만 합니다.', '');
                          if (name === null) return; // 취소
                          saveCurrentToHistory(name.trim() || undefined).catch(err => devWarn('저장 실패:', err));
                          doActualPrint();
                        }}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-lg shadow-sm transition"
                      >
                        <FileDown className="w-4 h-4" />
                        인쇄 / PDF 저장
                      </button>
                    </div>
                  </div>

                  <PrintPreview
                  cards={visibleCards}
                  sizeMm={sizeMm}
                  labelPos={labelPos}
                  font={font}
                  labelSize={labelSize}
                  gap={gap}
                  showCutLines={showCutLines}
                  cutLineWidth={cutLineWidth}
                  cutLineStyle={cutLineStyle}
                  cutLineColor={cutLineColor}
                  cardRadius={cardRadius}
                  safetyMargin={safetyMargin}
                  doubleSided={doubleSided}
                  backDesign={backDesign}
                  backColor={backColor}
                  logoUrl={LOGO_DATA_URL}
                />
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* 푸터 */}
      <footer className="no-print max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 text-center text-[10px] sm:text-[11px] text-stone-400">
        © 검단ABA 언어행동연구소 · AAC maker
      </footer>
    </div>
  );
}
