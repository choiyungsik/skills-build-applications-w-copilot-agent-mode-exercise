import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Athlete' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age' },
  { key: 'fitnessGoal', label: 'Fitness goal' },
]

export default function Users() {
  return (
    <CollectionPage
      collection="users"
      columns={columns}
      description="Athlete profiles and personal goals."
      title="Users"
    />
  )
}