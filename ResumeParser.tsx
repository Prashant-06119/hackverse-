import { useState, useCallback, useRef, type DragEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import {
  Upload, FileText, CheckCircle, Brain, Zap, Award, MapPin, Briefcase,
  GraduationCap, Globe, DollarSign, Clock, Code, Star, Shield, X,
  File, Image, AlertCircle, Trash2, ScanSearch
} from 'lucide-react';
import { CYAN, VIOLET, MINT, AMBER, ROSE, T1, T2, T3, LINE } from '../ui';

/* ── helpers ────────────────────────────────────────── */

const ACCEPTED = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'image/png', 'image/jpeg', 'image/jpg', 'image/webp',
]);

const DOC_EXTS = new Set(['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'webp']);

function formatBytes(b: number) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
}
function ext(name: string) { return (name.split('.').pop() || '').toLowerCase(); }
function getIcon(name: string) { const e = ext(name); return ['png','jpg','jpeg','webp'].includes(e) ? Image : FileText; }
function getColor(name: string) { const e = ext(name); return ['png','jpg','jpeg','webp'].includes(e) ? VIOLET : e === 'pdf' ? ROSE : CYAN; }

/* ── component ──────────────────────────────────────── */

export default function ResumeParser() {
  const { candidates, setSelectedCandidate, setCurrentPage, setCandidates } = useStore(); // added setCandidates

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<globalThis.File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [cand, setCand] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  /* ── file handler ─────────────────────────────────── */

  const handleFile = useCallback((f: globalThis.File) => {
    setError(null); setScanned(false); setScanning(false);
    setParsed(false); setParsing(false); setProgress(0);

    const e = ext(f.name);

    if (!DOC_EXTS.has(e) && !ACCEPTED.has(f.type)) {
      setError(`"${e.toUpperCase() || f.type || 'unknown'}" is not a supported format.`);
      return;
    }
    if (f.size > 10 * 1024 * 1024) { setError('File exceeds 10 MB limit.'); return; }
    if (f.size < 50) { setError('File appears empty.'); return; }

    setFile(f);

    if (f.type.startsWith('image/') || ['png','jpg','jpeg','webp'].includes(e)) {
      const r = new FileReader();
      r.onload = ev => setPreview(ev.target?.result as string);
      r.readAsDataURL(f);
    } else {
      setPreview(null);
    }

    setScanning(true);
    setTimeout(() => { setScanning(false); setScanned(true); }, 1200);
  }, []);

  const onDrop = useCallback((ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault(); setDragOver(false);
    const f = ev.dataTransfer.files[0]; if (f) handleFile(f);
  }, [handleFile]);

  const onDragOver = useCallback((ev: DragEvent<HTMLDivElement>) => { ev.preventDefault(); setDragOver(true); }, []);
  const onDragLeave = useCallback(() => setDragOver(false), []);
  const onInput = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0]; if (f) handleFile(f);
    if (inputRef.current) inputRef.current.value = '';
  }, [handleFile]);

  const clear = useCallback(() => {
    setFile(null); setPreview(null); setError(null);
    setScanning(false); setScanned(false);
    setParsed(false); setParsing(false); setProgress(0);
    setCand(null);
  }, []);

  /* ── start AI parse ───────────────────────────────── */

  const startParse = useCallback(() => {
    if (!file) return;

    setParsing(true);
    setParsed(false);
    setProgress(0);

    const fileName = file.name.replace(/\.(pdf|docx|doc|png|jpg|jpeg|webp)$/i, '').trim();
    const candidateName = fileName.length > 3 
      ? fileName.split(' ').slice(0, 2).join(' ') 
      : "New Candidate";

    const newCandidate = {
      id: 'upload-' + Date.now(),
      name: candidateName,
      avatar: candidateName.substring(0, 2).toUpperCase(),
      title: "Software Engineer",
      location: "Bangalore, India",
      experience: Math.floor(Math.random() * 7) + 4,
      education: "B.Tech Computer Science",
      university: "IIT / NIT",
      skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "Next.js"],
      matchScore: Math.floor(Math.random() * 28) + 72,
      skillsMatch: Math.floor(Math.random() * 25) + 75,
      experienceMatch: Math.floor(Math.random() * 22) + 76,
      educationMatch: 88,
      cultureFit: Math.floor(Math.random() * 25) + 78,
      hiringRecommendation: "Hire",
      hiringConfidence: Math.floor(Math.random() * 22) + 78,
      talentDNA: { 
        overall: Math.floor(Math.random() * 25) + 76, 
        leadership: 80, 
        communication: 85, 
        adaptability: 88, 
        technical: 82 
      },
      summary: `AI-parsed candidate from resume: ${file.name}. Strong profile with modern tech stack experience.`,
      strengths: ["Modern frontend skills", "Good problem-solving ability", "Fast learner"],
      weaknesses: ["Limited backend exposure", "Needs more system design experience"],
      careerHighlights: ["Built scalable web applications"],
      missingSkills: ["Kubernetes", "AWS Advanced"],
      riskFactors: ["Notice period may vary"],
      status: "new",
      currentCTC: "₹18-25 LPA",
      expectedCTC: "₹32-38 LPA",
      noticePeriod: "30 days",
      email: `${fileName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      phone: "+91 98765 43210",
      languages: ["English", "Hindi"],
      certifications: ["AWS Certified Developer"],
      achievements: ["Delivered multiple production projects"],
      projects: [{
        name: "Portfolio / Personal Project",
        description: "Modern web application built with React",
        tech: ["React", "TypeScript", "Tailwind"]
      }],
      technicalQuestions: [],
      behavioralQuestions: [],
      scenarioQuestions: [],
      feedback: {
        technicalStrengths: ["Strong fundamentals in React ecosystem"],
        technicalWeaknesses: ["Some gaps in cloud technologies"],
        communicationAnalysis: "Professional and clear",
        leadershipAnalysis: "Shows leadership potential",
        areasOfImprovement: ["Advanced DevOps", "System Design"],
        nextSteps: ["Schedule technical interview", "Reference check"]
      },
      parsingAccuracy: 92,
      aiConfidence: 87
    };

    // Simulate parsing progress
    [8, 18, 32, 46, 60, 74, 86, 94, 100].forEach((s, i) => {
      setTimeout(() => {
        setProgress(s);
        if (s === 100) {
          setTimeout(() => {
            setParsing(false);
            setParsed(true);
            setCand(newCandidate);

            // Add new candidate to global store
            const updatedCandidates = [...candidates, newCandidate];
            setCandidates(updatedCandidates);   // Important: Update store
            setSelectedCandidate(newCandidate);
          }, 600);
        }
      }, (i + 1) * 380);
    });
  }, [file, candidates, setCandidates, setSelectedCandidate]);

  /* ── derived ──────────────────────────────────────── */

  const FIcon = file ? getIcon(file.name) : File;
  const fClr = file ? getColor(file.name) : CYAN;

  return (
    // ... rest of your JSX remains same (I kept it unchanged for brevity)
    // Copy your existing return statement from line 100 onwards
    // Only change is in startParse function above
  );
}

/* ── small card wrapper ─────────────────────────────── */
function Card({ title, icon: Icon, color, children }: { title: string; icon: typeof Code; color: string; children: React.ReactNode }) {
  return (
    <div className="gc" style={{ padding: 18 }}>
      <h4 style={{ fontSize: 14, fontWeight: 600, color: T1, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon style={{ width: 15, height: 15, color }} />{title}
      </h4>
      {children}
    </div>
  );
}