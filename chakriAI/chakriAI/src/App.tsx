import { useEffect, useMemo, useState } from 'react'
import './App.css'
import CoachPage from './pages/CoachPage'
import CvPage from './pages/CvPage'
import DashboardPage from './pages/DashboardPage'
import JobsPage from './pages/JobsPage'
import PortfolioPage from './pages/PortfolioPage'
import PptxPage from './pages/PptxPage'

type RouteKey = 'dashboard' | 'coach' | 'cv' | 'jobs' | 'pptx' | 'portfolio'

type ModuleItem = {
  key: RouteKey
  label: string
  subtitle: string
}

const modules: ModuleItem[] = [
  { key: 'dashboard', label: 'Dashboard', subtitle: 'Overview' },
  { key: 'coach', label: 'AI Coach', subtitle: 'Interview prep' },
  { key: 'cv', label: 'CV Generator', subtitle: 'Professional resume' },
  { key: 'jobs', label: 'Job Matcher', subtitle: 'Smart recommendations' },
  { key: 'pptx', label: 'Slides AI', subtitle: 'Auto PPTX creator' },
  { key: 'portfolio', label: 'Portfolio', subtitle: 'Achievements and docs' },
]

const parseRoute = (): RouteKey => {
  const hash = window.location.hash.replace('#/', '') as RouteKey
  const validKeys: RouteKey[] = ['dashboard', 'coach', 'cv', 'jobs', 'pptx', 'portfolio']

  return validKeys.includes(hash) ? hash : 'dashboard'
}

function App() {
  const [route, setRoute] = useState<RouteKey>(parseRoute())

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute())

    window.addEventListener('hashchange', onHashChange)

    if (!window.location.hash) {
      window.location.hash = '/dashboard'
    }

    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const activeModule = useMemo(() => modules.find((module) => module.key === route) ?? modules[0], [route])

  const content = useMemo(() => {
    switch (route) {
      case 'coach':
        return <CoachPage />
      case 'cv':
        return <CvPage />
      case 'jobs':
        return <JobsPage />
      case 'pptx':
        return <PptxPage />
      case 'portfolio':
        return <PortfolioPage />
      default:
        return <DashboardPage />
    }
  }, [route])

  return (
    <div className="app-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <div className="noise-layer" />

      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">Career OS</p>
          <h1>ChakriAI</h1>
        </div>
        <div className="top-actions">
          <button className="ghost-btn">Demo Mode</button>
          <button className="solid-btn">Launch Workspace</button>
        </div>
      </header>

      <div className="layout-grid">
        <aside className="card-surface sidebar">
          <div className="sidebar-head">
            <p className="eyebrow">Modules</p>
            <h3>{activeModule.label}</h3>
            <p>{activeModule.subtitle}</p>
          </div>

          <nav className="module-nav" aria-label="Main modules">
            {modules.map((module) => {
              const isActive = module.key === route

              return (
                <a
                  key={module.key}
                  href={`#/${module.key}`}
                  className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                >
                  <strong>{module.label}</strong>
                  <span>{module.subtitle}</span>
                </a>
              )
            })}
          </nav>
        </aside>

        <main className="content-area">{content}</main>
      </div>
    </div>
  )
}

export default App
