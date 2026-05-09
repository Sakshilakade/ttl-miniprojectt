import { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { Clock, Dumbbell, Target, Flame, ChevronRight, Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
import { getCategoryTip, AITip } from '../services/tipService';
import { cn } from '../lib/utils';

export default function Workout() {
  const { currentWorkout, profile, dailyStats, generateWorkouts, updateDailyStats } = useApp();
  const [workoutTip, setWorkoutTip] = useState<AITip | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setWorkoutTip(getCategoryTip('fitness'));
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const stats = dailyStats[today];
  const isCompletedToday = stats?.workoutCompleted;
  const completedExerciseIds = stats?.completedExerciseIds || [];

  const toggleExercise = (id: string) => {
    let nextIds = [...completedExerciseIds];
    if (nextIds.includes(id)) {
      nextIds = nextIds.filter(i => i !== id);
    } else {
      nextIds.push(id);
    }
    
    // Check if fully completed
    const isNowComplete = currentWorkout && nextIds.length === currentWorkout.exercises.length;
    
    // Auto-complete the workout goal in the checklist
    let updatedGoals = stats?.goals;
    if (updatedGoals) {
      updatedGoals = updatedGoals.map(g => 
        g.text.toLowerCase().includes('workout') ? { ...g, completed: isNowComplete } : g
      );
    }

    updateDailyStats(today, { 
      workoutCompleted: isNowComplete,
      completedExerciseIds: nextIds,
      ...(updatedGoals && { goals: updatedGoals })
    });
  };

  if (!currentWorkout) return <div>No workout plan generated. Please go to onboarding.</div>;

  const totalExercises = currentWorkout.exercises.length;
  const completedCount = completedExerciseIds.length;

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
           <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-black">
            {profile?.name.split(' ')[0]}'s Workout Guide
          </h1>
          <p className="mt-2 text-black/40 uppercase tracking-widest text-xs font-bold">
            {profile?.experienceLevel} • {currentWorkout.name}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button 
            onClick={() => {
               setIsRefreshing(true);
               setTimeout(() => {
                 generateWorkouts();
                 setIsRefreshing(false);
               }, 600);
            }}
            disabled={isRefreshing || isCompletedToday}
            className="flex h-12 items-center justify-center gap-3 rounded-xl bg-black px-6 text-xs font-bold text-white transition-all hover:bg-brand-primary hover:text-black active:scale-95 disabled:opacity-30 shadow-lg shadow-black/10"
          >
            <RotateCcw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Working...' : 'Regenerate Workout'}
          </button>

          {workoutTip && (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="flex max-w-xs items-center gap-4 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-4"
             >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-black">
                   <Sparkles size={18} />
                </div>
                <p className="text-[10px] font-bold leading-relaxed text-black/60 italic line-clamp-2">
                   "{workoutTip.tip}"
                </p>
             </motion.div>
          )}
        </div>
      </header>

      {/* Workout Context */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
         {[
           { label: 'Total Time', value: '45-60', unit: 'mins', icon: Clock, color: 'text-brand-pink' },
           { label: 'Focus Area', value: 'Full Body', unit: 'Target', icon: Target, color: 'text-brand-primary' },
           { label: 'Tasks', value: completedCount, unit: `/ ${totalExercises}`, icon: CheckCircle2, color: 'text-green-500' }
         ].map((c, i) => (
           <div key={i} className="glass-card flex items-center gap-6 p-6 bg-white border border-black/5 shadow-sm">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 ${c.color}`}>
                 <c.icon size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">{c.label}</p>
                 <p className="font-display text-2xl font-bold text-black">{c.value}<span className="text-xs text-black/20 ml-1">{c.unit}</span></p>
              </div>
           </div>
         ))}
      </section>

      {/* Exercise Sequence */}
      <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-black">Exercises Checklist</h3>
            {isCompletedToday && (
              <span className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest">
                <CheckCircle2 size={16} />
                Completed
              </span>
            )}
         </div>

         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {currentWorkout.exercises.map((ex, i) => {
              const isChecked = completedExerciseIds.includes(ex.id);
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={ex.id}
                  onClick={() => toggleExercise(ex.id)}
                  className={cn(
                    "glass-card group flex flex-col p-8 transition-all bg-white border shadow-sm cursor-pointer",
                    isChecked ? "border-brand-primary bg-brand-primary/5" : "border-black/5 hover:border-brand-primary/30"
                  )}
                >
                  <div className="mb-4 flex items-start justify-between">
                     <div className={cn(
                       "rounded-xl p-3 transition-colors",
                       isChecked ? "bg-brand-primary text-black" : "bg-black/5 text-black/40"
                     )}>
                        <CheckCircle2 size={24} />
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/20">Target</p>
                        <p className="text-xs font-bold text-black">{ex.muscle}</p>
                     </div>
                  </div>

                  <h4 className={cn(
                    "font-display text-2xl font-bold mb-6 transition-colors",
                    isChecked ? "text-brand-primary" : "text-black"
                  )}>{ex.name}</h4>

                  <div className="mt-auto grid grid-cols-3 gap-4 border-t border-black/5 pt-6">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Sets</span>
                        <span className="font-display text-xl font-bold text-black">{ex.sets}</span>
                     </div>
                     <div className="flex flex-col border-l border-black/5 pl-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Reps</span>
                        <span className="font-display text-xl font-bold text-black">{ex.reps}</span>
                     </div>
                     <div className="flex flex-col border-l border-black/5 pl-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Rest</span>
                        <span className="font-display text-xl font-bold text-black">{ex.rest}</span>
                     </div>
                  </div>
                </motion.div>
              );
            })}
         </div>
      </section>

      {/* Simple Completion Message */}
      {isCompletedToday && (
        <section className="flex flex-col items-center justify-center py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center space-y-6 rounded-3xl border-2 border-brand-primary bg-brand-primary/5 p-8"
          >
            <div className="mb-4 flex justify-center text-brand-primary">
              <CheckCircle2 size={64} />
            </div>
            <h3 className="font-display text-2xl font-bold text-black">Workout Completed!</h3>
            <p className="mt-2 text-sm text-black/60">Amazing job! You've finished your session for today. Rest well and stay hydrated.</p>
          </motion.div>
        </section>
      )}
    </div>
  );
}
