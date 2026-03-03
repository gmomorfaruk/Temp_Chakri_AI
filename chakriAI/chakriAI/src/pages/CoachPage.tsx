import PageHeader from '../components/PageHeader'

const vivaTopics = ['Data Structures', 'System Design Basics', 'Behavioral Interview', 'Project Defense']

function CoachPage() {
  return (
    <div className="page-stack">
      <PageHeader
        label="AI Coach"
        title="Interview and Viva Practice"
        description="Simulate interviews, get structured feedback, and improve confidence with guided practice."
      />

      <section className="card-surface page-card">
        <h3>Practice Modes</h3>
        <div className="tile-grid">
          <article className="mini-card">
            <strong>Mock Interview</strong>
            <p>Role-specific Q&A with scoring on clarity and confidence.</p>
          </article>
          <article className="mini-card">
            <strong>Viva Partner</strong>
            <p>Topic-based rapid questions to sharpen your subject fundamentals.</p>
          </article>
          <article className="mini-card">
            <strong>Study Buddy</strong>
            <p>Daily learning plan with short quizzes and revision prompts.</p>
          </article>
        </div>
      </section>

      <section className="card-surface page-card">
        <h3>Suggested Viva Topics</h3>
        <ul className="list-clean">
          {vivaTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default CoachPage
