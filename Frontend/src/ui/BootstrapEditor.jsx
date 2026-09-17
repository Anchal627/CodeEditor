import styled from "styled-components";
import MonacoEditor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

/* =========================
   HEADER
========================= */

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

/* =========================
   MAIN SECTION
========================= */

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

/* =========================
   SIDEBAR
========================= */

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

/* =========================
   LANGUAGE BUTTON
========================= */

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

/* =========================
   LANGUAGE ICON
========================= */

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

/* =========================
   EDITOR SECTION
========================= */

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

/* =========================
   EDITOR AREA
========================= */

const EditorArea = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
`;

/* =========================
   FILE NAME BAR
========================= */

const FileName = styled.div`
  width: 100%;
  box-sizing: border-box;

  background-color: ${(props) => (props.$toggle ? "#2e2e2e" : "#fff")};

  color: ${(props) => (!props.$toggle ? "#2e2e2e" : "#f4f4f4")};

  min-height: 55px;

  padding: 5px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 600;
  font-size: 18px;

  border-bottom: 1px solid #ddd;

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

/* =========================
   OUTPUT SECTION
========================= */

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

/* =========================
   BUTTON CONTAINER
========================= */

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 480px) {
    gap: 3px;
  }
`;

/* =========================
   RUN BUTTON
========================= */

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
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #005f7a;
  }

  @media (max-width: 480px) {
    min-width: 60px;
    padding: 8px 10px;
    font-size: 14px;
  }
`;

/* =========================
   CLEAR BUTTON
========================= */

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

/* =========================
   THEME BUTTON
========================= */

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

/* =========================
   INPUT AREA
========================= */

const InputArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;

  min-height: 100px;
  max-height: 180px;

  padding: 10px;

  border: none;
  border-bottom: 1px solid #ddd;

  outline: none;

  font-size: 18px;

  resize: vertical;

  flex-shrink: 0;

  @media (max-width: 768px) {
    min-height: 80px;
    max-height: 140px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    min-height: 70px;
    max-height: 120px;
    font-size: 15px;
  }
`;

/* =========================
   OUTPUT
========================= */

const OutputContent = styled.pre`
  flex: 1;

  min-height: 0;

  margin: 0;

  padding: 12px;

  font-size: 18px;

  white-space: pre-wrap;
  word-break: break-word;

  overflow: auto;

  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
  }
`;

/* =========================
   PYTHON EDITOR
========================= */

function PythonEditor() {
  const navigate = useNavigate();

  function handleIcon(destination) {
    navigate(destination);
  }

  const language = "python";

  const [code, setCode] = useState(() => {
    return sessionStorage.getItem("pythonCode") || `print("Hello, World!")`;
  });

  const [output, setOutput] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /* Save code */

  useEffect(() => {
    sessionStorage.setItem("pythonCode", code);
  }, [code]);

  /* Remove saved code when leaving page */

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("pythonCode");
    };
  }, []);

  /* Clear output */

  function handleClear() {
    setOutput("");

    const input = document.getElementById("input");

    if (input) {
      input.value = "";
    }
  }

  /* Run code */

  async function handlerun() {
    if (code.trim() === "") {
      setOutput("Please enter some code.");
      return;
    }

    setIsLoading(true);

    const inputElement = document.getElementById("input");

    const input = inputElement ? inputElement.value : "";

    try {
      const res = await axios.post("http://localhost:8000/compile", {
        code: code,
        language: language,
        input: input,
      });

      setOutput(res.data.stdout || res.data.stderr || "");
    } catch (err) {
      console.error(err);

      setOutput("Error: " + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  }

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  return (
    <Container $toggle={toggle}>
      {/* HEADER */}

      <Header onClick={() => handleIcon("/home")}>Python Editor</Header>

      {/* MAIN */}

      <MainSection>
        {/* SIDEBAR */}

        <Sidebar $toggle={toggle}>
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
              src="https://cdn-icons-png.freepik.com/256/6132/6132222.png"
              alt="c++"
            />
          </Button>

          <Button onClick={() => handleIcon("/csharp")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/6132/6132221.png"
              alt="c#"
            />
          </Button>

          <Button onClick={() => handleIcon("/ruby")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/919/919842.png"
              alt="ruby"
            />
          </Button>

          <Button onClick={() => handleIcon("/php")}>
            <Icon
              src="https://cdn-icons-png.freepik.com/256/919/919830.png"
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

        {/* EDITOR */}

        <EditorSection>
          <FileName $toggle={toggle}>
            <h3>main.py</h3>

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
              language="python"
              theme="vs-dark"
              id="code"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: {
                  enabled: false,
                },
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

        {/* OUTPUT */}

        <OutputSection>
          <FileName $toggle={toggle}>
            <h3>Output</h3>

            <ClearButton onClick={handleClear}>Clear</ClearButton>
          </FileName>

          <InputArea id="input" placeholder="Enter your input here..." />

          <OutputContent>{output}</OutputContent>
        </OutputSection>
      </MainSection>
    </Container>
  );
}

export default PythonEditor;
