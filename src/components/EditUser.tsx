import React, { Component } from "react";
import { Form } from "./Form";
import { User } from "../redux/actions";

interface EditUserProps {
  users: User[];
  addUser: Function;
  changeTab: Function;
}

interface EditUserState {
  name: string;
  email: string;
  isValid: boolean;
}

export class EditUser extends Component<EditUserProps, EditUserState> {
  constructor(props: EditUserProps) {
    super(props);

    this.state = {
      name: "",
      email: "",
      isValid: true
    };
  }

  submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) {
      this.setIsValid(false);
    } else {
      this.setIsValid(true);
      this.props.addUser(
        this.props.users,
        this.state.name,
        this.state.email,
        () => this.props.changeTab("usersList")
      );
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
            <h4>Add new user {this.state.name}</h4>
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
