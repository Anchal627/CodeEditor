import styled from "styled-components";

const AboutCont = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  font-size: large;
  color: black;
  margin-top: 20px;
  /* gap: 0px; */
  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;
const Heading = styled.h1`
  font-size: 42px;
  margin-top: 15px;
  font-weight: 900;
  margin-bottom: 0.5px;
`;
const Para = styled.p`
  margin-top: 12px;
  font-size: 21px;
`;
function About() {
  return (
    <AboutCont>
      <Heading>Welcome to the CodeWeaver!</Heading>
      <Para>Start your coding journey with this intuitive editor.</Para>
    </AboutCont>
  );
}
export default About;
