import { useStore } from '../store/useStore';
import { Brain, LayoutDashboard, Users, FileText, Target, MessageSquare, BarChart3, Award, GitCompare, Zap, FileBarChart, ChevronLeft, LogOut, Settings, Bell } from 'lucide-react';
import { BG, CYAN, VIOLET, T1, T3, LINE, ROSE } from '../ui';

const nav = [
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
  { id: 'candidates', label: 'Candidates', icon: Users },
  { id: 'resume-parser', label: 'Resume Parser', icon: FileText },
  { id: 'jd-matching', label: 'JD Matching', icon: Target },
  { id: 'ai-summary', label: 'AI Summary', icon: Brain },
  { id: 'interviews', label: 'Interview Q&A', icon: MessageSquare },
  { id: 'feedback', label: 'AI Feedback', icon: Award },
  { id: 'talent-dna', label: 'Talent DNA', icon: Zap },
  { id: 'comparison', label: 'Compare', icon: GitCompare },
  { id: 'shortlist', label: 'Smart Shortlist', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useStore();
  return (
    <aside style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50, width: sidebarOpen ? 260 : 68, background: BG, borderRight: `1px solid ${LINE}`, display: 'flex', flexDirection: 'column', transition: 'width 0.2s' }}>
      <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderBottom: `1px solid ${LINE}`, flexShrink: 0 }}>
        <div className="grad-p" style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Brain style={{ width: 20, height: 20, color: BG }} /></div>
        {sidebarOpen && <span style={{ fontSize: 18, fontWeight: 700, color: T1, whiteSpace: 'nowrap' }}>Hire<span style={{ color: CYAN }}>Lens</span></span>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: T3, flexShrink: 0, padding: 4 }}>
          <ChevronLeft style={{ width: 18, height: 18, transition: 'transform 0.2s', transform: sidebarOpen ? 'none' : 'rotate(180deg)' }} />
        </button>
      </div>
      <nav className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
        {nav.map(item => {
          const a = currentPage === item.id;
          return (
            <button key={item.id} onClick={() => { setCurrentPage(item.id); if (window.innerWidth < 768) setSidebarOpen(false); }} title={!sidebarOpen ? item.label : undefined}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12, fontSize: 13, fontWeight: 500, padding: sidebarOpen ? '10px 12px' : '10px 0', justifyContent: sidebarOpen ? 'flex-start' : 'center', background: a ? CYAN + '1A' : 'transparent', color: a ? CYAN : T3, border: 'none', cursor: 'pointer', marginBottom: 2, textAlign: 'left' }}>
              <item.icon style={{ width: 18, height: 18, flexShrink: 0 }} />
              {sidebarOpen && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>}
              {a && sidebarOpen && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: CYAN, flexShrink: 0 }} />}
            </button>
          );
        })}
      </nav>
      <div style={{ borderTop: `1px solid ${LINE}`, padding: 8, flexShrink: 0 }}>
        {[{ icon: Settings, label: 'Settings' }, { icon: Bell, label: 'Notifications' }].map(b => (
          <button key={b.label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12, fontSize: 13, fontWeight: 500, color: T3, padding: sidebarOpen ? '10px 12px' : '10px 0', justifyContent: sidebarOpen ? 'flex-start' : 'center', background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: 2 }}>
            <b.icon style={{ width: 18, height: 18, flexShrink: 0 }} />{sidebarOpen && <span>{b.label}</span>}
          </button>
        ))}
        <button onClick={() => setCurrentPage('landing')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, borderRadius: 12, fontSize: 13, fontWeight: 500, color: ROSE + 'BB', padding: sidebarOpen ? '10px 12px' : '10px 0', justifyContent: sidebarOpen ? 'flex-start' : 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <LogOut style={{ width: 18, height: 18, flexShrink: 0 }} />{sidebarOpen && <span>Sign Out</span>}
        </button>
      </div>
      {sidebarOpen && (
        <div style={{ borderTop: `1px solid ${LINE}`, padding: 12, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: VIOLET + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', color: VIOLET, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>RK</div>
            <div style={{ minWidth: 0 }}><div style={{ fontSize: 14, fontWeight: 500, color: T1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Rachel Kim</div><div style={{ fontSize: 12, color: T3 }}>Senior Recruiter</div></div>
          </div>
        </div>
      )}
    </aside>
  );
}
