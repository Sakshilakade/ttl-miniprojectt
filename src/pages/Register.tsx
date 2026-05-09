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
    confirmPassword: '',
    gender: 'male',
    age: 22
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
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
      wakeupTime: '07:00',
      sleepTime: '23:00',
      workoutTime: '18:00',
      experienceLevel: 'beginner',
      onboardingComplete: false
    });
    
    navigate('/onboarding');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-dark-bg p-6 overflow-y-auto">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/10 blur-[100px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card relative z-10 w-full max-w-md p-8 md:p-10 bg-white border-none shadow-xl shadow-black/5 my-10"
      >
        <button onClick={() => navigate('/')} className="mb-8 flex items-center gap-2 text-sm text-black/20 hover:text-black transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </button>

        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-black">Sign <span className="text-brand-primary">Up</span></h1>
          <p className="mt-2 text-black/30 font-bold uppercase tracking-widest text-[10px]">Create your fitness profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/30">Your Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/10" size={18} />
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-black/5 bg-black/5 px-12 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:border-brand-primary focus:ring-4 text-black"
                placeholder="Sakshi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/30">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/10" size={18} />
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-black/5 bg-black/5 px-12 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:border-brand-primary focus:ring-4 text-black"
                placeholder="john@fitai.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/30">Gender</label>
              <select
                className="w-full appearance-none rounded-2xl border border-black/5 bg-black/5 px-4 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:border-brand-primary focus:ring-4 text-black"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/30">Age</label>
              <input
                type="number"
                required
                className="w-full rounded-2xl border border-black/5 bg-black/5 px-4 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:border-brand-primary focus:ring-4 text-black"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
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

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-black/30">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/10" size={18} />
              <input
                type="password"
                required
                className="w-full rounded-2xl border border-black/5 bg-black/5 px-12 py-4 text-sm font-bold outline-none ring-brand-primary/20 transition-all focus:border-brand-primary focus:ring-4 text-black"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative h-14 w-full overflow-hidden rounded-2xl bg-black font-bold text-white transition-all active:scale-95 mt-4 shadow-sm"
          >
            <span className="flex items-center justify-center gap-2">
              Create Your Account <Sparkles size={18} />
            </span>
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-black/40">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-primary hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
}
