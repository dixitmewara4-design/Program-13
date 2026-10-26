
import {
  HashRouter,
  MemoryRouter,
  StaticRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useState } from 'react'

const concepts = [
  {
    name: 'HashRouter',
    symbol: '#',
    color: 'violet',
    description: 'Uses the URL hash (#) to manage navigation.',
    example: 'example.com/#/about',
    use: 'Static hosting and simple single-page applications.',
  },
  {
    name: 'MemoryRouter',
    symbol: 'M',
    color: 'sky',
    description: 'Stores navigation history in memory, not in the URL.',
    example: 'URL remains unchanged',
    use: 'Unit tests, embedded interfaces, and controlled navigation.',
  },
  {
    name: 'StaticRouter',
    symbol: 'S',
    color: 'emerald',
    description: 'Provides a fixed location for server-side rendering.',
    example: 'Location supplied by the server',
    use: 'Server-side rendering (SSR).',
  },
]

function DemoPage({ title, description }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
        Live demonstration
      </p>
      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

      <div className="mt-5 rounded-xl bg-slate-950 p-4">
        <p className="text-xs text-slate-500">Current route location</p>
        <p className="mt-2 break-all font-mono text-sm text-emerald-300">
          {location.pathname}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={() => navigate('/')}
          className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold hover:bg-violet-400"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate('/about')}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-bold hover:bg-white/5"
        >
          Go About
        </button>
      </div>
    </div>
  )
}

function HashDemo() {
  return (
    <HashRouter>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <NavLink to="/" className="rounded-lg bg-white/5 px-4 py-2 text-sm hover:bg-violet-500/20">
            Home
          </NavLink>
          <NavLink to="/about" className="rounded-lg bg-white/5 px-4 py-2 text-sm hover:bg-violet-500/20">
            About
          </NavLink>
        </div>
        <Routes>
          <Route path="/" element={<DemoPage title="HashRouter Home" description="This page is displayed using hash-based routing." />} />
          <Route path="/about" element={<DemoPage title="About HashRouter" description="Notice the # in your browser URL when you navigate." />} />
        </Routes>
        <p className="text-xs text-slate-500">
          Check the browser address bar for #/about when you select About.
        </p>
      </div>
    </HashRouter>
  )
}

function MemoryDemo() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-4">
        <p className="font-semibold text-sky-300">MemoryRouter concept</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          This router keeps its navigation history in memory. The browser address bar does not change.
        </p>
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="mt-4 rounded-xl bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-sky-400"
        >
          {showDemo ? 'Hide demonstration' : 'Show demonstration'}
        </button>
      </div>

      {showDemo && (
        <MemoryRouter>
          <div className="space-y-3">
            <div className="flex gap-2">
              <NavLink to="/" className="rounded-lg bg-white/5 px-4 py-2 text-sm">Memory Home</NavLink>
              <NavLink to="/about" className="rounded-lg bg-white/5 px-4 py-2 text-sm">Memory About</NavLink>
            </div>
            <Routes>
              <Route path="/" element={<DemoPage title="Memory Home" description="You are viewing the home route stored in memory." />} />
              <Route path="/about" element={<DemoPage title="Memory About" description="Navigation works without changing the browser URL." />} />
            </Routes>
          </div>
        </MemoryRouter>
      )}
    </div>
  )
}

function StaticDemo() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
        <p className="font-semibold text-emerald-300">StaticRouter concept</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          StaticRouter is designed for server-side rendering. It receives a location from the server and does not perform browser-based navigation.
        </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
        <p className="text-xs uppercase tracking-widest text-slate-500">Server-rendering example</p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-emerald-300">{`<StaticRouter location="/about">
  <App />
</StaticRouter>`}</pre>
        <p className="mt-3 text-sm text-slate-400">
          The server supplies the location. StaticRouter is not intended as a normal client-side navigation router.
        </p>
      </div>
    </div>
  )
}

function App() {
  const [active, setActive] = useState('HashRouter')
  const [showStaticCode, setShowStaticCode] = useState(false)

  const selected = concepts.find((item) => item.name === active)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500 text-xl font-black">R</div>
            <div>
              <p className="text-lg font-black">Route<span className="text-violet-400">Lab</span></p>
              <p className="text-xs text-slate-500">React Router Explorer</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-300">
            PRACTICAL 13 · ROUTER TYPES
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">Learn by exploring</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Three routers.<br />
            <span className="text-violet-400">Three use cases.</span>
          </h1>
          <p className="mt-4 leading-7 text-slate-400">
            Explore how HashRouter, MemoryRouter, and StaticRouter manage route locations in React applications.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {concepts.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${
                active === item.name
                  ? 'border-violet-400/60 bg-violet-500/10'
                  : 'border-white/10 bg-slate-900 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-xl font-black text-violet-300">
                  {item.symbol}
                </span>
                <span className="text-xs text-slate-500">{active === item.name ? 'SELECTED ✓' : 'EXPLORE →'}</span>
              </div>
              <h2 className="mt-5 text-xl font-bold">{item.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
              <p className="mt-4 break-all rounded-lg bg-slate-950 p-3 font-mono text-xs text-violet-300">{item.example}</p>
            </button>
          ))}
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Selected router</p>
            <h2 className="mt-3 text-2xl font-black">{selected.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{selected.use}</p>
            <div className="mt-6 rounded-xl border border-white/5 bg-slate-950 p-4">
              <p className="text-xs text-slate-500">Key idea</p>
              <p className="mt-2 text-sm leading-6">{selected.description}</p>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              Note: each router has a different purpose. Choose the router that matches your application.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Interactive playground</p>
                <h2 className="mt-2 text-xl font-bold">{active} demo</h2>
              </div>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">React Router</span>
            </div>

            {active === 'HashRouter' && <HashDemo />}
            {active === 'MemoryRouter' && <MemoryDemo />}
            {active === 'StaticRouter' && <StaticDemo />}

            {active === 'StaticRouter' && (
              <div className="mt-4">
                <button onClick={() => setShowStaticCode(!showStaticCode)} className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5">
                  {showStaticCode ? 'Hide notes' : 'Show implementation note'}
                </button>
                {showStaticCode && (
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    In current React Router versions, StaticRouter is exported by react-router-dom for server-rendering scenarios. It is demonstrated as a concept here, not mounted as a browser navigation app.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 py-6 text-center text-xs text-slate-600">
          RouteLab · BCA React Practical 13 · Built with React and Tailwind CSS
        </footer>
      </main>
    </div>
  )
}

export default App
