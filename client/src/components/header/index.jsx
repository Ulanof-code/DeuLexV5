import {
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../features/auth/authSlice.js";
import { CustomButton } from "../custom-button";
import style from "./index.module.css";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={style.header}>
      <Space>
        <TeamOutlined className={style.teamIcon} />
        <Link to="/">
          <CustomButton type="ghost">
            <Typography.Title className={style.title} level={1}>DeuLex</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Выйти
        </CustomButton>
      ) : (
        <Space className={style.space}>
          <Link to="/register">
            <CustomButton type="default" icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to="/login">
            <CustomButton type="default" icon={<LoginOutlined />}>
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
