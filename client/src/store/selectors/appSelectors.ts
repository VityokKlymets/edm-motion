import { createSelector, Selector } from "reselect"
import { IState } from "store"
import { IAppState } from "store/reducers/appReducer"

const appSelector = (state) => state.app

export const getAppState: Selector<IState, IAppState> = createSelector(appSelector, (app) => app)
