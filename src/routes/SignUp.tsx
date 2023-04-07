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

const SignUpWrapper = styled.div`
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

const SignUp = () => {
  return (
    <Container>
      <SignUpWrapper>
        <Header>
          <Title>Sign up</Title>
        </Header>
        <AuthForm />
        <ChangeSignRoute />
      </SignUpWrapper>
    </Container>
  );
};

export default SignUp;
