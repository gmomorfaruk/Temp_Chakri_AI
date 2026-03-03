import PageHeader from '../components/PageHeader'

function PortfolioPage() {
  return (
    <div className="page-stack">
      <PageHeader
        label="Portfolio"
        title="Your Verified Career Profile"
        description="Store and showcase achievements, certificates, projects, and core skills in one place."
      />

      <section className="card-surface page-card">
        <h3>Portfolio Sections</h3>
        <div className="tile-grid">
          <article className="mini-card">
            <strong>Achievements</strong>
            <p>Competitions, hackathons, and milestones with dates.</p>
          </article>
          <article className="mini-card">
            <strong>Skills</strong>
            <p>Technical and soft skills tagged by proficiency.</p>
          </article>
          <article className="mini-card">
            <strong>Certificates</strong>
            <p>Cloud-backed storage for all verified documents.</p>
          </article>
        </div>
      </section>

      <section className="card-surface page-card">
        <h3>Share Options</h3>
        <ul className="list-clean">
          <li>Private portfolio view for viva board access</li>
          <li>Public profile link for recruiters and mentors</li>
          <li>One-click export as profile PDF snapshot</li>
        </ul>
      </section>
    </div>
  )
}

export default PortfolioPage
