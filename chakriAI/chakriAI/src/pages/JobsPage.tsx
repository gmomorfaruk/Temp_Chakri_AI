import PageHeader from '../components/PageHeader'

const matches = [
  { role: 'Frontend Intern', score: '92%', location: 'Dhaka' },
  { role: 'Junior React Developer', score: '88%', location: 'Remote' },
  { role: 'Software Engineer Trainee', score: '84%', location: 'Chittagong' },
]

function JobsPage() {
  return (
    <div className="page-stack">
      <PageHeader
        label="Job Matcher"
        title="Find the Right Opportunity Faster"
        description="Get smart recommendations ranked by skill alignment, role fit, and growth potential."
      />

      <section className="card-surface page-card">
        <h3>Top Matches</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Match Score</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((item) => (
                <tr key={item.role}>
                  <td>{item.role}</td>
                  <td>{item.score}</td>
                  <td>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card-surface page-card">
        <h3>Recommendation Logic</h3>
        <ul className="list-clean">
          <li>Skill overlap between your profile and job requirements</li>
          <li>Experience level compatibility (entry-level/fresh graduate)</li>
          <li>Preferred location and work model (onsite, hybrid, remote)</li>
        </ul>
      </section>
    </div>
  )
}

export default JobsPage
