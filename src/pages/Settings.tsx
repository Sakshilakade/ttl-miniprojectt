import { useState } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { User, Shield, Info, LogOut, ChevronRight, Edit3, Save, X, Utensils, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';

export default function Settings() {
  const { profile, setProfile, logout } = useApp();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile | null>(profile);

  if (!profile || !editForm) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ ...profile });
  };

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    // You could also trigger a toast/notification here
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl text-black">
            Profile Settings
          </h1>
          <p className="mt-2 text-black/40 uppercase tracking-widest text-xs font-bold">Manage your profile & preferences</p>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex h-12 items-center gap-2 rounded-2xl border border-brand-primary px-6 text-sm font-bold text-black transition-all hover:bg-brand-primary/10"
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        )}
      </header>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="glass-card flex flex-col p-8 lg:col-span-2 bg-white border border-black/5 shadow-sm">
           <div className="mb-10 flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/40 p-1">
                 <div className="h-full w-full rounded-full bg-white p-1">
                    <div className="h-full w-full rounded-full bg-[#f8f8f5] flex items-center justify-center text-brand-primary">
                       <User size={40} />
                    </div>
                 </div>
              </div>
              <div className="flex-1">
                 {isEditing ? (
                   <div className="space-y-1">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-black/30">Display Name</label>
                     <input 
                       type="text"
                       value={editForm.name}
                       onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                       className="w-full rounded-xl border border-brand-primary bg-brand-primary/5 px-3 py-2 text-xl font-bold text-black outline-none"
                     />
                   </div>
                 ) : (
                   <>
                     <h2 className="font-display text-3xl font-bold text-black">{profile.name}</h2>
                     <p className="text-sm font-medium text-black/40">{profile.email}</p>
                   </>
                 )}
                 <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#f8f8f5] px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-black/60">
                    <Shield size={12} /> Personal Profile
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-black/30">Email Address</label>
                 <input
                   type="email"
                   className="w-full rounded-2xl border border-black/5 bg-[#f8f8f5] p-4 text-sm font-medium text-black/40 cursor-not-allowed"
                   value={profile.email}
                   readOnly
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-black/30">Fitness Goal</label>
                 <div className="relative">
                   <select
                     disabled={!isEditing}
                     className={`w-full appearance-none rounded-2xl border p-4 text-sm font-medium transition-all text-black outline-none ${
                       isEditing ? 'border-brand-primary bg-brand-primary/5' : 'border-black/5 bg-[#f8f8f5] text-black/40'
                     }`}
                     value={editForm.goal}
                     onChange={(e) => setEditForm({ ...editForm, goal: e.target.value as any })}
                   >
                      <option value="fat loss">Fat Loss</option>
                      <option value="muscle gain">Muscle Gain</option>
                      <option value="maintenance">Maintenance</option>
                   </select>
                   <ChevronRight size={16} className={`absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-black/20 ${!isEditing && 'hidden'}`} />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-black/30">Workout Experience</label>
                 <div className="relative">
                   <select
                     disabled={!isEditing}
                     className={`w-full appearance-none rounded-2xl border p-4 text-sm font-medium transition-all text-black outline-none ${
                       isEditing ? 'border-brand-primary bg-brand-primary/5' : 'border-black/5 bg-[#f8f8f5] text-black/40'
                     }`}
                     value={editForm.experienceLevel}
                     onChange={(e) => setEditForm({ ...editForm, experienceLevel: e.target.value as any })}
                   >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                   </select>
                   <ChevronRight size={16} className={`absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-black/20 ${!isEditing && 'hidden'}`} />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-black/30">Diet Preference</label>
                 <div className="relative">
                   <select
                     disabled={!isEditing}
                     className={`w-full appearance-none rounded-2xl border p-4 text-sm font-medium transition-all text-black outline-none ${
                       isEditing ? 'border-brand-primary bg-brand-primary/5' : 'border-black/5 bg-[#f8f8f5] text-black/40'
                     }`}
                     value={editForm.dietPreference}
                     onChange={(e) => setEditForm({ ...editForm, dietPreference: e.target.value as any })}
                   >
                      <option value="vegetarian">Vegetarian</option>
                      <option value="non-vegetarian">Non-Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="veg + non-veg">Veg + Non-Veg</option>
                   </select>
                   <ChevronRight size={16} className={`absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-black/20 ${!isEditing && 'hidden'}`} />
                 </div>
              </div>
           </div>

           {isEditing && (
             <div className="mt-10 flex gap-4">
               <button
                 onClick={handleCancel}
                 className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-black/5 font-bold text-black/40 transition-all hover:bg-[#f8f8f5]"
               >
                 <X size={20} />
                 Cancel
               </button>
               <button
                 onClick={handleSave}
                 className="flex h-14 flex-2 items-center justify-center gap-2 rounded-2xl bg-brand-primary font-bold text-black shadow-lg shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95"
               >
                 <Save size={20} />
                 Save Changes
               </button>
             </div>
           )}
        </div>

        <div className="flex flex-col gap-6">
           <div className="glass-card p-8 bg-white border border-black/5 shadow-sm">
              <h3 className="font-display text-xl font-bold mb-6 text-black">Insights</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 rounded-2xl bg-[#f8f8f5] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                       <Utensils size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-black/30">Current Diet</p>
                       <p className="text-sm font-bold text-black">{profile.dietPreference}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 rounded-2xl bg-[#f8f8f5] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                       <Dumbbell size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] uppercase font-bold text-black/30">Mode</p>
                       <p className="text-sm font-bold text-black">{profile.workoutPreference}</p>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="mt-8 flex w-full items-center justify-between rounded-2xl bg-red-500/10 p-4 text-sm font-bold text-red-500 transition-all hover:bg-red-500/20"
              >
                 Logout
                 <LogOut size={16} />
              </button>
           </div>

           <div className="glass-card p-8 bg-white border border-black/5 shadow-sm">
              <h3 className="font-display text-xl font-bold mb-4 text-black">App Info</h3>
              <div className="flex items-center gap-3">
                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8f8f5] text-black/40">
                    <span className="text-[10px] font-bold">Fit</span>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-black">FitAi v2.5.0</p>
                    <p className="text-[10px] uppercase font-bold text-black/40">Wellness Edition</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
