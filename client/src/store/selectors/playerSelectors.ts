import { createSelector, Selector } from "reselect"
import { IState } from "store"
import { IPlayerState } from "store/reducers/playerReducer"

const playerSelector = (state) => state.player

export const getPlayerState: Selector<IState, IPlayerState> = createSelector(
  playerSelector,
  (player) => player
)

export const getPlayerPlaylist = createSelector(getPlayerState, (player) => player.playlist)
