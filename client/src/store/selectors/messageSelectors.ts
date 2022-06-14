import { createSelector } from "reselect";

const messageSelector = state => state.message;
export const getMessageState = createSelector(messageSelector, message => message);
