import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Award, CheckCircle, XCircle, MessageCircle, Shield, TrendingUp, AlertTriangle, ChevronRight, Brain } from 'lucide-react';
import { CYAN, VIOLET, MINT, AMBER, ROSE, T1, T2, T3, LINE, verdictColor } from '../ui';

export default function AIFeedback(){
  const{candidates,selectedCandidate,setSelectedCandidate}=useStore();const c=selectedCandidate||candidates[0];
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><Award style={{ width:22,height:22,color:CYAN }}/>AI Feedback Engine</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>Comprehensive AI-generated evaluation</p></div>
      <div className="no-scroll" style={{ display:'flex',gap:6,overflowX:'auto',paddingBottom:4 }}>{candidates.map(x=><button key={x.id} onClick={()=>setSelectedCandidate(x)} style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:500,whiteSpace:'nowrap',flexShrink:0,background:c.id===x.id?CYAN+'1A':'rgba(255,255,255,0.03)',color:c.id===x.id?CYAN:T3,border:c.id===x.id?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><span className="grad-p" style={{ width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontSize:9,fontWeight:700,flexShrink:0 }}>{x.avatar}</span>{x.name.split(' ')[0]}</button>)}</div>
      <motion.div key={c.id} initial={{opacity:0}} animate={{opacity:1}} style={{ display:'flex',flexDirection:'column',gap:20 }}>
        <div className="gc gc-glow" style={{ padding:24 }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20,paddingBottom:16,borderBottom:`1px solid ${LINE}` }}>
            <div className="grad-p" style={{ width:48,height:48,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:18,flexShrink:0 }}>{c.avatar}</div>
            <div style={{ flex:1,minWidth:0 }}><h2 style={{ fontSize:18,fontWeight:700,color:T1 }}>{c.name}</h2><p style={{ fontSize:12,color:T3 }}>{c.title} • Evaluation Report</p></div>
            <div style={{ padding:'6px 14px',borderRadius:10,fontSize:12,fontWeight:700,background:verdictColor(c.hiringRecommendation)+'1F',color:verdictColor(c.hiringRecommendation),flexShrink:0 }}>{c.hiringRecommendation}</div>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20 }}>
            <div><h4 style={{ fontSize:13,fontWeight:600,color:MINT,display:'flex',alignItems:'center',gap:6,marginBottom:10 }}><CheckCircle style={{ width:14,height:14 }}/>Technical Strengths</h4>{c.feedback.technicalStrengths.map((s,i)=><motion.div key={s} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:T2,padding:10,borderRadius:10,background:MINT+'0A',border:`1px solid ${MINT}14`,marginBottom:6 }}><CheckCircle style={{ width:14,height:14,color:MINT,flexShrink:0,marginTop:1 }}/>{s}</motion.div>)}</div>
            <div><h4 style={{ fontSize:13,fontWeight:600,color:ROSE,display:'flex',alignItems:'center',gap:6,marginBottom:10 }}><XCircle style={{ width:14,height:14 }}/>Technical Weaknesses</h4>{c.feedback.technicalWeaknesses.map((w,i)=><motion.div key={w} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:T2,padding:10,borderRadius:10,background:ROSE+'0A',border:`1px solid ${ROSE}14`,marginBottom:6 }}><XCircle style={{ width:14,height:14,color:ROSE,flexShrink:0,marginTop:1 }}/>{w}</motion.div>)}</div>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginTop:20 }}>
            <div className="gc" style={{ padding:16,background:CYAN+'08',borderColor:CYAN+'1A' }}><h4 style={{ fontSize:13,fontWeight:600,color:CYAN,display:'flex',alignItems:'center',gap:6,marginBottom:6 }}><MessageCircle style={{ width:14,height:14 }}/>Communication</h4><p style={{ fontSize:13,color:T2,lineHeight:1.6 }}>{c.feedback.communicationAnalysis}</p></div>
            <div className="gc" style={{ padding:16,background:VIOLET+'08',borderColor:VIOLET+'1A' }}><h4 style={{ fontSize:13,fontWeight:600,color:VIOLET,display:'flex',alignItems:'center',gap:6,marginBottom:6 }}><Shield style={{ width:14,height:14 }}/>Leadership</h4><p style={{ fontSize:13,color:T2,lineHeight:1.6 }}>{c.feedback.leadershipAnalysis}</p></div>
          </div>
          <div style={{ marginTop:20 }}><h4 style={{ fontSize:13,fontWeight:600,color:AMBER,display:'flex',alignItems:'center',gap:6,marginBottom:10 }}><TrendingUp style={{ width:14,height:14 }}/>Areas of Improvement</h4><div style={{ display:'flex',flexWrap:'wrap',gap:8 }}>{c.feedback.areasOfImprovement.map(a=><span key={a} style={{ padding:'4px 12px',borderRadius:8,background:AMBER+'14',color:AMBER,fontSize:13,border:`1px solid ${AMBER}26`,display:'flex',alignItems:'center',gap:4 }}><AlertTriangle style={{ width:12,height:12 }}/>{a}</span>)}</div></div>
        </div>
        <div className="gc" style={{ padding:24 }}>
          <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:16,display:'flex',alignItems:'center',gap:8 }}><Brain style={{ width:16,height:16,color:CYAN }}/>Recruiter Feedback</h3>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:20 }}>
            {[['Confidence',c.hiringConfidence+'%',CYAN],['Talent DNA',String(c.talentDNA.overall),MINT],['JD Match',c.matchScore+'%',VIOLET]].map(([l,v,clr])=><div key={l} className="gc" style={{ padding:14,textAlign:'center' }}><div style={{ fontSize:24,fontWeight:700,color:clr }}>{v}</div><div style={{ fontSize:11,color:T3,marginTop:2 }}>{l}</div></div>)}
          </div>
          <h4 style={{ fontSize:13,fontWeight:600,color:T1,marginBottom:10,display:'flex',alignItems:'center',gap:6 }}><ChevronRight style={{ width:14,height:14,color:CYAN }}/>Next Steps</h4>
          {c.feedback.nextSteps.map((s,i)=><motion.div key={s} initial={{opacity:0,x:-6}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} style={{ display:'flex',alignItems:'center',gap:12,padding:10,borderRadius:10,background:'rgba(255,255,255,0.02)',marginBottom:6 }}><div className="grad-p" style={{ width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:10,flexShrink:0 }}>{i+1}</div><span style={{ fontSize:13,color:T2 }}>{s}</span></motion.div>)}
          <div style={{ marginTop:20,paddingTop:16,borderTop:`1px solid ${LINE}` }}><h4 style={{ fontSize:13,fontWeight:600,color:ROSE,display:'flex',alignItems:'center',gap:6,marginBottom:8 }}><AlertTriangle style={{ width:14,height:14 }}/>Risk Factors</h4>{c.riskFactors.map(r=><div key={r} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:T2,marginBottom:6 }}><AlertTriangle style={{ width:14,height:14,color:ROSE,flexShrink:0,marginTop:1 }}/>{r}</div>)}</div>
        </div>
      </motion.div>
    </div>
  );
}
