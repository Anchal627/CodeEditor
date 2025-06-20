import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import validator from "validator";

const Form = styled.form`
  height: 460px;
  border-radius: 10px;
  margin-bottom: 2px;
`;
const FormRow = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
`;
const Input = styled.input`
  border-radius: 8px;
  padding: 0.7rem;
  color: black;

  border: 1px solid #d1d5db;
  background-color: #fff;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  &:focus {
    border: 1px solid blue;
  }
`;
const Button = styled.button`
  color: #eef2ff;
  font-weight: 500;
  padding: 10px 20px;
  font-size: 16px;
  /* background-color: #3285b8; */
  background-color: #4f46e5;

  text-transform: uppercase;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-bottom: 0;
  &:hover {
    background-color: #3285b8;
  }
`;
const LoginLink = styled(Link)`
  text-align: center;

  color: black;
  text-decoration: none;
  font-weight: 300;
  font-size: 19px;

  span {
    color: #0000ff74;
    font-weight: 500;
    text-decoration: underline;
  }
`;
function SignupForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = input;
    if (name === "") {
      alert("Please enter your name!");
    } else if (email === "") {
      alert("Please enter your email!");
    } else if (!validator.isEmail(email)) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("Please enter your password!");
    } else if (password.length < 8) {
      alert("Password must be equal or greater than 8 characters!");
    } else if (confirmPassword === "") {
      alert("Please enter your Confirm Password!");
    } else if (confirmPassword.length < 8) {
      alert("Password must be equal or greater than 8 characters!");
    } else if (password !== confirmPassword) {
      alert("Password and confirm password should be same.");
    } else {
      // console.log("successfull");
      const data = await fetch("https://codeeditor-wf2n.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });
      const res = await data.json();
      // console.log(res.status);
      if (res.status === 201) {
        alert("User registration done!");
        setInput({
          ...input,
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
      // console.log(res);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(() => {
      return {
        ...input,
        [name]: value,
      };
    });
  };
  return (
    <Form>
      <FormRow>
        <Input
          placeholder="Enter your Full Name"
          type="text"
          name="name"
          value={input.name}
          id="name"
          onChange={handleInput}
          required
        />
      </FormRow>

      <FormRow>
        <Input
          placeholder="Enter your Email"
          type="email"
          id="email"
          name="email"
          value={input.email}
          onChange={handleInput}
          required
        />
      </FormRow>
      <FormRow>
        <Input
          placeholder="Password"
          type="password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleInput}
          required
        />
      </FormRow>
      <FormRow>
        <Input
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          id="confirm_passowrd"
          value={input.confirmPassword}
          onChange={handleInput}
          required
        />
      </FormRow>
      <FormRow>
        <Button type="submit" onClick={handleClick}>
          SIGNUP
        </Button>
      </FormRow>
      <FormRow>
        <LoginLink to="/">
          Already have an account? <span>Login</span>
        </LoginLink>
      </FormRow>
    </Form>
  );
}
export default SignupForm;
