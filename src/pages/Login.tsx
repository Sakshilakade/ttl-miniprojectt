import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, Mail, Lock, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { setProfile } = useApp();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // In a real app, we'd verify the password. Since this is a mini project using localStorage:
    const savedState = localStorage.getItem('fitai_fitness_state');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (parsed.profile && parsed.profile.email === formData.email) {
        // Restore existing profile
        setProfile(parsed.profile);
        navigate('/dashboard');
        return;
      }
    }

    // Default mock login
    const nameFromEmail = formData.email.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    setProfile({
      name: capitalizedName,
      email: formData.email,
      age: 24,
      gender: 'female',
      height: 165,
      weight: 55,
      goal: 'fat loss',
      dietPreference: 'veg + non-veg',
      workoutPreference: 'home workout',
      workoutFocusArea: 'Full Body',
      workoutDuration: '45 mins',
      wakeupTime: '07:00',
      sleepTime: '22:00',
      workoutTime: '18:00',
      experienceLevel: 'beginner',
      onboardingComplete: true
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f8f8f5] p-6 selection:bg-brand-primary selection:text-black">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm p-10 bg-white rounded-[40px] border border-black/5 shadow-2xl shadow-neutral-200/70"
      >
        <button onClick={() => navigate('/')} className="mb-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors group">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Return Home
        </button>

        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-black">Welcome <span className="text-brand-primary">Back</span></h1>
          <p className="mt-2 text-black/30 font-bold uppercase tracking-widest text-[10px]">Continue your fitness journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-black/10 transition-colors group-focus-within:text-brand-primary" size={18} />
              <input
                type="email"
                required
                className="w-full rounded-[20px] border border-black/5 bg-[#f8f8f5] px-14 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:bg-white focus:border-brand-primary focus:ring-4 text-black placeholder:text-black/20"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-black/10 transition-colors group-focus-within:text-brand-primary" size={18} />
              <input
                type="password"
                required
                className="w-full rounded-[20px] border border-black/5 bg-[#f8f8f5] px-14 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:bg-white focus:border-brand-primary focus:ring-4 text-black placeholder:text-black/20"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative h-16 w-full overflow-hidden rounded-[20px] bg-brand-primary text-black font-bold transition-all active:scale-95 hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/30"
          >
            <span className="flex items-center justify-center gap-2">
              Sign In <ShieldCheck size={18} className="transition-transform group-hover:scale-110" />
            </span>
          </button>
        </form>

        <p className="mt-10 text-center text-[11px] font-bold uppercase tracking-widest text-black/40">
          New to FitAI?{' '}
          <Link to="/register" className="text-brand-primary hover:underline underline-offset-4">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
