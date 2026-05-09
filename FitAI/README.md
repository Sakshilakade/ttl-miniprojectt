# FitAI — AI Fitness Planner

A Streamlit AI-inspired fitness & nutrition assistant with a CaloriCam-style UI
(light green theme, white rounded cards, dark sidebar, colorful macro chips).

## Features
- Login / Register (JSON storage, hashed passwords)
- Profile setup (age, gender, height, weight, goal, activity, diet, sleep/wake, water)
- Dashboard with daily intake hero card, BMI, calorie & water goals, macro donut
- Personalized **Meal Planner** (6 meals, calories/protein/carbs/fats, timing & water)
- Personalized **Workout Planner** (warmup, main, cooldown — sets/reps/duration/calories)
- **BMI Calculator** with category & advice
- **Progress Tracker** with daily save & history

## Setup
```bash
pip install -r requirements.txt
streamlit run app.py
```

## Project structure
```
FitAI/
├── app.py
├── requirements.txt
├── data/
│   ├── foods.csv
│   ├── workouts.csv
│   └── users.json
└── utils/
    ├── auth.py
    ├── bmi_utils.py
    ├── meal_generator.py
    └── workout_generator.py
```

## AI / ML logic
The planners use **content-based recommendation logic**:
- Foods are filtered by diet preference and meal slot, then scored by
  proximity to the user's per-meal calorie target (Mifflin–St Jeor TDEE).
- Workouts are filtered by goal & level, then sampled with a daily seed so
  plans rotate day-to-day.
- BMI category drives advice and meal calorie distribution.
