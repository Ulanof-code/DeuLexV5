import { Alert } from "antd";
import React from "react";

export const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return <Alert message={message} type="error" />;
};
