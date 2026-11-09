import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return (
    <CollectionPage
      collection="leaderboard"
      columns={columns}
      description="See how athletes and teams are stacking up."
      title="Leaderboard"
    />
  )
}