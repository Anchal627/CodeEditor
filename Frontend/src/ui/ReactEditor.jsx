import styled from "styled-components";
import MonacoEditor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.$toggle ? "#2e2e2e" : "#f4f4f4")};
  color: ${(props) => (!props.$toggle ? "#2e2e2e" : "#f4f4f4")};
  overflow-x: hidden;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-size: 32px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 12px 8px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 10px 5px;
  }
`;

const MainSection = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 75px minmax(0, 1fr) minmax(0, 1fr);
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 55vh 45vh;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    grid-template-rows: auto 60vh 45vh;
  }

  @media (max-width: 480px) {
    grid-template-rows: auto 55vh 45vh;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  padding: 10px 8px;
  background-color: ${(props) => (props.$toggle ? "#2e2e2e" : "#fff")};
  color: ${(props) => (!props.$toggle ? "#2e2e2e" : "#f4f4f4")};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
    padding: 8px 10px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
`;

const Button = styled.button`
  width: 52px;
  height: 45px;
  margin: 5px 0;
  padding: 2px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: 0.2s ease;

  &:hover {
    background-color: #007d9c;
    color: white;
  }

  @media (max-width: 1024px) {
    width: 48px;
    height: 42px;
    margin: 4px;
  }

  @media (max-width: 480px) {
    width: 42px;
    height: 38px;
    margin: 3px;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  background-color: #e0e0e0;

  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
  }
`;

const EditorSection = styled.div`
  min-width: 0;
  min-height: 0;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;

const EditorArea = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;

const FileName = styled.div`
  width: 100%;
  box-sizing: border-box;
  min-height: 55px;
  padding: 5px 10px;
  background-color: ${(props) => (props.$toggle ? "#2e2e2e" : "#fff")};
  color: ${(props) => (!props.$toggle ? "#2e2e2e" : "#f4f4f4")};
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
  flex-shrink: 0;

  h3 {
    margin: 0;
  }

  @media (max-width: 768px) {
    min-height: 50px;
    font-size: 16px;
    padding: 5px 8px;
  }

  @media (max-width: 480px) {
    min-height: 46px;
    font-size: 15px;
  }
`;

const OutputSection = styled.div`
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  overflow: hidden;
  background-color: #fff;

  @media (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 480px) {
    gap: 3px;
  }
`;

const RunButton = styled.button`
  min-width: 75px;
  padding: 9px 14px;
  background-color: #007d9c;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #005f7a;
  }

  @media (max-width: 480px) {
    min-width: 60px;
    padding: 8px 10px;
    font-size: 14px;
  }
`;

const ClearButton = styled.button`
  padding: 9px 14px;
  background-color: wheat;
  border: none;
  color: black;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ead6a5;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 14px;
  }
`;

const ThemeToggleButton = styled.button`
  padding: 6px 9px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    padding: 6px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const OutputFrame = styled.iframe`
  width: 100%;
  flex: 1;
  min-height: 0;
  border: none;
  display: block;
  background-color: white;
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

}`
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
            ReactDOM.render(<App />, document.getElementById("root"));
          <\/script>
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
    setToggle((prev) => !prev);
  }

  return (
    <Container $toggle={toggle}>
      <Header onClick={() => handleIcon("/home")}>React Editor</Header>

      <MainSection>
        <Sidebar $toggle={toggle}>
          <Button onClick={() => handleIcon("/editor")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/15474/15474213.png"
              alt="html"
            />
          </Button>

          <Button onClick={() => handleIcon("/editor")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/732/732190.png"
              alt="css"
            />
          </Button>

          <Button onClick={() => handleIcon("/editor")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/5968/5968292.png"
              alt="js"
            />
          </Button>

          <Button onClick={() => handleIcon("/react")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/753/753244.png"
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
          <FileName $toggle={toggle}>
            <h3>React Content</h3>

            <ActionButtons>
              <ThemeToggleButton onClick={handleToggle}>
                <Moon />
              </ThemeToggleButton>

              <RunButton onClick={handlerun}>
                {isLoading ? <FaSpinner /> : "Run"}
              </RunButton>
            </ActionButtons>
          </FileName>

          <EditorArea>
            <MonacoEditor
              height="100%"
              width="100%"
              language="javascript"
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
          </EditorArea>
        </EditorSection>

        <OutputSection>
          <FileName $toggle={toggle}>
            <h3>Output</h3>

            <ClearButton onClick={handleClear}>Clear</ClearButton>
          </FileName>

          <OutputFrame srcDoc={output} title="React Output" />
        </OutputSection>
      </MainSection>
    </Container>
  );
}

export default ReactEditor;
