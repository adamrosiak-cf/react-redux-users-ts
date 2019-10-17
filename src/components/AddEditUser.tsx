import React, { Component } from "react";
import { Form } from "./Form";

import { connect } from "react-redux";
import {
  User,
  getUsers,
  deleteUser,
  editUser,
  addUser,
  changeTab
} from "../redux/actions";
import { StoreState } from "../redux/reducers";
interface AddUserProps {
  users: User[];
  addUser: Function;
  editUser: Function;
  changeTab: Function;
  tabName: string;
  userToBeEdited: {
    id: number;
    name: string;
    email: string;
  };
}

interface AddUserState {
  name: string;
  email: string;
  isValid: boolean;
}

export class _AddEditUser extends Component<AddUserProps, AddUserState> {
  constructor(props: AddUserProps) {
    super(props);

    this.state = {
      name:
        this.props.tabName === "editUser" ? this.props.userToBeEdited.name : "",
      email:
        this.props.tabName === "editUser"
          ? this.props.userToBeEdited.email
          : "",
      isValid: true
    };
  }

  submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      this.setIsValid(false);
    } else {
      this.setIsValid(true);
      if (this.props.tabName === "addUser") {
        this.props.addUser(
          this.props.users,
          this.state.name,
          this.state.email,
          () => this.props.changeTab("usersList")
        );
      } else {
        this.props.editUser(
          this.props.userToBeEdited.id,
          this.state.name,
          this.state.email,
          () => this.props.changeTab("usersList")
        );
      }
    }
  };

  setName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: event.target.value });
  };

  setEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: event.target.value });
  };

  setIsValid = (bool: boolean): void => {
    this.setState({ isValid: bool });
  };

  render() {
    return (
      <div className="row border rounded">
        <div className="col">
          <div className="row  p-3 border-bottom ">
            <h4>
              {this.props.tabName === "addUser" ? "Add new user" : "Edit user"}
            </h4>
          </div>
          <Form
            name={this.state.name}
            email={this.state.email}
            isValid={this.state.isValid}
            setName={this.setName}
            setEmail={this.setEmail}
            submitHandler={this.submitHandler}
            changeTab={this.props.changeTab}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return { users: state.users, tabName: state.tabName };
};

export const AddEditUser = connect(
  mapStateToProps,
  { getUsers, deleteUser, editUser, addUser, changeTab }
)(_AddEditUser);
