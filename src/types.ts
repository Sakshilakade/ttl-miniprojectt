export type Goal = 'fat loss' | 'muscle gain' | 'maintenance';
export type DietPreference = 'vegetarian' | 'non-vegetarian' | 'vegan' | 'veg + non-veg';
export type WorkoutPreference = 'home workout' | 'gym workout';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  goal: Goal;
  dietPreference: DietPreference;
  workoutPreference: WorkoutPreference;
  wakeupTime: string;
  sleepTime: string;
  workoutTime: string;
  experienceLevel: ExperienceLevel;
  onboardingComplete: boolean;
}

export interface Meal {
  id: string;
  name: string;
  type: string; // e.g., 'Breakfast', 'Mid Morning Snack'
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
}

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  rest: string;
  difficulty: ExperienceLevel;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  type: WorkoutPreference;
  level: ExperienceLevel;
}

export interface DailyStats {
  date: string;
  caloriesConsumed: number;
  waterIntake: number; // in ml
  workoutCompleted: boolean;
  completedExerciseIds?: string[];
  weight: number;
  goals: { id: string; text: string; completed: boolean }[];
}

export interface AppState {
  profile: UserProfile | null;
  dailyStats: Record<string, DailyStats>;
  currentMealPlan: Meal[] | null;
  currentWorkout: Workout | null;
}
