import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './components/Landing';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Candidates from './components/Candidates';
import ResumeParser from './components/ResumeParser';
import JDMatching from './components/JDMatching';
import AISummary from './components/AISummary';
import InterviewQuestions from './components/InterviewQuestions';
import AIFeedback from './components/AIFeedback';
import TalentDNA from './components/TalentDNA';
import Comparison from './components/Comparison';
import SmartShortlist from './components/SmartShortlist';
import Reports from './components/Reports';
import { Menu, Sparkles, Brain } from 'lucide-react';
import { BG, CYAN, MINT, VIOLET, T3, LINE } from './ui';

const pages: Record<string, React.ComponentType> = {
  dashboard: Dashboard, candidates: Candidates, 'resume-parser': ResumeParser,
  'jd-matching': JDMatching, 'ai-summary': AISummary, interviews: InterviewQuestions,
  feedback: AIFeedback, 'talent-dna': TalentDNA, comparison: Comparison,
  shortlist: SmartShortlist, reports: Reports,
};
const labels: Record<string, string> = {
  dashboard: 'Command Center', candidates: 'Candidates', 'resume-parser': 'Resume Parser',
  'jd-matching': 'JD Matching', 'ai-summary': 'AI Summary', interviews: 'Interviews',
  feedback: 'Feedback', 'talent-dna': 'Talent DNA', comparison: 'Compare',
  shortlist: 'Shortlist', reports: 'Reports',
};

export default function App() {
  const { currentPage, sidebarOpen, setSidebarOpen } = useStore();
  useEffect(() => {
    const h = () => { if (window.innerWidth < 768) setSidebarOpen(false); };
    h(); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h);
  }, [setSidebarOpen]);

  if (currentPage === 'landing') return <Landing />;
  const Page = pages[currentPage] || Dashboard;

  return (
    <div style={{ minHeight: '100vh', background: BG, position: 'relative' }}>
      <div className="ambient-bg" />
      <Sidebar />
      {sidebarOpen && <div className="md:hidden" onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.6)' }} />}
      <div className="main-panel" style={{ position: 'relative', zIndex: 10, minHeight: '100vh', marginLeft: sidebarOpen ? 260 : 68, transition: 'margin-left 0.2s' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 30, height: 56, borderBottom: `1px solid ${LINE}`, background: 'rgba(11,16,32,0.88)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T3, padding: 4, flexShrink: 0 }}><Menu style={{ width: 20, height: 20 }} /></button>
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8 }}><Brain style={{ width: 16, height: 16, color: CYAN }} /><span style={{ fontSize: 13, color: T3 }}>{labels[currentPage] || 'Dashboard'}</span></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div className="hidden sm:flex" style={{ alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: MINT + '14', border: `1px solid ${MINT}26` }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: MINT }} /><span style={{ fontSize: 11, color: MINT, fontWeight: 500 }}>AI Active</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: CYAN + '0D', border: `1px solid ${CYAN}1A` }}><Sparkles style={{ width: 12, height: 12, color: CYAN }} /><span className="hidden sm:inline" style={{ fontSize: 11, color: CYAN, fontWeight: 500 }}>GPT-4 Turbo</span></div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: VIOLET + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', color: VIOLET, fontWeight: 700, fontSize: 12, flexShrink: 0 }}>RK</div>
          </div>
        </header>
        <div style={{ padding: 24 }}>
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}><Page /></motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
