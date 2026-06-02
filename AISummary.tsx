import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Brain, Award, AlertTriangle, Zap, CheckCircle, XCircle, Star, ChevronRight, Briefcase, Target } from 'lucide-react';
import { CYAN, VIOLET, MINT, AMBER, ROSE, T1, T2, T3, verdictColor } from '../ui';

export default function AISummary(){
  const{candidates,selectedCandidate,setSelectedCandidate,setCurrentPage}=useStore();
  const c=selectedCandidate||candidates[0];
  const vc=verdictColor(c.hiringRecommendation);
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><Brain style={{ width:22,height:22,color:CYAN }}/>AI Candidate Summary</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>AI-generated recruiter-friendly analysis</p></div>
      <div className="no-scroll" style={{ display:'flex',gap:6,overflowX:'auto',paddingBottom:4 }}>{candidates.map(x=><button key={x.id} onClick={()=>setSelectedCandidate(x)} style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:500,whiteSpace:'nowrap',flexShrink:0,background:c.id===x.id?CYAN+'1A':'rgba(255,255,255,0.03)',color:c.id===x.id?CYAN:T3,border:c.id===x.id?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><span className="grad-p" style={{ width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontSize:9,fontWeight:700,flexShrink:0 }}>{x.avatar}</span>{x.name.split(' ')[0]}</button>)}</div>
      <motion.div key={c.id} initial={{opacity:0}} animate={{opacity:1}} style={{ display:'flex',flexDirection:'column',gap:20 }}>
        {/* Header */}
        <div className="gc gc-glow" style={{ padding:24 }}>
          <div style={{ display:'flex',flexWrap:'wrap',gap:20,alignItems:'flex-start' }}>
            <div className="grad-p" style={{ width:64,height:64,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:24,flexShrink:0 }}>{c.avatar}</div>
            <div style={{ flex:1,minWidth:200 }}>
              <h2 style={{ fontSize:22,fontWeight:700,color:T1 }}>{c.name}</h2>
              <p style={{ fontSize:14,color:CYAN,fontWeight:500 }}>{c.title}</p>
              <p style={{ fontSize:12,color:T3,marginTop:4 }}>{c.location} • {c.experience}y • {c.education}</p>
              <div style={{ display:'flex',flexWrap:'wrap',gap:10,marginTop:12 }}>
                {[[`Match`,`${c.matchScore}%`,CYAN],[`DNA`,`${c.talentDNA.overall}`,MINT],[`Confidence`,`${c.hiringConfidence}%`,VIOLET],[`Verdict`,c.hiringRecommendation,vc]].map(([l,v,clr])=>(
                  <div key={l} style={{ padding:'4px 12px',borderRadius:10,background:clr+'14',border:`1px solid ${clr}26` }}>
                    <div style={{ fontSize:10,color:T3 }}>{l}</div><div style={{ fontSize:16,fontWeight:700,color:clr }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Summary */}
        <div className="gc" style={{ padding:20 }}><h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:8,display:'flex',alignItems:'center',gap:8 }}><Briefcase style={{ width:16,height:16,color:CYAN }}/>Executive Summary</h3><p style={{ fontSize:14,color:T2,lineHeight:1.6 }}>{c.summary}</p></div>
        {/* Strengths / Weaknesses */}
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
          <div className="gc" style={{ padding:20 }}><h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:10,display:'flex',alignItems:'center',gap:8 }}><CheckCircle style={{ width:16,height:16,color:MINT }}/>Key Strengths</h3>{c.strengths.map((s,i)=><motion.div key={s} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:T2,marginBottom:8 }}><Zap style={{ width:14,height:14,color:MINT,flexShrink:0,marginTop:2 }}/>{s}</motion.div>)}</div>
          <div className="gc" style={{ padding:20 }}><h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:10,display:'flex',alignItems:'center',gap:8 }}><AlertTriangle style={{ width:16,height:16,color:AMBER }}/>Key Weaknesses</h3>{c.weaknesses.map((w,i)=><motion.div key={w} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:T2,marginBottom:8 }}><XCircle style={{ width:14,height:14,color:AMBER,flexShrink:0,marginTop:2 }}/>{w}</motion.div>)}</div>
        </div>
        {/* Career highlights */}
        <div className="gc" style={{ padding:20 }}><h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:10,display:'flex',alignItems:'center',gap:8 }}><Star style={{ width:16,height:16,color:AMBER }}/>Career Highlights</h3><div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:10 }}>{c.careerHighlights.map(h=><div key={h} style={{ display:'flex',alignItems:'center',gap:8,padding:'10px 14px',borderRadius:10,background:AMBER+'0A',border:`1px solid ${AMBER}1A`,fontSize:14,color:T2 }}><Award style={{ width:14,height:14,color:AMBER,flexShrink:0 }}/>{h}</div>)}</div></div>
        {/* Missing skills */}
        {c.missingSkills.length>0&&<div className="gc" style={{ padding:20 }}><h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:10,display:'flex',alignItems:'center',gap:8 }}><Target style={{ width:16,height:16,color:ROSE }}/>Missing Skills</h3><div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>{c.missingSkills.map(s=><span key={s} style={{ padding:'4px 12px',borderRadius:8,background:ROSE+'14',color:ROSE,fontSize:13,border:`1px solid ${ROSE}26` }}>{s}</span>)}</div></div>}
        {/* Quick actions */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:10 }}>
          {[{l:'View JD Matching',p:'jd-matching',I:Target},{l:'View Talent DNA',p:'talent-dna',I:Zap},{l:'Interview Questions',p:'interviews',I:Brain}].map(a=>(
            <button key={a.p} onClick={()=>setCurrentPage(a.p)} className="gc" style={{ padding:14,display:'flex',alignItems:'center',gap:10,cursor:'pointer',border:'1px solid rgba(0,229,255,0.08)',textAlign:'left' }}>
              <a.I style={{ width:16,height:16,color:CYAN,flexShrink:0 }}/><span style={{ fontSize:13,color:T2,flex:1 }}>{a.l}</span><ChevronRight style={{ width:14,height:14,color:T3 }}/>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
