import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState, UserProfile, DailyStats, Meal, Workout } from './types';
import { generateMealPlan, generateWorkout } from './utils/aiGenerator';

interface AppContextType extends AppState {
  setProfile: (profile: UserProfile | null) => void;
  updateDailyStats: (date: string, stats: Partial<DailyStats>) => void;
  generatePlan: (customProfile?: UserProfile) => void;
  generateMeals: (customProfile?: UserProfile) => void;
  generateWorkouts: (customProfile?: UserProfile) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'fitai_fitness_state';

const initialState: AppState = {
  profile: null,
  dailyStats: {},
  currentMealPlan: null,
  currentWorkout: null,
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setProfile = (profile: UserProfile | null) => {
    setState(prev => ({ ...prev, profile }));
  };

  const updateDailyStats = (date: string, stats: Partial<DailyStats>) => {
    setState(prev => {
      const existing = prev.dailyStats[date] || {
        date,
        caloriesConsumed: 0,
        waterIntake: 0,
        workoutCompleted: false,
        completedExerciseIds: [],
        weight: prev.profile?.weight || 0,
        goals: [
          { id: '1', text: 'Drink 3L water', completed: false },
          { id: '2', text: 'Complete workout', completed: false },
          { id: '3', text: 'Sleep before 11 PM', completed: false },
          { id: '4', text: 'Eat healthy meals', completed: false },
          { id: '5', text: 'Walk 8k steps', completed: false },
        ]
      };
      return {
        ...prev,
        dailyStats: {
          ...prev.dailyStats,
          [date]: { ...existing, ...stats }
        }
      };
    });
  };

  const generatePlan = (customProfile?: UserProfile) => {
    const activeProfile = customProfile || state.profile;
    if (!activeProfile) return;
    const mealPlan = generateMealPlan(activeProfile);
    const workout = generateWorkout(activeProfile);
    setState(prev => ({
      ...prev,
      currentMealPlan: mealPlan,
      currentWorkout: workout,
      profile: activeProfile ? { ...activeProfile, onboardingComplete: true } : null
    }));
  };

  const generateMeals = (customProfile?: UserProfile) => {
    const activeProfile = customProfile || state.profile;
    if (!activeProfile) return;
    const mealPlan = generateMealPlan(activeProfile);
    setState(prev => ({ ...prev, currentMealPlan: mealPlan }));
  };

  const generateWorkouts = (customProfile?: UserProfile) => {
    const activeProfile = customProfile || state.profile;
    if (!activeProfile) return;
    const workout = generateWorkout(activeProfile);
    setState(prev => ({ ...prev, currentWorkout: workout }));
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  return (
    <AppContext.Provider value={{ ...state, setProfile, updateDailyStats, generatePlan, generateMeals, generateWorkouts, logout }}>
      {children}
    </AppContext.Provider>
  );
};


export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
