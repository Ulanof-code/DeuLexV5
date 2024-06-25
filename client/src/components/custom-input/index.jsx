import React from "react";
import { Form, Input } from "antd";

export const CustomInput = ({
  type = 'text',
  name,
  placeholder,
}) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "Обязательное поле" }]}
      shouldUpdate={ true }
    >
      <Input
        placeholder={placeholder}
        type={ type }
        size="large"
      />
    </Form.Item>
  );
};
