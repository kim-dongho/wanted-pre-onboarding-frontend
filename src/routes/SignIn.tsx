import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

interface ISignUpData {
  email: string;
  password: string;
}

interface IValidate {
  checkEmail: boolean;
  checkPassword: boolean;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState<ISignUpData>({
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
  }, [signInData]);

  const checkCredentials = () => {
    setValidate(() => ({
      checkPassword: signInData.password.length >= 8,
      checkEmail: emailRegExp.test(signInData.email),
    }));
  };

  const handleSubmit = () => {
    API.signInMember(signInData).then((res: any) => {
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/todo");
    });
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        value={signInData.email}
        onChange={(e) =>
          setSignInData({
            ...signInData,
            email: e.target.value,
          })
        }
      />
      <p>{validate.checkEmail ? "유효한 이메일" : "유효하지 않은 이메일"}</p>
      <input
        data-testid="password-input"
        type="password"
        value={signInData.password}
        onChange={(e) => {
          setSignInData({
            ...signInData,
            password: e.target.value,
          });
        }}
      />
      <p>
        {validate.checkPassword ? "유효한 비밀번호" : "유효하지 않은 비밀번호"}
      </p>
      <button
        data-testid="signin-button"
        disabled={!(validate.checkEmail && validate.checkPassword)}
        onClick={handleSubmit}
      >
        로그인
      </button>
    </div>
  );
};

export default SignIn;
