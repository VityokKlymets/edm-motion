import { Segment, Icon, Search, List } from "semantic-ui-react"
import { useState } from "react"
import { ENTITY_FIND_BY_FIELDS } from "config/api"
import { post } from "utils/api"

interface IProps {
  onChange: (field: IEntityFieldType) => void
  field: IEntityFieldType
}

const EntityField = (props: IProps) => {
  const {
    onChange,
    field,
    field: { searchOption, value: initialValue = null },
  } = props
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<IEntitySearchResult[]>([])
  const [selectedItem, setSelectedItem] = useState<IEntitySearchResult>(
    initialValue ? { ...initialValue, title: initialValue.string } : null
  )

  const handleSearchChange = async (e, { value }) => {
    setQuery(value)
    if (value) {
      setLoading(true)

      const { target, fields, searchByFieldsUrl } = searchOption

      const data: IEntitySearchByFieldsRequest = {
        page: 0,
        query: value,
        target,
        fields,
      }

      const searhUrl = searchByFieldsUrl || ENTITY_FIND_BY_FIELDS
      const response = await post<IEntitySearchResponse>(searhUrl, data)

      const { result } = response
      if (response.status === "ok") {
        setResults(result)
      }

      setLoading(false)
    }
  }

  const handleResultRemove = () => {
    setSelectedItem(null)
    onChange({ ...field, value: null })
  }

  const handleResultSelect = (e, UIData) => {
    const selected: IEntitySearchResult = UIData.result
    setSelectedItem(selected)
    onChange({ ...field, value: selected })
  }

  return (
    <Segment>
      <Search
        loading={loading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        results={results}
        value={query}
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

export default EntityField
