import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditorSection = styled.div`
  text-align: center;
  background-color: rgb(247, 249, 250);
  margin-top: 30px;
  padding: 20px;
`;
const Heading = styled.p`
  font-size: 35px;
  font-weight: 500;
  margin-bottom: 20px;
`;
const Button = styled.button`
  background-color: #007bff;
  cursor: pointer;
  padding: 20px 30px;
  font-size: 16px;
  color: white;
  border-radius: 5px;
  margin-bottom: 12px;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;
function Editor() {
  const navigate = useNavigate();

  function handleOpenEditor() {
    navigate("/editor");
  }
  return (
    <EditorSection>
      <Heading>Start coding by clicking the button below!</Heading>
      <Button onClick={handleOpenEditor}>Open Editor</Button>
    </EditorSection>
  );
}
export default Editor;
