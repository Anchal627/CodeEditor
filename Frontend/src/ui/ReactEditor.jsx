/* eslint-disable no-new-func */
import styled from "styled-components";
import MonacoEditor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { Moon } from "lucide-react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.toggle ? "#2e2e2e" : "#f4f4f4")};
  color: ${(props) => (!props.toggle ? "#2e2e2e" : "#f4f4f4")};
`;
const Header = styled.div`
  font-size: 32px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3px 3px;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 8px;
  }
`;
const MainSection = styled.div`
  flex: 1;
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;
const Sidebar = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  width: 40px;
  background-color: ${(props) => (props.toggle ? "#2e2e2e" : "#fff")};
  color: ${(props) => (!props.toggle ? "#2e2e2e" : "#f4f4f4")};
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
    height: 50px;
    flex-direction: row;
    overflow-x: auto;
    justify-content: center;
  }
`;
const Button = styled.button`
  width: 50px;
  height: 40px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #007d9c;
    height: 70px;
    color: white;
  }
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin: 5px;
  }
`;
const Icon = styled.img`
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
`;
const EditorSection = styled.div`
  flex: 1;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  @media (max-width: 1024px) {
    height: 50vh;
  }
`;
const FileName = styled.div`
  background-color: ${(props) => (props.toggle ? "#2e2e2e" : "#fff")};
  color: ${(props) => (!props.toggle ? "#2e2e2e" : "#f4f4f4")};
  padding: 5px;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
`;

const OutputSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
`;
const RunButton = styled.button`
  padding: 10px 15px;
  background-color: #007d9c;
  border-radius: 5px;
  border: none;
  font-size: 17px;

  &:hover {
    background-color: #005f7a;
  }
`;
const ClearButton = styled.button`
  padding: 10px 15px;
  background-color: wheat;
  border: none;
  color: black;
  font-size: 17px;
  border-radius: 5px;

  &:hover {
    background-color: wheat;
  }
`;
const ThemeToggleButton = styled.button`
  padding: 5px 10px;
`;
function ReactEditor() {
  const navigate = useNavigate();
  function handleIcon(destination) {
    navigate(destination);
  }

  const [code, setCode] = useState(() => {
    return (
      sessionStorage.getItem("reactCode") ||
      `function App() {
  return <h1>Hello World</h1>
}
`
    );
  });
  const [toggle, setToggle] = useState(false);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleClear() {
    setOutput("");
  }
  function handlerun() {
    setIsLoading(true);
    const htmlTemplate = `
      <html>
        <head>
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${code}
            ReactDOM.render(<App />, document.getElementById('root'));
          </script>
        </body>
      </html>
    `;
    setOutput(htmlTemplate);
    setIsLoading(false);
  }
  useEffect(() => {
    sessionStorage.setItem("reactCode", code);
  }, [code]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("reactCode");
    };
  }, []);
  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <Container toggle={toggle}>
      <div>
        <Header toggle={toggle} onClick={() => handleIcon("/home")}>
          React Editor
        </Header>
      </div>
      <MainSection>
        <Sidebar toggle={toggle}>
          <Button onClick={() => handleIcon("/editor")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/15474/15474213.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="html"
            />
          </Button>
          <Button onClick={() => handleIcon("/editor")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/732/732190.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="css"
            />
          </Button>
          <Button onClick={() => handleIcon("/editor")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/5968/5968292.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="js"
            />
          </Button>
          <Button onClick={() => handleIcon("/react")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/753/753244.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="react"
            />
          </Button>
          <Button onClick={() => handleIcon("/bootstrap")}>
            <Icon
              src="https://tse4.mm.bing.net/th?id=OIP.WE2fMi8IaE24_yIXcx5HTwHaHa&pid=Api&P=0&h=180"
              alt="bootstrap"
            />
          </Button>
        </Sidebar>
        <EditorSection>
          <FileName toggle={toggle}>
            <h3>React Content</h3>
            <div style={{ display: "flex", textAlign: "center", gap: "4px" }}>
              <ThemeToggleButton onClick={handleToggle}>
                <Moon />
              </ThemeToggleButton>
              <RunButton onClick={handlerun}>
                {isLoading ? <FaSpinner /> : "Run"}
              </RunButton>
            </div>
          </FileName>

          <MonacoEditor
            height="100%"
            language="react"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              suggestOnTriggerCharacters: true,
              automaticLayout: true,
              autoClosingBrackets: true,
              autoCloseTags: true,
              fontSize: 20,
            }}
          />
        </EditorSection>
        <OutputSection>
          <FileName toggle={toggle}>
            <h3>Output</h3>
            <ClearButton onClick={handleClear} toggle={toggle}>
              Clear
            </ClearButton>
          </FileName>
          <iframe
            srcDoc={output}
            title="React Output"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </OutputSection>
      </MainSection>
    </Container>
  );
}
export default ReactEditor;
