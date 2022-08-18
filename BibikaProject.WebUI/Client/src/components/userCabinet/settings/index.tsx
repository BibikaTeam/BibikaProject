import { Button, Collapse, Form, Input} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../authorization/login/actions";
import { IContact, IEmail, IPassword } from "../types";
import { saveContact, saveEmail, savePassword } from "./service";

const { Panel } = Collapse;

const SettingsProfile = () => {
    const [name, setName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [passwordEmail, setPasswordEmail] = useState("");

    const initialValueContact : IContact = {
        name: ""
    }
    const initialValuePassword : IPassword = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    }
    const initialValueEmail : IEmail = {
        newEmail: "",
        password: ""
    }

    const changeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const changeInputOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    }
    const changeInputNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    }
    const changeInputConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }
    const changeInputNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
    }
    const changeInputEmailPasssword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordEmail(e.target.value);
    }

    const handleSaveContact = () => {
        const values: IContact = {
            name: name
        }
        saveContact(values);
    }

    const handleSavePassword = () => {
        const values: IPassword = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        } 
        savePassword(values);
    }

    const handleSaveEmail = () => {
        const values: IEmail = {
            newEmail: newEmail,
            password: passwordEmail
        }
        saveEmail(values);
    }

    const handleLogout = () => {
        logoutUser();
    }

    return (
        <div className="settings">
            <div className="settings-container">
                <h1 className="settings-text">Settings</h1>
                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Contact" key="1" className="settings-submenu-container">
                            <Form>
                                <Form.Item>
                                    
                                </Form.Item>
                            </Form>
                            <div className="settings-input-container">
                                Name
                                <Input onChange={changeInputName} className="settings-input"/>
                            </div>
                            {/* <div className="settings-input-container">
                                Locality
                                <Input className="settings-input" />
                            </div> */}
                            <div className="settings-button-container">
                                <Button className="settings-button" onClick={handleSaveContact}>Save</Button>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Password" key="1" className="settings-submenu-container">
                            <div className="settings-input-container">
                                Old password
                                <Input.Password className="settings-input" onChange={changeInputOldPassword} />
                            </div>
                            <div className="settings-input-container">
                                New password
                                <Input.Password className="settings-input" onChange={changeInputNewPassword} />
                            </div>
                            <div className="settings-input-container">
                                Confirm password
                                <Input.Password className="settings-input" onChange={changeInputConfirmPassword} />
                            </div>
                            <div className="settings-button-container">
                                <Button className="settings-button" onClick={handleSavePassword}>Save</Button>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Email address" key="1" className="settings-submenu-container">
                            <div className="settings-input-container">
                                New email address
                                <Input className="settings-input" onChange={changeInputNewEmail} />
                            </div>
                            <div className="settings-input-container">
                                Password
                                <Input className="settings-input" onChange={changeInputEmailPasssword} />
                            </div>
                            <div className="settings-button-container">
                                <Button className="settings-button" onClick={handleSaveEmail}>Save</Button>
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
                    </Link></div>
            </div>
        </div>
    )
}

export default SettingsProfile;