import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { MessageSquare, Copy, CheckCircle, Code, Users, Lightbulb, Download } from 'lucide-react';
import { CYAN, MINT, AMBER, ROSE, VIOLET, T1, T3 } from '../ui';

type Tab='technical'|'behavioral'|'scenario'; type Diff='all'|'Easy'|'Medium'|'Hard';
const dc=(d:string)=>d==='Easy'?MINT:d==='Medium'?AMBER:ROSE;

export default function InterviewQuestions(){
  const{candidates,selectedCandidate,setSelectedCandidate}=useStore();
  const c=selectedCandidate||candidates[0];
  const[tab,setTab]=useState<Tab>('technical');const[diff,setDiff]=useState<Diff>('all');const[copied,setCopied]=useState<string|null>(null);
  const qs=tab==='technical'?c.technicalQuestions:tab==='behavioral'?c.behavioralQuestions:c.scenarioQuestions;
  const fl=diff==='all'?qs:qs.filter(q=>q.difficulty===diff);
  const cp=(q:string)=>{navigator.clipboard.writeText(q).catch(()=>{});setCopied(q);setTimeout(()=>setCopied(null),1500)};
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><MessageSquare style={{ width:22,height:22,color:CYAN }}/>AI Interview Questions</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>Role-specific questions with difficulty levels</p></div>
      <div className="no-scroll" style={{ display:'flex',gap:6,overflowX:'auto',paddingBottom:4 }}>{candidates.map(x=><button key={x.id} onClick={()=>setSelectedCandidate(x)} style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:500,whiteSpace:'nowrap',flexShrink:0,background:c.id===x.id?CYAN+'1A':'rgba(255,255,255,0.03)',color:c.id===x.id?CYAN:T3,border:c.id===x.id?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><span className="grad-p" style={{ width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontSize:9,fontWeight:700,flexShrink:0 }}>{x.avatar}</span>{x.name.split(' ')[0]}</button>)}</div>
      <motion.div key={c.id} initial={{opacity:0}} animate={{opacity:1}} style={{ display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:10 }}>
          <div style={{ display:'flex',gap:4,padding:2,borderRadius:10,background:'rgba(255,255,255,0.03)' }}>
            {([{id:'technical' as Tab,I:Code,l:'Technical'},{id:'behavioral' as Tab,I:Users,l:'Behavioral'},{id:'scenario' as Tab,I:Lightbulb,l:'Scenario'}]).map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{ display:'flex',alignItems:'center',gap:6,padding:'6px 14px',borderRadius:8,fontSize:12,fontWeight:500,background:tab===t.id?CYAN+'1A':'transparent',color:tab===t.id?CYAN:T3,border:'none',cursor:'pointer' }}><t.I style={{ width:14,height:14 }}/>{t.l}</button>)}
          </div>
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <div style={{ display:'flex',gap:2,padding:2,borderRadius:8,background:'rgba(255,255,255,0.03)' }}>
              {(['all','Easy','Medium','Hard'] as Diff[]).map(d=><button key={d} onClick={()=>setDiff(d)} style={{ padding:'4px 10px',borderRadius:6,fontSize:11,fontWeight:500,textTransform:'capitalize',background:diff===d?dc(d==='all'?'':'')+'1A':'transparent',color:diff===d?(d==='all'?CYAN:dc(d)):T3,border:'none',cursor:'pointer' }}>{d}</button>)}
            </div>
            <button className="btn-s" onClick={()=>{navigator.clipboard.writeText(fl.map((q,i)=>`${i+1}. [${q.difficulty}] ${q.question}`).join('\n\n')).catch(()=>{})}} style={{ fontSize:11,padding:'4px 10px' }}><Download style={{ width:12,height:12 }}/>Export</button>
          </div>
        </div>
        {fl.map((q,i)=>(
          <motion.div key={q.question} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} className="gc" style={{ padding:16 }}>
            <div style={{ display:'flex',alignItems:'flex-start',gap:12 }}>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:6,flexWrap:'wrap' }}>
                  <span style={{ fontSize:10,fontFamily:'monospace',color:T3 }}>Q{i+1}</span>
                  <span style={{ padding:'2px 8px',borderRadius:4,fontSize:10,fontWeight:500,background:dc(q.difficulty)+'1A',color:dc(q.difficulty) }}>{q.difficulty}</span>
                  <span style={{ padding:'2px 8px',borderRadius:4,fontSize:10,background:'rgba(255,255,255,0.05)',color:T3 }}>{q.category}</span>
                </div>
                <p style={{ fontSize:14,color:T1,lineHeight:1.6 }}>{q.question}</p>
              </div>
              <button onClick={()=>cp(q.question)} style={{ padding:6,borderRadius:8,background:'none',border:'none',cursor:'pointer',color:T3,flexShrink:0 }}>{copied===q.question?<CheckCircle style={{ width:16,height:16,color:MINT }}/>:<Copy style={{ width:16,height:16 }}/>}</button>
            </div>
          </motion.div>
        ))}
        <div className="gc" style={{ padding:20 }}><h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><MessageSquare style={{ width:16,height:16,color:VIOLET }}/>Interview Rubric</h3><div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10 }}>{[{s:'5 - Expert',d:'Demonstrates mastery',c:MINT},{s:'4 - Proficient',d:'Strong understanding',c:CYAN},{s:'3 - Competent',d:'Adequate knowledge',c:AMBER},{s:'2 - Developing',d:'Basic understanding',c:ROSE}].map(r=><div key={r.s} style={{ padding:12,borderRadius:10,background:r.c+'0A',border:`1px solid ${r.c}1A` }}><div style={{ fontSize:12,fontWeight:700,color:r.c,marginBottom:2 }}>{r.s}</div><p style={{ fontSize:11,color:T3,lineHeight:1.4 }}>{r.d}</p></div>)}</div></div>
      </motion.div>
    </div>
  );
}
