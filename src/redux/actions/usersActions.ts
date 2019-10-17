import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import api from "../../api/api";

export interface User {
  id: number;
  name: string;
  username: string;
  address: {
    city: string;
  };
  email: string;
}

export interface GetUsersAction {
  type: ActionTypes.getUsers;
  payload: User[];
}

export interface DeleteUserAction {
  type: ActionTypes.deleteUser;
  payload: number;
}

export interface AddUserAction {
  type: ActionTypes.addUser;
  payload: User;
}

export interface EditUserAction {
  type: ActionTypes.editUser;
  payload: {
    id: number;
    name: string;
    email: string;
  };
}

export interface SortAction {
  type:
    | ActionTypes.sortIdAsc
    | ActionTypes.sortIdDesc
    | ActionTypes.sortUsernameAsc
    | ActionTypes.sortUsernameDesc;
}

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.get("/users");
      dispatch<GetUsersAction>({
        type: ActionTypes.getUsers,
        payload: response.data
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUser = (
  state: User[],
  name: string,
  email: string,
  callback?: Function
) => {
  const newUser = {
    id:
      state.length === 0
        ? 0
        : state.reduce(
            (max, item) => (item.id > max ? item.id : max),
            state[0].id
          ) + 1,
    name,
    email,
    address: { city: "Warsaw" },
    username: name.toLowerCase().replace(/ /g, "")
  };
  return async (dispatch: Dispatch) => {
    try {
      await api.post("/users", { ...newUser });
      dispatch<AddUserAction>({ type: ActionTypes.addUser, payload: newUser });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (id: User["id"], callback?: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      await api.delete(`/users/${id}`);
      dispatch<DeleteUserAction>({
        type: ActionTypes.deleteUser,
        payload: id
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const editUser = (
  id: number,
  name: string,
  email: string,
  callback?: Function
) => {
  return async (dispatch: Dispatch) => {
    try {
      await api.patch(`/users/${id}`, { name, email });

      dispatch<EditUserAction>({
        type: ActionTypes.editUser,
        payload: { id, name, email }
      });
      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const sortIdAsc = () => {
  return (dispatch: Dispatch) => {
    dispatch<SortAction>({ type: ActionTypes.sortIdAsc });
  };
};

export const sortIdDesc = () => {
  return (dispatch: Dispatch) => {
    dispatch<SortAction>({ type: ActionTypes.sortIdDesc });
    console.log("DESC");
  };
};

export const sortUsernameAsc = () => {
  return (dispatch: Dispatch) => {
    dispatch<SortAction>({ type: ActionTypes.sortUsernameAsc });
  };
};

export const sortUsernameDesc = () => {
  return (dispatch: Dispatch) => {
    dispatch<SortAction>({ type: ActionTypes.sortUsernameDesc });
  };
};
