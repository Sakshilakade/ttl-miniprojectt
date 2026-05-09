import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Target, Zap, Shield, ChevronRight } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-dark-bg selection:bg-brand-primary selection:text-black">
      {/* Background Soft Blobs */}
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-brand-primary/10 blur-[100px]" />
      <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-brand-secondary/10 blur-[100px]" />

      <nav className="container mx-auto flex h-24 items-center justify-between px-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-brand-primary p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
              <Zap size={20} className="text-brand-primary" fill="currentColor" />
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-tighter text-black">Fit<span className="text-brand-primary">Ai</span></span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="text-sm font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors"
        >
          Sign In
        </button>
      </nav>

      <main className="container mx-auto flex flex-col items-center justify-center px-6 py-20 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-black/40 mb-8 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-primary" />
            Fitness Made Simple
          </div>

          <h1 className="font-display text-7xl font-bold leading-[0.95] tracking-tight md:text-9xl text-black">
            Your Personalized <span className="text-brand-primary">Fitness Guide</span>
          </h1>
          
          <p className="mx-auto mt-10 max-w-xl text-lg text-black/40 md:text-xl">
            Get personalized meal plans, workouts, and progress tracking in one simple app.
          </p>

          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/register')}
              className="group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-[24px] bg-black px-10 font-bold text-white transition-all hover:scale-105 active:scale-95 sm:w-auto"
            >
              Start Your Journey
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex h-16 w-full items-center justify-center rounded-[24px] border border-black/10 bg-white px-10 font-bold tracking-tight text-black transition-all hover:bg-black/5 sm:w-auto"
            >
              Login
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="mt-40 grid grid-cols-1 gap-8 md:grid-cols-3 w-full max-w-6xl">
          {[
            { icon: Target, title: "Daily Goals", desc: "Simple daily tasks to help you build healthy habits." },
            { icon: Zap, title: "Personalized Meals", desc: "Healthy meal plans tailored to your food preferences." },
            { icon: Shield, title: "Smart Workouts", desc: "Exercise routines designed specifically for your level." }
          ].map((feature, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              key={i}
              className="glass-card flex flex-col items-center p-10 text-center"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[20px] bg-black/5 text-brand-primary">
                <feature.icon size={32} />
              </div>
              <h3 className="mb-4 font-display text-2xl font-bold text-black">{feature.title}</h3>
              <p className="text-black/40 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="container mx-auto py-12 px-6 text-center text-xs font-bold uppercase tracking-widest text-black/20 relative z-10">
        © 2026 FitAi DIGITAL PERFORMANCE SYSTEMS
      </footer>
    </div>
  );
}
