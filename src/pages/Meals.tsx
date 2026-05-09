import { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Flame, Zap, Droplets, PieChart, ChevronRight, Settings, Utensils, Check, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { getCategoryTip, AITip } from '../services/tipService';

export default function Meals() {
  const { currentMealPlan, profile, setProfile, generatePlan, generateMeals } = useApp();
  const [isGenerating, setIsGenerating] = useState(!currentMealPlan);
  const [step, setStep] = useState(1);
  const [mealTip, setMealTip] = useState<AITip | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMealTip(getCategoryTip('nutrition'));
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      generateMeals();
      setMealTip(getCategoryTip('nutrition'));
      setIsRefreshing(false);
    }, 800);
  };
  const [tempData, setTempData] = useState({
    age: 25,
    height: profile?.height || 170,
    weight: profile?.weight || 70,
    goal: profile?.goal || 'maintenance',
    wakeupTime: profile?.wakeupTime || '07:00',
    sleepTime: profile?.sleepTime || '23:00',
    dietPreference: profile?.dietPreference || 'vegetarian'
  });

  const handleGenerate = () => {
    if (profile) {
      setProfile({
        ...profile,
        ...tempData
      });
      generatePlan();
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className="mb-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-pink/10 text-brand-pink">
               <Utensils size={32} />
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-black">
              Meal Settings
            </h1>
            <p className="mt-2 text-black/40 font-bold uppercase tracking-widest text-[10px]">Customize your healthy eating plan</p>
        </div>

        <div className="glass-card p-10 bg-white border border-black/5 shadow-sm">
           {step === 1 && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/30">Your Age</label>
                  <input
                    type="number"
                    className="w-full rounded-2xl border border-black/5 bg-black/5 p-5 font-bold outline-none focus:border-brand-pink"
                    placeholder="Enter age"
                    value={tempData.age}
                    onChange={(e) => setTempData({...tempData, age: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/30">Height (cm)</label>
                  <input
                    type="number"
                    className="w-full rounded-2xl border border-black/5 bg-black/5 p-5 font-bold outline-none focus:border-brand-pink"
                    placeholder="Enter height"
                    value={tempData.height}
                    onChange={(e) => setTempData({...tempData, height: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/30">Weight (kg)</label>
                  <input
                    type="number"
                    className="w-full rounded-2xl border border-black/5 bg-black/5 p-5 font-bold outline-none focus:border-brand-pink"
                    placeholder="Enter weight"
                    value={tempData.weight}
                    onChange={(e) => setTempData({...tempData, weight: parseInt(e.target.value)})}
                  />
                </div>
                <button onClick={() => setStep(2)} className="flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-black font-bold text-white transition-all hover:scale-[1.02]">
                  Next <ArrowRight size={20} />
                </button>
             </motion.div>
           )}

           {step === 2 && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/30">What do you like to eat?</label>
                  <div className="grid grid-cols-1 gap-3">
                    {['vegetarian', 'non-vegetarian', 'vegan', 'veg + non-veg'].map(p => (
                      <button
                        key={p}
                        onClick={() => setTempData({...tempData, dietPreference: p as any})}
                        className={cn(
                          "flex h-14 items-center justify-between rounded-xl px-6 font-bold transition-all",
                          tempData.dietPreference === p ? "bg-brand-pink text-black" : "bg-black/5 text-black/40"
                        )}
                      >
                        <span className="capitalize">{p.replace('-', ' ')}</span>
                        {tempData.dietPreference === p && <Check size={20} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="h-16 flex-1 rounded-2xl border border-black/5 font-bold text-black/40">Back</button>
                  <button onClick={() => setStep(3)} className="h-16 flex-2 rounded-2xl bg-black font-bold text-white">Next</button>
                </div>
             </motion.div>
           )}

           {step === 3 && (
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/30">Wakeup</label>
                    <input type="time" className="w-full rounded-xl bg-black/5 p-4 font-bold" value={tempData.wakeupTime} onChange={(e) => setTempData({...tempData, wakeupTime: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-black/30">Sleep</label>
                    <input type="time" className="w-full rounded-xl bg-black/5 p-4 font-bold" value={tempData.sleepTime} onChange={(e) => setTempData({...tempData, sleepTime: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="h-16 flex-1 rounded-2xl border border-black/5 font-bold text-black/40">Back</button>
                  <button onClick={handleGenerate} className="h-16 flex-2 rounded-2xl bg-brand-primary font-bold text-black transition-all hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20">Generate Plan</button>
                </div>
             </motion.div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-black">
            {profile?.name.split(' ')[0]}'s Meal Plan
          </h1>
          <p className="mt-2 text-black/40 uppercase tracking-widest text-xs font-bold">
            {profile?.dietPreference} • {profile?.goal}
          </p>
        </div>

        {mealTip && (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex max-w-xs items-center gap-4 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-4"
           >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-black">
                 <Sparkles size={18} />
              </div>
              <p className="text-[10px] font-bold leading-relaxed text-black/60 italic">
                 "{mealTip.tip}"
              </p>
           </motion.div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={cn(
              "flex h-14 items-center gap-2 rounded-2xl border border-brand-primary px-6 font-bold text-black transition-all hover:bg-brand-primary/10 active:scale-95 disabled:opacity-50",
              isRefreshing && "animate-pulse"
            )}
          >
            <Sparkles size={20} className={cn(isRefreshing && "animate-spin")} />
            Regenerate AI Meal Plan
          </button>
          
          <button 
            onClick={() => setIsGenerating(true)}
            className="flex h-14 items-center gap-2 rounded-2xl bg-black px-8 font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
          >
            <Settings size={20} />
            Plan Settings
          </button>
        </div>
      </header>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Calories', value: currentMealPlan?.reduce((acc, m) => acc + m.calories, 0), unit: 'kcal', icon: Flame, color: 'text-brand-primary' },
          { label: 'Protein', value: currentMealPlan?.reduce((acc, m) => acc + m.protein, 0), unit: 'g', icon: Zap, color: 'text-brand-primary' },
          { label: 'Carbs', value: currentMealPlan?.reduce((acc, m) => acc + m.carbs, 0), unit: 'g', icon: PieChart, color: 'text-blue-500' },
          { label: 'Fats', value: currentMealPlan?.reduce((acc, m) => acc + m.fats, 0), unit: 'g', icon: Droplets, color: 'text-purple-400' }
        ].map((s, i) => (
          <div key={i} className="glass-card flex flex-col p-6 bg-white border border-black/5 shadow-sm">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">{s.label}</p>
            <p className="font-display text-2xl font-bold text-black">{s.value}<span className="text-xs text-black/20 ml-1">{s.unit}</span></p>
          </div>
        ))}
      </section>

      {/* Meals Timeline */}
      <section className="relative space-y-6">
        <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-brand-primary/50 via-black/5 to-transparent" />
        
        {currentMealPlan?.map((meal, i) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={meal.id}
            className="relative flex gap-8 pl-8"
          >
            {/* Timeline Notch */}
            <div className="absolute left-[30px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white transition-all bg-brand-primary shadow-md" />

            <div className="flex-1">
              <div className="glass-card group flex flex-col overflow-hidden transition-all md:flex-row bg-white border border-black/5 shadow-sm">
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black/40">
                      <Clock size={12} />
                      {meal.time}
                    </div>
                    <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">{meal.type}</span>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-black group-hover:text-brand-primary transition-colors">{meal.name}</h3>
                  <p className="mt-2 text-sm text-black/40 leading-relaxed font-medium">Healthy meal designed for your {profile?.goal} journey.</p>

                  <div className="mt-8 flex flex-wrap gap-6">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Calories</span>
                        <span className="font-display text-lg font-bold text-black">{meal.calories}</span>
                     </div>
                     <div className="flex flex-col border-l border-black/5 pl-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Protein</span>
                        <span className="font-display text-lg font-bold text-brand-primary">{meal.protein}g</span>
                     </div>
                     <div className="flex flex-col border-l border-black/5 pl-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Carbs</span>
                        <span className="font-display text-lg font-bold text-blue-500">{meal.carbs}g</span>
                     </div>
                     <div className="flex flex-col border-l border-black/5 pl-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Fats</span>
                        <span className="font-display text-lg font-bold text-purple-400">{meal.fats}g</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
