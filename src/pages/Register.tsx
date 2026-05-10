import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { ArrowLeft, User, Mail, Lock, Sparkles } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { setProfile } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'male',
    age: 22
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Initial profile creation
    setProfile({
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      height: 170, // Default to be updated in onboarding
      weight: 70,  // Default
      goal: 'maintenance',
      dietPreference: 'vegetarian',
      workoutPreference: 'home workout',
      workoutFocusArea: 'Full Body',
      workoutDuration: '45 mins',
      wakeupTime: '07:00',
      sleepTime: '23:00',
      workoutTime: '18:00',
      experienceLevel: 'beginner',
      onboardingComplete: false
    });
    
    navigate('/onboarding');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#f8f8f5] p-6 selection:bg-brand-primary selection:text-black overflow-y-auto">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-10 bg-white rounded-[40px] border border-black/5 shadow-2xl shadow-neutral-200/70 my-10"
      >
        <button onClick={() => navigate('/')} className="mb-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors group">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-black">Sign <span className="text-brand-primary">Up</span></h1>
          <p className="mt-2 text-black/30 font-bold uppercase tracking-widest text-[10px]">Create your fitness profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Your Name</label>
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-black/10 transition-colors group-focus-within:text-brand-primary" size={18} />
              <input
                type="text"
                required
                className="w-full rounded-[20px] border border-black/5 bg-[#f8f8f5] px-14 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:bg-white focus:border-brand-primary focus:ring-4 text-black placeholder:text-black/20"
                placeholder="Sakshi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-black/10 transition-colors group-focus-within:text-brand-primary" size={18} />
              <input
                type="email"
                required
                className="w-full rounded-[20px] border border-black/5 bg-[#f8f8f5] px-14 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:bg-white focus:border-brand-primary focus:ring-4 text-black placeholder:text-black/20"
                placeholder="john@fitai.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Gender</label>
              <select
                className="w-full appearance-none rounded-[20px] border border-black/5 bg-[#f8f8f5] px-5 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:bg-white focus:border-brand-primary focus:ring-4 text-black"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 ml-1">Age</label>
              <input
                type="number"
                required
                className="w-full rounded-[20px] border border-black/5 bg-[#f8f8f5] px-5 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:bg-white focus:border-brand-primary focus:ring-4 text-black"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
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
            className="group relative h-16 w-full overflow-hidden rounded-[20px] bg-brand-primary text-black font-bold transition-all active:scale-95 hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/30 mt-4"
          >
            <span className="flex items-center justify-center gap-2">
              Create Account <Sparkles size={18} className="transition-transform group-hover:scale-110" />
            </span>
          </button>
        </form>

        <p className="mt-10 text-center text-[11px] font-bold uppercase tracking-widest text-black/40">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-primary hover:underline underline-offset-4">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
}
