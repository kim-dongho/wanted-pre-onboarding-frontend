import styled from "styled-components";
import ChangeSignRoute from "../components/ChangeSignRoute";
import AuthForm from "../components/AuthForm";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const SignInWrapper = styled.div`
  width: 768px;
  height: 600px;
  display: flex;
  flex-direction: column;
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  background-color: #fff;
`;

const Header = styled.div``;

const Title = styled.h2`
  font-size: 32px;
`;

const SignIn = () => {
  return (
    <Container>
      <SignInWrapper>
        <Header>
          <Title>Sign In123123</Title>
        </Header>
        <AuthForm />
        <ChangeSignRoute />
      </SignInWrapper>
    </Container>
  );
};

export default SignIn;
