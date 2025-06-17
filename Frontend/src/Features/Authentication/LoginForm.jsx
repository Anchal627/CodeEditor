import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
const Form = styled.form`
  height: 310px;
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
  background-color: #3285b8;
  text-transform: uppercase;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-bottom: 0;
  &:hover {
    background-color: #4f46e5;
  }
`;
const SignUpLink = styled(Link)`
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

function LoginForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(() => {
      return {
        ...input,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = input;
    if (email === "") {
      alert("Please enter your email!");
    } else if (!validator.isEmail(email)) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("Please enter your password!");
    } else if (password.length < 8) {
      alert("Password must be equal or greater than 8 characters!");
    } else {
      // console.log("successful");
      const data = await fetch("https://codeeditor-tfe8.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        navigate("/home");
        setInput({
          ...input,
          email: "",
          password: "",
        });
      }
    }
  };
  return (
    <Form>
      <FormRow>
        <Input
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          value={input.email}
          onChange={handleInput}
          required
        />
      </FormRow>
      <FormRow>
        <Input
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          value={input.password}
          onChange={handleInput}
          required
        />
      </FormRow>
      <FormRow>
        <Button type="submit" onClick={handleSubmit}>
          LOGIN
        </Button>
      </FormRow>
      <FormRow>
        <SignUpLink to="/signup">
          Don't have an account? <span>Sign Up</span>
        </SignUpLink>
      </FormRow>
    </Form>
  );
}
export default LoginForm;
