import { Button, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../authorization/login/actions";
import { IUpdatePasswordModel } from "../types";
import { savePassword } from "./service";

const ChangePasswordPage = () => {

    const [disableConfirmPassword, setDisableConfirmPassword] = useState<boolean>(true);
    const [disableSaveButtonPassword, setDisableSaveButtonPassword] = useState<boolean>(true);

    const [updatePasswordModel, setUpdatePasswordModel] = useState<IUpdatePasswordModel>({
        newPassword: "",
        confirmPassword: ""
    });

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length >= 6) {
            setUpdatePasswordModel({ ...updatePasswordModel, newPassword: e.target.value });
            setDisableConfirmPassword(false)
        }
        else if (e.target.value.length < 6) {
            e.target.placeholder = "The password can be at least 6 characters long"
            setDisableConfirmPassword(true);
        }
    }
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value == updatePasswordModel.newPassword) {
            setDisableSaveButtonPassword(false);
            setUpdatePasswordModel({ ...updatePasswordModel, confirmPassword: e.target.value });
        }
        else {
            setDisableSaveButtonPassword(true);
        }
    }

    const handleSavePassword = () => {
        savePassword(updatePasswordModel);
        logoutUser();
    }

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
                        disabled={disableSaveButtonPassword}>
                        Save</Button>
                </Link>

            </div>
        </div>
    )
}

export default ChangePasswordPage;
