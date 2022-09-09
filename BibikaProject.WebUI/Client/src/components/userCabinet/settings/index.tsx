import { Button, Collapse, Form, Input } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { IRequestError } from "../../adminPanel/types";
import { loginUser, logoutUser } from "../../authorization/login/actions";
import { ILoginModel } from "../../authorization/types";
import {
  IConfirmOldPasswordModel,
  IUpdateContactModel,
  IUpdateEmailModel,
} from "../types";
import {
  confirmOldPassword,
  saveContact,
  saveEmail,
  sendPasswordRequest,
} from "./service";

const { Panel } = Collapse;

const SettingsProfile = () => {
  const { user } = useTypedSelector((redux) => redux.login);

  const [updateContactModel, setUpdateContactModel] =
    useState<IUpdateContactModel>({
      name: "",
    });
  const [confirmStateOldPasswordModel, setConfirmStateOldPasswordModel] =
    useState<ILoginModel>({
      password: "",
      email: user?.email as string,
    });
  const [updateEmailModel, setUpdateEmailModel] = useState<IUpdateEmailModel>({
    newEmail: "",
    password: "",
  });
  const [disableInputEmailPassword, setDisabledInputEmailPassword] =
    useState<boolean>(true);
  const [disableSaveButtonContact, setDisableSaveButtonContact] =
    useState<boolean>(true);
  const [disableSaveButtonPassword, setDisableSaveButtonPassword] =
    useState<boolean>(true);
  const [disableSaveButtonEmail, setDisableSaveButtonEmail] =
    useState<boolean>(true);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setDisableSaveButtonContact(true);
    } else {
      setDisableSaveButtonContact(false);
      setUpdateContactModel({ ...updateContactModel, name: e.target.value });
    }
  };
  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 2) {
      setDisableSaveButtonPassword(false);
      setConfirmStateOldPasswordModel({
        ...confirmStateOldPasswordModel,
        password: e.target.value,
      });
    } else {
      setDisableSaveButtonPassword(true);
    }
  };
  const handleNewEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == "") {
      setDisabledInputEmailPassword(true);
    } else {
      setDisabledInputEmailPassword(false);
      setUpdateEmailModel({ ...updateEmailModel, newEmail: e.target.value });
    }
  };
  const handleEmailPassswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value == "") {
      setDisableSaveButtonEmail(true);
    } else {
      setDisableSaveButtonEmail(false);
      setUpdateEmailModel({ ...updateEmailModel, password: e.target.value });
    }
  };

  const handleSaveContact = () => {
    saveContact(updateContactModel);
  };

  const handleConfirmOldPassword = async () => {
    try {
      await confirmOldPassword(confirmStateOldPasswordModel);
      await sendPasswordRequest(user?.email as string);
      toast.success("Please check your mail to confirm password change");
    } catch (_error) {
      const error: IRequestError = _error as IRequestError;
      error.errors.forEach((e) => {
        toast.error(e);
      });
    }
    // const checkPassword: ILoginModel
    // loginUser();
  };

  const handleSaveEmail = () => {
    saveEmail(updateEmailModel);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="settings-container">
      <h1 className="settings-text">Settings</h1>
      <div className="settings-dropdown">
        <Collapse
          expandIconPosition={"end"}
          className="settings-menu"
          bordered={false}
        >
          <Panel
            header="Contact"
            key="1"
            className="settings-submenu-container"
          >
            <div className="settings-input-container">
              Name
              <Input
                onChange={handleContactChange}
                className="settings-input"
              />
            </div>
            {/* <div className="settings-input-container">
                                Locality
                                <Input className="settings-input" />
                            </div> */}
            <div className="settings-button-container">
              <Button
                className="settings-button"
                onClick={handleSaveContact}
                disabled={disableSaveButtonContact}
              >
                Save
              </Button>
            </div>
          </Panel>
        </Collapse>
      </div>
      <div className="settings-dropdown">
        <Collapse
          expandIconPosition={"end"}
          className="settings-menu"
          bordered={false}
        >
          <Panel
            header="Password"
            key="1"
            className="settings-submenu-container"
          >
            <div className="settings-input-container">
              Old password
              <Input.Password
                className="settings-input"
                onChange={handleOldPasswordChange}
              />
            </div>
            <div className="settings-button-container">
              {/* <Link
                to="/user-profile/settings/change-password"
                className="settings-button-changePassword"
              > */}
              <Button
                className="settings-button"
                onClick={handleConfirmOldPassword}
                disabled={disableSaveButtonPassword}
              >
                Confirm
              </Button>
              {/* </Link> */}
            </div>
          </Panel>
        </Collapse>
      </div>
      <div className="settings-dropdown">
        <Collapse
          expandIconPosition={"end"}
          className="settings-menu"
          bordered={false}
        >
          <Panel
            header="Email address"
            key="1"
            className="settings-submenu-container"
          >
            <div className="settings-input-container">
              New email address
              <Input
                className="settings-input"
                type="email"
                onChange={handleNewEmailChange}
              />
            </div>
            <div className="settings-input-container">
              Password
              <Input
                className="settings-input"
                onChange={handleEmailPassswordChange}
                disabled={disableInputEmailPassword}
              />
            </div>
            <div className="settings-button-container">
              <Button
                className="settings-button"
                onClick={handleSaveEmail}
                disabled={disableSaveButtonEmail}
              >
                Save
              </Button>
            </div>
          </Panel>
        </Collapse>
      </div>
      <div className="delete-button">
        <Link to="#" className="link-button">
          Delete profile
        </Link>
      </div>
      <div className="logout-button">
        <Link to="/" className="link-button" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default SettingsProfile;
