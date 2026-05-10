import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Ruler, User2, Info, ChevronRight, Activity, RotateCcw, Sparkles } from 'lucide-react';
import { getCategoryTip, AITip } from '../services/tipService';

type Gender = 'male' | 'female';
type BMICategory = 'Underweight' | 'Healthy' | 'Overweight' | 'Obese' | null;

export default function BMICalculator() {
  const [height, setHeight] = useState<string>('170');
  const [weight, setWeight] = useState<string>('65');
  const [age, setAge] = useState<string>('25');
  const [gender, setGender] = useState<Gender>('female');
  const [result, setResult] = useState<{ bmi: number; category: BMICategory } | null>(null);
  const [healthTip, setHealthTip] = useState<AITip | null>(null);

  useEffect(() => {
    setHealthTip(getCategoryTip('wellness'));
  }, []);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmi = parseFloat((w / (h * h)).toFixed(1));
      let category: BMICategory = 'Healthy';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi >= 25 && bmi < 30) category = 'Overweight';
      else if (bmi >= 30) category = 'Obese';
      
      setResult({ bmi, category });
    }
  };

  const getSuggestion = (category: BMICategory) => {
    switch (category) {
      case 'Underweight':
        return 'Focus on nutrient-dense meals and strength training to build healthy muscle mass.';
      case 'Healthy':
        return 'Your BMI is in the healthy range. Maintain balanced nutrition and regular workouts.';
      case 'Overweight':
        return 'Small lifestyle changes like daily walks and portion control can help reach your goal.';
      case 'Obese':
        return 'We recommend consulting a professional to create a sustainable wellness plan for you.';
      default:
        return '';
    }
  };

  const getCategoryColor = (category: BMICategory) => {
    switch (category) {
      case 'Underweight': return 'text-blue-400 bg-blue-50';
      case 'Healthy': return 'text-brand-primary bg-brand-primary/10';
      case 'Overweight': return 'text-orange-400 bg-orange-50';
      case 'Obese': return 'text-red-400 bg-red-50';
      default: return 'text-black/40 bg-[#f8f8f5]';
    }
  };

  const getMeterPosition = (bmi: number) => {
    // Normal range is roughly 15 to 35 for visualization
    const min = 15;
    const max = 35;
    const percentage = ((bmi - min) / (max - min)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-20">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-black">
            BMI <span className="text-brand-primary">Calculator</span>
          </h1>
          <p className="mt-2 text-black/40 uppercase tracking-widest text-xs font-bold">Understand your body composition</p>
        </div>

        {healthTip && (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex max-w-xs items-center gap-4 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-4"
           >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-black">
                 <Sparkles size={18} />
              </div>
              <p className="text-[10px] font-bold leading-relaxed text-black/60 italic">
                 "{healthTip.tip}"
              </p>
           </motion.div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Input Card */}
        <section className="glass-card bg-white p-8 border border-black/5 shadow-sm">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-black/30">Gender</label>
                 <div className="flex gap-2">
                    {(['female', 'male'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`flex-1 h-12 rounded-xl border text-xs font-bold uppercase transition-all ${
                          gender === g ? 'border-brand-primary bg-brand-primary/10 text-black' : 'border-black/5 bg-[#f8f8f5] text-black/40'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-black/30">Age</label>
                 <div className="relative">
                   <User2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
                   <input
                     type="number"
                     className="w-full rounded-xl border border-black/5 bg-[#f8f8f5] py-3 pl-12 pr-4 text-sm font-bold outline-none focus:border-brand-primary transition-all text-black"
                     placeholder="25"
                     value={age}
                     onChange={(e) => setAge(e.target.value)}
                   />
                 </div>
               </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-black/30">Height (cm)</label>
                <span className="text-sm font-bold text-black">{height} cm</span>
              </div>
              <div className="relative flex h-14 items-center">
                <Ruler size={18} className="absolute left-4 text-black/20" />
                <input
                  type="range" min="100" max="250"
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#f8f8f5] accent-brand-primary"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-black/30">Weight (kg)</label>
                <span className="text-sm font-bold text-black">{weight} kg</span>
              </div>
              <div className="relative flex h-14 items-center">
                <Scale size={18} className="absolute left-4 text-black/20" />
                <input
                  type="range" min="30" max="200" step="0.5"
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#f8f8f5] accent-brand-primary"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={calculateBMI}
              className="mt-4 flex h-16 w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary font-bold text-black shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Activity size={20} />
              Calculate BMI
            </button>
          </div>
        </section>

        {/* Result Card */}
        <section className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card flex flex-1 flex-col items-center justify-center p-10 text-center bg-white border border-black/5"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f8f8f5] text-black/10">
                   <Scale size={40} />
                </div>
                <h3 className="font-display text-2xl font-bold text-black/40">Enter details to see results</h3>
                <p className="mt-2 text-sm text-black/20 font-medium">Your BMI measurement will appear here</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card flex flex-1 flex-col bg-white border border-brand-primary shadow-sm overflow-hidden"
              >
                <div className="p-8 pb-0 text-center">
                   <div className={`mx-auto mb-6 inline-flex rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${getCategoryColor(result.category)}`}>
                      {result.category}
                   </div>
                   <h2 className="font-display text-8xl font-bold text-black tracking-tighter">
                      {result.bmi}
                   </h2>
                   <p className="mt-2 text-xs font-bold text-black/40 uppercase tracking-[0.2em]">BMI Score</p>
                </div>

                {/* BMI Meter */}
                <div className="px-10 py-10">
                   <div className="relative h-3 w-full rounded-full bg-[#f8f8f5] overflow-hidden">
                      <div className="absolute inset-0 flex">
                         <div className="h-full w-[18.5%] bg-blue-300" />
                         <div className="h-full w-[6.5%] bg-brand-primary" />
                         <div className="h-full w-[5%] bg-orange-300" />
                         <div className="h-full w-[70%] bg-red-300" />
                      </div>
                      <motion.div 
                        initial={{ left: 0 }}
                        animate={{ left: `${getMeterPosition(result.bmi)}%` }}
                        className="absolute top-0 flex h-full -translate-x-1/2 items-center justify-center"
                      >
                         <div className="h-full w-1.5 bg-brand-primary" />
                      </motion.div>
                   </div>
                   <div className="mt-4 flex justify-between text-[8px] font-bold uppercase tracking-widest text-black/30">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>35+</span>
                   </div>
                </div>

                <div className="mt-auto border-t border-black/5 bg-[#f8f8f5] p-8 text-center">
                   <p className="text-sm font-medium leading-relaxed text-black/60 italic">
                      "{getSuggestion(result.category)}"
                   </p>
                   <button 
                     onClick={() => setResult(null)}
                     className="mt-6 flex items-center justify-center gap-2 mx-auto text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors"
                   >
                      <RotateCcw size={14} /> Compare Again
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="glass-card bg-white p-6 border border-black/5">
            <div className="flex items-center gap-3">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8f8f5] text-black/30">
                  <Info size={16} />
               </div>
               <h4 className="text-sm font-bold text-black">What is BMI?</h4>
            </div>
            <p className="mt-3 text-xs font-medium text-black/40 leading-relaxed">
              Body Mass Index (BMI) is a simple estimate of body fat based on height and weight. It's a useful "first-look" measurement for most adults.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
