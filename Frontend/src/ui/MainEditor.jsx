import { useEffect, useState } from "react";
import { FaCompress, FaExpand } from "react-icons/fa";
import styled from "styled-components";
import MonacoEditor from "@monaco-editor/react";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  overflow: hidden;

  @media (max-width: 1176px) {
    display: flex;
    flex-direction: column;
    height: auto;
    overflow-y: auto;
    padding: 10px;
  }
`;

const Editor = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  border-radius: 5px;

  @media (max-width: 1176px) {
    width: 100%;
  }
`;

const Heading = styled.div`
  padding: 8px;
  color: white;
  background-color: hsl(225, 6%, 13%);
  font-weight: bold;
`;

const Output = styled.div`
  grid-column: 1 / -1;
  background-color: white;
  height: 50vh;
  position: relative;

  &.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }

  @media (max-width: 1176px) {
    height: 300px;
    width: 100%;
  }
`;


const FullScreenButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5rem;
`;

const StyledMonacoEditor = styled.div`
  flex: 1;
  background-color: hsl(225, 6%, 25%);
  color: #d4d4d4;
  /* padding: 10px; */
  font-family: monospace;
  font-size: 14px;
  /* overflow: auto; */
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
          <body>${html}</body>
          
          <script>${js}</script>
    </html>
      `);
    }, 250);
    // console.log(srcDoc)
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
            language="html"
            theme="vs-dark"
            // theme={theme}
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
            }}
          />
        </StyledMonacoEditor>
      </Editor>
      <Editor>
        <Heading>CSS</Heading>
        <StyledMonacoEditor>
          <MonacoEditor
            height="100%"
            language="css"
            theme="vs-dark"
            // theme={theme}
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
            }}
          />
        </StyledMonacoEditor>
      </Editor>
      <Editor>
        <Heading>JavaScript</Heading>
        <StyledMonacoEditor>
          <MonacoEditor
            height="100%"
            language="javascript"
            theme="vs-dark"
            // theme={theme}
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
            }}
          />
        </StyledMonacoEditor>
      </Editor>
      <Output className={isFullScreen ? "full-screen" : ""}>
        <FullScreenButton onClick={toggleFullScreen}>
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </FullScreenButton>
        <iframe
          srcDoc={srcDoc}
          title="output"
          width="100%"
          height="100%"
        ></iframe>
      </Output>
    </Container>
  );
}
export default MainEditor;
