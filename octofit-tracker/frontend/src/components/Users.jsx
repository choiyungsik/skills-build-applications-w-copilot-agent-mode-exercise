import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'name', label: 'Athlete' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age' },
  { key: 'fitnessGoal', label: 'Fitness goal' },
]

export default function Users() {
  return (
    <CollectionPage
      columns={columns}
      description="Athlete profiles and personal goals."
      endpoint={endpoint}
      title="Users"
    />
  )
}