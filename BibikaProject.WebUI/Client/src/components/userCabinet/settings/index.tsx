import { Button, Collapse, Input, Form } from "antd";
import { userInfo } from "os";
import { Link } from "react-router-dom";
import { logoutUser } from "../../authorization/login/actions";
import { IContact, IEmail, IPassword } from "../types";
import { saveContact, saveEmail, savePassword } from "./service";

const { Panel } = Collapse;

const SettingsProfile = () => {

    const changeInputName = () => {

    }
    const changeInputOldPassword = () => {

    }
    const changeInputNewPassword = () => {

    }
    const changeInputConfirmPassword = () => {

    }
    const changeInputNewEmail = () => {

    }
    const changeInputEmailPasssword = () => {

    }

    // const handleSaveContac = (value: IContact) => {
    //     saveContact(value);
    // }

    // const handleSavePassword = (value: IPassword) => {
    //     savePassword(value);
    // }

    // const handleSaveEmail = (value: IEmail) => {
    //     saveEmail(value);
    // }

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
                            <div className="settings-input-container">
                                Name
                                <Input onChange={changeInputName} className="settings-input" />
                            </div>
                            {/* <div className="settings-input-container">
                                Locality
                                <Input className="settings-input" />
                            </div> */}
                            <div className="settings-button-container">
                                <Button className="settings-button">Save</Button>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Password" key="1" className="settings-submenu-container">
                            <div className="settings-input-container">
                                Old password
                                <Input.Password className="settings-input" onChange={changeInputOldPassword}/>
                            </div>
                            <div className="settings-input-container">
                                New password
                                <Input.Password className="settings-input" onChange={changeInputNewPassword}/>
                            </div>
                            <div className="settings-input-container">
                                Confirm password
                                <Input.Password className="settings-input" onChange={changeInputConfirmPassword}/>
                            </div>
                            <div className="settings-button-container">
                                <Button className="settings-button">Save</Button>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Email address" key="1" className="settings-submenu-container">
                            <div className="settings-input-container">
                                New email address
                                <Input className="settings-input" onChange={changeInputNewEmail}/>
                            </div>
                            <div className="settings-input-container">
                                Password
                                <Input className="settings-input" onChange={changeInputEmailPasssword}/>
                            </div>
                            <div className="settings-button-container">
                                <Button className="settings-button">Save</Button>
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