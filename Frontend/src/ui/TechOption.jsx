import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import image from "../images/3190343.jpg";
// import image from "../images/19199025.jpg";
// import image from "../images/pic1.png";

const TechFields = styled.div`
  text-align: center;
  border: 1px soButtond black;
  margin-right: 40px;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  gap: 20px;
  max-width: 100vw;
  overflow: hidden;
  background-color: white;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const TechSection = styled.div`
  border: 1px soButtond black;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: white;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 100%; /* Prevent overflow */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-left: 20px;
    margin-top: 0px;
  }
`;
const Button = styled.button`
  display: flex;
  flex-direction: row;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
  cursor: pointer;
  padding: 25px;
  border-radius: 15px;
  background-color: #f4f4f4;

  font-size: 18px;

  &:hover {
    background-color: #00d5ff;
  }
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 16px;
  }
`;
const Icon = styled.img`
  width: 30px;
  height: 30px;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
  }

  @media (max-width: 768px) {
    img {
      display: none;
      max-width: 350px;
    }
  }
`;
function TechOption() {
  const navigate = useNavigate();

  function handlejsEditor(destination) {
    navigate(destination);
  }
  return (
    <TechFields>
      {/* 1 */}
      <TechSection>
        {/* <Topic>Programming Languages</Topic> */}
        <List>
          <Button onClick={() => handlejsEditor("/py")}>
            Python
            <Icon
              src="https://cdn-icons-png.freepik.com/256/5968/5968350.png?semt=ais_hybrid"
              alt="python"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/java")}>
            Java
            <Icon
              src="https://img.icons8.com/?size=48&id=13679&format=png"
              alt="java"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/cpp")}>
            C++
            <Icon
              src="https://cdn-icons-png.freepik.com/256/6132/6132222.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="c++"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/csharp")}>
            C#
            <Icon
              src="https://cdn-icons-png.freepik.com/256/6132/6132221.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="c#"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/ruby")}>
            Ruby
            <Icon
              src="https://cdn-icons-png.freepik.com/256/919/919842.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="ruby"
            />
          </Button>

          <Button onClick={() => handlejsEditor("/php")}>
            PHP
            <Icon
              src="https://cdn-icons-png.freepik.com/256/919/919830.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="php"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/c")}>
            C
            <Icon
              src="https://tse1.mm.bing.net/th?id=OIP.96hD_BAVqME5FjeQgQS0pgHaIi&pid=Api&P=0&h=180"
              alt="c"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/go")}>
            Go
            <Icon
              src="https://logowik.com/content/uploads/images/golang-go7318.jpg"
              alt="Go"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/swift")}>
            Swift
            <Icon
              src="https://tse1.mm.bing.net/th?id=OIP.ebPNyH9wb1PuxdIplIMezAHaGq&pid=Api&P=0&h=180"
              alt="Swift"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/rust")}>
            Rust
            <Icon
              src="https://tse3.mm.bing.net/th?id=OIP.2OA2Lu-AQCBR8ghp2ey02wHaHv&pid=Api&P=0&h=180"
              alt="Rust"
            />
          </Button>
        </List>
      </TechSection>

      {/* 2 */}
      <TechSection>
        {/* <Topic>Web Technologies</Topic> */}
        <List>
          <Button onClick={() => handlejsEditor("/editor")}>
            HTML
            <Icon
              src="https://cdn-icons-png.freepik.com/256/15474/15474213.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="html"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/editor")}>
            CSS
            <Icon
              src="https://cdn-icons-png.freepik.com/256/732/732190.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="css"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/editor")}>
            JavaScript
            <Icon
              src="https://cdn-icons-png.freepik.com/256/5968/5968292.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="js"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/react")}>
            React
            <Icon
              src="https://cdn-icons-png.freepik.com/256/753/753244.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="react"
            />
          </Button>
          <Button onClick={() => handlejsEditor("/bootstrap")}>
            Bootstrap
            <Icon
              src="https://tse4.mm.bing.net/th?id=OIP.WE2fMi8IaE24_yIXcx5HTwHaHa&pid=Api&P=0&h=180"
              alt="bootstrap"
            />
          </Button>
        </List>
      </TechSection>
      <ImageWrapper>
        {/* <h2>Explore Coding!</h2> */}
        <img style={{ width: "560px", height: "560px" }} src={image} />
      </ImageWrapper>
      {/* 3*/}
    </TechFields>
  );
}
export default TechOption;
