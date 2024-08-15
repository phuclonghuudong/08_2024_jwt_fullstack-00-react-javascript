import React, { useContext, useState } from "react";
import { MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();

  const { auth, setAuth } = useContext(AuthContext);
  console.log("check auth :", auth);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to={"/"}>Home Page</Link>,
      key: "home",
      icon: <MailOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to={"/user"}>Users</Link>,
            key: "user",
            icon: <MailOutlined />,
          },
        ]
      : []),

    {
      label: `Welcome ${auth?.user?.email}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        ...(auth.isAuthenticated
          ? [
              {
                label: (
                  <span
                    onClick={() => {
                      localStorage.clear("access_token");
                      setCurrent("home");
                      setAuth({
                        isAuthenticated: false,
                        user: {
                          email: "",
                          name: "",
                        },
                      });
                      navigate("/");
                    }}
                  >
                    Logout
                  </span>
                ),
                key: "logout",
              },
            ]
          : [
              {
                label: <Link to={"/login"}>Login</Link>,
                key: "login",
              },
            ]),
      ],
    },
  ];

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;
