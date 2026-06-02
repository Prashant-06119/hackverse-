import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Users, UserCheck, MessageSquare, Award, Target, ArrowUpRight, ArrowDownRight, Brain, Zap, BarChart3 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { CYAN, VIOLET, MINT, ROSE, AMBER, T1, T2, T3, LINE, tip, verdictColor, statusColor } from '../ui';

const funnel=[{stage:'Applied',count:248},{stage:'Screened',count:156},{stage:'Interviewed',count:68},{stage:'Shortlisted',count:32},{stage:'Offered',count:18},{stage:'Hired',count:12}];
const trends=[{m:'Jul',apps:120,hires:8},{m:'Aug',apps:145,hires:10},{m:'Sep',apps:168,hires:12},{m:'Oct',apps:190,hires:14},{m:'Nov',apps:210,hires:11},{m:'Dec',apps:230,hires:15},{m:'Jan',apps:248,hires:12}];
const depts=[{name:'Engineering',value:45,color:CYAN},{name:'Product',value:20,color:VIOLET},{name:'Design',value:15,color:MINT},{name:'Marketing',value:12,color:AMBER},{name:'Sales',value:8,color:ROSE}];
const sk=[{s:'React',d:95,sup:72},{s:'TypeScript',d:90,sup:65},{s:'Python',d:85,sup:78},{s:'AWS',d:80,sup:55},{s:'Node.js',d:75,sup:68},{s:'Docker',d:70,sup:50},{s:'SysDesign',d:88,sup:42},{s:'GraphQL',d:60,sup:35}];
const dna=[{m:'Leadership',v:74},{m:'Communication',v:79},{m:'Adaptability',v:83},{m:'Technical',v:86}];

export default function Dashboard(){
  const{candidates,setCurrentPage,setSelectedCandidate}=useStore();
  const stats=[
    {l:'Total Candidates',v:'248',ch:'+12%',up:true,I:Users,c:CYAN},{l:'Shortlisted',v:'32',ch:'+8%',up:true,I:UserCheck,c:MINT},
    {l:'Interviewed',v:'68',ch:'+15%',up:true,I:MessageSquare,c:VIOLET},{l:'Hired',v:'12',ch:'+3%',up:true,I:Award,c:AMBER},
    {l:'Avg Match',v:'76%',ch:'+5%',up:true,I:Target,c:CYAN},{l:'Avg DNA',v:'81',ch:'-2%',up:false,I:Zap,c:MINT},
  ];
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><BarChart3 style={{ width:22,height:22,color:CYAN }} />Recruiter Command Center</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>Real-time overview of your hiring pipeline</p></div>

      {/* Stats */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:12 }}>
        {stats.map((s,i)=>(
          <motion.div key={s.l} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} className="gc" style={{ padding:16 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10 }}>
              <div style={{ width:34,height:34,borderRadius:10,background:s.c+'1A',display:'flex',alignItems:'center',justifyContent:'center' }}><s.I style={{ width:17,height:17,color:s.c }} /></div>
              <span style={{ fontSize:11,fontWeight:600,display:'flex',alignItems:'center',gap:2,color:s.up?MINT:ROSE }}>{s.up?<ArrowUpRight style={{width:12,height:12}}/>:<ArrowDownRight style={{width:12,height:12}}/>}{s.ch}</span>
            </div>
            <div style={{ fontSize:22,fontWeight:700,color:T1 }}>{s.v}</div>
            <div style={{ fontSize:11,color:T3,marginTop:2 }}>{s.l}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(360px,1fr))',gap:16 }}>
        <div className="gc" style={{ padding:20 }}>
          <h3 style={{ fontSize:15,fontWeight:600,color:T1 }}>Hiring Trends</h3><p style={{ fontSize:12,color:T3,marginBottom:16 }}>Applications vs Hires</p>
          <div style={{ width:'100%',height:220 }}><ResponsiveContainer><AreaChart data={trends}>
            <defs><linearGradient id="gA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CYAN} stopOpacity={0.25}/><stop offset="100%" stopColor={CYAN} stopOpacity={0}/></linearGradient><linearGradient id="gH" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={VIOLET} stopOpacity={0.25}/><stop offset="100%" stopColor={VIOLET} stopOpacity={0}/></linearGradient></defs>
            <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:T3,fontSize:11}}/><YAxis axisLine={false} tickLine={false} tick={{fill:T3,fontSize:11}} width={36}/>
            <Tooltip {...tip}/><Area type="monotone" dataKey="apps" stroke={CYAN} fill="url(#gA)" strokeWidth={2} name="Applications"/><Area type="monotone" dataKey="hires" stroke={VIOLET} fill="url(#gH)" strokeWidth={2} name="Hires"/>
          </AreaChart></ResponsiveContainer></div>
        </div>
        <div className="gc" style={{ padding:20 }}>
          <h3 style={{ fontSize:15,fontWeight:600,color:T1 }}>Hiring Funnel</h3><p style={{ fontSize:12,color:T3,marginBottom:16 }}>Candidate progression</p>
          <div style={{ width:'100%',height:220 }}><ResponsiveContainer><BarChart data={funnel} layout="vertical">
            <XAxis type="number" axisLine={false} tickLine={false} tick={{fill:T3,fontSize:11}}/><YAxis type="category" dataKey="stage" axisLine={false} tickLine={false} tick={{fill:T2,fontSize:11}} width={80}/>
            <Tooltip {...tip}/><Bar dataKey="count" radius={[0,6,6,0]} barSize={18}>{funnel.map((_,i)=><Cell key={i} fill={`rgba(0,229,255,${1-i*0.14})`}/>)}</Bar>
          </BarChart></ResponsiveContainer></div>
        </div>
      </div>

      {/* Skills + departments */}
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:16 }}>
        <div className="gc" style={{ padding:20, gridColumn:'span 1' }}>
          <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:16 }}>Skills Demand vs Supply</h3>
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>{sk.map(s=>(
            <div key={s.s} style={{ display:'flex',alignItems:'center',gap:10 }}>
              <span style={{ width:72,fontSize:12,color:T2,fontFamily:'monospace',textAlign:'right',flexShrink:0 }}>{s.s}</span>
              <div style={{ flex:1,display:'flex',gap:2,height:20 }}>
                <div style={{ flex:1,background:'rgba(255,255,255,0.03)',borderRadius:'4px 0 0 4px',position:'relative',overflow:'hidden' }}><div style={{ position:'absolute',inset:0,width:`${s.d}%`,background:CYAN+'80',borderRadius:'4px 0 0 4px' }}/><span style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:T2,zIndex:1 }}>D:{s.d}%</span></div>
                <div style={{ flex:1,background:'rgba(255,255,255,0.03)',borderRadius:'0 4px 4px 0',position:'relative',overflow:'hidden' }}><div style={{ position:'absolute',inset:0,width:`${s.sup}%`,background:MINT+'80',borderRadius:'0 4px 4px 0' }}/><span style={{ position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:T2,zIndex:1 }}>S:{s.sup}%</span></div>
              </div>
            </div>
          ))}</div>
        </div>
        <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
          <div className="gc" style={{ padding:20 }}>
            <h3 style={{ fontSize:14,fontWeight:600,color:T1,marginBottom:12 }}>Departments</h3>
            <div style={{ height:140 }}><ResponsiveContainer><PieChart><Pie data={depts} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={58} paddingAngle={3} strokeWidth={0}>{depts.map((d,i)=><Cell key={i} fill={d.color}/>)}</Pie><Tooltip {...tip}/></PieChart></ResponsiveContainer></div>
            <div style={{ display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginTop:8 }}>{depts.map(d=><span key={d.name} style={{ display:'flex',alignItems:'center',gap:4,fontSize:10,color:T3 }}><span style={{ width:6,height:6,borderRadius:'50%',background:d.color }}/>{d.name}</span>)}</div>
          </div>
          <div className="gc" style={{ padding:20 }}>
            <h3 style={{ fontSize:14,fontWeight:600,color:T1,marginBottom:8,display:'flex',alignItems:'center',gap:6 }}><Brain style={{ width:14,height:14,color:CYAN }}/>Avg Talent DNA</h3>
            <div style={{ height:140 }}><ResponsiveContainer><RadarChart data={dna}><PolarGrid stroke={CYAN+'14'}/><PolarAngleAxis dataKey="m" tick={{fill:T2,fontSize:10}}/><Radar dataKey="v" stroke={CYAN} fill={CYAN} fillOpacity={0.12} strokeWidth={1.5}/></RadarChart></ResponsiveContainer></div>
          </div>
        </div>
      </div>

      {/* Recent candidates */}
      <div className="gc" style={{ padding:20 }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16 }}><div><h3 style={{ fontSize:15,fontWeight:600,color:T1 }}>Recent Candidates</h3><p style={{ fontSize:12,color:T3 }}>Latest applicants</p></div><button className="btn-s" style={{ fontSize:12,padding:'6px 14px' }} onClick={()=>setCurrentPage('candidates')}>View All</button></div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%',fontSize:13,borderCollapse:'collapse',minWidth:600 }}>
            <thead><tr style={{ color:T3,textAlign:'left',borderBottom:`1px solid ${LINE}` }}><th style={{ padding:'0 0 10px',fontWeight:500 }}>Candidate</th><th style={{ padding:'0 0 10px',fontWeight:500 }}>Match</th><th style={{ padding:'0 0 10px',fontWeight:500 }}>DNA</th><th style={{ padding:'0 0 10px',fontWeight:500 }}>Status</th><th style={{ padding:'0 0 10px',fontWeight:500 }}>Verdict</th></tr></thead>
            <tbody>{candidates.slice(0,5).map(c=>(
              <tr key={c.id} onClick={()=>{setSelectedCandidate(c);setCurrentPage('ai-summary')}} style={{ borderBottom:`1px solid ${LINE}`,cursor:'pointer' }}>
                <td style={{ padding:'10px 0' }}><div style={{ display:'flex',alignItems:'center',gap:10 }}><div className="grad-p" style={{ width:30,height:30,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:10,flexShrink:0 }}>{c.avatar}</div><div><div style={{ color:T1,fontWeight:500,fontSize:13 }}>{c.name}</div><div style={{ color:T3,fontSize:11 }}>{c.title}</div></div></div></td>
                <td style={{ padding:'10px 0' }}><div style={{ display:'flex',alignItems:'center',gap:8 }}><div style={{ width:56,height:6,background:'rgba(255,255,255,0.05)',borderRadius:99,overflow:'hidden' }}><div className="bar-fill" style={{ height:'100%',width:`${c.matchScore}%` }}/></div><span style={{ color:T1,fontFamily:'monospace',fontSize:12 }}>{c.matchScore}%</span></div></td>
                <td style={{ padding:'10px 0',color:T1,fontFamily:'monospace',fontSize:12 }}>{c.talentDNA.overall}</td>
                <td style={{ padding:'10px 0' }}><span style={{ padding:'3px 10px',borderRadius:99,fontSize:11,fontWeight:500,background:statusColor(c.status)+'1F',color:statusColor(c.status),textTransform:'capitalize' }}>{c.status}</span></td>
                <td style={{ padding:'10px 0' }}><span style={{ fontSize:12,fontWeight:600,color:verdictColor(c.hiringRecommendation) }}>{c.hiringRecommendation}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
