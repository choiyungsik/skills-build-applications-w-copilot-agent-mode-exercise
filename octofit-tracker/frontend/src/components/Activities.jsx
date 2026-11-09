import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  { key: 'activityType', label: 'Activity' },
  { key: 'date', label: 'Date', format: 'date' },
  { key: 'durationMinutes', label: 'Duration (min)' },
  { key: 'distanceKm', label: 'Distance (km)' },
  { key: 'caloriesBurned', label: 'Calories' },
]

export default function Activities() {
  return (
    <CollectionPage
      columns={columns}
      description="A shared view of the team's recent movement."
      endpoint={endpoint}
      title="Activities"
    />
  )
}