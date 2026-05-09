import { UserProfile } from '../types';

export interface AITip {
  id: string;
  category: 'nutrition' | 'fitness' | 'wellness' | 'motivation';
  tip: string;
}

const TIPS: AITip[] = [
  // Nutrition
  { id: 'n1', category: 'nutrition', tip: 'Drink at least 2–3L water daily to maintain hydration and improve workout performance.' },
  { id: 'n2', category: 'nutrition', tip: 'Include more leafy greens like spinach or kale in your meals for essential micronutrients.' },
  { id: 'n3', category: 'nutrition', tip: 'Focus on lean protein sources like lentils, tofu, or chicken to support muscle recovery.' },
  { id: 'n4', category: 'nutrition', tip: 'Avoid sugary drinks and processed snacks; they provide empty calories.' },
  { id: 'n5', category: 'nutrition', tip: 'Eating slowly helps your brain recognize fullness, preventing overeating.' },
  
  // Fitness
  { id: 'f1', category: 'fitness', tip: 'Always start with a 5-10 minute dynamic warm-up to prepare your muscles.' },
  { id: 'f2', category: 'fitness', tip: 'Consistency is key. Even a 15-minute workout is better than no workout.' },
  { id: 'f3', category: 'fitness', tip: 'Proper form is more important than heavy weights. Protect your joints.' },
  { id: 'f4', category: 'fitness', tip: 'Rest is just as important as the workout. Aim for 7-9 hours of sleep.' },
  { id: 'f5', category: 'fitness', tip: 'Focus on compound movements like squats and push-ups for maximum efficiency.' },
  
  // Wellness
  { id: 'w1', category: 'wellness', tip: 'Deep breathing exercises for 5 minutes can significantly reduce stress levels.' },
  { id: 'w2', category: 'wellness', tip: 'Step away from screens 1 hour before bed for better sleep quality.' },
  { id: 'w3', category: 'wellness', tip: 'Listening to your body is crucial. If you feel sharp pain, stop and rest.' },
  
  // Motivation
  { id: 'm1', category: 'motivation', tip: 'Small steps every day lead to big results over time. Keep going!' },
  { id: 'm2', category: 'motivation', tip: 'You don\'t have to be perfect, you just have to be better than yesterday.' },
  { id: 'm3', category: 'motivation', tip: 'Celebrate your small wins. Every goal met is a step forward.' },
];

export const getSmartTip = (profile: UserProfile | null): AITip => {
  if (!profile) return TIPS[Math.floor(Math.random() * TIPS.length)];

  const filteredTips = [...TIPS];
  
  // Add personalization logic here if needed
  // For example, if goal is weight loss, slightly prioritize nutrition tips
  // If beginner, prioritize fitness basics
  
  return filteredTips[Math.floor(Math.random() * filteredTips.length)];
};

export const getCategoryTip = (category: AITip['category']): AITip => {
  const categoryTips = TIPS.filter(t => t.category === category);
  return categoryTips[Math.floor(Math.random() * categoryTips.length)];
};
