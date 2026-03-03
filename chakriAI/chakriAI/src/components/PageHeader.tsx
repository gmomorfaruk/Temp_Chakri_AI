type PageHeaderProps = {
  label: string
  title: string
  description: string
}

function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <header className="page-header card-surface">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      <p className="page-description">{description}</p>
    </header>
  )
}

export default PageHeader
