import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { FileBarChart, Download, FileText, Award, Target, Brain, CheckCircle, XCircle, AlertTriangle, Star, BarChart3, Zap } from 'lucide-react';
import { CYAN, VIOLET, MINT, AMBER, ROSE, T1, T2, T3, LINE, BG, scoreColor, verdictColor } from '../ui';

type RT='evaluation'|'recommendation'|'analytics';

export default function Reports(){
  const{candidates,selectedCandidate,setSelectedCandidate}=useStore();const c=selectedCandidate||candidates[0];const[rt,setRt]=useState<RT>('evaluation');
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><FileBarChart style={{ width:22,height:22,color:CYAN }}/>Auto Report Generator</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>Professional evaluation reports</p></div>
      <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
        {([{id:'evaluation' as RT,I:FileText,l:'Candidate Evaluation'},{id:'recommendation' as RT,I:Award,l:'Hiring Recommendation'},{id:'analytics' as RT,I:BarChart3,l:'Recruiter Analytics'}]).map(r=><button key={r.id} onClick={()=>setRt(r.id)} style={{ display:'flex',alignItems:'center',gap:6,padding:'8px 14px',borderRadius:10,fontSize:12,fontWeight:500,background:rt===r.id?CYAN+'1A':'rgba(255,255,255,0.03)',color:rt===r.id?CYAN:T3,border:rt===r.id?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><r.I style={{ width:14,height:14 }}/>{r.l}</button>)}
      </div>
      {rt!=='analytics'&&<div className="no-scroll" style={{ display:'flex',gap:6,overflowX:'auto',paddingBottom:4 }}>{candidates.map(x=><button key={x.id} onClick={()=>setSelectedCandidate(x)} style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:500,whiteSpace:'nowrap',flexShrink:0,background:c.id===x.id?CYAN+'1A':'rgba(255,255,255,0.03)',color:c.id===x.id?CYAN:T3,border:c.id===x.id?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><span className="grad-p" style={{ width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontSize:9,fontWeight:700,flexShrink:0 }}>{x.avatar}</span>{x.name.split(' ')[0]}</button>)}</div>}
      <motion.div key={`${rt}-${c.id}`} initial={{opacity:0}} animate={{opacity:1}}>
        <div className="gc gc-glow" style={{ overflow:'hidden' }}>
          <div style={{ background:`linear-gradient(90deg,${CYAN}0D,${VIOLET}08,${MINT}0D)`,padding:24,borderBottom:`1px solid ${LINE}` }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12 }}>
              <div style={{ display:'flex',alignItems:'center',gap:8 }}><div className="grad-p" style={{ width:28,height:28,borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center' }}><Brain style={{ width:16,height:16,color:BG }}/></div><span style={{ fontSize:14,fontWeight:700,color:T1 }}>Hire<span style={{ color:CYAN }}>Lens</span></span></div>
              <button className="btn-p" style={{ fontSize:12,padding:'6px 14px' }}><Download style={{ width:12,height:12 }}/>Export PDF</button>
            </div>
            <h2 style={{ fontSize:20,fontWeight:700,color:T1 }}>{rt==='evaluation'?'Candidate Evaluation Report':rt==='recommendation'?'Hiring Recommendation Report':'Recruiter Analytics Report'}</h2>
            <p style={{ fontSize:12,color:T3,marginTop:4 }}>{new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</p>
          </div>
          <div style={{ padding:24,display:'flex',flexDirection:'column',gap:24 }}>
            {rt!=='analytics'&&<>
              <div><h3 style={{ fontSize:15,fontWeight:700,color:T1,borderBottom:`1px solid ${LINE}`,paddingBottom:6,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><FileText style={{ width:16,height:16,color:CYAN }}/>Candidate Info</h3>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,fontSize:13 }}>{([['Name',c.name],['Title',c.title],['Experience',`${c.experience} years`],['Location',c.location],['Education',c.education],['University',c.university],['Expected CTC',c.expectedCTC],['Notice',c.noticePeriod]] as [string,string][]).map(([l,v])=><div key={l} style={{ display:'flex',justifyContent:'space-between' }}><span style={{ color:T3 }}>{l}:</span><span style={{ color:T1,fontWeight:500 }}>{v}</span></div>)}</div>
              </div>
              <div><h3 style={{ fontSize:15,fontWeight:700,color:T1,borderBottom:`1px solid ${LINE}`,paddingBottom:6,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><Target style={{ width:16,height:16,color:CYAN }}/>Match Analysis</h3>
                <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(100px,1fr))',gap:10 }}>{([['Overall',c.matchScore],['Skills',c.skillsMatch],['Exp',c.experienceMatch],['Edu',c.educationMatch],['Culture',c.cultureFit]] as [string,number][]).map(([l,v])=><div key={l} style={{ textAlign:'center',padding:10,borderRadius:10,background:'rgba(255,255,255,0.02)' }}><div style={{ fontSize:20,fontWeight:700,fontFamily:'monospace',color:scoreColor(v) }}>{v}%</div><div style={{ fontSize:10,color:T3,marginTop:2 }}>{l}</div></div>)}</div>
              </div>
              <div><h3 style={{ fontSize:15,fontWeight:700,color:T1,borderBottom:`1px solid ${LINE}`,paddingBottom:6,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><Brain style={{ width:16,height:16,color:CYAN }}/>Summary</h3><p style={{ fontSize:14,color:T2,lineHeight:1.6 }}>{c.summary}</p></div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
                <div><h4 style={{ fontSize:13,fontWeight:600,color:MINT,marginBottom:6,display:'flex',alignItems:'center',gap:4 }}><CheckCircle style={{ width:14,height:14 }}/>Strengths</h4>{c.strengths.map(s=><div key={s} style={{ display:'flex',alignItems:'flex-start',gap:6,fontSize:13,color:T2,marginBottom:4 }}><CheckCircle style={{ width:12,height:12,color:MINT,flexShrink:0,marginTop:2 }}/>{s}</div>)}</div>
                <div><h4 style={{ fontSize:13,fontWeight:600,color:AMBER,marginBottom:6,display:'flex',alignItems:'center',gap:4 }}><XCircle style={{ width:14,height:14 }}/>Weaknesses</h4>{c.weaknesses.map(w=><div key={w} style={{ display:'flex',alignItems:'flex-start',gap:6,fontSize:13,color:T2,marginBottom:4 }}><XCircle style={{ width:12,height:12,color:AMBER,flexShrink:0,marginTop:2 }}/>{w}</div>)}</div>
              </div>
              <div style={{ padding:16,borderRadius:10,background:verdictColor(c.hiringRecommendation)+'0A',border:`1px solid ${verdictColor(c.hiringRecommendation)}26` }}>
                <h4 style={{ fontSize:13,fontWeight:600,color:T1,marginBottom:4,display:'flex',alignItems:'center',gap:6 }}><Award style={{ width:14,height:14 }}/>Final Recommendation</h4>
                <div style={{ fontSize:22,fontWeight:700,color:verdictColor(c.hiringRecommendation),marginBottom:2 }}>{c.hiringRecommendation}</div>
                <p style={{ fontSize:13,color:T2 }}>Confidence: {c.hiringConfidence}%</p>
              </div>
              <div><h4 style={{ fontSize:13,fontWeight:600,color:ROSE,marginBottom:6,display:'flex',alignItems:'center',gap:4 }}><AlertTriangle style={{ width:14,height:14 }}/>Risk Factors</h4>{c.riskFactors.map(r=><div key={r} style={{ display:'flex',alignItems:'flex-start',gap:6,fontSize:13,color:T2,marginBottom:4 }}><AlertTriangle style={{ width:12,height:12,color:ROSE,flexShrink:0,marginTop:2 }}/>{r}</div>)}</div>
            </>}
            {rt==='analytics'&&<>
              <div><h3 style={{ fontSize:15,fontWeight:700,color:T1,borderBottom:`1px solid ${LINE}`,paddingBottom:6,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><BarChart3 style={{ width:16,height:16,color:CYAN }}/>Analytics Summary</h3>
                <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:12 }}>{([['Candidates','248'],['Avg Match','76%'],['Shortlisted','32'],['Time to Fill','18d']] as [string,string][]).map(([l,v])=><div key={l} style={{ textAlign:'center',padding:14,borderRadius:10,background:'rgba(255,255,255,0.02)' }}><div style={{ fontSize:22,fontWeight:700,color:CYAN }}>{v}</div><div style={{ fontSize:10,color:T3,marginTop:2 }}>{l}</div></div>)}</div>
              </div>
              <div><h3 style={{ fontSize:15,fontWeight:700,color:T1,borderBottom:`1px solid ${LINE}`,paddingBottom:6,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><Star style={{ width:16,height:16,color:AMBER }}/>Top Performers</h3>
                {[...candidates].sort((a,b)=>b.matchScore-a.matchScore).slice(0,5).map((ca,i)=><div key={ca.id} style={{ display:'flex',alignItems:'center',gap:10,padding:10,borderRadius:10,background:'rgba(255,255,255,0.02)',marginBottom:6 }}><span style={{ fontSize:12,fontFamily:'monospace',color:T3,width:20 }}>#{i+1}</span><div className="grad-p" style={{ width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:10,flexShrink:0 }}>{ca.avatar}</div><div style={{ flex:1,minWidth:0 }}><div style={{ fontSize:13,fontWeight:500,color:T1 }}>{ca.name}</div><div style={{ fontSize:11,color:T3 }}>{ca.title}</div></div><span style={{ fontSize:13,fontFamily:'monospace',color:CYAN,flexShrink:0 }}>{ca.matchScore}%</span><span style={{ fontSize:11,fontWeight:700,color:verdictColor(ca.hiringRecommendation),flexShrink:0 }}>{ca.hiringRecommendation}</span></div>)}
              </div>
              <div style={{ padding:16,borderRadius:10,background:CYAN+'08',border:`1px solid ${CYAN}1A` }}><h4 style={{ fontSize:13,fontWeight:600,color:CYAN,marginBottom:8 }}>AI Insights</h4>{['62.5% received a positive recommendation','Average Talent DNA: 81/100','Top skill gap: System Design (46%)','25% are Strong Hire recommendations'].map(t=><div key={t} style={{ display:'flex',alignItems:'flex-start',gap:6,fontSize:13,color:T2,marginBottom:6 }}><Zap style={{ width:14,height:14,color:CYAN,flexShrink:0,marginTop:1 }}/>{t}</div>)}</div>
            </>}
            <div style={{ borderTop:`1px solid ${LINE}`,paddingTop:12,display:'flex',justifyContent:'space-between',fontSize:10,color:T3 }}><span>Generated by HireLens AI • Confidential</span><span>Page 1 of 1</span></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
