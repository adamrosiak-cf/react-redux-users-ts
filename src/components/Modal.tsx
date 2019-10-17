import React from "react";
interface ModalPros {
  showModal: boolean;
  handleClose: Function;
  deleteUser: Function;
  id: number;
  userEmail: string;
}

export const Modal: React.FC<ModalPros> = ({
  id,
  showModal,
  handleClose,
  deleteUser,
  userEmail
}) => {
  const showHideclassName = showModal
    ? "modal display-flex"
    : "modal display-none";

  return (
    <div className={showHideclassName} id="exampleModal" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleClose()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete user with email: {userEmail}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger btn-width"
              onClick={() => deleteUser(id, () => handleClose())}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
