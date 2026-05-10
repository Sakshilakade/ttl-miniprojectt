import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Utensils, Dumbbell, History, Settings, LogOut, ChevronRight, User, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'meals', label: 'Meal Plan', icon: Utensils, path: '/meals' },
  { id: 'workout', label: 'Workout', icon: Dumbbell, path: '/workout' },
  { id: 'bmi', label: 'BMI Calculator', icon: Calculator, path: '/bmi' },
  { id: 'progress', label: 'Progress', icon: History, path: '/progress' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const { profile, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  if (!profile && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register') {
    // Should be handled by router protection, but better safe than sorry
    return <>{children}</>;
  }

  const isAuthPage = ['/', '/login', '/register', '/onboarding'].includes(location.pathname);

  if (isAuthPage) {
    return <main className="min-h-screen bg-app-bg text-black">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-app-bg">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-black/5 bg-white md:flex">
        <div className="flex h-20 items-center px-8 border-b border-black/5">
          <span className="font-display text-2xl font-bold tracking-tighter text-black">
            Fit<span className="text-brand-primary">Ai</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-8">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300",
                  isActive 
                    ? "bg-brand-primary/10 text-black" 
                    : "text-black/50 hover:bg-[#f8f8f5] hover:text-black"
                )}
              >
                <Icon size={20} className={cn(isActive ? "text-brand-primary" : "text-black/30 group-hover:text-black")} />
                {item.label}
                {isActive && <motion.div layoutId="active-dot" className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-primary" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-red-400 transition-all duration-300 hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        <header className="flex h-20 items-center justify-between px-8 md:px-12 bg-white/50 backdrop-blur-md border-b border-black/5">
          <div className="md:hidden">
            <span className="font-display text-xl font-bold tracking-tighter text-black">
              Fit<span className="text-brand-primary">Ai</span>
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden text-right md:block">
              <p className="text-sm font-bold text-black">{profile?.name}</p>
              <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest">{profile?.goal}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-brand-primary/20 p-0.5">
              <div className="h-full w-full rounded-full bg-white p-1">
                <div className="h-full w-full rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <User size={16} className="text-brand-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="p-8 md:p-12 max-w-7xl mx-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 flex w-full items-center justify-around border-t border-black/5 bg-white/90 backdrop-blur-xl py-3 md:hidden z-50">
        {sidebarItems.filter(i => i.id !== 'settings').map((item) => {
           const isActive = location.pathname === item.path;
           const Icon = item.icon;
           return (
             <button
               key={item.id}
               onClick={() => navigate(item.path)}
               className={cn(
                 "flex flex-col items-center gap-1 transition-colors",
                 isActive ? "text-brand-primary" : "text-black/30 hover:text-black"
               )}
             >
               <Icon size={20} />
               <span className="text-[10px] uppercase font-bold tracking-tighter">{item.label.split(' ')[0]}</span>
             </button>
           );
        })}
      </nav>
    </div>
  );
};
