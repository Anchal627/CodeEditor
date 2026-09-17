import { useEffect, useState } from "react";
import { FaCompress, FaExpand } from "react-icons/fa";
import styled from "styled-components";
import MonacoEditor from "@monaco-editor/react";

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 45vh 50vh;
  gap: 10px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 1176px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 45vh) 60vh;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    grid-template-rows: repeat(3, 42vh) 55vh;
    gap: 8px;
  }

  @media (max-width: 480px) {
    grid-template-rows: repeat(3, 40vh) 50vh;
    gap: 6px;
  }
`;

const Editor = styled.div`
  width: 100%;
  min-width: 0;
  height: 45vh;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 1176px) {
    height: 45vh;
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 42vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const Heading = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  color: white;
  background-color: hsl(225, 6%, 13%);
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 7px;
    font-size: 15px;
  }
`;

const StyledMonacoEditor = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  background-color: hsl(225, 6%, 25%);
  color: #d4d4d4;
  overflow: hidden;
`;

const Output = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  min-width: 0;
  height: 50vh;
  position: relative;
  background-color: white;
  overflow: hidden;
  box-sizing: border-box;

  &.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    margin: 0;
  }

  @media (max-width: 1176px) {
    grid-column: 1;
    height: 60vh;
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 55vh;
  }

  @media (max-width: 480px) {
    height: 50vh;
  }
`;

const FullScreenButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    top: 6px;
    right: 6px;
    font-size: 1rem;
  }
`;

const Preview = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  background-color: white;
`;

function MainEditor() {
  const [html, setHtml] = useState(() => sessionStorage.getItem("html") || "");

  const [css, setCss] = useState(() => sessionStorage.getItem("css") || "");

  const [js, setJs] = useState(() => sessionStorage.getItem("js") || "");

  const [srcDoc, setSrcDoc] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}<\/script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    sessionStorage.setItem("html", html);
  }, [html]);

  useEffect(() => {
    sessionStorage.setItem("css", css);
  }, [css]);

  useEffect(() => {
    sessionStorage.setItem("js", js);
  }, [js]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("html");
      sessionStorage.removeItem("css");
      sessionStorage.removeItem("js");
    };
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <Container>
      <Editor>
        <Heading>HTML</Heading>
        <StyledMonacoEditor>
          <MonacoEditor
            height="100%"
            width="100%"
            language="html"
            theme="vs-dark"
            value={html}
            onChange={(value) => setHtml(value || "")}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              suggestOnTriggerCharacters: true,
              automaticLayout: true,
              autoClosingBrackets: true,
              autoCloseTags: true,
              fontSize: 18,
            }}
          />
        </StyledMonacoEditor>
      </Editor>

      <Editor>
        <Heading>CSS</Heading>
        <StyledMonacoEditor>
          <MonacoEditor
            height="100%"
            width="100%"
            language="css"
            theme="vs-dark"
            value={css}
            onChange={(value) => setCss(value || "")}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              suggestOnTriggerCharacters: true,
              automaticLayout: true,
              autoClosingBrackets: true,
              autoCloseTags: true,
              fontSize: 18,
            }}
          />
        </StyledMonacoEditor>
      </Editor>

      <Editor>
        <Heading>JavaScript</Heading>
        <StyledMonacoEditor>
          <MonacoEditor
            height="100%"
            width="100%"
            language="javascript"
            theme="vs-dark"
            value={js}
            onChange={(value) => setJs(value || "")}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              suggestOnTriggerCharacters: true,
              automaticLayout: true,
              autoClosingBrackets: true,
              autoCloseTags: true,
              fontSize: 18,
            }}
          />
        </StyledMonacoEditor>
      </Editor>

      <Output className={isFullScreen ? "full-screen" : ""}>
        <FullScreenButton onClick={toggleFullScreen}>
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </FullScreenButton>

        <Preview srcDoc={srcDoc} title="output" />
      </Output>
    </Container>
  );
}

export default MainEditor;
