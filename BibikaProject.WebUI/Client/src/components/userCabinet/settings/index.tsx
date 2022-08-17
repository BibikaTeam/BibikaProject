import { Button, Collapse, Input, Form } from "antd";
import { Link } from "react-router-dom";
import { logoutUser } from "../../authorization/login/actions";

const { Panel } = Collapse;

const SettingsProfile = () => {

    const handleSaveContac = () => {

    }

    const handleSavePassword = () => {

    }

    const handleSaveEmail = () => {

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
                                <div className="settings-input-container">
                                    Name
                                    <Input className="settings-input"/>
                                </div>
                                <div className="settings-input-container">
                                    Locality
                                    <Input className="settings-input" />
                                </div>
                            </Form>

                            <div className="settings-button-container">
                                <Button className="settings-button">Save</Button>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Password" key="1" className="settings-submenu-container">
                            <Form>
                                <div className="settings-input-container">
                                    Old password
                                    <Input.Password className="settings-input" />
                                </div>
                                <div className="settings-input-container">
                                    New password
                                    <Input.Password className="settings-input" />
                                </div>
                                <div className="settings-input-container">
                                    Confirm password
                                    <Input.Password className="settings-input" />
                                </div>
                            </Form>

                            <div className="settings-button-container">
                                <Button className="settings-button">Save</Button>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Email address" key="1" className="settings-submenu-container">
                            <Form>
                                <div className="settings-input-container">
                                    New email address
                                    <Input className="settings-input" />
                                </div>
                                <div className="settings-input-container">
                                    Password
                                    <Input className="settings-input" />
                                </div>
                                <div className="settings-button-container">
                                    <Button className="settings-button">Save</Button>
                                </div>
                            </Form>

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