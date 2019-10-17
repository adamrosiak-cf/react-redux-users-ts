import React from "react";
import "./App.scss";
import { List } from "./components/List";
import { AddEditUser } from "./components/AddEditUser";
import { connect } from "react-redux";
import {
  User,
  getUsers,
  deleteUser,
  editUser,
  addUser,
  changeTab
} from "./redux/actions";
import { StoreState } from "./redux/reducers";

interface AppProps {
  users: User[];
  tabName: string;
  getUsers: Function;
  deleteUser: Function;
  addUser: Function;
  editUser: Function;
  changeTab: Function;
}

interface AppState {
  userToBeEdited: {
    id: number;
    name: string;
    email: string;
  };
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      userToBeEdited: {
        id: 0,
        name: "",
        email: ""
      }
    };
  }

  setUserToBeEdited = (id: number, name: string, email: string): void => {
    this.setState({ userToBeEdited: { id, name, email } });
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div className="container">
        <header className="row my-5">
          <div className="col">
            <h2 className="text-left">Dashboard</h2>
          </div>
        </header>
        {this.props.tabName === "usersList" ? (
          <List setUserToBeEdited={this.setUserToBeEdited} />
        ) : (
          <AddEditUser userToBeEdited={this.state.userToBeEdited} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return { users: state.users, tabName: state.tabName };
};

export const App = connect(
  mapStateToProps,
  { getUsers, deleteUser, editUser, addUser, changeTab }
)(_App);
