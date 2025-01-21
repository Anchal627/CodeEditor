import styled from "styled-components";
import SignupForm from "../Features/Authentication/SignupForm";

const SignupLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://tse4.mm.bing.net/th?id=OIP.8QgHF_QxuxhVJzKiD-03NwHaEK&pid=Api&P=0&h=180");
  /* background-repeat: no-repeat; */
`;
const SignupBox = styled.div`
  width: 470px;
  height: 550px;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;
const Heading = styled.h1`
  text-align: center;
  color: black;
  font-size: 50px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 650;
  font-style: normal;
  margin-bottom: 17px;
  margin-top: 10px;

  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

function Signup() {
  return (
    <SignupLayout>
      <SignupBox>
        <Heading>CodeWeaver</Heading>
        <SignupForm />
      </SignupBox>
    </SignupLayout>
  );
}
export default Signup;
