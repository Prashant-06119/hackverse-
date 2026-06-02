import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Search, Users, MapPin, Briefcase, Award, ChevronRight, GitCompare, Star } from 'lucide-react';
import { CYAN, T1, T3, LINE, scoreColor, verdictColor, statusColor } from '../ui';

export default function Candidates(){
  const{candidates,setSelectedCandidate,setCurrentPage,compareList,toggleCompare}=useStore();
  const[search,setSearch]=useState('');const[sf,setSf]=useState('all');
  const list=candidates.filter(c=>{const ms=c.name.toLowerCase().includes(search.toLowerCase())||c.title.toLowerCase().includes(search.toLowerCase())||c.skills.some(s=>s.toLowerCase().includes(search.toLowerCase()));return ms&&(sf==='all'||c.status===sf)});
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:12 }}>
        <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><Users style={{ width:22,height:22,color:CYAN }}/>Candidate Pipeline</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>{candidates.length} total candidates</p></div>
        {compareList.length>=2&&<button className="btn-p" style={{ fontSize:12,padding:'8px 16px' }} onClick={()=>setCurrentPage('comparison')}><GitCompare style={{ width:14,height:14 }}/>Compare ({compareList.length})</button>}
      </div>
      <div style={{ display:'flex',flexWrap:'wrap',gap:10 }}>
        <div style={{ position:'relative',flex:'1 1 280px',maxWidth:400 }}><Search style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',width:16,height:16,color:T3 }}/><input placeholder="Search name, role, or skill..." value={search} onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:36,width:'100%' }}/></div>
        <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>{['all','new','screening','interview','shortlisted','hired','rejected'].map(s=><button key={s} onClick={()=>setSf(s)} style={{ padding:'6px 10px',borderRadius:8,fontSize:11,fontWeight:500,textTransform:'capitalize',cursor:'pointer',background:sf===s?CYAN+'1A':'rgba(255,255,255,0.03)',color:sf===s?CYAN:T3,border:sf===s?`1px solid ${CYAN}40`:'1px solid transparent' }}>{s}</button>)}</div>
      </div>
      <AnimatePresence mode="popLayout">
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:14 }}>
          {list.map((c,i)=>(
            <motion.div key={c.id} layout initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{delay:i*0.03}} className="gc" style={{ padding:16,cursor:'pointer' }} onClick={()=>{setSelectedCandidate(c);setCurrentPage('ai-summary')}}>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:12 }}>
                <div style={{ display:'flex',alignItems:'center',gap:10,minWidth:0 }}>
                  <div className="grad-p" style={{ width:40,height:40,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:14,flexShrink:0 }}>{c.avatar}</div>
                  <div style={{ minWidth:0 }}><div style={{ color:T1,fontWeight:600,fontSize:14,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{c.name}</div><div style={{ color:T3,fontSize:12 }}>{c.title}</div></div>
                </div>
                <button onClick={e=>{e.stopPropagation();toggleCompare(c.id)}} style={{ padding:6,borderRadius:8,background:compareList.includes(c.id)?CYAN+'1A':'transparent',color:compareList.includes(c.id)?CYAN:T3,border:'none',cursor:'pointer',flexShrink:0 }}><GitCompare style={{ width:14,height:14 }}/></button>
              </div>
              <div style={{ display:'flex',gap:12,fontSize:11,color:T3,marginBottom:12 }}><span style={{ display:'flex',alignItems:'center',gap:4 }}><MapPin style={{ width:12,height:12 }}/>{c.location}</span><span style={{ display:'flex',alignItems:'center',gap:4 }}><Briefcase style={{ width:12,height:12 }}/>{c.experience}y</span></div>
              <div style={{ marginBottom:12 }}>
                <div style={{ display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4 }}><span style={{ color:T3 }}>Match Score</span><span style={{ color:T1,fontFamily:'monospace',fontWeight:600 }}>{c.matchScore}%</span></div>
                <div style={{ height:6,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden' }}><motion.div initial={{width:0}} animate={{width:`${c.matchScore}%`}} transition={{duration:0.8,delay:i*0.03+0.2}} style={{ height:'100%',borderRadius:99,background:scoreColor(c.matchScore) }}/></div>
              </div>
              <div style={{ display:'flex',flexWrap:'wrap',gap:4,marginBottom:12 }}>
                {c.skills.slice(0,4).map(s=><span key={s} style={{ padding:'2px 8px',borderRadius:6,fontSize:10,background:CYAN+'14',color:CYAN,border:`1px solid ${CYAN}1F` }}>{s}</span>)}
                {c.skills.length>4&&<span style={{ padding:'2px 8px',borderRadius:6,fontSize:10,background:'rgba(255,255,255,0.05)',color:T3 }}>+{c.skills.length-4}</span>}
              </div>
              <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:10,borderTop:`1px solid ${LINE}` }}>
                <span style={{ padding:'3px 10px',borderRadius:99,fontSize:10,fontWeight:500,background:statusColor(c.status)+'1F',color:statusColor(c.status),textTransform:'capitalize' }}>{c.status}</span>
                <span style={{ fontSize:11,fontWeight:600,color:verdictColor(c.hiringRecommendation),display:'flex',alignItems:'center',gap:4 }}>
                  {c.hiringRecommendation==='Strong Hire'&&<Star style={{ width:12,height:12 }}/>}{c.hiringRecommendation==='Hire'&&<Award style={{ width:12,height:12 }}/>}{c.hiringRecommendation}<ChevronRight style={{ width:12,height:12,color:T3 }}/>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      {list.length===0&&<div className="gc" style={{ padding:48,textAlign:'center' }}><Users style={{ width:40,height:40,color:T3,margin:'0 auto 12px' }}/><h3 style={{ color:T1,fontWeight:600,marginBottom:4 }}>No candidates found</h3><p style={{ color:T3,fontSize:13 }}>Try adjusting your search or filters</p></div>}
    </div>
  );
}
