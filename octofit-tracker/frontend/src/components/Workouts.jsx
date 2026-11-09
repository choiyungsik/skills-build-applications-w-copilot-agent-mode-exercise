import CollectionPage from './CollectionPage.jsx'

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
      collection="workouts"
      columns={columns}
      description="Ideas for your next training session."
      title="Workouts"
    />
  )
}