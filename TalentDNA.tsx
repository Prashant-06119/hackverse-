import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Zap, Brain } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CYAN, VIOLET, MINT, AMBER, T1, T2, T3, tip, scoreColor } from '../ui';

export default function TalentDNA(){
  const{candidates,selectedCandidate,setSelectedCandidate}=useStore();const c=selectedCandidate||candidates[0];
  const radar=[{m:'Leadership',v:c.talentDNA.leadership},{m:'Communication',v:c.talentDNA.communication},{m:'Adaptability',v:c.talentDNA.adaptability},{m:'Technical',v:c.talentDNA.technical}];
  const all=candidates.map(x=>({name:x.name.split(' ')[0],overall:x.talentDNA.overall}));
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><Zap style={{ width:22,height:22,color:CYAN }}/>Talent DNA Engine</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>Proprietary multi-dimensional candidate scoring</p></div>
      <div className="no-scroll" style={{ display:'flex',gap:6,overflowX:'auto',paddingBottom:4 }}>{candidates.map(x=><button key={x.id} onClick={()=>setSelectedCandidate(x)} style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:500,whiteSpace:'nowrap',flexShrink:0,background:c.id===x.id?CYAN+'1A':'rgba(255,255,255,0.03)',color:c.id===x.id?CYAN:T3,border:c.id===x.id?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><span className="grad-p" style={{ width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontSize:9,fontWeight:700,flexShrink:0 }}>{x.avatar}</span>{x.name.split(' ')[0]}</button>)}</div>
      <motion.div key={c.id} initial={{opacity:0}} animate={{opacity:1}} style={{ display:'flex',flexDirection:'column',gap:20 }}>
        <div className="gc gc-glow" style={{ padding:32,textAlign:'center' }}>
          <div style={{ fontSize:10,color:T3,textTransform:'uppercase',letterSpacing:2,marginBottom:8 }}>Talent DNA Score</div>
          <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:'spring',stiffness:180}} style={{ width:120,height:120,borderRadius:'50%',border:`2px solid ${CYAN}50`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px',boxShadow:`0 0 32px ${CYAN}26` }}>
            <div><div style={{ fontSize:44,fontWeight:900,color:CYAN,textShadow:`0 0 20px ${CYAN}66` }}>{c.talentDNA.overall}</div><div style={{ fontSize:10,color:T3 }}>/ 100</div></div>
          </motion.div>
          <div style={{ color:T1,fontWeight:600,fontSize:14 }}>{c.name}</div><div style={{ color:T3,fontSize:12 }}>{c.title}</div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
          <div className="gc" style={{ padding:20 }}>
            <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><Brain style={{ width:16,height:16,color:CYAN }}/>DNA Radar</h3>
            <div style={{ height:260 }}><ResponsiveContainer><RadarChart data={radar}><PolarGrid stroke={CYAN+'14'}/><PolarAngleAxis dataKey="m" tick={{fill:T2,fontSize:12}}/><PolarRadiusAxis angle={45} domain={[0,100]} tick={{fill:T3,fontSize:10}} axisLine={false}/><Radar dataKey="v" stroke={CYAN} fill={CYAN} fillOpacity={0.15} strokeWidth={2} dot={{fill:CYAN,r:3}}/></RadarChart></ResponsiveContainer></div>
          </div>
          <div className="gc" style={{ padding:20 }}>
            <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><Zap style={{ width:16,height:16,color:MINT }}/>Strength Map</h3>
            <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
              {([['Leadership',c.talentDNA.leadership,VIOLET,'Team management'],['Communication',c.talentDNA.communication,CYAN,'Written & verbal'],['Adaptability',c.talentDNA.adaptability,MINT,'Learning agility'],['Technical',c.talentDNA.technical,AMBER,'Core skills depth']] as [string,number,string,string][]).map(([label,val,color,desc],i)=>(
                <motion.div key={label} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}>
                  <div style={{ display:'flex',justifyContent:'space-between',marginBottom:4 }}><span style={{ fontSize:13,fontWeight:500,color:T1 }}>{label}</span><span style={{ fontSize:13,fontFamily:'monospace',fontWeight:700,color }}>{val}</span></div>
                  <div style={{ height:10,background:'rgba(255,255,255,0.04)',borderRadius:99,overflow:'hidden',marginBottom:2 }}><motion.div initial={{width:0}} animate={{width:`${val}%`}} transition={{duration:1,delay:i*0.12}} style={{ height:'100%',borderRadius:99,background:color }}/></div>
                  <div style={{ fontSize:11,color:T3 }}>{desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="gc" style={{ padding:20 }}>
          <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12 }}>DNA Dashboard — All Candidates</h3>
          <div style={{ height:260 }}><ResponsiveContainer><BarChart data={all}><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:T2,fontSize:11}}/><YAxis axisLine={false} tickLine={false} tick={{fill:T3,fontSize:11}} domain={[0,100]} width={32}/><Tooltip {...tip}/><Bar dataKey="overall" radius={[6,6,0,0]} barSize={32}>{all.map((d,i)=><Cell key={i} fill={scoreColor(d.overall)}/>)}</Bar></BarChart></ResponsiveContainer></div>
        </div>
      </motion.div>
    </div>
  );
}
