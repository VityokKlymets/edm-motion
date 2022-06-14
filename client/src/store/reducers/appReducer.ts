import { AppActions, AppTypes } from "store/types"

export interface IAppState {
  logoLoading: boolean
  smartScroll: boolean
}

const initalState: IAppState = {
  logoLoading: false,
  smartScroll: false,
}

const reducer = (state = initalState, action: AppActions): IAppState => {
  switch (action.type) {
    case AppTypes.SET_LOGO_LOADING:
      return { ...state, logoLoading: action.loading }
    case AppTypes.ENABLE_SMART_SCROLL:
      return { ...state, smartScroll: action.enable }
    default:
      return state
  }
}

export default reducer
