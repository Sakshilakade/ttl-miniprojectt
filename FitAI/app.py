"""
FitAI — AI Fitness Planner
Run:
    pip install -r requirements.txt
    streamlit run app.py
"""
import streamlit as st
import plotly.graph_objects as go
from datetime import datetime, date

from utils.auth import register_user, login_user, update_profile, save_progress, get_user
from utils.bmi_utils import calculate_bmi, bmi_category, calorie_target
from utils.meal_generator import generate_meal_plan
from utils.workout_generator import generate_workout_plan

# ---------------- Page config ----------------
st.set_page_config(page_title="FitAI", page_icon="💪", layout="wide", initial_sidebar_state="expanded")

# ---------------- Custom CSS (CaloriCam-inspired) ----------------
CSS = """
<style>
:root{
  --bg:#eaf5d8;
  --bg-soft:#f4faea;
  --green:#bff256;
  --green-deep:#9ad62b;
  --ink:#0e1a17;
  --ink-2:#3a4a44;
  --muted:#6b7a73;
  --card:#ffffff;
  --pink:#ffb3b3;
  --yellow:#ffd87a;
  --blue:#9ed0ff;
  --radius:22px;
}
html, body, [class*="css"]{font-family:'Inter','SF Pro Display',system-ui,-apple-system,sans-serif;}
.stApp{background:var(--bg);}
section[data-testid="stSidebar"]{background:#0e1a17;}
section[data-testid="stSidebar"] *{color:#eaf5d8 !important;}
section[data-testid="stSidebar"] .stRadio label{padding:8px 10px;border-radius:12px;}
section[data-testid="stSidebar"] .stRadio label:hover{background:#1c2a26;}
.block-container{padding-top:1.6rem;padding-bottom:3rem;max-width:1200px;}
h1,h2,h3,h4{color:var(--ink);letter-spacing:-0.01em;}
.fit-card{background:var(--card);border-radius:var(--radius);padding:22px 24px;box-shadow:0 4px 20px rgba(20,40,30,0.05);}
.fit-hero{background:var(--green);border-radius:var(--radius);padding:26px;color:var(--ink);box-shadow:0 6px 24px rgba(154,214,43,0.35);}
.fit-pill{display:inline-flex;align-items:center;gap:6px;background:#0e1a17;color:#bff256;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:600;}
.fit-chip{display:inline-flex;background:#f1f5ec;color:#0e1a17;padding:6px 12px;border-radius:999px;font-size:12px;font-weight:500;margin-right:6px;}
.kpi-num{font-size:42px;font-weight:800;color:var(--ink);line-height:1;}
.kpi-label{color:var(--muted);font-size:13px;margin-top:6px;}
.meal-card{background:#fff;border-radius:18px;padding:18px;margin-bottom:14px;border:1px solid #eef2e7;}
.meal-title{font-weight:700;font-size:16px;color:var(--ink);}
.meal-time{color:#6b7a73;font-size:12px;}
.macro{display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:600;margin-right:6px;margin-top:8px;}
.macro.cal{background:#0e1a17;color:#bff256;}
.macro.p{background:#9ed0ff;color:#0e1a17;}
.macro.c{background:#ffb3b3;color:#0e1a17;}
.macro.f{background:#ffd87a;color:#0e1a17;}
.stButton>button{background:#0e1a17;color:#bff256;border:none;border-radius:999px;padding:10px 22px;font-weight:600;}
.stButton>button:hover{background:#1c2a26;color:#bff256;}
.btn-green>button{background:var(--green) !important;color:#0e1a17 !important;}
div[data-testid="stMetric"]{background:#fff;border-radius:18px;padding:14px 16px;border:1px solid #eef2e7;}
.stProgress>div>div>div>div{background:var(--green-deep);}
input, textarea, select, .stNumberInput input, .stTextInput input{border-radius:12px !important;}
.brand{display:flex;align-items:center;gap:10px;margin-bottom:6px;}
.brand-logo{width:34px;height:34px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;font-size:18px;}
.subtle{color:var(--muted);font-size:13px;}
hr{border:none;border-top:1px solid #e5ecde;margin:18px 0;}
</style>
"""
st.markdown(CSS, unsafe_allow_html=True)

# ---------------- Session ----------------
ss = st.session_state
ss.setdefault("logged_in", False)
ss.setdefault("email", "")
ss.setdefault("name", "")
ss.setdefault("profile", {})
ss.setdefault("page", "Dashboard")
ss.setdefault("seed", int(datetime.now().strftime("%Y%m%d")))


# ---------------- Auth view ----------------
def auth_view():
    col_l, col_r = st.columns([1, 1])
    with col_l:
        st.markdown("<div class='brand'><div class='brand-logo'>💪</div><h2 style='margin:0'>FitAI</h2></div>", unsafe_allow_html=True)
        st.markdown("### Your AI-powered fitness & nutrition coach")
        st.markdown("<p class='subtle'>Personalized meal plans, workouts, BMI insights and daily progress — all in one beautiful dashboard.</p>", unsafe_allow_html=True)
        st.markdown("<span class='fit-chip'>🥗 Smart meals</span><span class='fit-chip'>🏋 Workouts</span><span class='fit-chip'>📈 Progress</span>", unsafe_allow_html=True)
    with col_r:
        st.markdown("<div class='fit-card'>", unsafe_allow_html=True)
        tab_login, tab_register = st.tabs(["Sign in", "Create account"])
        with tab_login:
            email = st.text_input("Email", key="login_email")
            password = st.text_input("Password", type="password", key="login_pw")
            if st.button("Sign in", key="btn_login"):
                ok, msg, user = login_user(email, password)
                if ok:
                    ss.logged_in = True
                    ss.email = email
                    ss.name = user["name"]
                    ss.profile = user.get("profile", {})
                    st.rerun()
                else:
                    st.error(msg)
        with tab_register:
            name = st.text_input("Name", key="reg_name")
            email = st.text_input("Email", key="reg_email")
            password = st.text_input("Password", type="password", key="reg_pw")
            if st.button("Create account", key="btn_reg"):
                if not (name and email and password):
                    st.warning("Please fill all fields.")
                else:
                    ok, msg = register_user(name, email, password)
                    (st.success if ok else st.error)(msg)
        st.markdown("</div>", unsafe_allow_html=True)


# ---------------- Profile setup ----------------
def profile_setup():
    st.markdown("<div class='fit-card'>", unsafe_allow_html=True)
    st.subheader("Set up your profile")
    st.caption("We use this to tailor meals and workouts to your body and goals.")
    c1, c2, c3 = st.columns(3)
    age = c1.number_input("Age", 10, 90, ss.profile.get("age", 22))
    gender = c2.selectbox("Gender", ["Male", "Female", "Other"], index=["Male", "Female", "Other"].index(ss.profile.get("gender", "Male")))
    height = c3.number_input("Height (cm)", 120, 230, ss.profile.get("height", 170))
    c4, c5, c6 = st.columns(3)
    weight = c4.number_input("Weight (kg)", 30, 200, ss.profile.get("weight", 65))
    goal = c5.selectbox("Goal", ["Weight Loss", "Muscle Gain", "Maintain Weight"],
                        index=["Weight Loss", "Muscle Gain", "Maintain Weight"].index(ss.profile.get("goal", "Maintain Weight")))
    activity = c6.selectbox("Activity Level", ["Sedentary", "Light", "Moderate", "Active", "Very Active"],
                            index=["Sedentary", "Light", "Moderate", "Active", "Very Active"].index(ss.profile.get("activity", "Moderate")))
    c7, c8, c9 = st.columns(3)
    diet = c7.selectbox("Diet Type", ["Veg", "NonVeg", "Veg + NonVeg"],
                        index=["Veg", "NonVeg", "Veg + NonVeg"].index(ss.profile.get("diet", "Veg")))
    wakeup = c8.text_input("Wakeup Time (HH:MM)", ss.profile.get("wakeup", "07:00"))
    sleep = c9.text_input("Sleep Time (HH:MM)", ss.profile.get("sleep", "22:30"))
    water = st.slider("Daily Water Goal (litres)", 1.0, 6.0, float(ss.profile.get("water", 3.0)), 0.5)

    if st.button("Save profile"):
        ss.profile = {
            "age": int(age), "gender": gender, "height": int(height), "weight": int(weight),
            "goal": goal, "activity": activity, "diet": diet,
            "wakeup": wakeup, "sleep": sleep, "water": float(water),
        }
        update_profile(ss.email, ss.profile)
        st.success("Profile saved!")
        st.rerun()
    st.markdown("</div>", unsafe_allow_html=True)


# ---------------- Dashboard ----------------
def dashboard():
    p = ss.profile
    bmi = calculate_bmi(p["weight"], p["height"])
    cat, _ = bmi_category(bmi)
    cal_goal = calorie_target(p["weight"], p["height"], p["age"], p["gender"], p["activity"], p["goal"])

    # Hero
    st.markdown(f"""
    <div class='fit-hero'>
      <div class='brand'><div class='brand-logo' style='background:#0e1a17;color:#bff256'>💪</div>
        <div><div style='font-weight:700;font-size:18px'>FitAI</div>
        <div class='subtle' style='color:#3a4a44'>Last synced today at {datetime.now().strftime('%H:%M')}</div></div>
      </div>
      <div style='display:flex;align-items:center;justify-content:space-between;margin-top:8px;'>
        <div>
          <div class='fit-pill'>⚡ Daily intake</div>
          <div class='kpi-num' style='margin-top:10px'>{min(int(1250/cal_goal*100),100)}%</div>
          <div class='kpi-label'>1250 / {cal_goal} kcal</div>
        </div>
        <div style='text-align:right'>
          <div style='font-size:14px;color:#0e1a17;font-weight:600'>Hi {ss.name} 👋</div>
          <div class='subtle' style='color:#3a4a44'>Goal: {p['goal']}</div>
        </div>
      </div>
    </div>
    """, unsafe_allow_html=True)

    st.write("")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("BMI", bmi, cat)
    c2.metric("Calories Goal", f"{cal_goal} kcal")
    c3.metric("Water Goal", f"{p['water']} L")
    c4.metric("Current Weight", f"{p['weight']} kg")

    st.write("")
    cc1, cc2, cc3, cc4 = st.columns(4)
    if cc1.button("🍽 Meal Plan"): ss.page = "Meal Planner"; st.rerun()
    if cc2.button("🏋 Workout"): ss.page = "Workout Planner"; st.rerun()
    if cc3.button("⚖ BMI"): ss.page = "BMI Calculator"; st.rerun()
    if cc4.button("📈 Progress"): ss.page = "Progress Tracker"; st.rerun()

    st.markdown("---")
    st.markdown("#### Today at a glance")
    g1, g2 = st.columns([2, 1])
    with g1:
        st.markdown("<div class='fit-card'>", unsafe_allow_html=True)
        st.markdown("**Daily calories**")
        st.progress(min(1250 / cal_goal, 1.0))
        st.caption(f"Target range  •  {int(cal_goal*0.9)}–{cal_goal} kcal")
        st.markdown("</div>", unsafe_allow_html=True)
    with g2:
        fig = go.Figure(go.Pie(
            labels=["Carbs", "Protein", "Fats"],
            values=[55, 25, 20],
            hole=0.6,
            marker=dict(colors=["#ffb3b3", "#9ed0ff", "#ffd87a"]),
            textinfo="label+percent",
        ))
        fig.update_layout(showlegend=False, margin=dict(l=0, r=0, t=10, b=10), height=240,
                          paper_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig, use_container_width=True)


# ---------------- Meals ----------------
def meals_view():
    p = ss.profile
    cal_goal = calorie_target(p["weight"], p["height"], p["age"], p["gender"], p["activity"], p["goal"])
    st.markdown("### 🍽 Personalized Meal Plan")
    st.caption(f"Tailored to your goal **{p['goal']}**, diet **{p['diet']}** and ~{cal_goal} kcal/day")

    if st.button("✨ Generate Meal Plan"):
        ss.seed += 1

    plan = generate_meal_plan(p["goal"], p["diet"], cal_goal, p["wakeup"], p["sleep"], ss.seed)

    cols = st.columns(2)
    for i, m in enumerate(plan):
        with cols[i % 2]:
            st.markdown(f"""
            <div class='meal-card'>
              <div style='display:flex;justify-content:space-between;align-items:start'>
                <div>
                  <div class='meal-title'>{m['label']}</div>
                  <div class='meal-time'>⏰ {m['time']}  •  💧 {m['water']}</div>
                </div>
              </div>
              <div style='margin-top:10px;font-size:15px;color:#0e1a17;font-weight:600'>{m['name']}</div>
              <div>
                <span class='macro cal'>🔥 {m['calories']} kcal</span>
                <span class='macro p'>P {m['protein']}g</span>
                <span class='macro c'>C {m['carbs']}g</span>
                <span class='macro f'>F {m['fats']}g</span>
              </div>
            </div>
            """, unsafe_allow_html=True)

    total = sum(m["calories"] for m in plan)
    st.success(f"Total: {total} kcal  •  Target: {cal_goal} kcal")


# ---------------- Workouts ----------------
def workouts_view():
    p = ss.profile
    bmi = calculate_bmi(p["weight"], p["height"])
    st.markdown("### 🏋 Workout Plan")
    level = st.selectbox("Activity Level", ["Beginner", "Intermediate", "Advanced"], index=1)

    if st.button("✨ Generate Workout"):
        ss.seed += 1

    plan = generate_workout_plan(p["goal"], level, bmi, ss.seed)
    for section, items in plan.items():
        st.markdown(f"#### {section}")
        cols = st.columns(2)
        for i, ex in enumerate(items):
            with cols[i % 2]:
                st.markdown(f"""
                <div class='meal-card'>
                  <div class='meal-title'>{ex['name']}</div>
                  <div class='meal-time'>Difficulty: {ex['difficulty']}</div>
                  <div style='margin-top:8px'>
                    <span class='macro cal'>🔥 {ex['calories']} kcal</span>
                    <span class='macro p'>{ex['sets']} sets</span>
                    <span class='macro c'>{ex['reps']} reps</span>
                    <span class='macro f'>{ex['duration']} min</span>
                  </div>
                </div>
                """, unsafe_allow_html=True)


# ---------------- BMI ----------------
def bmi_view():
    st.markdown("### ⚖ BMI Calculator")
    c1, c2 = st.columns(2)
    h = c1.number_input("Height (cm)", 100, 230, ss.profile.get("height", 170))
    w = c2.number_input("Weight (kg)", 30, 200, ss.profile.get("weight", 65))
    if st.button("Calculate"):
        bmi = calculate_bmi(w, h)
        cat, advice = bmi_category(bmi)
        st.markdown(f"<div class='fit-hero'><div class='kpi-num'>{bmi}</div><div class='kpi-label'>{cat}</div></div>", unsafe_allow_html=True)
        st.info(advice)


# ---------------- Progress ----------------
def progress_view():
    st.markdown("### 📈 Daily Progress")
    p = ss.profile
    cal_goal = calorie_target(p["weight"], p["height"], p["age"], p["gender"], p["activity"], p["goal"])

    c1, c2 = st.columns(2)
    with c1:
        st.markdown("<div class='fit-card'>", unsafe_allow_html=True)
        weight = st.number_input("Today's weight (kg)", 30.0, 200.0, float(p["weight"]), 0.1)
        water = st.slider("Water intake (L)", 0.0, 6.0, p["water"], 0.25)
        st.markdown("</div>", unsafe_allow_html=True)
    with c2:
        st.markdown("<div class='fit-card'>", unsafe_allow_html=True)
        cals = st.slider("Calories eaten", 0, 5000, int(cal_goal * 0.9), 50)
        workout_done = st.checkbox("Workout completed ✅")
        meals_done = st.checkbox("All meals followed 🍽")
        st.markdown("</div>", unsafe_allow_html=True)

    if st.button("Save progress"):
        save_progress(ss.email, {
            "date": str(date.today()), "weight": weight, "water": water,
            "calories": cals, "workout": workout_done, "meals": meals_done,
        })
        st.success("Saved! Keep the streak going 🔥")

    user = get_user(ss.email) or {}
    history = user.get("progress", [])
    if history:
        st.markdown("#### History")
        for h in history[-7:][::-1]:
            st.markdown(f"<div class='meal-card'><b>{h['date']}</b> — {h['calories']} kcal • {h['water']} L • "
                        f"{'✅' if h['workout'] else '❌'} workout • {h['weight']} kg</div>", unsafe_allow_html=True)


# ---------------- Sidebar / routing ----------------
if not ss.logged_in:
    auth_view()
    st.stop()

with st.sidebar:
    st.markdown("<div class='brand'><div class='brand-logo'>💪</div><h3 style='margin:0;color:#bff256'>FitAI</h3></div>", unsafe_allow_html=True)
    st.caption(f"Signed in as **{ss.name}**")
    st.markdown("---")
    page = st.radio("Navigate", ["Dashboard", "Meal Planner", "Workout Planner", "BMI Calculator", "Progress Tracker", "Profile"],
                    index=["Dashboard", "Meal Planner", "Workout Planner", "BMI Calculator", "Progress Tracker", "Profile"].index(ss.page if ss.page in ["Dashboard","Meal Planner","Workout Planner","BMI Calculator","Progress Tracker","Profile"] else "Dashboard"))
    ss.page = page
    st.markdown("---")
    if st.button("Logout"):
        for k in ["logged_in", "email", "name", "profile"]:
            ss[k] = False if k == "logged_in" else ("" if isinstance(ss[k], str) else {})
        st.rerun()

# Force profile setup if empty
if not ss.profile or "weight" not in ss.profile:
    st.title("💪 FitAI — Let's set you up")
    profile_setup()
    st.stop()

st.title("💪 FitAI")
st.caption("Your personal AI-powered health assistant")

if ss.page == "Dashboard":
    dashboard()
elif ss.page == "Meal Planner":
    meals_view()
elif ss.page == "Workout Planner":
    workouts_view()
elif ss.page == "BMI Calculator":
    bmi_view()
elif ss.page == "Progress Tracker":
    progress_view()
elif ss.page == "Profile":
    profile_setup()
