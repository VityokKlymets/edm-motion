import { SyntheticEvent, useContext, useState, useEffect, FC } from "react"
import { Segment, Icon, Search, List } from "semantic-ui-react"
import EntityPanelContext from "components/admin/context/EntityPanelContext"
import { ENTITY_FIND_BY_FIELDS } from "config/api"
import { post } from "utils/api"
import { uniqBy } from "lodash"

interface IProps {
  onChange: (field: IEntitiesFieldType) => void
  formType: EntityFormType
  field: IEntitiesFieldType
}

const EntitiesField: FC<IProps> = ({
  onChange,
  field,
  field: { searchOption, value: selected, onChangeCallback },
  formType,
}) => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<IEntitySearchResult[]>([])
  const context = useContext(EntityPanelContext)

  useEffect(() => {
    if (onChangeCallback) {
      onChangeCallback(selected, context, formType)
    }
  }, [selected])

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

  const handleResultRemove = (e: SyntheticEvent, item: IEntitySearchResult) => {
    const filtered: IEntitySearchResult[] = selected.filter((value) => value.id !== item.id)
    onChange({ ...field, value: filtered })
  }

  const handleResultSelect = (e, UIData) => {
    const selectedItem: IEntitySearchResult = UIData.result
    let result = [...selected, selectedItem]
    result = uniqBy(result, ({ id }) => id)

    if (!selected.includes(selectedItem)) {
      setQuery("")
      onChange({ ...field, value: result })
    }
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
      <List horizontal={true} divided={true}>
        {selected.map((item) => (
          <List.Item onClick={(e) => handleResultRemove(e, item)} key={item.id}>
            <List.Content>
              <List.Header>
                {item.string || item.title} <Icon link={true} color="red" name="remove" />
              </List.Header>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  )
}

export default EntitiesField
