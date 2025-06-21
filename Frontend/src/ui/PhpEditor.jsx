/* eslint-disable no-new-func */
import styled from "styled-components";
import MonacoEditor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  height: 60px;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-left: 10px;
  box-sizing: border-box;
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
  width: 50px;
  height: 50px;
  margin: 0 5px; 
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
function PhpEditor() {
  const navigate = useNavigate();
  function handleIcon(destination) {
    navigate(destination);
  }
  const language = "php";

  const [code, setCode] = useState(() => {
    return (
      sessionStorage.getItem("phpCode") || `<?php echo "Hello, World!"; ?>`
    );
  });
  const [output, setOutput] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    sessionStorage.setItem("phpCode", code);
  }, [code]);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("phpCode");
    };
  }, []);
  function handleClear() {
    setOutput("");
    document.getElementById("input").value = "";
  }
  function handlerun() {
    setIsLoading(true);
    if (code === ``) {
      return;
    }
    const input = document.getElementById("input").value;
    // Post request to compile endpoint
    axios
      .post(`https://codeeditor-wf2n.onrender.com/compile`, {
        code: code,
        language: language,
        input: input,
      })
      .then((res) => {
        setOutput(res.data.stdout || res.data.stderr);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setOutput(
          "Error: " + (err.response ? err.response.data.error : err.message)
        );
        setIsLoading(false);
      });
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <Container toggle={toggle}>
      <div>
        <Header toggle={toggle} onClick={() => handleIcon("/home")}>
          Php Editor
        </Header>
      </div>
      <MainSection>
        <Sidebar toggle={toggle}>
          <Button onClick={() => handleIcon("/py")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/5968/5968350.png?semt=ais_hybrid"
              alt="python"
            />
          </Button>
          <Button onClick={() => handleIcon("/java")}>
            <Icon
              src="https://img.icons8.com/?size=48&id=13679&format=png"
              alt="java"
            />
          </Button>
          <Button onClick={() => handleIcon("/cpp")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/6132/6132222.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="c++"
            />
          </Button>
          <Button onClick={() => handleIcon("/csharp")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/6132/6132221.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="c#"
            />
          </Button>
          <Button onClick={() => handleIcon("/ruby")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/919/919842.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="ruby"
            />
          </Button>
          <Button onClick={() => handleIcon("/php")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/919/919830.png?ga=GA1.1.664655560.1736616106&semt=ais_hybrid"
              alt="php"
            />
          </Button>
          <Button onClick={() => handleIcon("/c")}>
            <Icon
              src="https://tse1.mm.bing.net/th?id=OIP.96hD_BAVqME5FjeQgQS0pgHaIi&pid=Api&P=0&h=180"
              alt="c"
            />
          </Button>
          <Button onClick={() => handleIcon("/go")}>
            <Icon
              src="https://logowik.com/content/uploads/images/golang-go7318.jpg"
              alt="Go"
            />
          </Button>
          <Button onClick={() => handleIcon("/swift")}>
            <Icon
              src="https://tse1.mm.bing.net/th?id=OIP.ebPNyH9wb1PuxdIplIMezAHaGq&pid=Api&P=0&h=180"
              alt="Swift"
            />
          </Button>
          <Button onClick={() => handleIcon("/rust")}>
            <Icon
              src="https://tse3.mm.bing.net/th?id=OIP.2OA2Lu-AQCBR8ghp2ey02wHaHv&pid=Api&P=0&h=180"
              alt="Rust"
            />
          </Button>
        </Sidebar>
        <EditorSection>
          <FileName toggle={toggle}>
            <h3>main.php</h3>
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
            language="php"
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
          <textarea
            style={{ fontSize: "20px" }}
            id="input"
            rows="5"
            placeholder="Enter your input here..."
          ></textarea>
          <pre style={{ fontSize: "20px" }}>{output}</pre>
        </OutputSection>
      </MainSection>
    </Container>
  );
}
export default PhpEditor;
