import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { tabReducer } from "./tabReducer";
import { User } from "../actions";

export interface StoreState {
  users: User[];
  tabName: string;
}
export const reducers = combineReducers<StoreState>({
  users: usersReducer,
  tabName: tabReducer
});
