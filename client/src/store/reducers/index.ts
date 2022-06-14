import { combineReducers } from "redux"
import playerReducer from "store/reducers/playerReducer"
import messageReducer from "store/reducers/messageReducer"
import userReducer from "store/reducers/userReducer"
import newsReducer from "store/reducers/newsReducer"
import appReducer from "store/reducers/appReducer"

export default combineReducers({
  player: playerReducer,
  message: messageReducer,
  user: userReducer,
  news: newsReducer,
  app: appReducer,
})
