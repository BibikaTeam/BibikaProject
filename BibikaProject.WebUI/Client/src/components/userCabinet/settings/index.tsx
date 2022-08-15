import { Button, Input, Menu, MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>['items'];

const items = [
    <div className="settings-dropdown">
        <Input></Input>
    </div>
];

const SettingsProfile = () => {
    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
    };
    return (

        <div className="settings">
            <div className="settings-container">
                <h1 className="settings-text">Settings</h1>
                <div className="settings-dropdown">
                    <Menu
                        mode={'inline'}
                        theme={"light"}
                    >
                        <h1 className={"settings-menu-text"}>Contact</h1>
                    </Menu>
                </div>

                <div className="settings-dropdown">
                    <Menu
                        mode={'inline'}
                        theme={"light"}
                    >
                        <h1 className={"settings-menu-text"}>Password</h1>
                    </Menu>
                </div>

                <div className="settings-dropdown">
                    <Menu
                        mode={'inline'}
                        theme={"light"}
                    >
                        <h1 className={"settings-menu-text"}>Email</h1>
                    </Menu>
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