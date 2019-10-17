import React from "react";

interface FormProps {
  name: string;
  email: string;
  isValid: boolean;
  setName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeTab: Function;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<FormProps> = ({
  name,
  email,
  isValid,
  setName,
  setEmail,
  submitHandler,
  changeTab
}) => {
  return (
    <div className="row pt-2">
      <form
        className={`col needs-validation ${isValid ? "" : "was-validated"}`}
        noValidate
        onSubmit={submitHandler}
      >
        <div className="input-group align-items-center">
          <label htmlFor="name" className="my-0 mx-5">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded my-3"
            placeholder="Name"
            id="name"
            value={name}
            onChange={setName}
            required
          />
          <div className="valid-feedback text-center">OK!</div>
          <div className="invalid-feedback text-center">
            {" "}
            Please fill out this field.
          </div>
        </div>
        <div className="input-group align-items-center">
          <label htmlFor="email" className="my-0 mx-5">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded my-3"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            id="email"
            required
          />
          <div className="valid-feedback text-center">OK!</div>
          <div className="invalid-feedback text-center">
            Please fill out this field.
          </div>
        </div>
        <div className="row my-5 ">
          <div className="col d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={() => changeTab("usersList")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
