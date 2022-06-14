import { Segment, Icon, Search, List } from "semantic-ui-react"
import { useState } from "react"

interface IProps {
  onChange: (field: ISpecialSearchFieldType) => void
  field: ISpecialSearchFieldType
}

const SpecialSearchField = (props: IProps) => {
  const {
    onChange,
    field,
    field: { search, value: initialValue = null },
  } = props
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ISearchResult[]>([])
  const [selectedItem, setSelectedItem] = useState<ISearchResult>(
    initialValue ? { title: initialValue } : null
  )

  const handleSearchChange = async (e, { value }) => {
    if (value) {
      setLoading(true)

      const result = await search(value)

      setResults(result)

      setLoading(false)
    }
  }

  const handleResultRemove = () => {
    setSelectedItem(null)
    onChange({ ...field, value: null })
  }

  const handleResultSelect = (e, UIData) => {
    const selected: ISearchResult = UIData.result
    setSelectedItem(selected)
    onChange({ ...field, value: selected.title })
  }

  return (
    <Segment>
      <Search
        loading={loading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={results}
      />
      {selectedItem && (
        <List horizontal={true} divided={true}>
          <List.Item onClick={handleResultRemove}>
            <List.Content>
              <List.Header>
                {selectedItem.title} <Icon link={true} color="red" name="remove" />
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      )}
    </Segment>
  )
}

export default SpecialSearchField
