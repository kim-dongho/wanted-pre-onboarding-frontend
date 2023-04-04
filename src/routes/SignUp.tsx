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

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState<ISignUpData>({
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
  }, [signUpData]);

  const checkCredentials = () => {
    setValidate(() => ({
      checkPassword: signUpData.password.length >= 8,
      checkEmail: emailRegExp.test(signUpData.email),
    }));
  };

  const handleSubmit = () => {
    API.signUpMember(signUpData).then((res: any) => {
      navigate("/signin");
    });
  };

  return (
    <div>
      <input
        data-testid="email-input"
        type="text"
        value={signUpData.email}
        onChange={(e) =>
          setSignUpData({
            ...signUpData,
            email: e.target.value,
          })
        }
      />
      <p>{validate.checkEmail ? "유효한 이메일" : "유효하지 않은 이메일"}</p>
      <input
        data-testid="password-input"
        type="password"
        value={signUpData.password}
        onChange={(e) => {
          setSignUpData({
            ...signUpData,
            password: e.target.value,
          });
        }}
      />
      <p>
        {validate.checkPassword ? "유효한 비밀번호" : "유효하지 않은 비밀번호"}
      </p>
      <button
        data-testid="signup-button"
        disabled={!(validate.checkEmail && validate.checkPassword)}
        onClick={handleSubmit}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignUp;
