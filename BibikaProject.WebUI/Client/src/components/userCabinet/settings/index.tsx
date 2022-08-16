import { Button, Collapse, Input } from "antd";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

const SettingsProfile = () => {

    return (

        <div className="settings">
            <div className="settings-container">
                <h1 className="settings-text">Settings</h1>
                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Contact" key="1" className="settings-submenu-container">
                            <div className="settings-input-container">
                                Name
                                <Input className="settings-input"/>
                            </div>
                            <div className="settings-input-container">
                                Locality
                                <Input className="settings-input"/>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Password" key="1" className="settings-submenu-container">
                            <div className="settings-input-container">
                                Old Password
                                <Input className="settings-input"/>
                            </div>
                            <div className="settings-input-container">
                                New password
                                <Input className="settings-input"/>
                            </div>
                            <div className="settings-input-container">
                                Confirm password
                                <Input className="settings-input"/>
                            </div>
                        </Panel>
                    </Collapse>
                </div>

                <div className="settings-dropdown">
                    <Collapse expandIconPosition={"end"} className="settings-menu" bordered={false}>
                        <Panel header="Email address" key="1" className="settings-submenu-container">
                            <div className="settings-input-container">
                                New email address
                                <Input className="settings-input"/>
                            </div>
                            <div className="settings-input-container">
                                Password
                                <Input className="settings-input"/>
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
                    <Link to="#" className="link-button">
                        Logout
                    </Link></div>
            </div>
        </div>
    )
}

export default SettingsProfile;