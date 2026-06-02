import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { BG, CYAN, VIOLET, MINT, ROSE, AMBER, T1, T2, T3, LINE } from '../ui';
import { Brain, Zap, Shield, BarChart3, Users, FileText, ArrowRight, CheckCircle, Star, ChevronRight, Sparkles, Target, TrendingUp, Search, Upload, Award, Layers, Globe, Lock, Clock, type LucideIcon } from 'lucide-react';

const f = (d=0) => ({ initial:{opacity:0,y:24} as const, whileInView:{opacity:1,y:0} as const, viewport:{once:true} as const, transition:{duration:0.5,delay:d} });

export default function Landing() {
  const go = useStore(s => s.setCurrentPage);
  return (
    <div style={{ minHeight:'100vh', background:BG }}>
      {/* Nav */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, height:64, backdropFilter:'blur(20px)', background:'rgba(11,16,32,0.88)', borderBottom:`1px solid ${LINE}` }}>
        <div style={{ maxWidth:1200, margin:'0 auto', height:'100%', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            <div className="grad-p" style={{ width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}><Brain style={{ width:18, height:18, color:BG }} /></div>
            <span style={{ fontSize:20, fontWeight:700, color:T1 }}>Hire<span style={{ color:CYAN }}>Lens</span></span>
          </div>
          <div className="hidden md:flex" style={{ gap:32, fontSize:14 }}>{['Features','How It Works','Pricing'].map(l=><a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} style={{ color:T2, textDecoration:'none' }}>{l}</a>)}</div>
          <div style={{ display:'flex', gap:12, flexShrink:0 }}>
            <button className="btn-s hidden sm:inline-flex" style={{ fontSize:13, padding:'8px 18px' }} onClick={()=>go('dashboard')}>Sign In</button>
            <button className="btn-p" style={{ fontSize:13, padding:'8px 18px' }} onClick={()=>go('dashboard')}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position:'relative', paddingTop:120, paddingBottom:64 }}>
        <div className="ambient-bg" />
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', position:'relative', zIndex:1 }}>
          <motion.div {...f(0)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:99, border:`1px solid ${CYAN}40`, background:CYAN+'0D', color:CYAN, fontSize:13, marginBottom:20 }}><Sparkles style={{ width:14,height:14 }} /> AI-Powered Recruitment Intelligence</motion.div>
          <motion.h1 {...f(0.08)} style={{ fontSize:'clamp(36px,6vw,72px)', fontWeight:900, color:T1, lineHeight:1.08, marginBottom:20, maxWidth:700 }}>See Through <span className="grad-text">Talent</span></motion.h1>
          <motion.p {...f(0.16)} style={{ fontSize:18, color:T2, maxWidth:540, marginBottom:28, lineHeight:1.6 }}>The future of AI-powered recruitment intelligence. Analyze, evaluate, compare, rank, and hire the best candidates — in minutes, not months.</motion.p>
          <motion.div {...f(0.24)} style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
            <button className="btn-p" style={{ fontSize:16, padding:'14px 28px' }} onClick={()=>go('dashboard')}>Start Hiring Smarter <ArrowRight style={{ width:16,height:16 }} /></button>
            <button className="btn-s" style={{ fontSize:16, padding:'14px 28px' }} onClick={()=>go('dashboard')}>Watch Demo</button>
          </motion.div>
          <motion.div {...f(0.32)} style={{ display:'flex', flexWrap:'wrap', gap:20, marginTop:28, fontSize:13, color:T3 }}>
            {['No credit card','14-day trial','SOC 2'].map(t=><span key={t} style={{ display:'flex', alignItems:'center', gap:6 }}><CheckCircle style={{ width:14,height:14,color:MINT }} />{t}</span>)}
          </motion.div>
          <motion.div {...f(0.5)} style={{ marginTop:72, textAlign:'center' }}>
            <p style={{ color:T3, fontSize:11, textTransform:'uppercase', letterSpacing:3, marginBottom:20 }}>Trusted by recruiting teams at</p>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', gap:40, color:T3+'50' }}>
              {['Google','Meta','Stripe','Vercel','Linear','Notion'].map(c=><span key={c} style={{ fontSize:16, fontWeight:700, letterSpacing:1 }}>{c}</span>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <Sec><SH badge="The Problem" bc={ROSE} icon={Shield} title="Recruiting is Broken" desc="Traditional hiring is slow, biased, and expensive." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginTop:48 }}>
          {([[Clock,'23 hrs','Avg screening time',ROSE],[Users,'75%','Resumes never seen',AMBER],[TrendingUp,'$4,700','Avg cost per hire',ROSE],[Search,'42 days','Avg time to fill',AMBER]] as [LucideIcon,string,string,string][]).map(([Ic,val,lbl,clr],i)=>(
            <motion.div key={i} {...f(i*0.08)} className="gc" style={{ padding:24, textAlign:'center' }}><Ic style={{ width:28,height:28,color:clr,margin:'0 auto 8px' }} /><div style={{ fontSize:28,fontWeight:700,color:T1,marginBottom:4 }}>{val}</div><div style={{ fontSize:12,color:T3 }}>{lbl}</div></motion.div>
          ))}
        </div>
      </Sec>

      {/* Solution */}
      <Sec><SH badge="The Solution" bc={MINT} icon={Sparkles} title="AI That Thinks Like Your Best Recruiter" desc="Automate screening, eliminate bias, find the perfect candidate." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20, marginTop:48 }}>
          {([[Zap,'10x Faster Screening','AI analyzes hundreds of resumes in seconds.',CYAN],[Shield,'Zero Bias Hiring','Evaluates purely on skills and merit.',MINT],[Brain,'Talent DNA Insights','Proprietary multi-dimensional scoring.',VIOLET]] as [LucideIcon,string,string,string][]).map(([Ic,title,desc,clr],i)=>(
            <motion.div key={i} {...f(i*0.1)} className="gc" style={{ padding:28 }}>
              <div style={{ width:44,height:44,borderRadius:12,background:clr+'1A',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16 }}><Ic style={{ width:20,height:20,color:clr }} /></div>
              <h3 style={{ fontSize:18,fontWeight:700,color:T1,marginBottom:6 }}>{title}</h3><p style={{ fontSize:14,color:T2,lineHeight:1.6 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </Sec>

      {/* Features */}
      <Sec id="features"><SH badge="Features" bc={CYAN} icon={Layers} title="Everything You Need to Hire Smarter" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16, marginTop:48 }}>
          {([[Upload,'Smart Resume Parser','AI extracts skills, experience with 97% accuracy.'],[Target,'JD Matching Engine','Multi-dimensional scoring and gap analysis.'],[Brain,'AI Candidate Summary','Executive summaries with recommendations.'],[FileText,'Interview Questions','Role-specific technical & behavioral questions.'],[BarChart3,'Talent DNA Analysis','Proprietary multi-dimensional scoring.'],[Users,'Smart Shortlisting','AI-powered ranking and confidence scores.'],[Star,'Candidate Comparison','Side-by-side analysis and radar charts.'],[Award,'Auto Reports','Professional evaluation reports.'],[TrendingUp,'Skill Gap Analysis','Identify missing skills and gaps.']] as [LucideIcon,string,string][]).map(([Ic,title,desc],i)=>(
            <motion.div key={i} {...f(i*0.05)} className="gc" style={{ padding:20 }}>
              <div style={{ width:40,height:40,borderRadius:10,background:CYAN+'14',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12 }}><Ic style={{ width:18,height:18,color:CYAN }} /></div>
              <h3 style={{ fontSize:15,fontWeight:600,color:T1,marginBottom:4 }}>{title}</h3><p style={{ fontSize:13,color:T2,lineHeight:1.5 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </Sec>

      {/* How It Works */}
      <Sec id="how-it-works"><SH badge="How It Works" bc={VIOLET} icon={Zap} title="From Resume to Hire in 4 Steps" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:32, marginTop:48 }}>
          {([['01','Create Job Role','Define position and requirements.',FileText],['02','Upload Resumes','PDF, DOCX, or image formats.',Upload],['03','AI Analysis','Parse, score, and rank automatically.',Brain],['04','Hire the Best','Review insights and decide.',Award]] as [string,string,string,LucideIcon][]).map(([n,title,desc,Ic],i)=>(
            <motion.div key={i} {...f(i*0.1)} style={{ textAlign:'center', position:'relative' }}>
              <div style={{ fontSize:56,fontWeight:900,color:CYAN+'0D',lineHeight:1,marginBottom:12 }}>{n}</div>
              <div className="grad-p" style={{ width:48,height:48,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px' }}><Ic style={{ width:22,height:22,color:BG }} /></div>
              <h3 style={{ fontSize:16,fontWeight:700,color:T1,marginBottom:4 }}>{title}</h3><p style={{ fontSize:13,color:T2 }}>{desc}</p>
              {i<3 && <ChevronRight className="hidden lg:block" style={{ position:'absolute',top:64,right:-16,width:20,height:20,color:CYAN+'33' }} />}
            </motion.div>
          ))}
        </div>
      </Sec>

      {/* Pricing */}
      <Sec id="pricing"><SH badge="Pricing" bc={CYAN} icon={Zap} title="Simple, Transparent Pricing" />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20, marginTop:48, maxWidth:960, marginLeft:'auto', marginRight:'auto' }}>
          {[{n:'Starter',p:'$49',per:'/mo',d:'For small teams',feat:['5 job roles','50 analyses/mo','Resume Parser','JD Matching','Reports'],pop:false},{n:'Professional',p:'$149',per:'/mo',d:'For growing teams',feat:['Unlimited roles','500 analyses/mo','All AI Features','Talent DNA','Shortlisting','Priority Support'],pop:true},{n:'Enterprise',p:'Custom',per:'',d:'For large orgs',feat:['Unlimited everything','Custom AI models','SSO & SAML','API Access','Dedicated CSM'],pop:false}].map((p,i)=>(
            <motion.div key={i} {...f(i*0.1)} className={`gc ${p.pop?'gc-glow':''}`} style={{ padding:28,position:'relative' }}>
              {p.pop && <div className="grad-p" style={{ position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',padding:'3px 14px',borderRadius:99,color:BG,fontSize:11,fontWeight:700,whiteSpace:'nowrap' }}>Most Popular</div>}
              <h3 style={{ fontSize:18,fontWeight:700,color:T1,marginBottom:4 }}>{p.n}</h3><p style={{ fontSize:13,color:T3,marginBottom:16 }}>{p.d}</p>
              <div style={{ marginBottom:20 }}><span style={{ fontSize:36,fontWeight:900,color:T1 }}>{p.p}</span><span style={{ color:T3,fontSize:14 }}>{p.per}</span></div>
              <button className={p.pop?'btn-p':'btn-s'} style={{ width:'100%',marginBottom:20 }} onClick={()=>go('dashboard')}>{p.n==='Enterprise'?'Contact Sales':'Start Free Trial'}</button>
              <ul style={{ listStyle:'none',display:'flex',flexDirection:'column',gap:10 }}>{p.feat.map(fi=><li key={fi} style={{ display:'flex',alignItems:'center',gap:8,fontSize:14,color:T2 }}><CheckCircle style={{ width:14,height:14,color:MINT,flexShrink:0 }} />{fi}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </Sec>

      {/* CTA */}
      <Sec>
        <motion.div {...f()} className="gc gc-glow" style={{ maxWidth:800,margin:'0 auto',padding:'56px 40px',textAlign:'center',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',inset:0,background:`linear-gradient(135deg,${CYAN}0D,transparent,${VIOLET}0D)`,pointerEvents:'none' }} />
          <div style={{ position:'relative',zIndex:1 }}>
            <h2 style={{ fontSize:'clamp(28px,4vw,48px)',fontWeight:900,color:T1,marginBottom:12 }}>Ready to See Through Talent?</h2>
            <p style={{ fontSize:16,color:T2,marginBottom:28,maxWidth:500,marginLeft:'auto',marginRight:'auto' }}>Join 500+ recruiting teams who hire smarter.</p>
            <button className="btn-p" style={{ fontSize:16,padding:'14px 32px' }} onClick={()=>go('dashboard')}>Start Free Trial <ArrowRight style={{ width:16,height:16 }} /></button>
          </div>
        </motion.div>
      </Sec>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${LINE}`,padding:'40px 24px' }}>
        <div style={{ maxWidth:1200,margin:'0 auto',display:'flex',flexWrap:'wrap',justifyContent:'space-between',gap:12,fontSize:12,color:T3 }}>
          <span>© 2025 HireLens. All rights reserved.</span>
          <div style={{ display:'flex',gap:16 }}>
            <span style={{ display:'flex',alignItems:'center',gap:4 }}><Lock style={{ width:12,height:12 }} /> SOC 2</span>
            <span style={{ display:'flex',alignItems:'center',gap:4 }}><Globe style={{ width:12,height:12 }} /> GDPR</span>
            <span style={{ display:'flex',alignItems:'center',gap:4 }}><Shield style={{ width:12,height:12 }} /> ISO 27001</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Sec({children,id}:{children:React.ReactNode;id?:string}){return<section id={id} style={{ padding:'64px 24px' }}><div style={{ maxWidth:1200,margin:'0 auto' }}>{children}</div></section>}
function SH({badge,bc,icon:Icon,title,desc}:{badge:string;bc:string;icon:LucideIcon;title:string;desc?:string}){
  return <div style={{ textAlign:'center' }}><motion.div {...f()} style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:99,border:`1px solid ${bc}40`,background:bc+'0D',color:bc,fontSize:12,fontWeight:500,marginBottom:16 }}><Icon style={{ width:14,height:14 }} /> {badge}</motion.div><motion.h2 {...f(0.06)} style={{ fontSize:'clamp(24px,4vw,40px)',fontWeight:700,color:T1,marginBottom:12 }}>{title}</motion.h2>{desc&&<motion.p {...f(0.12)} style={{ color:T2,maxWidth:600,margin:'0 auto',fontSize:15 }}>{desc}</motion.p>}</div>;
}
