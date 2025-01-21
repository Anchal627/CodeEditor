import styled from "styled-components";
import Navbar from "../ui/Navbar";
import Searchbar from "../ui/Searchbar";
import About from "../ui/About";
import TechOption from "../ui/TechOption";
import Editor from "../ui/Editor";
import AboutEditor from "../ui/AboutEditor";
import Footer from "../ui/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HomepageLayout = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  color: #333;
  margin-right: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const Main = styled.div`
  text-align: center;
  margin-top: 60px;
`;

function Homepage() {
  const navigate = useNavigate();
  const HomepageValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);
    const res = await fetch("http://localhost:8000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      navigate("/error");
    } else {
      navigate("/home");
    }
  };
  useEffect(() => {
    HomepageValid();
  }, []);
  return (
    <HomepageLayout>
      <Navbar />
      <Main>
        <Searchbar />
        <About />
        <TechOption />
        <Editor />
        <AboutEditor />
        <Footer />
      </Main>
    </HomepageLayout>
  );
}
export default Homepage;
