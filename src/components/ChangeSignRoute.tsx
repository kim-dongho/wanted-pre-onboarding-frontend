import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const RedirectText = styled.p`
  margin: 0 auto;
  button {
    border: none;
    background: none;
    color: #2d99ff;
    font-size: 16px;
  }
`;

const ChangeSignRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";

  const signRedirect = () => {
    if (isSignUpPage) {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  return (
    <RedirectText>
      {isSignUpPage ? "계정이 있으시다면?" : "계정이 없으시다면?"}
      <button onClick={() => signRedirect()}>
        {isSignUpPage ? "로그인하러가기" : "회원가입하러가기"}
      </button>
    </RedirectText>
  );
};

export default ChangeSignRoute;
