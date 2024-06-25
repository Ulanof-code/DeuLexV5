import { Card, Form, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/serivices/auth.js";
import { CustomButton } from "../../components/custom-button/index.jsx";
import { CustomInput } from "../../components/custom-input/index.jsx";
import { ErrorMessage } from "../../components/error-message/index.jsx";
import { Layout } from "../../components/layout/index.jsx";
import { PasswordInput } from "../../components/password-input/index.jsx";
import { selectUser } from "../../features/auth/authSlice.js";
import { Paths } from "../../../paths.js";


export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const register = async (data) => {
    try {
      await registerUser(data).unwrap();

      navigate("/");
    } catch (err) {
      if (err) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput type="text" name="name" placeholder="Имя" />
            <CustomInput type="login" name="login" placeholder="Логин" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput name="confirmPassword" placeholder="Пароль" />
            <CustomButton type="default" htmlType="submit">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
