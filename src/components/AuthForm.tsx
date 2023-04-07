import styled from "styled-components";
import { useEffect, useState } from "react";
import API from "../api";
import { redirectHome } from "../util";
import { useLocation, useNavigate } from "react-router-dom";

const InputItems = styled.div`
  margin-top: 50px;
  input {
    width: 100%;
    height: 52px;
    border: none;
    border-bottom: 1px solid #d8d8d8;
  }
  input:focus {
    outline: none;
  }
  p {
    margin: 10px 0 20px 0;
    font-size: 14px;
    min-height: 14px;
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin: 100px auto 50px auto;
  width: 150px;
  height: 32px;
  background: ${(props) => (props.disabled ? "#d8d8d8" : "#16a085")};
  border: none;
  border-radius: 2px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  transition: 0.1s ease;
  pointer-events: ${(props) => (props.disabled ? "none" : null)};
  cursor: pointer;
`;

interface ILoginData {
  email: string;
  password: string;
}

interface IValidate {
  checkEmail: boolean;
  checkPassword: boolean;
}

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";

  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const [validate, setValidate] = useState<IValidate>({
    checkEmail: false,
    checkPassword: true,
  });

  const emailRegExp = /@/;

  useEffect(() => {
    checkCredentials();
  }, [loginData]);

  const checkCredentials = () => {
    setValidate(() => ({
      checkPassword: loginData.password.length >= 8,
      checkEmail: emailRegExp.test(loginData.email),
    }));
  };

  const handleSubmit = () => {
    isSignUpPage
      ? API.signUpMember(loginData).then(() => {
          navigate("/signin");
        })
      : API.signInMember(loginData).then((res: any) => {
          localStorage.setItem("access_token", res.data.access_token);
          const token = localStorage.getItem("access_token");
          redirectHome(token);
        });
  };

  return (
    <>
      <InputItems>
        <input
          data-testid="email-input"
          type="text"
          placeholder="E-mail"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              email: e.target.value,
            })
          }
        />
        <p>{validate.checkEmail ? " " : "이메일 형식이 올바르지 않습니다."}</p>
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => {
            setLoginData({
              ...loginData,
              password: e.target.value,
            });
          }}
        />
        <p>
          {validate.checkPassword ? " " : "비밀번호는 8자리 이상이어야 합니다."}
        </p>
      </InputItems>
      <SubmitButton
        data-testid={isSignUpPage ? "signup-button" : "signin-button"}
        disabled={!(validate.checkEmail && validate.checkPassword)}
        onClick={handleSubmit}
      >
        {isSignUpPage ? "회원가입" : "로그인"}
      </SubmitButton>
    </>
  );
};

export default AuthForm;
