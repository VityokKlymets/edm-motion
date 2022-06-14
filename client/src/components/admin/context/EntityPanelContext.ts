import { createContext } from "react"

const initialState: IEntityPanelState = {
  entityFields: [],
  entityAddFormFields: [],
  entityUpdateFormFields: [],
  selectedEntity: null,
  entities: [],
  entityType: null,
  apiRoutes: {
    addEntityURL: "",
    deleteEntityURL: "",
    updateEntityURL: "",
  },
}

const EntityPanelContext = createContext(initialState)

export default EntityPanelContext
