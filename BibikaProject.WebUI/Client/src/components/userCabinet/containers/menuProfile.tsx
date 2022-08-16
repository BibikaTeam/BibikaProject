import { Link } from "react-router-dom";

const MenuProfile = () => {

    return (
        <div className="menu-container">
            <div>

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