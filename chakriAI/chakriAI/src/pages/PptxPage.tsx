import PageHeader from '../components/PageHeader'

const templates = ['Corporate Pitch', 'Academic Defense', 'Portfolio Showcase']

function PptxPage() {
  return (
    <div className="page-stack">
      <PageHeader
        label="Slides AI"
        title="Automated PPTX Presentation Builder"
        description="Turn a topic or document into a polished slide deck with clear narrative flow."
      />

      <section className="card-surface page-card">
        <h3>Generation Flow</h3>
        <ol className="list-clean list-numbered">
          <li>Input your topic, audience, and presentation duration.</li>
          <li>AI creates storyline, slide structure, and key bullets.</li>
          <li>Export a ready-to-present `.pptx` file instantly.</li>
        </ol>
      </section>

      <section className="card-surface page-card">
        <h3>Style Templates</h3>
        <div className="chip-wrap">
          {templates.map((template) => (
            <span key={template} className="chip">
              {template}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PptxPage
