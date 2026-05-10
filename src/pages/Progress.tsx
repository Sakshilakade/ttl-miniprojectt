import { useState } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { Droplets, Scale, Save, CheckCircle2, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';

export default function Progress() {
  const { profile, dailyStats, updateDailyStats } = useApp();
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const [stats, setStats] = useState(dailyStats[today] || {
    date: today,
    caloriesConsumed: 0,
    waterIntake: 0,
    workoutCompleted: false,
    weight: profile?.weight || 0,
    goals: []
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateDailyStats(today, stats);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const weeklyLog = [
    { day: 'Mon', weight: 70.2, sub: '-0.2kg' },
    { day: 'Tue', weight: 69.8, sub: '-0.4kg' },
    { day: 'Wed', weight: 70.0, sub: '+0.2kg' },
    { day: 'Thu', weight: 69.5, sub: '-0.5kg' },
    { day: 'Fri', weight: 69.4, sub: '-0.1kg' },
    { day: 'Sat', weight: 69.1, sub: '-0.3kg' },
    { day: 'Today', weight: stats.weight, sub: 'Current' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-black">
            Progress <span className="text-brand-primary">Tracker</span>
          </h1>
          <p className="mt-2 text-black/40 uppercase tracking-widest text-xs font-bold">Keep it simple, stay consistent</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex h-14 items-center justify-center gap-2 rounded-2xl px-8 font-bold transition-all active:scale-95 ${
            saved ? 'bg-brand-primary text-black shadow-lg shadow-brand-primary/20' : 'bg-brand-primary text-black shadow-lg shadow-brand-primary/20'
          }`}
        >
          {saved ? <CheckCircle2 size={20} /> : <Save size={20} />}
          {saved ? 'Progress Saved' : 'Save Today\'s Stats'}
        </button>
      </header>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Weight Management */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-8 bg-white border-none shadow-sm h-full">
            <div className="flex items-center gap-3 mb-8">
               <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Scale size={20} />
               </div>
               <h3 className="font-display text-xl font-bold text-black">Body Weight</h3>
            </div>
            
            <div className="text-center py-6">
               <span className="font-display text-6xl font-bold text-black">{stats.weight}</span>
               <span className="ml-2 text-xl font-bold text-black/20">kg</span>
            </div>

            <div className="flex gap-4 mb-4">
               <button 
                 onClick={() => setStats(s => ({ ...s, weight: parseFloat((s.weight - 0.1).toFixed(1)) }))}
                 className="flex-1 h-12 rounded-xl bg-[#f8f8f5] font-bold text-xl hover:bg-[#eeeee7] transition-colors"
               >
                 -
               </button>
               <button 
                 onClick={() => setStats(s => ({ ...s, weight: parseFloat((s.weight + 0.1).toFixed(1)) }))}
                 className="flex-1 h-12 rounded-xl bg-[#f8f8f5] font-bold text-xl hover:bg-[#eeeee7] transition-colors"
               >
                 +
               </button>
            </div>
            <p className="text-center text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">Tap to adjust by 0.1kg</p>
          </div>
        </div>

        {/* Water Tracker */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card p-8 bg-white border-none shadow-sm h-full">
            <div className="flex items-center gap-3 mb-8">
               <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Droplets size={20} />
               </div>
               <h3 className="font-display text-xl font-bold text-black">Water Intake</h3>
            </div>

            <div className="text-center py-6">
               <span className="font-display text-6xl font-bold text-black">{stats.waterIntake}</span>
               <span className="ml-2 text-xl font-bold text-black/20">ml</span>
               <p className="mt-2 text-xs font-bold text-black/40">Goal: 3500ml</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <button
                 onClick={() => setStats(s => ({ ...s, waterIntake: s.waterIntake + 250 }))}
                 className="h-14 rounded-2xl bg-blue-500/5 font-bold text-blue-600 hover:bg-blue-500/10 transition-colors"
               >
                 +250ml
               </button>
               <button
                 onClick={() => setStats(s => ({ ...s, waterIntake: s.waterIntake + 500 }))}
                 className="h-14 rounded-2xl bg-blue-500/5 font-bold text-blue-600 hover:bg-blue-500/10 transition-colors"
               >
                 +500ml
               </button>
               <button
                 onClick={() => setStats(s => ({ ...s, waterIntake: 0 }))}
                 className="col-span-2 h-12 rounded-xl bg-red-500/5 font-bold text-red-400 hover:bg-red-500/10 transition-colors text-xs"
               >
                 Reset Counter
               </button>
            </div>
          </div>
        </div>

        {/* Workout Status */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 bg-white border-none shadow-sm h-full flex flex-col justify-between">
            <div>
               <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                     <TrendingDown size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-black">Activity</h3>
               </div>
               <p className="text-sm text-black/60 leading-relaxed mb-8">
                 Mark your workout as complete when you've finished your daily session.
               </p>
            </div>

            <button
              onClick={() => setStats({ ...stats, workoutCompleted: !stats.workoutCompleted })}
              className={`flex h-16 w-full items-center justify-center gap-3 rounded-2xl font-bold transition-all ${
                stats.workoutCompleted 
                ? 'bg-brand-primary/10 text-brand-primary border-2 border-brand-primary' 
                : 'bg-[#f8f8f5] text-black/40 border-2 border-transparent'
              }`}
            >
              {stats.workoutCompleted ? (
                <>
                  <CheckCircle2 size={24} />
                  Workout Completed
                </>
              ) : (
                'Mark Workout Finished'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Weekly Minimal Log */}
      <section className="glass-card p-8 bg-white border-none shadow-sm">
         <h3 className="font-display text-xl font-bold text-black mb-8">Weekly Log</h3>
         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {weeklyLog.map((log, i) => (
              <div 
                key={i}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                  log.day === 'Today' ? 'border-brand-primary bg-brand-primary/5' : 'border-black/5'
                }`}
              >
                <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest mb-2">{log.day}</span>
                <span className="font-display text-xl font-bold text-black">{log.weight}</span>
                <span className={`text-[10px] font-bold mt-1 ${log.sub.startsWith('-') ? 'text-green-500' : log.sub === 'Current' ? 'text-brand-primary' : 'text-red-400'}`}>
                   {log.sub}
                </span>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
