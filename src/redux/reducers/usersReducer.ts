import { User, Action, ActionTypes } from "../actions";

export const usersReducer = (state: User[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.getUsers:
      return action.payload;
    case ActionTypes.deleteUser:
      return state.filter((user: User) => user.id !== action.payload);
    case ActionTypes.addUser:
      return [...state, action.payload];
    case ActionTypes.editUser:
      return state.map((user: User) =>
        user.id === action.payload.id
          ? { ...user, name: action.payload.name, email: action.payload.email }
          : user
      );
    case ActionTypes.sortIdAsc:
      return state.slice().sort((a, b) => (a.id > b.id ? 1 : -1));
    case ActionTypes.sortIdDesc:
      return state.slice().sort((a, b) => (b.id > a.id ? 1 : -1));
    case ActionTypes.sortUsernameAsc:
      return state.slice().sort((a, b) => (a.username > b.username ? 1 : -1));
    case ActionTypes.sortUsernameDesc:
      return state.slice().sort((a, b) => (b.username > a.username ? 1 : -1));
    default:
      return state;
  }
};
