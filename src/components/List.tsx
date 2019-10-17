import React, { Component } from "react";
import { Modal } from "./Modal";
import { FaLongArrowAltDown } from "react-icons/fa";
import { connect } from "react-redux";
import {
  User,
  deleteUser,
  changeTab,
  sortIdAsc,
  sortIdDesc,
  sortUsernameAsc,
  sortUsernameDesc
} from "../redux/actions";
import { StoreState } from "../redux/reducers";

interface ListProps {
  users: User[];
  changeTab: Function;
  deleteUser: Function;
  sortIdAsc: Function;
  sortIdDesc: Function;
  sortUsernameAsc: Function;
  sortUsernameDesc: Function;
  setUserToBeEdited: (id: number, name: string, email: string) => void;
}

class _List extends Component<ListProps> {
  state = {
    showModal: false,
    userIdToBeDeleted: 0,
    userEmailToBeDeleted: "",
    idSort: false,
    usernameSort: false
  };

  showModal = (id: number, email: string): void => {
    this.setState({
      showModal: true,
      userIdToBeDeleted: id,
      userEmailToBeDeleted: email
    });
  };

  hideModal = (): void => {
    this.setState({ showModal: false });
  };

  editUser = (id: number, name: string, email: string): void => {
    this.props.setUserToBeEdited(id, name, email);
    this.props.changeTab("editUser");
  };

  handleIdSort = () => {
    if (this.state.idSort) {
      this.props.sortIdAsc();
      this.setState({ idSort: false, usernameSort: false });
    } else {
      this.props.sortIdDesc();
      this.setState({ idSort: true, usernameSort: false });
    }
  };

  handleUsernameSort = () => {
    if (this.state.usernameSort) {
      this.props.sortUsernameAsc();
      this.setState({ usernameSort: false, idSort: false });
    } else {
      this.props.sortUsernameDesc();
      this.setState({ usernameSort: true, idSort: false });
    }
  };

  renderList = (): JSX.Element[] => {
    return this.props.users.map((user: User) => {
      return (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.address.city}</td>
          <th scope="col">
            <button
              type="button"
              className="btn btn-warning btn-width"
              onClick={() => this.editUser(user.id, user.name, user.email)}
            >
              edit
            </button>
          </th>
          <th scope="col">
            <button
              type="button"
              className="btn btn-danger btn-width"
              onClick={() => this.showModal(user.id, user.email)}
            >
              delete
            </button>
          </th>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="row border rounded">
        <div className="col">
          <div className="row justify-content-between p-3 border-bottom ">
            <h4>User list</h4>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.props.changeTab("addUser")}
            >
              Add new
            </button>
          </div>
          <div className="row mt-3">
            <div className="col table-responsive">
              <table className="table border rounded">
                <thead className="bg-light">
                  <tr>
                    <th
                      className="pointer"
                      scope="col"
                      onClick={() => this.handleIdSort()}
                    >
                      id
                      <FaLongArrowAltDown
                        className={`sort ${this.state.idSort ? "sortUp" : ""}`}
                      />
                    </th>
                    <th scope="col">Name</th>
                    <th
                      className="pointer"
                      scope="col"
                      onClick={() => this.handleUsernameSort()}
                    >
                      Username
                      <FaLongArrowAltDown
                        className={`sort ${
                          this.state.usernameSort ? "sortUp" : ""
                        }`}
                      />
                    </th>
                    <th scope="col">Email</th>
                    <th scope="col">City</th>
                    <th scope="col text-center">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.users.length === 0 ? (
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">
                        <p className="gone">All users are gone!</p>
                      </th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  ) : (
                    this.renderList()
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal
          showModal={this.state.showModal}
          handleClose={this.hideModal}
          deleteUser={this.props.deleteUser}
          id={this.state.userIdToBeDeleted}
          userEmail={this.state.userEmailToBeDeleted}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  return { users: state.users, tabName: state.tabName };
};

export const List = connect(
  mapStateToProps,
  {
    deleteUser,
    changeTab,
    sortIdAsc,
    sortIdDesc,
    sortUsernameAsc,
    sortUsernameDesc
  }
)(_List);
