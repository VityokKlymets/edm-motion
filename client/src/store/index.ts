import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { MakeStore, createWrapper, Context } from "next-redux-wrapper"
import rootReducer from "store/reducers"
import { IPlayerState } from "store/reducers/playerReducer"
import { IMessageState } from "store/reducers/messageReducer"
import { IUserState } from "store/reducers/userReducer"
import { INewsState } from "store/reducers/newsReducer"
import { IAppState } from "store/reducers/appReducer"

export interface IState {
  player: IPlayerState
  news: INewsState
  message: IMessageState
  user: IUserState
  app: IAppState
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))
// create a makeStore function
const makeStore: MakeStore<IState> = (context: Context) => store

// export an assembled wrapper
export const wrapper = createWrapper<IState>(makeStore, {
  debug: process.env.NODE_ENV === "development",
})

export default store
