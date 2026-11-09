import CollectionPage from './CollectionPage.jsx'

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
      collection="activities"
      columns={columns}
      description="A shared view of the team's recent movement."
      title="Activities"
    />
  )
}