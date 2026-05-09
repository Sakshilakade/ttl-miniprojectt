import { Goal, DietPreference, WorkoutPreference, ExperienceLevel, UserProfile, Meal, Workout, Exercise } from '../types';

// --- DATASETS ---

const MEAL_DATA: Record<DietPreference, Record<string, string[]>> = {
  'vegetarian': {
    'Early Morning': ['Warm Lemon Water', 'Green Tea', 'Apple', 'Soaked Almonds', 'Jeera Water', 'Fennel Tea', 'Moringa Tea'],
    'Breakfast': ['Paneer Paratha', 'Vegetable Poha', 'Oatmeal with Fruits', 'Idli with Sambar', 'Dosa with Chutney', 'Moong Dal Chilla', 'Besan Chilla', 'Sprouts Salad', 'Vegetable Upma', 'Stuffed Idli', 'Appam & Vegetable Stew', 'Thepla with Curd'],
    'Mid Morning': ['Fruit Salad', 'Mixed Nuts', 'Coconut Water', 'Greek Yogurt', 'Buttermilk', 'Roasted Chana', 'Sprout Bhel'],
    'Lunch': ['Dal Tadka, Rice & Salad', 'Paneer Butter Masala & Roti', 'Mix Veg Curry with Rice', 'Chana Masala & Jeera Rice', 'Vegetable Biryani with Raita', 'Palak Paneer & Roti', 'Baingan Bharta & Roti', 'Kadai Paneer & Naan', 'Aloo Gobi & Paratha'],
    'Evening Snack': ['Roasted Makhana', 'Boiled Corn', 'Roasted Chickpeas', 'Peanut Salad', 'Bhel Puri (Healthy)', 'Tea with Marie Biscuits', 'Baked Samosa', 'Dhokla'],
    'Pre Workout': ['Banana', 'Apple with Peanut Butter', 'Black Coffee', 'Dates & Nuts', 'Boiled Potato', 'Energy Bar (Home-made)'],
    'Post Workout': ['Protein Shake', 'Paneer Bhurji', 'Curd & Rice', 'Roasted Chana', 'Soy Milk', 'Chickpea Salad'],
    'Dinner': ['Lentil Soup with Toast', 'Mixed Veg Stew', 'Tofu Stir Fry', 'Khichdi with Curd', 'Stuffed Capsicum', 'Grilled Paneer with Veggies', 'Lauki Kofta (Baked)', 'Broccoli & Mushroom Soup'],
    'Bedtime': ['Turmeric Milk', 'Chamomile Tea', 'Warm Water with Ghee', 'Almond Milk', 'Casein Shake', 'Warm Water'],
  },
  'vegan': {
    'Early Morning': ['Warm Lemon Water', 'Black Coffee', 'Apple', 'Walnuts', 'Fennel Water', 'Ginger Tea'],
    'Breakfast': ['Smoothie Bowl', 'Tofu Scramble', 'Oatmeal with Almond Milk', 'Vegan Pancakes', 'Avocado Toast', 'Chickpea Flour Chilla', 'Upma with Veggies', 'Vegan Porridge', 'Tofu & Veggie Wrap'],
    'Mid Morning': ['Fruits', 'Seeds & Nuts', 'Coconut Water', 'Vegan Yogurt (Soy/Coconut)', 'Cucumber Slices', 'Carrot Sticks with Hummus'],
    'Lunch': ['Tofu Curry & Brown Rice', 'Chickpea Salad', 'Quinoa with Roasted Veggies', 'Rajma & Rice', 'Lentil Pasta', 'Soya Chunks Curry & Roti', 'Tempeh Stir Fry', 'Vegetable Bowl with Tahini'],
    'Evening Snack': ['Roasted Seeds', 'Fruit Salad', 'Hummus with Carrot Sticks', 'Rice Cakes with PB', 'Green Tea', 'Kale Chips', 'Nuts & Berries'],
    'Pre Workout': ['Banana', 'Dates', 'Apple', 'Black Coffee', 'Vegan Protein Bar', 'Fruit Smoothie'],
    'Post Workout': ['Vegan Protein Shake', 'Soy Chunks Salad', 'Roasted Gram', 'Almond Milk', 'Peanut Butter Sandwich', 'Lentil Soup'],
    'Dinner': ['Mushroom Soup', 'Tofu Salad', 'Zucchini Noodles', 'Lentil Sizzler', 'Sweet Potato Stew', 'Bean Burrito Bowl', 'Minestrone Soup', 'Roasted Cauliflower Steak'],
    'Bedtime': ['Chamomile Tea', 'Almond Milk', 'Herbal Tea', 'Soy Milk'],
  },
  'non-vegetarian': {
    'Early Morning': ['Warm Lemon Water', 'Green Tea', 'Boiled Egg White', 'Almonds', 'Black Coffee'],
    'Breakfast': ['Eggs & Avocado Toast', 'Chicken Sausage & Eggs', 'Omelette with Veggies', 'Boiled Eggs & Toast', 'Chicken Keema Paratha', 'Turkey Salami Sandwich', 'Steamed Chicken Dumplings'],
    'Mid Morning': ['Fruit Bowl', 'Walnuts', 'Greek Yogurt', 'Coconut Water', 'Hard Boiled Egg'],
    'Lunch': ['Grilled Chicken & Quinoa', 'Fish Curry & Brown Rice', 'Chicken Breast & Veggies', 'Egg Curry & Roti', 'Mutton Stew (Lean)', 'Chicken Biryani', 'Grilled Salmon with Asparagus', 'Turkey Chili'],
    'Evening Snack': ['Chicken Salad', 'Hard Boiled Eggs', 'Roasted Nuts', 'Tuna Sandwich', 'Chicken Wings (Air Fried)', 'Beef Jerky'],
    'Pre Workout': ['Banana', 'Black Coffee', 'Dates', 'Apple', 'Oatmeal'],
    'Post Workout': ['Whey Protein', 'Grilled Chicken', 'Steamed Fish', 'Egg Whites', 'Chicken Sandwich', 'Tuna Salad'],
    'Dinner': ['Grilled Salmon', 'Clear Chicken Soup', 'Steamed Chicken with Broccoli', 'Egg Bhurji', 'Turkey Salad', 'Lamb Chop with Roasted Veg', 'Grilled Prawns'],
    'Bedtime': ['Turmeric Milk', 'Almonds', 'Casein Shake', 'Warm Water'],
  },
  'veg + non-veg': {
    'Early Morning': ['Green Tea', 'Warm Lemon Water', 'Soaked Nuts', 'Jeera Water'],
    'Breakfast': ['Paneer Paratha', 'Boiled Eggs', 'Oatmeal', 'Chicken Sandwich', 'Dosa', 'Scrambled Eggs with Toast'],
    'Mid Morning': ['Yogurt', 'Fruit', 'Coconut Water', 'Nuts', 'Sprout Salad'],
    'Lunch': ['Chicken Curry & Rice', 'Dal Tadka & Roti', 'Fish Fry & Veggies', 'Paneer Butter Masala', 'Egg Curry', 'Grilled Chicken Salad'],
    'Evening Snack': ['Sprouts', 'Chicken Nuggets (Air Fried)', 'Roasted Makhana', 'Boiled Eggs', 'Bhel Puri'],
    'Pre Workout': ['Banana', 'Black Coffee', 'Apple', 'Dates'],
    'Post Workout': ['Protein Shake', 'Grilled Chicken', 'Paneer Bhurji', 'Soy Milk', 'Boiled Eggs'],
    'Dinner': ['Grilled Chicken Salad', 'Lentil Soup', 'Steamed Fish', 'Mixed Veg Curry', 'Stir Fry Chicken', 'Mutton Soup'],
    'Bedtime': ['Turmeric Milk', 'Almonds', 'Chamomile Tea'],
  }
};


const EXERCISE_DATA = {
  'gym workout': {
    'Quads': [
      { name: 'Barbell Squats', difficulty: 'intermediate' },
      { name: 'Leg Press', difficulty: 'beginner' },
      { name: 'Leg Extensions', difficulty: 'beginner' },
      { name: 'Hack Squats', difficulty: 'advanced' },
      { name: 'Goblet Squats', difficulty: 'beginner' },
      { name: 'Front Squats', difficulty: 'advanced' },
      { name: 'Bulgarian Split Squats', difficulty: 'intermediate' }
    ],
    'Chest': [
      { name: 'Bench Press', difficulty: 'intermediate' },
      { name: 'Incline Dumbbell Press', difficulty: 'intermediate' },
      { name: 'Chest Flys', difficulty: 'beginner' },
      { name: 'Push Ups', difficulty: 'beginner' },
      { name: 'Cable Crossover', difficulty: 'intermediate' },
      { name: 'Decline Bench Press', difficulty: 'advanced' },
      { name: 'Dips (Chest focus)', difficulty: 'intermediate' }
    ],
    'Back': [
      { name: 'Deadlifts', difficulty: 'advanced' },
      { name: 'Lat Pulldowns', difficulty: 'beginner' },
      { name: 'Bent Over Rows', difficulty: 'intermediate' },
      { name: 'Pull Ups', difficulty: 'intermediate' },
      { name: 'Seated Cable Rows', difficulty: 'beginner' },
      { name: 'T-Bar Rows', difficulty: 'intermediate' },
      { name: 'Face Pulls', difficulty: 'beginner' }
    ],
    'Shoulders': [
      { name: 'Overhead Press', difficulty: 'intermediate' },
      { name: 'Lateral Raises', difficulty: 'beginner' },
      { name: 'Front Raises', difficulty: 'beginner' },
      { name: 'Arnold Press', difficulty: 'intermediate' },
      { name: 'Reverse Flys', difficulty: 'beginner' },
      { name: 'Upright Rows', difficulty: 'intermediate' }
    ],
    'Arms': [
      { name: 'Bicep Curls', difficulty: 'beginner' },
      { name: 'Tricep Pushdowns', difficulty: 'beginner' },
      { name: 'Hammer Curls', difficulty: 'beginner' },
      { name: 'Skull Crushers', difficulty: 'intermediate' },
      { name: 'Preacher Curls', difficulty: 'intermediate' },
      { name: 'Overhead Tricep Extension', difficulty: 'beginner' }
    ],
    'Core': [
      { name: 'Plank', difficulty: 'beginner' },
      { name: 'Leg Raises', difficulty: 'beginner' },
      { name: 'Cable Crunches', difficulty: 'intermediate' },
      { name: 'Russian Twists', difficulty: 'beginner' },
      { name: 'Ab Wheel Rollouts', difficulty: 'advanced' },
      { name: 'Hanging Leg Raises', difficulty: 'advanced' }
    ]
  },
  'home workout': {
    'Full Body': [
      { name: 'Burpees', difficulty: 'intermediate' },
      { name: 'Jumping Jacks', difficulty: 'beginner' },
      { name: 'Mountain Climbers', difficulty: 'beginner' },
      { name: 'Plank Jacks', difficulty: 'intermediate' },
      { name: 'High Knees', difficulty: 'beginner' },
      { name: 'Bear Crawls', difficulty: 'intermediate' }
    ],
    'Upper Body': [
      { name: 'Push Ups', difficulty: 'beginner' },
      { name: 'Diamond Push Ups', difficulty: 'intermediate' },
      { name: 'Pike Push Ups', difficulty: 'intermediate' },
      { name: 'Chair Dips', difficulty: 'beginner' },
      { name: 'Incline Push Ups', difficulty: 'beginner' },
      { name: 'Superman', difficulty: 'beginner' }
    ],
    'Lower Body': [
      { name: 'Bodyweight Squats', difficulty: 'beginner' },
      { name: 'Lunges', difficulty: 'beginner' },
      { name: 'Bulgarian Split Squats', difficulty: 'intermediate' },
      { name: 'Glute Bridges', difficulty: 'beginner' },
      { name: 'Calf Raises', difficulty: 'beginner' },
      { name: 'Jump Squats', difficulty: 'intermediate' },
      { name: 'Wall Sit', difficulty: 'beginner' }
    ],
    'Core': [
      { name: 'Crunches', difficulty: 'beginner' },
      { name: 'Plank', difficulty: 'beginner' },
      { name: 'Bicycle Crunches', difficulty: 'intermediate' },
      { name: 'Flutter Kicks', difficulty: 'beginner' },
      { name: 'Deadbug', difficulty: 'beginner' },
      { name: 'V-Ups', difficulty: 'advanced' }
    ]
  }
};


const WARMUP_OPTIONS = [
  'Joint Rotation', 'Jumping Jacks', 'Light Jogging', 'Dynamic Stretching', 'Arm Circles', 'Leg Swings'
];

const COOLDOWN_OPTIONS = [
  'Static Stretching', 'Deep Breathing', 'Child\'s Pose', 'Cat-Cow Stretch', 'Foam Rolling (Legs)', 'Hamstring Stretch'
];

// --- HELPERS ---

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const calculateCalories = (profile: UserProfile): number => {
  const { height, weight, age, gender, goal } = profile;
  let bmr = 0;
  if (gender.toLowerCase() === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  let tdee = bmr * 1.55; // Assuming moderate activity
  let target = tdee;
  if (goal === 'fat loss') target -= 500;
  if (goal === 'muscle gain') target += 300;
  return Math.round(target);
};

// --- GENERATORS ---

export const generateMealPlan = (profile: UserProfile): Meal[] => {
  const targetCalories = calculateCalories(profile);
  const diet = profile.dietPreference;
  
  const mealTypes = [
    { name: 'Early Morning', time: profile.wakeupTime, weight: 0.05 },
    { name: 'Breakfast', time: '08:30', weight: 0.25 },
    { name: 'Mid Morning', time: '11:00', weight: 0.05 },
    { name: 'Lunch', time: '13:30', weight: 0.30 },
    { name: 'Evening Snack', time: '16:30', weight: 0.05 },
    { name: 'Pre Workout', time: '18:00', weight: 0.05 },
    { name: 'Post Workout', time: '20:00', weight: 0.10 },
    { name: 'Dinner', time: '21:30', weight: 0.15 },
  ];

  return mealTypes.map((type) => {
    const mealOptions = MEAL_DATA[diet][type.name] || ['Healthy Option'];
    const mealName = getRandomElement(mealOptions);
    const mealCals = Math.round(targetCalories * type.weight);
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: mealName,
      type: type.name,
      time: type.time,
      calories: mealCals,
      protein: Math.round((mealCals * 0.25) / 4),
      carbs: Math.round((mealCals * 0.45) / 4),
      fats: Math.round((mealCals * 0.3) / 9),
      ingredients: ['Nutrient dense ingredients', 'Spices & Herbs', 'Healthy Fats']
    };
  });
};

export const generateWorkout = (profile: UserProfile): Workout => {
  const { workoutPreference, experienceLevel, goal } = profile;
  const isGym = workoutPreference === 'gym workout';
  const categoryData = isGym ? EXERCISE_DATA['gym workout'] : EXERCISE_DATA['home workout'];
  
  let workoutExercises: Exercise[] = [];
  
  // Selection Logic based on Goal and Level
  const musclesToTarget = Object.keys(categoryData);
  
  musclesToTarget.forEach(muscle => {
     const options = (categoryData as any)[muscle].filter((ex: any) => {
       if (experienceLevel === 'beginner') return ex.difficulty === 'beginner';
       if (experienceLevel === 'intermediate') return ex.difficulty === 'beginner' || ex.difficulty === 'intermediate';
       return true;
     });
     
     if (options.length > 0) {
       const selected = getRandomElement(options) as any;
       
       // Dynamic Sets/Reps based on Goal
       let sets = experienceLevel === 'beginner' ? 2 : 3;
       if (goal === 'muscle gain') sets += 1;
       
       let reps = '12';
       if (goal === 'fat loss') reps = '15-20';
       if (goal === 'muscle gain') reps = '8-10';
       if (goal === 'maintenance') reps = '12-15';

       workoutExercises.push({
         id: Math.random().toString(36).substr(2, 9),
         name: selected.name,
         muscle: muscle,
         sets,
         reps,
         rest: goal === 'fat loss' ? '30s' : '60s',
         difficulty: selected.difficulty
       });
     }
  });

  // Shuffle exercise order for variety
  workoutExercises = shuffleArray(workoutExercises);

  return {
    id: 'workout-' + Date.now(),
    name: `${experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)} ${goal.charAt(0).toUpperCase() + goal.slice(1)} - ${isGym ? 'Gym' : 'Home'}`,
    exercises: [
      { id: 'wu-' + Math.random(), name: getRandomElement(WARMUP_OPTIONS), muscle: 'Warmup', sets: 1, reps: '3 mins', rest: '0s', difficulty: 'beginner' },
      ...workoutExercises,
      { id: 'cd-' + Math.random(), name: getRandomElement(COOLDOWN_OPTIONS), muscle: 'Cooldown', sets: 1, reps: '5 mins', rest: '0s', difficulty: 'beginner' }
    ],
    type: workoutPreference,
    level: experienceLevel
  };
};

