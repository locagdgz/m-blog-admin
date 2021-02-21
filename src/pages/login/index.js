import React, { memo, useState } from "react";

import { Card, Input, Button, Spin, message } from "antd";

import { KeyOutlined, UserOutlined } from "@ant-design/icons";

import { LoginWrapper } from "./style";
import { login } from "@/service/adminuser";

export default memo(function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    if (!userName) {
      message.error("用户名不能为空");
      return;
    }
    if (!password) {
      message.error("密码不能为空");
      return;
    }
    if (userName && password) {
      setIsLoading(true);
      doLogin();
    }
  };

  const doLogin = () => {
    login(userName, password).then((resp) => {
      setIsLoading(false);
      if (resp.msg && resp.msg === "登录成功") {
        props.history.push("/admin");
        localStorage.setItem("id", resp.user_info.id);
        localStorage.setItem("userName", resp.user_info.userName);
      } else {
        message.error("用户名或密码错误");
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <LoginWrapper>
      <div className="login-div">
        <Spin tip="Loading..." spinning={isLoading}>
          <Card title="Blog  System" bordered={true} style={{ width: 400 }}>
            <Input
              id="userName"
              size="large"
              placeholder="用户名"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <br />
            <Input.Password
              id="password"
              size="large"
              placeholder="密码"
              prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <Button type="primary" size="large" block onClick={checkLogin}>
              Login in
            </Button>
          </Card>
        </Spin>
      </div>
    </LoginWrapper>
  );
});
