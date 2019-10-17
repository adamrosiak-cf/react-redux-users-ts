import { ActionTypes, ChangeTabAction } from "../actions";

export const tabReducer = (
  state: string = "usersList",
  action: ChangeTabAction
) => {
  switch (action.type) {
    case ActionTypes.changeTab:
      return action.payload;
    default:
      return state;
  }
};
