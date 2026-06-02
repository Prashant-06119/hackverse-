import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Target, CheckCircle, XCircle, AlertTriangle, TrendingUp, Award } from 'lucide-react';
import { CYAN, VIOLET, MINT, AMBER, ROSE, T1, T2, T3, LINE, verdictColor } from '../ui';

function Ring({score,size=90,label,color}:{score:number;size?:number;label:string;color:string}){
  const r=38,circ=2*Math.PI*r,off=circ-(score/100)*circ;
  return(<div style={{ display:'flex',flexDirection:'column',alignItems:'center' }}>
    <div style={{ position:'relative',width:size,height:size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="circ-prog"><circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="7"/><motion.circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeDasharray={circ} initial={{strokeDashoffset:circ}} animate={{strokeDashoffset:off}} transition={{duration:1.2,ease:'easeOut'}}/></svg>
      <div style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,color:T1,fontFamily:'monospace' }}>{score}%</div>
    </div>
    <div style={{ fontSize:11,color:T3,marginTop:6 }}>{label}</div>
  </div>);
}

function Picker({active,onSelect}:{active:string;onSelect:(id:string)=>void}){
  const{candidates}=useStore();
  return(<div className="no-scroll" style={{ display:'flex',gap:6,overflowX:'auto',paddingBottom:4 }}>{candidates.map(c=><button key={c.id} onClick={()=>onSelect(c.id)} style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:500,whiteSpace:'nowrap',flexShrink:0,background:active===c.id?CYAN+'1A':'rgba(255,255,255,0.03)',color:active===c.id?CYAN:T3,border:active===c.id?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><span className="grad-p" style={{ width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontSize:9,fontWeight:700,flexShrink:0 }}>{c.avatar}</span>{c.name.split(' ')[0]}</button>)}</div>);
}

export default function JDMatching(){
  const{candidates,selectedCandidate,setSelectedCandidate}=useStore();
  const c=selectedCandidate||candidates[0];
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><Target style={{ width:22,height:22,color:CYAN }}/>AI JD Matching Engine</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>Compare candidates against the job description</p></div>
      <Picker active={c.id} onSelect={id=>{const f=candidates.find(x=>x.id===id);if(f)setSelectedCandidate(f)}}/>
      <motion.div key={c.id} initial={{opacity:0}} animate={{opacity:1}} style={{ display:'flex',flexDirection:'column',gap:20 }}>
        <div className="gc gc-glow" style={{ padding:24 }}>
          <div style={{ display:'flex',flexWrap:'wrap',alignItems:'center',gap:16,marginBottom:24 }}>
            <div className="grad-p" style={{ width:56,height:56,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:20,flexShrink:0 }}>{c.avatar}</div>
            <div><h2 style={{ fontSize:18,fontWeight:700,color:T1 }}>{c.name}</h2><p style={{ fontSize:13,color:T3 }}>{c.title} • {c.experience}y exp</p></div>
            <div style={{ marginLeft:'auto',padding:'6px 14px',borderRadius:10,fontSize:12,fontWeight:700,background:verdictColor(c.hiringRecommendation)+'1F',color:verdictColor(c.hiringRecommendation) }}><Award style={{ width:14,height:14,display:'inline',verticalAlign:'middle',marginRight:4 }}/>{c.hiringRecommendation}</div>
          </div>
          <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',gap:24,marginBottom:24 }}>
            <Ring score={c.matchScore} label="Overall" color={CYAN} size={100}/><Ring score={c.skillsMatch} label="Skills" color={VIOLET}/><Ring score={c.experienceMatch} label="Experience" color={MINT}/><Ring score={c.educationMatch} label="Education" color={AMBER}/><Ring score={c.cultureFit} label="Culture Fit" color={CYAN}/>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:20 }}>
            <div>
              <h4 style={{ fontSize:13,fontWeight:600,color:T1,marginBottom:10,display:'flex',alignItems:'center',gap:6 }}><CheckCircle style={{ width:14,height:14,color:MINT }}/>Matched Skills</h4>
              {c.skills.map(s=><div key={s} style={{ display:'flex',alignItems:'center',gap:8,fontSize:13,marginBottom:6 }}><CheckCircle style={{ width:14,height:14,color:MINT,flexShrink:0 }}/><span style={{ color:T2,flex:1 }}>{s}</span><span style={{ padding:'2px 8px',borderRadius:4,fontSize:10,background:MINT+'1A',color:MINT }}>Match</span></div>)}
            </div>
            <div>
              <h4 style={{ fontSize:13,fontWeight:600,color:T1,marginBottom:10,display:'flex',alignItems:'center',gap:6 }}><XCircle style={{ width:14,height:14,color:ROSE }}/>Skill Gaps</h4>
              {c.missingSkills.length>0?c.missingSkills.map(s=><div key={s} style={{ display:'flex',alignItems:'center',gap:8,fontSize:13,marginBottom:6 }}><XCircle style={{ width:14,height:14,color:ROSE,flexShrink:0 }}/><span style={{ color:T2,flex:1 }}>{s}</span><span style={{ padding:'2px 8px',borderRadius:4,fontSize:10,background:ROSE+'1A',color:ROSE }}>Gap</span></div>):<p style={{ fontSize:13,color:MINT,display:'flex',alignItems:'center',gap:6 }}><CheckCircle style={{ width:14,height:14 }}/>No gaps!</p>}
              <h4 style={{ fontSize:13,fontWeight:600,color:T1,marginTop:20,marginBottom:10,display:'flex',alignItems:'center',gap:6 }}><AlertTriangle style={{ width:14,height:14,color:AMBER }}/>Risk Factors</h4>
              {c.riskFactors.map(r=><div key={r} style={{ display:'flex',alignItems:'flex-start',gap:8,fontSize:13,marginBottom:6 }}><AlertTriangle style={{ width:14,height:14,color:AMBER,flexShrink:0,marginTop:2 }}/><span style={{ color:T2 }}>{r}</span></div>)}
            </div>
          </div>
          <div style={{ marginTop:20,paddingTop:20,borderTop:`1px solid ${LINE}` }}>
            <div className="gc" style={{ padding:16,background:CYAN+'08',borderColor:CYAN+'26' }}>
              <h4 style={{ fontSize:13,fontWeight:600,color:CYAN,marginBottom:6,display:'flex',alignItems:'center',gap:6 }}><TrendingUp style={{ width:14,height:14 }}/>AI Recommendation</h4>
              <p style={{ fontSize:13,color:T2,lineHeight:1.6,marginBottom:12 }}>{c.summary}</p>
              <div style={{ display:'flex',alignItems:'center',gap:10,fontSize:13 }}><span style={{ color:T3,flexShrink:0 }}>Confidence:</span><div style={{ flex:1,height:8,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden',maxWidth:200 }}><motion.div initial={{width:0}} animate={{width:`${c.hiringConfidence}%`}} transition={{duration:1}} className="bar-fill" style={{ height:'100%' }}/></div><span style={{ color:T1,fontFamily:'monospace',fontWeight:600 }}>{c.hiringConfidence}%</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
