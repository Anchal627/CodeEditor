import { Moon, User2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Nav = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1px 1px;
  height: 80px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    height: auto;
    padding: 10px;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
  margin-top: 3px;
  margin-left: 15px;
  padding: 2px;
  margin-bottom: 4px;
  font-size: 32px;
  font-weight: bold;
  @media (max-width: 768px) {
    justify-content: start;
    margin-left: 0px;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-right: 2px;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;
const Logo = styled.img`
  border-radius: 100%;
  height: 65px;
  width: 65px;
  margin-left: 4px;
  margin-top: 3px;
`;
const CompanyName = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const Button = styled.button`
  font-size: 22px;
  padding: 10px;
  margin-right: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  &:hover {
    color: blue;
  }
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 12px;
  }
`;
const BurgerMenu = styled.div`
  display: none;
  font-size: 30px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("https://codeeditor-wf2n.onrender.com/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.status === 201) {
      localStorage.removeItem("usersdatatoken");
      navigate("/");
    } else {
      navigate("/error");
    }
  };

  return (
    <Nav>
      <LogoContainer>
        <Logo
          src="https://tse3.mm.bing.net/th?id=OIP.KCofzcHmQGr4iNRUoHuJVAHaHa&pid=Api&P=0&h=180"
          alt="Comapny Logo"
        />
        <CompanyName style={{ fontWeight: "bold" }}>CodeWeaver</CompanyName>
      </LogoContainer>
      <BurgerMenu onClick={() => setMenuOpen(!menuOpen)}>☰</BurgerMenu>
      <List isOpen={menuOpen}>
        <Button onClick={() => scrollToSection("footer")}>Contact </Button>
        <Button onClick={() => scrollToSection("section")}>About</Button>
        <Button onClick={handleLogout}>Logout</Button>
        <User2Icon style={{ marginRight: "20px" }} />
      </List>
    </Nav>
  );
}
export default Navbar;
