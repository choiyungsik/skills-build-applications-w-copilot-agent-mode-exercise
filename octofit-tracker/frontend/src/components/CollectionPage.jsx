import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value, format) {
  if (value === null || value === undefined || value === '') return 'Not available'
  if (format === 'date') {
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
  }
  if (Array.isArray(value)) return value.length ? value.join(', ') : 'None'
  if (typeof value === 'object') {
    return value.name ?? value.title ?? value.email ?? value._id ?? 'Details available'
  }
  return String(value)
}

export default function CollectionPage({ title, description, collection, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(collection, controller.signal)
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load this collection.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [collection, reloadKey])

  function refresh() {
    setLoading(true)
    setError('')
    setReloadKey((key) => key + 1)
  }

  return (
    <section className="collection-view" aria-labelledby="collection-title">
      <div className="collection-heading">
        <div>
          <p className="collection-kicker">Octofit Tracker / Data</p>
          <h1 className="h2 mb-2" id="collection-title">{title}</h1>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        <button
          className="btn btn-outline-success"
          disabled={loading}
          onClick={refresh}
          type="button"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          <span>{error}</span>
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={refresh}
            type="button"
          >
            Try again
          </button>
        </div>
      )}

      <div className="collection-table table-responsive mt-4">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="text-secondary py-4" colSpan={columns.length}>Loading {title.toLowerCase()}...</td></tr>
            ) : records.length ? records.map((record, index) => (
              <tr key={record._id ?? record.id ?? `${collection}-${index}`}>
                {columns.map((column) => (
                  <td key={column.key}>{displayValue(record[column.key], column.format)}</td>
                ))}
              </tr>
            )) : (
              <tr><td className="text-secondary py-4" colSpan={columns.length}>No {title.toLowerCase()} found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {!loading && !error && (
        <p className="small text-secondary mt-3 mb-0" aria-live="polite">
          {records.length} {records.length === 1 ? 'record' : 'records'}
        </p>
      )}
    </section>
  )
}