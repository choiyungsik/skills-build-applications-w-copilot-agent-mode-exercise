import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'description', label: 'Details' },
  { key: 'category', label: 'Category' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'durationMinutes', label: 'Duration (min)' },
]

export default function Workouts() {
  return (
    <CollectionPage
      columns={columns}
      description="Ideas for your next training session."
      endpoint={endpoint}
      title="Workouts"
    />
  )
}