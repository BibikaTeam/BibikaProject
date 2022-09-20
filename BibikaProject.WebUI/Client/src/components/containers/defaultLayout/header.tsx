import { Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { logoutUser } from "../../authorization/login/actions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
const Header = () => {
  const { isAuth } = useTypedSelector((redux) => redux.login);
  const { logoutUser } = useActions();

  const handleLogout = async () => {
    await logoutUser();
  };

  const menu: any = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link to={"/user-profile/my-posts"}>
              <a target="_blank" rel="noopener noreferrer">
                My posts
              </a>
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <Link to={"/user-profile/settings"}>
              <a target="_blank" rel="noopener noreferrer">
                Settings
              </a>
            </Link>
          ),
        },
        {
          key: "3",
          label: (
            <Link to={"/user-profile/chat"}>
              <a target="_blank" rel="noopener noreferrer">
                Chat
              </a>
            </Link>
          ),
        },
        {
          key: "4",
          label: (
            <Link to={"/user-profile/saved-posts"}>
              <a target="_blank" rel="noopener noreferrer">
                Saved
              </a>
            </Link>
          ),
        },
        {
          key: "5",
          label: (
            <Link onClick={handleLogout} to={"/login"}>
              <a target="_blank" rel="noopener noreferrer">
                Logout
              </a>
            </Link>
            // <a
            //   target="_blank"
            //   rel="noopener noreferrer"
            //   href="https://www.aliyun.com"
            // >
            //   Logout
            // </a>
          ),
        },
        // {
        //   key: "3",
        //   label: (
        //     <a
        //       target="_blank"
        //       rel="noopener noreferrer"
        //       href="https://www.luohanacademy.com"
        //     >
        //       3rd menu item
        //     </a>
        //   ),
        // },
      ]}
    />
  );

  return (
    <header className="header">
      <div className="left-header-side">
        <Link to="/">
          <svg
            width="137"
            height="39"
            viewBox="0 0 137 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.5202 23.0634C44.5202 16.9466 42.175 11.0804 38.0004 6.75513C33.8258 2.42989 28.1639 4.61806e-07 22.2601 0C16.3564 -4.61806e-07 10.6944 2.42989 6.51984 6.75513C2.34526 11.0804 8.91441e-07 16.9466 0 23.0634H6.67803C6.67804 18.7817 8.31971 14.6753 11.2419 11.6476C14.1641 8.61996 18.1275 6.91903 22.2601 6.91904C26.3927 6.91904 30.3561 8.61996 33.2783 11.6476C36.2005 14.6753 37.8422 18.7817 37.8422 23.0634H44.5202Z"
              fill="#219CE1"
            />
            <path
              d="M6.87866 23.0634C6.87866 27.2901 8.4992 31.3436 11.3838 34.3323C14.2684 37.321 18.1807 39 22.2601 39C26.3395 39 30.2519 37.321 33.1364 34.3323C36.021 31.3436 37.6416 27.2901 37.6416 23.0635L31.489 23.0635C31.489 25.5994 30.5167 28.0315 28.7859 29.8248C27.0552 31.618 24.7078 32.6254 22.2601 32.6254C19.8125 32.6254 17.4651 31.618 15.7343 29.8248C14.0036 28.0315 13.0312 25.5994 13.0312 23.0634H6.87866Z"
              fill="#219CE1"
            />
            <path
              d="M31.5272 23.0634C31.5272 20.517 30.5508 18.0748 28.8129 16.2741C27.075 14.4735 24.7179 13.4619 22.2601 13.4619C19.8023 13.4619 17.4452 14.4735 15.7073 16.2741C13.9694 18.0748 12.993 20.517 12.993 23.0634H17.6266C17.6266 21.7902 18.1147 20.5691 18.9837 19.6688C19.8527 18.7685 21.0312 18.2627 22.2601 18.2627C23.489 18.2627 24.6676 18.7685 25.5365 19.6688C26.4055 20.5691 26.8937 21.7902 26.8937 23.0634H31.5272Z"
              fill="#219CE1"
            />
            <path
              d="M63.6397 31.4772C62.4493 31.4772 61.4076 31.2481 60.5148 30.7899C59.622 30.3318 58.8992 29.6882 58.3465 28.8592L57.9001 31.0845H54.265V7.52284H58.3465V17.1766C58.8567 16.4566 59.5263 15.8239 60.3554 15.2785C61.2057 14.7331 62.3005 14.4604 63.6397 14.4604C65.1278 14.4604 66.4564 14.8313 67.6256 15.5731C68.7947 16.3148 69.7195 17.3293 70.3997 18.6164C71.08 19.9036 71.4201 21.3653 71.4201 23.0015C71.4201 24.6377 71.08 26.0994 70.3997 27.3866C69.7195 28.6519 68.7947 29.6555 67.6256 30.3972C66.4564 31.1172 65.1278 31.4772 63.6397 31.4772ZM62.7788 27.812C64.0755 27.812 65.149 27.3648 65.9993 26.4703C66.8497 25.5758 67.2748 24.4196 67.2748 23.0015C67.2748 21.5835 66.8497 20.4163 65.9993 19.5C65.149 18.5837 64.0755 18.1256 62.7788 18.1256C61.4608 18.1256 60.3766 18.5837 59.5263 19.5C58.6973 20.3945 58.2827 21.5507 58.2827 22.9688C58.2827 24.3869 58.6973 25.554 59.5263 26.4703C60.3766 27.3648 61.4608 27.812 62.7788 27.812Z"
              fill="#219CE1"
            />
            <path
              d="M75.672 12.3333C74.928 12.3333 74.3115 12.1043 73.8226 11.6461C73.3549 11.188 73.1211 10.6099 73.1211 9.91173C73.1211 9.21361 73.3549 8.64638 73.8226 8.21005C74.3115 7.75191 74.928 7.52284 75.672 7.52284C76.416 7.52284 77.0219 7.75191 77.4895 8.21005C77.9785 8.64638 78.2229 9.21361 78.2229 9.91173C78.2229 10.6099 77.9785 11.188 77.4895 11.6461C77.0219 12.1043 76.416 12.3333 75.672 12.3333ZM73.6312 31.0845V14.8531H77.7127V31.0845H73.6312Z"
              fill="#219CE1"
            />
            <path
              d="M89.7533 31.4772C88.5628 31.4772 87.5212 31.2481 86.6283 30.7899C85.7355 30.3318 85.0128 29.6882 84.4601 28.8592L84.0136 31.0845H80.3785V7.52284H84.4601V17.1766C84.9702 16.4566 85.6399 15.8239 86.4689 15.2785C87.3192 14.7331 88.414 14.4604 89.7533 14.4604C91.2413 14.4604 92.5699 14.8313 93.7391 15.5731C94.9083 16.3148 95.833 17.3293 96.5133 18.6164C97.1935 19.9036 97.5336 21.3653 97.5336 23.0015C97.5336 24.6377 97.1935 26.0994 96.5133 27.3866C95.833 28.6519 94.9083 29.6555 93.7391 30.3972C92.5699 31.1172 91.2413 31.4772 89.7533 31.4772ZM88.8923 27.812C90.189 27.812 91.2626 27.3648 92.1129 26.4703C92.9632 25.5758 93.3883 24.4196 93.3883 23.0015C93.3883 21.5835 92.9632 20.4163 92.1129 19.5C91.2626 18.5837 90.189 18.1256 88.8923 18.1256C87.5743 18.1256 86.4902 18.5837 85.6399 19.5C84.8108 20.3945 84.3963 21.5507 84.3963 22.9688C84.3963 24.3869 84.8108 25.554 85.6399 26.4703C86.4902 27.3648 87.5743 27.812 88.8923 27.812Z"
              fill="#219CE1"
            />
            <path
              d="M101.786 12.3333C101.042 12.3333 100.425 12.1043 99.9361 11.6461C99.4684 11.188 99.2346 10.6099 99.2346 9.91173C99.2346 9.21361 99.4684 8.64638 99.9361 8.21005C100.425 7.75191 101.042 7.52284 101.786 7.52284C102.53 7.52284 103.135 7.75191 103.603 8.21005C104.092 8.64638 104.336 9.21361 104.336 9.91173C104.336 10.6099 104.092 11.188 103.603 11.6461C103.135 12.1043 102.53 12.3333 101.786 12.3333ZM99.7448 31.0845V14.8531H103.826V31.0845H99.7448Z"
              fill="#219CE1"
            />
            <path
              d="M106.492 31.0845V7.52284H110.574V21.4307L116.186 14.8531H121.032L114.559 22.2489L122.085 31.0845H116.983L110.574 22.9361V31.0845H106.492Z"
              fill="#219CE1"
            />
            <path
              d="M127.944 31.4772C126.584 31.4772 125.468 31.259 124.596 30.8227C123.724 30.3645 123.076 29.7646 122.651 29.0228C122.226 28.2811 122.013 27.463 122.013 26.5685C122.013 25.0632 122.587 23.8414 123.735 22.9033C124.883 21.9652 126.605 21.4962 128.901 21.4962H132.919V21.1035C132.919 19.9909 132.61 19.1728 131.994 18.6492C131.377 18.1256 130.612 17.8638 129.698 17.8638C128.869 17.8638 128.146 18.071 127.53 18.4855C126.913 18.8782 126.531 19.4673 126.382 20.2527H122.396C122.502 19.0746 122.885 18.0492 123.544 17.1766C124.224 16.3039 125.096 15.6385 126.159 15.1804C127.221 14.7004 128.412 14.4604 129.73 14.4604C131.983 14.4604 133.758 15.0386 135.055 16.1948C136.352 17.3511 137 18.9873 137 21.1035V31.0845H133.524L133.142 28.4665C132.674 29.3392 132.015 30.0591 131.165 30.6263C130.336 31.1935 129.262 31.4772 127.944 31.4772ZM128.869 28.2047C130.038 28.2047 130.942 27.812 131.579 27.0266C132.238 26.2412 132.653 25.2704 132.823 24.1142H129.347C128.263 24.1142 127.487 24.3214 127.019 24.7359C126.552 25.1286 126.318 25.6195 126.318 26.2085C126.318 26.8412 126.552 27.3321 127.019 27.6811C127.487 28.0302 128.104 28.2047 128.869 28.2047Z"
              fill="#219CE1"
            />
          </svg>
        </Link>

        {/* <ul>
          <li>New</li>
          <li>Used</li>
        </ul> */}
      </div>

      <div className="right-header-side">
        {isAuth ? (
          <>
            <Dropdown overlay={menu} placement="bottomLeft" trigger={["click"]}>
              <Avatar
                className="user-icon"
                size={50}
                style={{ marginTop: "5px" }}
                icon={<UserOutlined />}
              />
            </Dropdown>
            <Link to="/post/add" className="add-car-button">
              Sell car
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link to="/login" className="add-car-button">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
