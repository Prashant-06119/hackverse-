import type { CSSProperties } from 'react';

// All colors as constants — never depend on Tailwind theme
export const BG = '#0B1020';
export const CYAN = '#00E5FF';
export const VIOLET = '#7C3AED';
export const MINT = '#00FFB3';
export const ROSE = '#FF4D6D';
export const AMBER = '#FFB800';
export const T1 = '#F1F5F9';
export const T2 = '#94A3B8';
export const T3 = '#64748B';
export const LINE = 'rgba(0,229,255,0.10)';
export const CARD = 'rgba(15,23,42,0.55)';

export const verdictColor = (v: string) =>
  v === 'Strong Hire' ? MINT : v === 'Hire' ? CYAN : v === 'Maybe' ? AMBER : ROSE;

export const scoreColor = (n: number) =>
  n >= 85 ? MINT : n >= 70 ? CYAN : n >= 50 ? AMBER : ROSE;

export const statusColor = (s: string) =>
  s === 'shortlisted' || s === 'hired' ? MINT : s === 'interview' ? CYAN : s === 'screening' ? VIOLET : s === 'rejected' ? ROSE : T3;

export const pill = (color: string): CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
  background: color + '1F', color,
});

export const avatar: CSSProperties = {
  width: 36, height: 36, borderRadius: '50%', display: 'flex',
  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  fontWeight: 700, fontSize: 12,
};

export const iconBox = (color: string, size = 36): CSSProperties => ({
  width: size, height: size, borderRadius: size > 30 ? 12 : 8,
  background: color + '1A', display: 'flex', alignItems: 'center',
  justifyContent: 'center', flexShrink: 0,
});

export const heading: CSSProperties = { fontSize: 22, fontWeight: 700, color: T1, display: 'flex', alignItems: 'center', gap: 10 };
export const sub: CSSProperties = { fontSize: 13, color: T3, marginTop: 4 };
export const section: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 20 };
export const grid2: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 };
export const grid3: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 };
export const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 12 };
export const tip = { contentStyle: { background: '#111827', border: '1px solid rgba(0,229,255,0.15)', borderRadius: 10, color: T1, fontSize: 12 } };
