import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { BarChart3, Award, Brain, Target, Crown, Medal, TrendingUp, CheckCircle } from 'lucide-react';
import { CYAN, MINT, VIOLET, AMBER, T1, T2, T3, LINE, verdictColor, statusColor, scoreColor } from '../ui';

export default function SmartShortlist(){
  const{candidates,setSelectedCandidate,setCurrentPage}=useStore();
  const sorted=[...candidates].sort((a,b)=>b.matchScore-a.matchScore);const top5=sorted.slice(0,5);
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><BarChart3 style={{ width:22,height:22,color:CYAN }}/>Smart Shortlisting</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>AI-powered candidate ranking</p></div>
      <div className="gc gc-glow" style={{ padding:20 }}>
        <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:16,display:'flex',alignItems:'center',gap:8 }}><Crown style={{ width:16,height:16,color:AMBER }}/>Top 5 Candidates</h3>
        <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
          {top5.map((c,i)=>(
            <motion.div key={c.id} initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} className="gc" style={{ padding:14,cursor:'pointer',display:'flex',flexWrap:'wrap',alignItems:'center',gap:12 }} onClick={()=>{setSelectedCandidate(c);setCurrentPage('ai-summary')}}>
              <div style={{ display:'flex',alignItems:'center',gap:10,flexShrink:0 }}>
                <div style={{ width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:14,background:i===0?AMBER+'26':i===1?T2+'26':i===2?AMBER+'14':'rgba(255,255,255,0.05)',color:i===0?AMBER:i===1?T2:i===2?AMBER+'99':T3 }}>{i===0?<Crown style={{ width:16,height:16 }}/>:i===1?<Medal style={{ width:16,height:16 }}/>:`#${i+1}`}</div>
                <div className="grad-p" style={{ width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:12,flexShrink:0 }}>{c.avatar}</div>
                <div style={{ minWidth:0 }}><div style={{ color:T1,fontWeight:600,fontSize:14 }}>{c.name}</div><div style={{ color:T3,fontSize:12 }}>{c.title}</div></div>
              </div>
              <div style={{ display:'flex',flexWrap:'wrap',alignItems:'center',gap:12,marginLeft:'auto' }}>
                {[['Match',c.matchScore,scoreColor(c.matchScore)],['DNA',c.talentDNA.overall,CYAN],['Conf',c.hiringConfidence,VIOLET]].map(([l,v,clr])=><div key={l as string} style={{ textAlign:'center' }}><div style={{ fontSize:10,color:T3 }}>{l as string}</div><div style={{ fontSize:18,fontWeight:700,fontFamily:'monospace',color:clr as string }}>{v as number}{l!=='DNA'?'%':''}</div></div>)}
                <span style={{ padding:'4px 12px',borderRadius:8,fontSize:11,fontWeight:700,background:verdictColor(c.hiringRecommendation)+'1F',color:verdictColor(c.hiringRecommendation),flexShrink:0 }}>{c.hiringRecommendation}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:14 }}>
        {top5.slice(0,3).map((c,i)=>(
          <motion.div key={c.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.08+0.4}} className="gc" style={{ padding:16 }}>
            <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:10 }}><div className="grad-p" style={{ width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:10,flexShrink:0 }}>{c.avatar}</div><span style={{ color:T1,fontWeight:600,fontSize:14 }}>{c.name}</span></div>
            <h4 style={{ fontSize:11,fontWeight:600,color:CYAN,marginBottom:6,display:'flex',alignItems:'center',gap:4 }}><Brain style={{ width:12,height:12 }}/>Why Selected</h4>
            {c.strengths.slice(0,3).map(s=><div key={s} style={{ display:'flex',alignItems:'flex-start',gap:6,fontSize:11,color:T2,marginBottom:4 }}><CheckCircle style={{ width:12,height:12,color:MINT,flexShrink:0,marginTop:1 }}/>{s}</div>)}
            <div style={{ display:'flex',alignItems:'center',gap:8,marginTop:10,paddingTop:8,borderTop:`1px solid ${LINE}`,fontSize:11,color:T3 }}><Target style={{ width:12,height:12,color:CYAN }}/>{c.matchScore}%<Award style={{ width:12,height:12,color:MINT,marginLeft:4 }}/>DNA: {c.talentDNA.overall}</div>
          </motion.div>
        ))}
      </div>
      <div className="gc" style={{ padding:20 }}>
        <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><TrendingUp style={{ width:16,height:16,color:MINT }}/>Full Talent Pool</h3>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',fontSize:13,borderCollapse:'collapse',minWidth:560 }}>
            <thead><tr style={{ color:T3,textAlign:'left',borderBottom:`1px solid ${LINE}` }}><th style={{ padding:'0 0 8px',fontWeight:500 }}>#</th><th style={{ padding:'0 0 8px',fontWeight:500 }}>Candidate</th><th style={{ padding:'0 0 8px',fontWeight:500 }}>Match</th><th style={{ padding:'0 0 8px',fontWeight:500 }}>DNA</th><th style={{ padding:'0 0 8px',fontWeight:500 }}>Conf</th><th style={{ padding:'0 0 8px',fontWeight:500 }}>Verdict</th><th style={{ padding:'0 0 8px',fontWeight:500 }}>Status</th></tr></thead>
            <tbody>{sorted.map((c,i)=>(
              <tr key={c.id} onClick={()=>{setSelectedCandidate(c);setCurrentPage('ai-summary')}} style={{ borderBottom:`1px solid rgba(0,229,255,0.06)`,cursor:'pointer' }}>
                <td style={{ padding:'8px 0' }}><span style={{ fontFamily:'monospace',fontSize:12,fontWeight:700,color:i<3?AMBER:T3 }}>#{i+1}</span></td>
                <td style={{ padding:'8px 0' }}><div style={{ display:'flex',alignItems:'center',gap:8 }}><div className="grad-p" style={{ width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:9,flexShrink:0 }}>{c.avatar}</div><span style={{ color:T1,fontWeight:500,fontSize:13 }}>{c.name}</span></div></td>
                <td style={{ padding:'8px 0',fontFamily:'monospace',fontSize:12,color:T1 }}>{c.matchScore}%</td>
                <td style={{ padding:'8px 0',fontFamily:'monospace',fontSize:12,color:CYAN }}>{c.talentDNA.overall}</td>
                <td style={{ padding:'8px 0',fontFamily:'monospace',fontSize:12,color:T2 }}>{c.hiringConfidence}%</td>
                <td style={{ padding:'8px 0' }}><span style={{ fontSize:11,fontWeight:700,color:verdictColor(c.hiringRecommendation) }}>{c.hiringRecommendation}</span></td>
                <td style={{ padding:'8px 0' }}><span style={{ padding:'3px 10px',borderRadius:99,fontSize:10,fontWeight:500,background:statusColor(c.status)+'1F',color:statusColor(c.status),textTransform:'capitalize' }}>{c.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
