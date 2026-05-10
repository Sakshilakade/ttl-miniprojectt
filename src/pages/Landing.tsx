import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, Zap, Shield, Sparkles } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white selection:bg-brand-primary selection:text-black">
      {/* Background Soft Blobs */}
      <div className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 bottom-1/4 h-[500px] w-[500px] rounded-full bg-brand-primary/10 blur-[100px] pointer-events-none" />

      <nav className="container mx-auto flex h-24 items-center justify-between px-6 relative z-10 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-brand-primary p-0.5 shadow-lg shadow-brand-primary/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
              <Zap size={20} className="text-brand-primary" fill="currentColor" />
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-tighter text-black">Fit<span className="text-brand-primary">Ai</span></span>
        </div>
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors hidden md:block"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="rounded-full bg-brand-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-brand-primary/90 active:scale-95 shadow-lg shadow-brand-primary/20"
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="container mx-auto flex flex-col items-center justify-center px-6 py-16 text-center relative z-10 md:py-20">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-5xl flex flex-col items-center"
        >
          {/* Brand Identity Section */}
          <div className="flex flex-col items-center mb-12 group">
            <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-2xl shadow-brand-primary/20 border border-black/5 transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 rounded-2xl bg-brand-primary/30 blur-2xl opacity-100 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-2xl bg-white">
                <Zap size={28} className="text-brand-primary animate-pulse" fill="currentColor" />
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-2xl font-bold tracking-tighter text-black">
                Fit<span className="text-brand-primary">AI</span>
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/20">
                Smart AI Fitness Planner
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black/60 mb-8 shadow-sm">
            <Sparkles size={12} className="text-brand-primary" />
            AI-powered fitness for modern life
          </div>

          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl text-black mb-10 max-w-4xl mx-auto">
            Your Personalized <span className="text-brand-primary">AI Fitness Guide</span>
          </h1>
          
          <p className="mx-auto max-w-xl text-lg text-black/40 md:text-xl font-medium leading-relaxed">
            Personalized meal plans and workouts tailored to your unique biology and lifestyle.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 gap-10 md:mt-28 md:grid-cols-3 w-full max-w-6xl">
          {[
            { icon: Target, title: "Precision Goals", desc: "Scientific approach to habit building and daily tracking.", color: "bg-brand-primary/10" },
            { icon: Zap, title: "Smart Nutrition", desc: "AI-generated meal plans that adapt to your taste and nutritional needs.", color: "bg-brand-primary/10" },
            { icon: Shield, title: "Elite Co-pilot", desc: "Workout routines that evolve as you get stronger and faster.", color: "bg-brand-primary/10" }
          ].map((feature, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={i}
              className="group flex flex-col items-start p-10 text-left bg-white border border-black/5 rounded-[40px] shadow-xl shadow-neutral-200/60 transition-all hover:border-brand-primary/30 hover:-translate-y-2"
            >
              <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color} text-brand-primary transition-transform group-hover:scale-110`}>
                <feature.icon size={28} />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-black tracking-tight">{feature.title}</h3>
              <p className="text-black/40 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="container mx-auto py-16 px-6 flex flex-col md:flex-row items-center justify-between border-t border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/20 relative z-10">
        <div>© 2026 FitAi PREMIUM PERFORMANCE SYSTEMS</div>
        <div className="flex gap-8 mt-6 md:mt-0">
          <span className="hover:text-black cursor-pointer">Privacy</span>
          <span className="hover:text-black cursor-pointer">Terms</span>
          <span className="hover:text-black cursor-pointer">Contact</span>
        </div>
      </footer>
    </div>
  );
}
