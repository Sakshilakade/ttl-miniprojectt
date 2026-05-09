import { motion } from 'motion/react';
import { Sparkles, Lightbulb, TrendingUp, Heart } from 'lucide-react';
import { AITip } from '../services/tipService';

interface AITipCardProps {
  tip: AITip;
  onRefresh?: () => void;
}

export default function AITipCard({ tip, onRefresh }: AITipCardProps) {
  const getIcon = () => {
    switch (tip.category) {
      case 'nutrition': return <Lightbulb size={18} className="text-orange-400" />;
      case 'fitness': return <TrendingUp size={18} className="text-brand-primary" />;
      case 'wellness': return <Heart size={18} className="text-brand-pink" />;
      case 'motivation': return <Sparkles size={18} className="text-purple-400" />;
      default: return <Sparkles size={18} />;
    }
  };

  const getLabel = () => {
    switch (tip.category) {
      case 'nutrition': return 'Nutrition Insight';
      case 'fitness': return 'Workout Tip';
      case 'wellness': return 'Wellness Guide';
      case 'motivation': return 'Daily Motivation';
      default: return 'AI Advice';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5 text-black">
            {getIcon()}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">
              Today's {getLabel()}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-brand-primary" />
              <span className="text-[10px] font-bold text-brand-primary">AI Powered</span>
            </div>
          </div>
        </div>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="rounded-lg p-2 text-black/10 transition-colors hover:bg-black/5 hover:text-black"
          >
            <Sparkles size={16} />
          </button>
        )}
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium leading-relaxed text-black/70">
          "{tip.tip}"
        </p>
      </div>

      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-brand-primary/5 blur-2xl transition-all group-hover:bg-brand-primary/10" />
    </motion.div>
  );
}
