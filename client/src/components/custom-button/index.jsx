import React from "react";
import { Form, Button } from "antd";

export const CustomButton = ({
  children,
  type,
  danger,
  loading,
  htmlType = 'button',
  onClick,
  shape,
  icon
}) => {
  return (
    <Form.Item>
      <Button
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        size="large"
        shape={ shape }
        onClick={ onClick }
        icon={ icon }
      >
        {children}
      </Button>
    </Form.Item>
  );
};
