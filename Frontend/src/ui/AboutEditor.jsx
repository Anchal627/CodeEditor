import styled from "styled-components";

const About = styled.div`
  text-align: left;
  padding: 20px;
  max-width: 2240px;
  margin-top: 28px;
  margin-left: 40px;
  margin-right: 50px;

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    margin-left: 50px;
    padding: 20px;
  }
`;
const Heading = styled.h1`
  text-align: center;
  font-size: 32px;
  color: blue;
  margin-bottom: 20px;
  font-weight: 400;
`;
const Content = styled.p`
  font-size: 1.1rem;

  line-height: 1.6rem;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.6rem;
  margin-bottom: 10px;
`;
const List = styled.p`
  font-size: 25px;
  color: blue;
  margin-bottom: 20px;
`;
function AboutEditor() {
  return (
    <About>
      <Heading>About CodeWeaver</Heading>
      <Content id="section">
        CodeWeaver is an innovative project that focuses on enabling seamless
        cross-platform compatibility, allowing applications built for Windows to
        run on macOS, Linux, and other operating systems. With its flagship
        product, CrossOver, CodeWeaver has empowered users to run Windows
        software without the need for a full Windows installation or virtual
        machines. The project aims to simplify the transition between operating
        systems, preserving user productivity and compatibility with key
        applications.
      </Content>
      <Content>
        CodeWeaver's mission is to provide a reliable, user-friendly, and
        innovative platform that enhances the cross-platform experience for
        individuals and businesses. Whether you are a developer, gamer, or
        professional, CodeWeaver aims to ensure that your software works
        seamlessly across different systems, making your workflows more
        efficient and flexible.
      </Content>
      <List>Some key features of CodeWeaver include:</List>
      <ul>
        <ListItem>
          <strong>Multi-language Support:</strong> CodeWeaver supports a wide
          range of programming languages including JavaScript, Python, Java,
          C++, and more, with customizable syntax highlighting and IntelliSense
          features.
        </ListItem>

        <ListItem>
          <strong>Debugging Tools:</strong> Powerful debugging tools to help you
          quickly find and fix errors in your code with breakpoints,
          step-through, and variable inspection.
        </ListItem>
        <ListItem>
          <strong>Customizable Themes & Layouts:</strong> Personalize your
          workspace with a variety of themes, keybindings, and window layouts,
          ensuring an optimal coding environment tailored to your needs.
        </ListItem>
        <ListItem>
          <strong>Intelligent Code Suggestions:</strong> CodeWeaver offers
          real-time suggestions for code completion, imports, and error
          prevention to make coding faster and less error-prone.
        </ListItem>
        <ListItem>
          <strong>Lightweight & Fast:</strong> Unlike heavier IDEs, CodeWeaver
          is designed to be lightweight and fast, providing an efficient coding
          experience without sacrificing power.
        </ListItem>
      </ul>
    </About>
  );
}
export default AboutEditor;
