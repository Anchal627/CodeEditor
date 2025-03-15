import { PhoneCallIcon } from "lucide-react";
import styled from "styled-components";

const FooterStyled = styled.div`
  text-align: right;
  background-color: black;
  color: #fff;
  padding: 16px;
  margin-top: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 10px;
    margin-left: 30px;
  }
`;
const Copyright = styled.p`
  font-size: 20px;
  margin-right: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-right: 0;
  }
`;
const Contact = styled.div`
  display: flex;
  gap: 0.3rem;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;
function Footer() {
  return (
    <FooterStyled id="footer">
      <Contact>
        <PhoneCallIcon />
        <p>+91-9999-0000</p>
      </Contact>
      <Copyright>
        &copy; {new Date().getFullYear()} CodeWeaver. All rights reserved.
      </Copyright>
    </FooterStyled>
  );
}
export default Footer;
