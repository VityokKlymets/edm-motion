import React, { useState, SyntheticEvent, useEffect, useContext } from "react"
import {
  Table,
  Segment,
  Pagination,
  Button,
  Icon,
  Confirm,
  Modal,
  Message,
  Checkbox,
} from "semantic-ui-react"
import EntityPanelContext from "components/admin/context/EntityPanelContext"
import { FieldTypes } from "typings"
import { createEntityFormData } from "components/admin/forms/EntityForm"
import EntityUpdateForm from "components/admin/forms/EntityUpdateForm"
import { cloneDeep, clone } from "lodash"

interface IProps {
  totalCount?: number
  itemsPerPage?: number
  entityType: Entities
  onDelete: (entity: IEntity) => void
  onListEntity: (page: number) => void
  onUpdate: (data: FormData) => Promise<any>
  viewOnly?: boolean
}

const passDataToFields = (fieldsData: Field[], data: IEntity) => {
  const fields = cloneDeep(fieldsData)
  fields.forEach((field) => {
    field.value = clone(data[field.name])
  })
  fields.push({
    name: "id",
    type: FieldTypes.number,
    value: data.id,
    options: {
      listOnly: true,
    },
  })
  return fields
}

const EntityList = (props: IProps) => {
  const {
    itemsPerPage = 10,
    totalCount,
    entityType,
    onDelete,
    onUpdate,
    onListEntity,
    viewOnly,
  } = props
  const {
    entities,
    entityFields,
    selectedEntity,
    selectEntity,
    setUpdateFormFields,
    entityUpdateFormFields,
  } = useContext(EntityPanelContext)

  const [page, setPage] = useState(1)
  const [deleteModal, setDeteleModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  useEffect(() => {
    onListEntity(page)
  }, [page])

  const onPageChange = (event: SyntheticEvent, uiData: any) => {
    const { activePage } = uiData
    setPage(activePage)
  }

  const onDeleteModal = (item: IEntity) => {
    selectEntity(item)
    setDeteleModal(true)
  }

  const onDeleteConfirm = async () => {
    onDelete(selectedEntity)
    setDeteleModal(false)
  }

  const onDeleteCancel = () => {
    setDeteleModal(false)
  }

  const onEdit = (entity: IEntity) => {
    selectEntity(entity)
    setUpdateFormFields(passDataToFields(entityUpdateFormFields, entity))
    setEditModal(true)
  }

  const onEditClose = () => {
    setEditModal(false)
  }

  const onCheckboxChange = (entityData: any, fieldName: string, checked: boolean) => {
    const fields = passDataToFields(entityFields, { ...entityData, [fieldName]: checked })
    const formData = createEntityFormData(fields, entityType)
    onUpdate(formData)
  }

  const renderEntities = (data: IEntity[]) => data.map((e) => <div key={e.id}>{e.string}</div>)

  const renderEntity = (e?: IEntity) => e && <div key={e.id}>{e.string}</div>

  const renderText = (entityItem: IEntity, field: Field) => {
    let text: string = entityItem[field.name]

    const { maxTextSize } = field.options
    if (maxTextSize) {
      if (text.length > maxTextSize) {
        text = text.slice(0, maxTextSize - 3).concat("...")
      }
    }
    return <div key={field.name}>{text}</div>
  }

  const renderDate = (timestamp: number) => {
    const d = new Date(timestamp)
    const str = d.toLocaleDateString()
    return <div>{str}</div>
  }

  const renderCheckbox = (entityItem: IEntity, field: Field) => (
    <Checkbox
      onChange={(e, { checked }) => onCheckboxChange(entityItem, field.name, checked)}
      checked={entityItem[field.name]}
    />
  )

  const renderCell = (entityItem, field: Field) => {
    const { editOnly, maxWidth = null, minWidth = null } = field.options
    if (!editOnly) {
      return (
        <Table.Cell
          style={{
            maxWidth: maxWidth ? `${maxWidth}px` : "none",
            minWidth: minWidth ? `${minWidth}px` : "none",
          }}
          textAlign="center"
          key={field.name}
        >
          {field.type === FieldTypes.entities
            ? renderEntities(entityItem[field.name])
            : field.type === FieldTypes.entity
            ? renderEntity(entityItem[field.name])
            : field.type === FieldTypes.date
            ? renderDate(entityItem[field.name])
            : field.type === FieldTypes.boolean
            ? renderCheckbox(entityItem, field)
            : renderText(entityItem, field)}
        </Table.Cell>
      )
    }
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return entities.length > 0 ? (
    <>
      <Table basic="very" celled>
        <Table.Header>
          <Table.Row>
            {entityFields.map(
              (field) =>
                !field.options.editOnly && (
                  <Table.HeaderCell key={field.name}>{field.label || field.name}</Table.HeaderCell>
                )
            )}
            <Table.HeaderCell colSpan={viewOnly ? 1 : 2}>actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {entities.map((entityItem) => (
            <Table.Row key={entityItem.id}>
              {entityFields.map((field) => renderCell(entityItem, field))}

              <Table.Cell collapsing textAlign="center">
                <Button onClick={() => onDeleteModal(entityItem)} negative circular icon>
                  <Icon name="trash" />
                </Button>
              </Table.Cell>

              {!viewOnly && (
                <Table.Cell collapsing textAlign="center">
                  <Button onClick={() => onEdit(entityItem)} positive circular icon>
                    <Icon name="edit" />
                  </Button>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
        {totalCount > itemsPerPage && (
          <Table.Footer>
            <Table.Row>
              <Table.Cell textAlign="center" colSpan={entityFields.length}>
                <Pagination
                  defaultActivePage={1}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  color="green"
                  onPageChange={onPageChange}
                  totalPages={totalPages}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
      {selectedEntity && (
        <Modal
          open={editModal}
          onClose={onEditClose}
          transition={{ animation: "browse right", duration: 500 }}
        >
          <Segment>
            <EntityUpdateForm onSubmit={onUpdate} />
          </Segment>
        </Modal>
      )}
      <Confirm onCancel={onDeleteCancel} onConfirm={onDeleteConfirm} open={deleteModal} />
    </>
  ) : (
    <Message info>
      <Message.Header>Empty table</Message.Header>
      <p>There is no data for {entityType} entity</p>
    </Message>
  )
}

export default EntityList
