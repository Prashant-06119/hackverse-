import { create } from 'zustand';

interface TalentDNA {
  overall: number;
  leadership: number;
  communication: number;
  adaptability: number;
  technical: number;
}

interface Question {
  question: string;
  difficulty: string;
  category: string;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
}

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  title: string;
  location: string;
  experience: number;
  education: string;
  university: string;
  skills: string[];
  matchScore: number;
  skillsMatch: number;
  experienceMatch: number;
  educationMatch: number;
  cultureFit: number;
  hiringRecommendation: string;
  hiringConfidence: number;
  talentDNA: TalentDNA;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  careerHighlights: string[];
  missingSkills: string[];
  riskFactors: string[];
  status: string;
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: string;
  email: string;
  phone: string;
  languages: string[];
  certifications: string[];
  achievements: string[];
  projects: Project[];
  technicalQuestions: Question[];
  behavioralQuestions: Question[];
  scenarioQuestions: Question[];
  feedback: {
    technicalStrengths: string[];
    technicalWeaknesses: string[];
    communicationAnalysis: string;
    leadershipAnalysis: string;
    areasOfImprovement: string[];
    nextSteps: string[];
  };
  parsingAccuracy?: number;
  aiConfidence?: number;
}

interface Store {
  candidates: Candidate[];
  selectedCandidate: Candidate | null;
  currentPage: string;
  sidebarOpen: boolean;
  compareList: string[];
  setSelectedCandidate: (c: Candidate) => void;
  setCurrentPage: (p: string) => void;
  setSidebarOpen: (o: boolean) => void;
  toggleCompare: (id: string) => void;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Rivera',
    avatar: 'AR',
    title: 'Senior Frontend Engineer',
    location: 'Bangalore, India',
    experience: 7,
    education: 'B.Tech Computer Science',
    university: 'IIT Bombay',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL'],
    matchScore: 92,
    skillsMatch: 95,
    experienceMatch: 88,
    educationMatch: 90,
    cultureFit: 85,
    hiringRecommendation: 'Strong Hire',
    hiringConfidence: 94,
    talentDNA: { overall: 89, leadership: 82, communication: 91, adaptability: 95, technical: 88 },
    summary: 'Exceptional frontend engineer with strong full-stack exposure and proven leadership in scaling React applications.',
    strengths: ['Architected scalable component libraries', 'Mentored 5 junior developers', 'Improved performance by 60%'],
    weaknesses: ['Limited backend exposure in recent roles', 'Occasional over-engineering'],
    careerHighlights: ['Led frontend migration saving $120k annually', 'Speaker at React India 2024'],
    missingSkills: ['Kubernetes'],
    riskFactors: ['Short tenure in last role (11 months)'],
    status: 'shortlisted',
    currentCTC: '₹28 LPA',
    expectedCTC: '₹42 LPA',
    noticePeriod: '30 days',
    email: 'alex.rivera@email.com',
    phone: '+91 98765 43210',
    languages: ['English', 'Hindi', 'Spanish'],
    certifications: ['AWS Certified Developer', 'Google Professional Cloud'],
    achievements: ['Built open-source library with 8k stars'],
    projects: [{name: 'E-commerce Platform', description: 'Scalable React app', tech: ['React', 'Node'] }],
    technicalQuestions: [{question: 'Explain React reconciliation', difficulty: 'Medium', category: 'React'}],
    behavioralQuestions: [{question: 'Tell me about a challenging project', difficulty: 'Medium', category: 'Leadership'}],
    scenarioQuestions: [{question: 'How would you handle a tight deadline?', difficulty: 'Hard', category: 'Scenario'}],
    feedback: {
      technicalStrengths: ['Deep React knowledge', 'Performance optimization'],
      technicalWeaknesses: ['Some legacy code familiarity gaps'],
      communicationAnalysis: 'Excellent at explaining complex concepts.',
      leadershipAnalysis: 'Strong track record of mentoring.',
      areasOfImprovement: ['Cloud infrastructure'],
      nextSteps: ['Schedule final interview', 'Reference checks']
    },
    parsingAccuracy: 98,
    aiConfidence: 95
  },
  {
    id: '2',
    name: 'Priya Sharma',
    avatar: 'PS',
    title: 'Product Manager',
    location: 'Mumbai, India',
    experience: 5,
    education: 'MBA',
    university: 'IIM Ahmedabad',
    skills: ['Product Strategy', 'User Research', 'Agile', 'Figma'],
    matchScore: 78,
    skillsMatch: 82,
    experienceMatch: 75,
    educationMatch: 90,
    cultureFit: 88,
    hiringRecommendation: 'Hire',
    hiringConfidence: 82,
    talentDNA: { overall: 76, leadership: 85, communication: 92, adaptability: 70, technical: 65 },
    summary: 'Strong PM with excellent stakeholder management.',
    strengths: ['User-centric design', 'Roadmap planning'],
    weaknesses: ['Limited technical depth'],
    careerHighlights: ['Launched 3 successful products'],
    missingSkills: ['SQL'],
    riskFactors: ['No prior engineering management'],
    status: 'interview',
    currentCTC: '₹22 LPA',
    expectedCTC: '₹35 LPA',
    noticePeriod: '60 days',
    email: 'priya@email.com',
    phone: '+91 99887 76655',
    languages: ['English', 'Hindi'],
    certifications: ['PMP'],
    achievements: ['Increased user retention 45%'],
    projects: [{name: 'Mobile App Launch', description: 'Led cross-functional team', tech: ['Product'] }],
    technicalQuestions: [],
    behavioralQuestions: [],
    scenarioQuestions: [],
    feedback: { 
      technicalStrengths: [], 
      technicalWeaknesses: [], 
      communicationAnalysis: '', 
      leadershipAnalysis: '', 
      areasOfImprovement: [], 
      nextSteps: [] 
    }
  }
];

export const useStore = create<Store>((set, get) => {
  // Realtime simulation: periodically update some scores
  setInterval(() => {
    const currentCandidates = get().candidates;
    if (currentCandidates.length > 0) {
      const updated = currentCandidates.map((cand, index) => {
        if (index === 0) { // Update first candidate more frequently
          return {
            ...cand,
            matchScore: Math.max(85, Math.min(98, cand.matchScore + (Math.random() > 0.5 ? 1 : -1))),
            hiringConfidence: Math.max(80, Math.min(97, cand.hiringConfidence + (Math.random() > 0.5 ? 1 : -1))),
            talentDNA: {
              ...cand.talentDNA,
              overall: Math.max(82, Math.min(94, cand.talentDNA.overall + (Math.random() > 0.5 ? 1 : -1)))
            }
          };
        }
        return cand;
      });
      set({ candidates: updated });
    }
  }, 4500); // Update every 4.5 seconds

  return {
    candidates: mockCandidates,
    selectedCandidate: null,
    currentPage: 'dashboard',
    sidebarOpen: true,
    compareList: [],
    setSelectedCandidate: (c) => set({ selectedCandidate: c }),
    setCurrentPage: (p) => set({ currentPage: p, selectedCandidate: null }),
    setSidebarOpen: (o) => set({ sidebarOpen: o }),
    toggleCompare: (id) => set((state) => ({
      compareList: state.compareList.includes(id)
        ? state.compareList.filter(i => i !== id)
        : [...state.compareList, id].slice(0, 4)
    })),
  };
});