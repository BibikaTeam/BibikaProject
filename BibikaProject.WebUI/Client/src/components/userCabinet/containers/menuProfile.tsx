import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const MenuProfile = () => {
    const { user } = useTypedSelector((redux) => redux.login);

    return (
        <div className="menu-container">
            <div className="left-menu-side">
                <Avatar 
                className="user-icon"
                size={50} 
                icon={<UserOutlined />} />
                <span className="user-name-text">{user?.name}</span>
            </div>
            <div className="right-menu-side">
                <ul>
                    <li>
                        <Link to="/user-profile/my-posts">My posts</Link>
                    </li>
                    <li>
                        <Link to="/user-profile/message">Message</Link>
                    </li>
                    <li>
                        <Link to="/user-profile/saved-posts">Saved posts</Link>
                    </li>
                    <li>
                        <Link to="/user-profile/settings">Settings</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuProfile;

// <List itemLayout="vertical">
//         <List.Item><Link className="list-item" to="/user-profile/my-posts">My posts</Link></List.Item>
//         <List.Item><Link to="/user-profile/message">Message</Link></List.Item>
//         <List.Item><Link to="/user-profile/saved-posts">Saved posts</Link></List.Item>
//         <List.Item><Link to="/user-profile/settings">Settings</Link></List.Item>
//     </List>
