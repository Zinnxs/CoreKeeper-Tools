import { NavLink, Outlet } from 'react-router-dom'
import { FlaskConical, ScrollText, Shield, Skull, Swords, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Compêndio', icon: ScrollText },
  { to: '/build-planner', label: 'Build Planner', icon: Swords },
  { to: '/cooking', label: 'Cooking Simulator', icon: FlaskConical },
  { to: '/bestiary', label: 'Bestiary', icon: Skull },
  { to: '/dashboard', label: 'Server Dashboard', icon: Shield },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="border-b border-slate-800 bg-slate-900/70 p-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-6 flex items-center gap-3 px-2">
            <div className="rounded-lg bg-violet-500/20 p-2 text-violet-300">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Core Keeper</p>
              <h1 className="text-sm font-semibold">Ultimate Toolkit</h1>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex min-w-max items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-slate-100',
                    isActive && 'bg-violet-500/20 text-violet-200',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
