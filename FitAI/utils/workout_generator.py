import pandas as pd
from pathlib import Path

WORKOUTS = Path(__file__).parent.parent / "data" / "workouts.csv"


def generate_workout_plan(goal, level, bmi, seed=0):
    df = pd.read_csv(WORKOUTS)

    def filter_section(section, n):
        sub = df[df["section"] == section]
        sub = sub[(sub["goal"] == "All") | (sub["goal"] == goal)]
        sub = sub[(sub["level"] == "All") | (sub["level"] == level) | (sub["level"] == "Beginner")]
        if sub.empty:
            sub = df[df["section"] == section]
        # rotate
        sub = sub.sample(n=min(n, len(sub)), random_state=seed)
        return sub

    sections = {
        "Warmup": filter_section("warmup", 3),
        "Main Workout": filter_section("main", 6 if level != "Beginner" else 5),
        "Cooldown": filter_section("cooldown", 3),
    }

    plan = {}
    for title, sub in sections.items():
        plan[title] = [
            {
                "name": r["name"],
                "sets": int(r["sets"]),
                "reps": int(r["reps"]),
                "duration": int(r["duration"]),
                "calories": int(r["calories"]),
                "difficulty": r["difficulty"],
            }
            for _, r in sub.iterrows()
        ]
    return plan
