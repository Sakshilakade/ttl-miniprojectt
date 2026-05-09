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
      wakeupTime: '07:00',
      sleepTime: '22:00',
      workoutTime: '18:00',
      experienceLevel: 'beginner',
      onboardingComplete: true
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-dark-bg p-6">
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/10 blur-[100px]" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative z-10 w-full max-w-sm p-8 bg-white border-none shadow-xl shadow-black/5"
      >
        <button onClick={() => navigate('/')} className="mb-8 flex items-center gap-2 text-sm text-black/20 hover:text-black transition-colors">
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-black">Log <span className="text-brand-primary">In</span></h1>
          <p className="mt-2 text-black/30 font-bold uppercase tracking-widest text-[10px]">Access your fitness partner</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/30">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/10" size={18} />
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-black/5 bg-black/5 px-12 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:border-brand-primary focus:ring-4 text-black"
                placeholder="username@fitai.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/30">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/10" size={18} />
              <input
                type="password"
                required
                className="w-full rounded-2xl border border-black/5 bg-black/5 px-12 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:border-brand-primary focus:ring-4 text-black"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative h-14 w-full overflow-hidden rounded-2xl bg-black text-white font-bold transition-all active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              Login to FitAI <ShieldCheck size={18} />
            </span>
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-black/40">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-brand-primary hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
