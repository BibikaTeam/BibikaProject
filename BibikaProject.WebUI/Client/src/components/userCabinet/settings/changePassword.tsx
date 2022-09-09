import { Button, Input } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IRequestError } from "../../adminPanel/types";
import { logoutUser } from "../../authorization/login/actions";
import { INewPasswordModel } from "../types";
import { savePassword } from "./service";

const ChangePasswordPage = () => {
  const { user } = useTypedSelector((redux) => redux.login);
  const { token } = useParams<string>();

  const [disableConfirmPassword, setDisableConfirmPassword] =
    useState<boolean>(true);
  const [disableSaveButtonPassword, setDisableSaveButtonPassword] =
    useState<boolean>(true);

  const [newPasswordModel, setNewPasswordModel] = useState<INewPasswordModel>({
    email: user?.email as string,
    token: token as string,
    newPassword: "",
  });

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 6) {
      setNewPasswordModel({ ...newPasswordModel, newPassword: e.target.value });
      setDisableConfirmPassword(false);
    } else if (e.target.value.length < 6) {
      e.target.placeholder = "The password can be at least 6 characters long";
      setDisableConfirmPassword(true);
    }
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value == newPasswordModel.newPassword) {
      setDisableSaveButtonPassword(false);
    } else {
      setDisableSaveButtonPassword(true);
    }
  };

  const handleSavePassword = () => {
    try {
      savePassword(newPasswordModel);
      logoutUser();
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
  };

  return (
    <div className="settings-changePassword-container">
      <h1 className="settings-text">Password change</h1>
      <div className="settings-changePassword-input-container">
        New password
        <Input.Password
          className="settings-input"
          onChange={handleNewPasswordChange}
          placeholder={"The password can be at least 6 characters long"}
        />
      </div>
      <div className="settings-input-container">
        Confirm password
        <Input.Password
          className="settings-input"
          onChange={handleConfirmPasswordChange}
          disabled={disableConfirmPassword}
        />
      </div>
      <div className="settings-changePassword-button-container">
        <Link to="/login">
          <Button
            className="settings-changePassword-button"
            onClick={handleSavePassword}
            disabled={disableSaveButtonPassword}
          >
            Save
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
