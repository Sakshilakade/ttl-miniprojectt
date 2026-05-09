import pandas as pd
from pathlib import Path
from datetime import datetime, timedelta

FOODS = Path(__file__).parent.parent / "data" / "foods.csv"


def _filter_diet(df, diet):
    if diet == "Veg":
        return df[df["diet"] == "Veg"]
    if diet == "NonVeg":
        return df[df["diet"] == "NonVeg"]
    return df  # Veg + NonVeg


def _pick(df, meal, diet, target_cal, seed):
    sub = _filter_diet(df[df["meal"] == meal], diet)
    if sub.empty:
        sub = df[df["meal"] == meal]
    sub = sub.assign(diff=(sub["calories"] - target_cal).abs()).sort_values("diff")
    # rotate by seed to vary day-to-day
    idx = seed % max(len(sub), 1)
    return sub.iloc[idx]


def generate_meal_plan(goal, diet, calorie_target, wakeup="07:00", sleep="22:00", seed=0):
    df = pd.read_csv(FOODS)

    # split calories across meals
    split = {
        "breakfast": 0.20,
        "mid_morning": 0.08,
        "lunch": 0.30,
        "evening": 0.10,
        "dinner": 0.25,
        "night": 0.07,
    }

    # compute meal times around wakeup/sleep
    try:
        wt = datetime.strptime(str(wakeup)[:5], "%H:%M")
        st = datetime.strptime(str(sleep)[:5], "%H:%M")
    except Exception:
        wt = datetime.strptime("07:00", "%H:%M")
        st = datetime.strptime("22:00", "%H:%M")

    times = {
        "breakfast": wt + timedelta(minutes=30),
        "mid_morning": wt + timedelta(hours=3),
        "lunch": wt + timedelta(hours=5, minutes=30),
        "evening": wt + timedelta(hours=9),
        "dinner": st - timedelta(hours=2),
        "night": st - timedelta(minutes=15),
    }

    labels = {
        "breakfast": ("🌅 Breakfast", "300 ml water"),
        "mid_morning": ("☕ Mid-Morning Snack", "250 ml water"),
        "lunch": ("🍛 Lunch", "400 ml water"),
        "evening": ("🥜 Evening Snack", "250 ml water"),
        "dinner": ("🍽 Dinner", "300 ml water"),
        "night": ("🥛 Night Snack", "150 ml water"),
    }

    plan = []
    for i, (meal, ratio) in enumerate(split.items()):
        target = int(calorie_target * ratio)
        row = _pick(df, meal, diet, target, seed + i)
        label, water = labels[meal]
        plan.append({
            "label": label,
            "name": row["name"],
            "calories": int(row["calories"]),
            "protein": float(row["protein"]),
            "carbs": float(row["carbs"]),
            "fats": float(row["fats"]),
            "water": water,
            "time": times[meal].strftime("%H:%M"),
        })
    return plan
