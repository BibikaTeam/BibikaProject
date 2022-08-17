import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


const MenuProfile = () => {

    return (
        <div className="menu-container">
            <div className="left-menu-side">
                <Avatar size={49} style={{ backgroundColor: '#2D40E0', marginTop: '5px' }} icon={<UserOutlined />} />
                
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