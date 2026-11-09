import { Link, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function Overview() {
  return (
    <section aria-labelledby="page-title">
      <p className="text-uppercase fw-semibold text-success mb-2">OctoFit Tracker</p>
      <h1 className="display-5 fw-bold" id="page-title">Move together.</h1>
      <p className="lead text-secondary">Your activity dashboard is ready.</p>
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
    <div className="min-vh-100 bg-light">
      <header className="bg-white border-bottom">
        <nav className="container navbar py-3" aria-label="Main navigation">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/">
            <img src={octofitLogo} width="40" height="40" alt="" />
            OctoFit Tracker
          </Link>
        </nav>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
