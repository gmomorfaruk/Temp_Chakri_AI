import PageHeader from '../components/PageHeader'

const stats = [
  { label: 'Profile Strength', value: '87%' },
  { label: 'Job Matches', value: '12' },
  { label: 'Coach Sessions', value: '24' },
  { label: 'Slides Created', value: '9' },
]

const tasks = [
  'Complete final year project summary in portfolio',
  'Practice 2 mock viva rounds with AI Coach',
  'Generate targeted CV for frontend internship',
]

function DashboardPage() {
  return (
    <div className="page-stack">
      <PageHeader
        label="Overview"
        title="Career Dashboard"
        description="Track your progress, see priority actions, and keep your career workflow in one place."
      />

      <section className="card-surface page-card">
        <h3>Performance Snapshot</h3>
        <div className="stat-grid">
          {stats.map((item) => (
            <article key={item.label} className="mini-card">
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card-surface page-card">
        <h3>Today&apos;s Priority</h3>
        <ul className="list-clean">
          {tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default DashboardPage
