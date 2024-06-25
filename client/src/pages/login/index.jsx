import { Card, Form, Row, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/serivices/auth.js";
import { CustomButton } from "../../components/custom-button/index.jsx";
import { CustomInput } from "../../components/custom-input/index.jsx";
import { ErrorMessage } from "../../components/error-message/index.jsx";
import { Layout } from "../../components/layout/index.jsx";
import { PasswordInput } from "../../components/password-input/index.jsx";
import { selectUser } from "../../features/auth/authSlice.js";
import { Paths } from "../../../paths.js";

export const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const user = useSelector(selectUser);
    const [loginUser, loginUserResult] = useLoginMutation();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const login = async (data) => {
        try {
            await loginUser(data).unwrap();

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
                <Card title="Войдите" style={{ width: "30rem" }}>
                    <Form onFinish={login}>
                        <CustomInput type="login" name="login" placeholder="Логин" />
                        <PasswordInput name="password" placeholder="Пароль" />
                        <CustomButton
                            type="default"
                            htmlType="submit"
                            loading={loginUserResult.isLoading}
                        >
                            Войти
                        </CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
                        </Typography.Text>
                        <ErrorMessage message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};
