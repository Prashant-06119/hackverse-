import { useStore } from '../store/useStore';
import { GitCompare, Award, Brain, Target, CheckCircle, XCircle } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { CYAN, VIOLET, MINT, AMBER, T1, T2, T3, LINE, verdictColor } from '../ui';

const COLORS=[CYAN,VIOLET,MINT,AMBER];

export default function Comparison(){
  const{candidates,compareList,toggleCompare}=useStore();
  const selected=compareList.length>=2?candidates.filter(c=>compareList.includes(c.id)):candidates.slice(0,3);
  const radar=['Match Score','Leadership','Communication','Adaptability','Technical'].map(m=>{
    const e:Record<string,string|number>={metric:m};
    selected.forEach(c=>{e[c.name]=m==='Match Score'?c.matchScore:m==='Leadership'?c.talentDNA.leadership:m==='Communication'?c.talentDNA.communication:m==='Adaptability'?c.talentDNA.adaptability:c.talentDNA.technical;});
    return e;
  });
  const best=selected.reduce((a,b)=>a.matchScore>b.matchScore?a:b);
  return(
    <div style={{ display:'flex',flexDirection:'column',gap:20 }}>
      <div><h1 style={{ fontSize:22,fontWeight:700,color:T1,display:'flex',alignItems:'center',gap:10 }}><GitCompare style={{ width:22,height:22,color:CYAN }}/>Candidate Comparison</h1><p style={{ fontSize:13,color:T3,marginTop:4 }}>Side-by-side with AI recommendations</p></div>
      <div className="no-scroll" style={{ display:'flex',gap:6,overflowX:'auto',paddingBottom:4 }}>{candidates.map(c=><button key={c.id} onClick={()=>toggleCompare(c.id)} style={{ display:'flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:10,fontSize:12,fontWeight:500,whiteSpace:'nowrap',flexShrink:0,background:compareList.includes(c.id)?CYAN+'1A':'rgba(255,255,255,0.03)',color:compareList.includes(c.id)?CYAN:T3,border:compareList.includes(c.id)?`1px solid ${CYAN}40`:'1px solid transparent',cursor:'pointer' }}><span className="grad-p" style={{ width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontSize:9,fontWeight:700,flexShrink:0 }}>{c.avatar}</span>{c.name.split(' ')[0]}</button>)}</div>
      <div className="gc" style={{ padding:20 }}>
        <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12 }}>Multi-Dimensional Comparison</h3>
        <div style={{ height:320 }}><ResponsiveContainer><RadarChart data={radar}><PolarGrid stroke={CYAN+'14'}/><PolarAngleAxis dataKey="metric" tick={{fill:T2,fontSize:11}}/>{selected.map((c,i)=><Radar key={c.id} name={c.name} dataKey={c.name} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.08} strokeWidth={2}/>)}<Legend wrapperStyle={{fontSize:12}}/></RadarChart></ResponsiveContainer></div>
      </div>
      <div className="gc" style={{ padding:20,overflowX:'auto' }}>
        <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12 }}>Detailed Comparison</h3>
        <table style={{ width:'100%',fontSize:13,borderCollapse:'collapse',minWidth:500 }}>
          <thead><tr style={{ borderBottom:`1px solid ${LINE}` }}><th style={{ textAlign:'left',color:T3,fontWeight:500,paddingBottom:10 }}>Metric</th>{selected.map((c,i)=><th key={c.id} style={{ textAlign:'center',paddingBottom:10 }}><div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:4 }}><div className="grad-p" style={{ width:28,height:28,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#0B1020',fontWeight:700,fontSize:10 }}>{c.avatar}</div><span style={{ fontWeight:600,fontSize:12,color:COLORS[i] }}>{c.name.split(' ')[0]}</span></div></th>)}</tr></thead>
          <tbody>
            {([['Match Score','matchScore'],['Skills Match','skillsMatch'],['Experience','experienceMatch'],['Education','educationMatch'],['Culture Fit','cultureFit'],['Talent DNA',null,'overall'],['Leadership',null,'leadership'],['Communication',null,'communication'],['Adaptability',null,'adaptability'],['Technical',null,'technical'],['Experience (yrs)','experience'],['Confidence','hiringConfidence']] as [string,string|null,string?][]).map(([label,key,dk])=>{
              const vals=selected.map(c=>key?(c as unknown as Record<string,number>)[key]:c.talentDNA[dk as keyof typeof c.talentDNA]);const mx=Math.max(...vals);
              return(<tr key={label} style={{ borderBottom:`1px solid rgba(0,229,255,0.06)` }}><td style={{ padding:'8px 0',color:T3,fontSize:12,fontWeight:500 }}>{label}</td>{selected.map((c,i)=>{const v=vals[i];return<td key={c.id} style={{ padding:'8px 0',textAlign:'center' }}><span style={{ fontFamily:'monospace',fontSize:12,fontWeight:600,color:v===mx?MINT:T1 }}>{v}{key!=='experience'?'%':'y'}</span>{v===mx&&<span style={{ color:MINT,fontSize:9,marginLeft:2 }}>★</span>}</td>})}</tr>);
            })}
            <tr style={{ borderBottom:`1px solid rgba(0,229,255,0.06)` }}><td style={{ padding:'8px 0',color:T3,fontSize:12,fontWeight:500 }}>Skills</td>{selected.map(c=><td key={c.id} style={{ padding:'8px 0',textAlign:'center' }}><div style={{ display:'flex',flexWrap:'wrap',gap:2,justifyContent:'center' }}>{c.skills.slice(0,3).map(s=><span key={s} style={{ padding:'2px 6px',borderRadius:4,fontSize:9,background:CYAN+'14',color:CYAN }}>{s}</span>)}</div></td>)}</tr>
            <tr><td style={{ padding:'8px 0',color:T3,fontSize:12,fontWeight:500 }}>Verdict</td>{selected.map(c=><td key={c.id} style={{ padding:'8px 0',textAlign:'center' }}><span style={{ fontSize:12,fontWeight:700,color:verdictColor(c.hiringRecommendation) }}>{c.hiringRecommendation}</span></td>)}</tr>
          </tbody>
        </table>
      </div>
      <div className="gc gc-glow" style={{ padding:20 }}>
        <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:12,display:'flex',alignItems:'center',gap:8 }}><Brain style={{ width:16,height:16,color:CYAN }}/>AI Recommendation</h3>
        <div style={{ display:'flex',alignItems:'flex-start',gap:12,padding:16,borderRadius:10,background:MINT+'0A',border:`1px solid ${MINT}26` }}>
          <Award style={{ width:28,height:28,color:MINT,flexShrink:0 }}/>
          <div style={{ minWidth:0 }}><div style={{ color:MINT,fontWeight:700,fontSize:14,marginBottom:4 }}>Recommended: {best.name}</div><p style={{ fontSize:13,color:T2,lineHeight:1.6 }}>{best.summary}</p><div style={{ display:'flex',flexWrap:'wrap',gap:12,marginTop:8,fontSize:12 }}><span style={{ color:MINT,display:'flex',alignItems:'center',gap:4 }}><Target style={{ width:12,height:12 }}/>{best.matchScore}% Match</span><span style={{ color:CYAN,display:'flex',alignItems:'center',gap:4 }}><Brain style={{ width:12,height:12 }}/>DNA: {best.talentDNA.overall}</span><span style={{ color:VIOLET,display:'flex',alignItems:'center',gap:4 }}><CheckCircle style={{ width:12,height:12 }}/>{best.hiringConfidence}% Conf</span></div></div>
        </div>
        {selected.filter(c=>c.id!==best.id).map(c=>(
          <div key={c.id} style={{ display:'flex',alignItems:'flex-start',gap:12,padding:12,borderRadius:10,background:'rgba(255,255,255,0.02)',marginTop:8 }}>
            <XCircle style={{ width:20,height:20,color:T3,flexShrink:0 }}/>
            <div style={{ minWidth:0 }}><div style={{ color:T1,fontSize:13,fontWeight:500 }}>{c.name} — {c.hiringRecommendation}</div><p style={{ color:T3,fontSize:12 }}>Match: {c.matchScore}% • DNA: {c.talentDNA.overall} • Conf: {c.hiringConfidence}%</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
