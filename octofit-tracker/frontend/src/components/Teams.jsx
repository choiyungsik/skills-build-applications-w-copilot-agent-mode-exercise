import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'description', label: 'About' },
  { key: 'members', label: 'Members' },
]

export default function Teams() {
  return (
    <CollectionPage
      collection="teams"
      columns={columns}
      description="Meet the groups training together."
      title="Teams"
    />
  )
}