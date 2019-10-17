import {
  GetUsersAction,
  DeleteUserAction,
  AddUserAction,
  EditUserAction,
  SortAction
} from "./usersActions";

export enum ActionTypes {
  getUsers,
  addUser,
  deleteUser,
  editUser,
  changeTab,
  sortIdAsc,
  sortIdDesc,
  sortUsernameAsc,
  sortUsernameDesc
}

export type Action =
  | GetUsersAction
  | DeleteUserAction
  | AddUserAction
  | EditUserAction
  | SortAction;
