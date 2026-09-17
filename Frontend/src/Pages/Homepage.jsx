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
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  color: #333;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 30px 0;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 1024px) {
    padding: 50px 24px 0;
  }

  @media (max-width: 768px) {
    padding: 40px 16px 0;
  }

  @media (max-width: 480px) {
    padding: 30px 12px 0;
  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

function Homepage() {
  const navigate = useNavigate();

  const HomepageValid = async () => {
    try {
      const token = localStorage.getItem("usersdatatoken");

      const res = await fetch("http://localhost:8000/validuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || data.status === 401 || !data.ValidUserOne) {
        navigate("/error");
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      navigate("/error");
    }
  };

  useEffect(() => {
    HomepageValid();
  }, []);

  return (
    <HomepageLayout>
      <Navbar />

      <Main>
        <SectionWrapper>
          <Searchbar />
        </SectionWrapper>

        <SectionWrapper>
          <About />
        </SectionWrapper>

        <SectionWrapper>
          <TechOption />
        </SectionWrapper>

        <SectionWrapper>
          <Editor />
        </SectionWrapper>

        <SectionWrapper>
          <AboutEditor />
        </SectionWrapper>

        <SectionWrapper>
          <Footer />
        </SectionWrapper>
      </Main>
    </HomepageLayout>
  );
}

export default Homepage;
