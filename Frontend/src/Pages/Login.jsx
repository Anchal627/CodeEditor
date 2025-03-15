import styled from "styled-components";
import LoginForm from "../Features/Authentication/LoginForm";

const LoginLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://tse2.mm.bing.net/th?id=OIP.gbubbgENRLjE3WP580PewQAAAA&pid=Api&P=0&h=180");
`;
const LoginBox = styled.div`
  width: 470px;
  height: 400px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  @media (max-width: 480px) {
    height: 300px;
    width: 200px;
    padding: 50px;
  }
`;
const Heading = styled.h1`
  text-align: center;
  color: black;
  font-size: 50px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 650;
  font-style: normal;
  margin-top: 10px;
  margin-bottom: 17px;

  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

function Login({ setLoginUser }) {
  return (
    <LoginLayout>
      <LoginBox>
        <Heading>CodeWeaver</Heading>
        <LoginForm setLoginUser={setLoginUser} />
      </LoginBox>
    </LoginLayout>
  );
}
export default Login;
