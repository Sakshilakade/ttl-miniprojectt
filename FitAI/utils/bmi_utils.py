def calculate_bmi(weight_kg: float, height_cm: float) -> float:
    h = height_cm / 100
    return round(weight_kg / (h * h), 2) if h > 0 else 0.0


def bmi_category(bmi: float):
    if bmi < 18.5:
        return "Underweight", "Increase calorie intake with nutrient-dense foods and strength training."
    if bmi < 25:
        return "Normal", "Maintain your routine with balanced meals and regular activity."
    if bmi < 30:
        return "Overweight", "Focus on calorie deficit, more cardio, and high-protein meals."
    return "Obese", "Consult a professional. Prioritize low-impact cardio and a structured diet."


def calorie_target(weight, height, age, gender, activity, goal):
    # Mifflin-St Jeor
    if gender.lower().startswith("m"):
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    factors = {"Sedentary": 1.2, "Light": 1.375, "Moderate": 1.55, "Active": 1.725, "Very Active": 1.9}
    tdee = bmr * factors.get(activity, 1.375)
    if goal == "Weight Loss":
        tdee -= 400
    elif goal == "Muscle Gain":
        tdee += 300
    return int(tdee)
