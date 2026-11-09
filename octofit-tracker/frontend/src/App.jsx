import { Link, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function Overview() {
  return (
    <section className="overview" aria-labelledby="page-title">
      <p className="text-uppercase fw-semibold text-success mb-2">OctoFit Tracker</p>
      <h1 className="display-5 fw-bold" id="page-title">Move together.</h1>
      <p className="lead text-secondary">Your team's activity, all in one place.</p>
      <div className="row g-3 mt-4">
        {[
          ['Activities', '/activities', 'Track recent movement'],
          ['Leaderboard', '/leaderboard', 'See the team standings'],
          ['Teams', '/teams', 'Find your crew'],
          ['Users', '/users', 'Browse athlete profiles'],
          ['Workouts', '/workouts', 'Explore workout ideas'],
        ].map(([label, path, description]) => (
          <div className="col-12 col-sm-6 col-lg-4" key={path}>
            <Link className="overview-link" to={path}>
              <span className="fw-semibold">{label}</span>
              <span className="small text-secondary">{description}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section>
      <h1 className="h3">Page not found</h1>
      <Link to="/">Return to overview</Link>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header bg-white border-bottom">
        <nav className="container navbar navbar-expand-lg py-3" aria-label="Main navigation">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
            <img src={octofitLogo} width="40" height="40" alt="" />
            OctoFit Tracker
          </Link>
          <div className="navbar-nav ms-lg-auto flex-row flex-wrap gap-1">
            {[
              ['Activities', '/activities'],
              ['Leaderboard', '/leaderboard'],
              ['Teams', '/teams'],
              ['Users', '/users'],
              ['Workouts', '/workouts'],
            ].map(([label, path]) => (
              <NavLink
                className={({ isActive }) => `nav-link px-2${isActive ? ' active fw-semibold' : ''}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
