import PageHeader from '../components/PageHeader'

const outputs = ['ATS-Optimized CV', 'Designer CV', 'One-Page Internship CV']

function CvPage() {
  return (
    <div className="page-stack">
      <PageHeader
        label="CV Generator"
        title="Build a Professional CV in Minutes"
        description="Generate role-focused CV versions from your profile, projects, and achievements."
      />

      <section className="card-surface page-card">
        <h3>How It Works</h3>
        <ol className="list-clean list-numbered">
          <li>Sync your education, projects, and skill data.</li>
          <li>Select target job role and experience level.</li>
          <li>Generate and download ATS-friendly CV versions.</li>
        </ol>
      </section>

      <section className="card-surface page-card">
        <h3>Available Outputs</h3>
        <div className="chip-wrap">
          {outputs.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CvPage
