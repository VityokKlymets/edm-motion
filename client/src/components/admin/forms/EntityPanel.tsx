import React, { FC, useState } from "react"
import { Segment, Tab, Container } from "semantic-ui-react"
import { ENTITY_DELETE_BY_ID, ENTITY_LIST, ENTITY_UPDATE } from "config/api"
import { post, postForm } from "utils/api"

import EntityPanelContext from "components/admin/context/EntityPanelContext"
import EntityList from "components/admin/forms/EntityList"
import EntityAddForm from "components/admin/forms/EntityAddForm"

import { cloneDeep, map, filter } from "lodash"

const prepareFields = (fields: Field[]): Field[] => {
  const cloned = cloneDeep(fields)

  cloned.forEach((field) => {
    const defaultValues: IFieldOptions = {
      listOnly: false,
      readOnly: false,
    }
    field.options =
      typeof field.options === "undefined" ? defaultValues : { ...defaultValues, ...field.options }
  })

  return cloned
}

export const changeFieldValue = (fields: Field[], fieldName: string, value: any): Field[] => {
  const newFields = fields.slice()
  const fieldIdx = newFields.findIndex((val) => val.name === fieldName)
  const fieldToChange = newFields[fieldIdx]
  const newField = { ...fieldToChange, value }
  newFields.splice(fieldIdx, 1, newField)
  return newFields
}

interface IProps {
  fields: Field[]
  apiRoutes: IEntityApiRoutes
  entityType: Entities
}

const EntityPanel: FC<IProps> = ({ fields, apiRoutes: passedRoutes, entityType }) => {
  const [selectedEntity, selectEntity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [entities, setEntities] = useState([])
  const [entityFields, setEntityFields] = useState(prepareFields(fields))
  const [entityAddFormFields, setAddFormFields] = useState(prepareFields(fields))
  const [entityUpdateFormFields, setUpdateFormFields] = useState(prepareFields(fields))
  const [totalCount, setTotalCount] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const apiRoutes = {
    deleteEntityURL: ENTITY_DELETE_BY_ID,
    listEntityURL: ENTITY_LIST,
    updateEntityURL: ENTITY_UPDATE,
    ...passedRoutes,
  }

  const { addEntityURL, deleteEntityURL, listEntityURL, updateEntityURL } = apiRoutes

  const updateEntity = async (data: FormData) => {
    const response = await postForm<IEntityUpdateResponse>(updateEntityURL, data)
    const { status, entities: updatedEntities } = response
    if (status === "ok") {
      setEntities(
        map(entities, (entity) => {
          for (const updatedEntity of updatedEntities) {
            if (entity.id === updatedEntity.id) {
              return updatedEntity
            }
          }
          return entity
        })
      )
    }

    return response
  }

  const addEntity = async (data: FormData) => {
    return postForm<IEntityAddResponse>(addEntityURL, data)
  }

  const deleteEntity = async (entity: IEntity) => {
    const { id } = entity

    const data: IEntityDeleteRequest = {
      id,
      target: entityType,
    }

    const response = await post<IEntityDeleteResponse>(deleteEntityURL, data)

    const { status } = response
    if (status === "ok") {
      setEntities(filter(entities, (e) => e.id !== id))
    }
  }

  const listEntity = async (page: number) => {
    setLoading(true)
    const request: IEntityListRequest = {
      target: entityType,
      page,
    }

    const response = await post<IEntityListResponse>(listEntityURL, request)
    const { status, items } = response

    if (status === "ok") {
      setEntities(items)
      setTotalCount(response.totalCount)
    }
    setLoading(false)
  }

  const onTabChange = (e, { activeIndex: index }) => setActiveIndex(index)

  const panes = [
    {
      menuItem: "View",
      render: () => (
        <Tab.Pane
          className="owerflow-x-auto"
          loading={loading}
          as={entities.length === 0 ? Container : Segment}
        >
          <EntityList
            entityType={entityType}
            totalCount={totalCount}
            onListEntity={listEntity}
            onDelete={deleteEntity}
            onUpdate={updateEntity}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Create",
      render: () => (
        <Tab.Pane>
          <EntityAddForm onSubmit={addEntity} />
        </Tab.Pane>
      ),
    },
  ]

  return (
    <EntityPanelContext.Provider
      value={{
        entityFields,
        entityAddFormFields,
        entityUpdateFormFields,
        entities,
        selectedEntity,
        apiRoutes,
        entityType,
        selectEntity,
        setEntities,
        setEntityFields,
        setAddFormFields,
        setUpdateFormFields,
      }}
    >
      <Tab
        activeIndex={activeIndex}
        onTabChange={onTabChange}
        menu={{ fluid: true, vertical: true, tabular: "right" }}
        panes={panes}
      />
    </EntityPanelContext.Provider>
  )
}
export default EntityPanel
