import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { ChevronRight, ChevronLeft, Target, Activity, Clock, Award, Sparkles } from 'lucide-react';
import { Goal, DietPreference, WorkoutPreference, ExperienceLevel } from '../types';

const steps = [
  { id: 1, title: 'Biometrics', icon: Activity },
  { id: 2, title: 'Fitness Goal', icon: Target },
  { id: 3, title: 'Preferences', icon: Award },
  { id: 4, title: 'Daily Routine', icon: Clock },
  { id: 5, title: 'Expertise', icon: Sparkles },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { profile, setProfile, generatePlan } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    height: profile?.height || 170,
    weight: profile?.weight || 70,
    goal: (profile?.goal || 'maintenance') as Goal,
    dietPreference: (profile?.dietPreference || 'vegetarian') as DietPreference,
    workoutPreference: (profile?.workoutPreference || 'home workout') as WorkoutPreference,
    wakeupTime: profile?.wakeupTime || '07:00',
    sleepTime: profile?.sleepTime || '23:00',
    workoutTime: profile?.workoutTime || '18:00',
    experienceLevel: (profile?.experienceLevel || 'beginner') as ExperienceLevel,
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFinish = () => {
    if (!profile) return;
    setProfile({
      ...profile,
      ...formData,
    });
    generatePlan();
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
               <label className="text-xs font-bold uppercase tracking-widest text-black/30">Your Height</label>
               <input
                 type="range" min="100" max="250"
                 className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/5 accent-brand-primary"
                 value={formData.height}
                 onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
               />
               <div className="mt-2 text-center font-display text-4xl font-bold text-black">{formData.height}<span className="text-xl text-black/20">cm</span></div>
            </div>
            <div>
               <label className="text-xs font-bold uppercase tracking-widest text-black/30">Your Weight</label>
               <input
                 type="range" min="30" max="200"
                 className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-lg bg-black/5 accent-brand-pink"
                 value={formData.weight}
                 onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
               />
               <div className="mt-2 text-center font-display text-4xl font-bold text-black">{formData.weight}<span className="text-xl text-black/20">kg</span></div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-4">
            {(['fat loss', 'muscle gain', 'maintenance'] as Goal[]).map(g => (
              <button
                key={g}
                onClick={() => setFormData({ ...formData, goal: g })}
                className={`flex items-center justify-between rounded-2xl border p-6 transition-all ${
                  formData.goal === g ? 'border-brand-primary bg-brand-primary/10 text-black' : 'border-black/5 bg-black/5 hover:bg-black/10 text-black/60'
                }`}
              >
                <span className="capitalize font-bold">{g}</span>
                {formData.goal === g && <div className="h-4 w-4 rounded-full bg-brand-primary shadow-sm" />}
              </button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div>
              <label className="mb-4 block text-xs font-bold uppercase tracking-widest text-black/30">Dietary Preferences</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(['vegetarian', 'non-vegetarian', 'vegan', 'veg + non-veg'] as DietPreference[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setFormData({ ...formData, dietPreference: d })}
                    className={`rounded-xl border py-4 px-2 text-xs font-bold transition-all ${
                      formData.dietPreference === d ? 'border-brand-primary bg-brand-primary/10 text-black' : 'border-black/5 bg-black/5 text-black/40'
                    }`}
                  >
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-4 block text-xs font-bold uppercase tracking-widest text-black/30">Your Workout Spot</label>
              <div className="grid grid-cols-2 gap-3">
                {(['home workout', 'gym workout'] as WorkoutPreference[]).map(w => (
                  <button
                    key={w}
                    onClick={() => setFormData({ ...formData, workoutPreference: w })}
                    className={`rounded-xl border py-4 font-bold transition-all ${
                      formData.workoutPreference === w ? 'border-brand-primary bg-brand-primary/10 text-black' : 'border-black/5 bg-black/5 hover:bg-black/10 text-black/40'
                    }`}
                  >
                    {w.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
          return (
            <div className="space-y-6">
              {[
                { label: 'Wakeup Time', key: 'wakeupTime' },
                { label: 'Sleep Time', key: 'sleepTime' },
                { label: 'Workout Time', key: 'workoutTime' }
              ].map(t => (
                <div key={t.key} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/30">{t.label}</label>
                  <input
                    type="time"
                    className="w-full rounded-2xl border border-black/5 bg-black/5 p-4 outline-none transition-all focus:border-brand-primary"
                    value={formData[t.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [t.key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          );
      case 5:
        return (
          <div className="grid grid-cols-1 gap-4">
            {(['beginner', 'intermediate', 'advanced'] as ExperienceLevel[]).map(l => (
              <button
                key={l}
                onClick={() => setFormData({ ...formData, experienceLevel: l })}
                className={`flex flex-col rounded-2xl border p-6 transition-all text-left ${
                  formData.experienceLevel === l ? 'border-brand-primary bg-brand-primary/10 text-black' : 'border-black/5 bg-black/5 hover:bg-black/10 text-black/60'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-black/30 mb-1">Level</span>
                <span className="font-display text-xl font-bold capitalize">{l}</span>
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12 md:py-24">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
           {steps.map(s => (
             <div key={s.id} className="flex flex-col items-center gap-2">
               <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                 currentStep >= s.id ? 'border-brand-primary bg-brand-primary text-black' : 'border-black/5 bg-black/5 text-black/20'
               }`}>
                 <s.icon size={18} />
               </div>
               <span className={`text-[10px] font-bold uppercase tracking-tighter ${currentStep >= s.id ? 'text-black' : 'text-black/20'}`}>
                 {s.title}
               </span>
             </div>
           ))}
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-black text-center">Set up your <span className="text-brand-primary">Profile</span></h1>
        <p className="mt-2 text-black/40 text-center uppercase tracking-widest text-xs font-bold">Step {currentStep} of {steps.length}: {steps[currentStep-1].title}</p>
      </div>

      <div className="glass-card min-h-[400px] p-8 md:p-12 bg-white border border-black/5 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-black/5 bg-black/5 px-6 font-bold text-black transition-all hover:bg-black/10 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft size={20} /> Back
          </button>
          {currentStep === steps.length ? (
            <button
              onClick={handleFinish}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 font-bold text-white transition-all hover:scale-105 active:scale-95"
            >
              Get Started <Sparkles size={20} />
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 font-bold text-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/20"
            >
              Next Step <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
