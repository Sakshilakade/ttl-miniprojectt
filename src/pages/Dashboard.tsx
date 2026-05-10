import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Droplets, Target, TrendingUp, ChevronRight, CheckCircle2, Circle, Utensils, Scale, Layout, Plus, X, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import AITipCard from '../components/AITipCard';
import { getSmartTip, AITip } from '../services/tipService';

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, dailyStats, updateDailyStats } = useApp();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const [aiTip, setAiTip] = useState<AITip | null>(null);

  useEffect(() => {
    setAiTip(getSmartTip(profile));
  }, [profile]);

  const refreshTip = () => {
    setAiTip(getSmartTip(profile));
  };
  const stats = dailyStats[today] || {
    date: today,
    caloriesConsumed: 0,
    waterIntake: 0,
    workoutCompleted: false,
    weight: profile?.weight || 0,
    goals: [
      { id: '1', text: 'Drink 3L water', completed: false },
      { id: '2', text: 'Complete workout', completed: false },
      { id: '3', text: 'Sleep before 11 PM', completed: false },
      { id: '4', text: 'Eat healthy meals', completed: false },
    ]
  };

  const bmi = (stats.weight / ((profile?.height || 170) / 100) ** 2).toFixed(1);
  const completionRate = Math.round((stats.goals.filter(g => g.completed).length / stats.goals.length) * 100);

  const [newGoal, setNewGoal] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleGoal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedGoals = stats.goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    updateDailyStats(today, { goals: updatedGoals });
  };

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    const goal = {
      id: Date.now().toString(),
      text: newGoal,
      completed: false
    };
    updateDailyStats(today, { goals: [...stats.goals, goal] });
    setNewGoal('');
    setIsAdding(false);
  };

  const removeGoal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedGoals = stats.goals.filter(g => g.id !== id);
    updateDailyStats(today, { goals: updatedGoals });
  };

  const features = [
    {
      id: 'meals',
      title: 'Meal Plan',
      desc: 'Check your healthy meals for the day',
      icon: Utensils,
      path: '/meals',
      color: 'bg-brand-primary/10',
      textColor: 'text-black',
      iconColor: 'text-brand-primary'
    },
    {
      id: 'workout',
      title: 'Workout Guide',
      desc: 'See your exercises for today',
      icon: Layout,
      path: '/workout',
      color: 'bg-[#f8f8f5]',
      textColor: 'text-black',
      iconColor: 'text-brand-primary'
    },
    {
      id: 'bmi',
      title: 'BMI Calculator',
      desc: 'Check your current BMI status',
      icon: Scale,
      path: '/bmi',
      color: 'bg-brand-primary/10',
      textColor: 'text-black',
      iconColor: 'text-brand-primary'
    },
    {
      id: 'progress',
      title: 'Daily Progress',
      desc: 'Log your weight and see your journey',
      icon: TrendingUp,
      path: '/progress',
      color: 'bg-[#f8f8f5]',
      textColor: 'text-black',
      iconColor: 'text-brand-primary'
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <section className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-black">
            {profile?.name.split(' ')[0]}'s <span className="text-black">Dashboard</span>
          </h1>
          <p className="mt-2 text-black/60 font-bold uppercase tracking-widest text-[10px]">Your Progress Today</p>
          
          <div className="mt-4 flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1.5 w-fit">
            <Sparkles className="text-brand-primary" size={14} />
            <span className="text-[10px] font-bold text-black/60 uppercase tracking-wider">AI-powered recommendations based on your fitness profile</span>
          </div>
        </div>
        <div className="flex h-14 items-center gap-4 rounded-2xl bg-white px-6 shadow-sm border border-black/5">
          <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Active Journey</span>
        </div>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Daily Goals Card (Large) */}
        <div className="glass-card flex flex-col p-8 bg-white border border-black/5 shadow-sm group">
           <div className="mb-8 flex items-center justify-between">
              <div>
                 <h3 className="font-display text-2xl font-bold text-black">My Checklist</h3>
                 <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest mt-1">Simple daily goals</p>
              </div>
              <div className="flex items-center gap-3">
                 <span className="font-display font-bold text-black text-xl">{completionRate}%</span>
                 <button 
                   onClick={() => setIsAdding(true)}
                   className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-primary text-black hover:scale-105 active:scale-95 transition-all shadow-sm shadow-brand-primary/20"
                 >
                    <Plus size={20} />
                 </button>
              </div>
           </div>
           
           <div className="mb-8 h-2.5 rounded-full bg-[#f8f8f5] overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                className="h-full bg-brand-primary"
              />
           </div>

           <div className="space-y-4">
              {isAdding && (
                <form onSubmit={addGoal} className="flex gap-2">
                   <input 
                     autoFocus
                     type="text" 
                     placeholder="What's your goal?"
                     className="flex-1 rounded-2xl border border-black/10 bg-[#f8f8f5] px-4 py-4 font-bold outline-none focus:border-brand-primary text-black"
                     value={newGoal}
                     onChange={(e) => setNewGoal(e.target.value)}
                   />
                   <button type="submit" className="rounded-2xl bg-brand-primary px-6 font-bold text-black transition-all active:scale-95 shadow-lg shadow-brand-primary/20">Add</button>
                   <button type="button" onClick={() => setIsAdding(false)} className="px-2 text-black/40 hover:text-red-500 transition-colors"><X size={20} /></button>
                </form>
              )}
               {stats.goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={(e) => toggleGoal(goal.id, e)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-5 transition-all group/goal cursor-pointer ${
                    goal.completed ? 'border-brand-primary/20 bg-brand-primary/5' : 'border-black/5 bg-[#f8f8f5] hover:border-black/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                     <div className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all ${
                        goal.completed ? 'border-brand-primary bg-brand-primary' : 'border-black/10'
                     }`}>
                        {goal.completed && <CheckCircle2 size={14} className="text-black" />}
                     </div>
                     <span className={`text-sm font-bold text-black transition-all ${goal.completed ? 'line-through opacity-40' : ''}`}>{goal.text}</span>
                  </div>
                  <button 
                    onClick={(e) => removeGoal(goal.id, e)}
                    className="opacity-0 group-hover/goal:opacity-100 p-2 text-black/40 hover:text-red-500 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
           </div>
        </div>

        {/* Other Features Grid */}
        <div className="grid grid-cols-1 gap-6">
           {aiTip && <AITipCard tip={aiTip} onRefresh={refreshTip} />}

           {features.map((feature, i) => (
             <motion.button
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
               key={feature.id}
               onClick={() => navigate(feature.path)}
               className={`glass-card flex p-8 text-left transition-all hover:scale-[1.01] active:scale-[0.98] border border-black/5 shadow-sm group relative overflow-hidden`}
             >
                <div className={`mr-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] ${feature.color} ${feature.iconColor} shadow-lg shadow-neutral-200/60 group-hover:scale-110 transition-transform`}>
                   <feature.icon size={32} />
                </div>
                <div className="flex flex-col justify-center">
                   <h3 className={`font-display text-2xl font-bold text-black transition-colors group-hover:text-brand-primary`}>{feature.title}</h3>
                   <p className="mt-1 text-sm text-black/60 font-medium leading-relaxed">{feature.desc}</p>
                </div>
                <ChevronRight size={24} className="absolute right-8 top-1/2 -translate-y-1/2 text-black/10 group-hover:text-black group-hover:translate-x-1 transition-all" />
             </motion.button>
           ))}
        </div>
      </section>
    </div>
  );
}
