import { Search } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

const SearchBar = styled.input`
  border: 1px solid gray;
  border-radius: 40px;
  font-size: 15px;
  padding: 15px;
  width: 500px;
  &:focus {
    border-color: blue;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    width: 250px;
    margin-left: 20px;
    padding: 12px 40px 12px 12px;
  }
`;
const SearchItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const SearchWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-left: 40px;
  }
`;
const editorData = {
  c: { route: "/c", doc: "https://en.cppreference.com/w/c" },
  cpp: { route: "/cpp", doc: "https://en.cppreference.com/w/" },
  python: { route: "/py", doc: "https://docs.python.org/3/" },
  java: { route: "/java", doc: "https://docs.oracle.com/javase/8/docs/" },
  ruby: { route: "/ruby", doc: "https://www.ruby-lang.org/en/documentation/" },
  php: { route: "/php", doc: "https://www.php.net/docs.php" },
  go: { route: "/go", doc: "https://go.dev/doc/" },
  rust: { route: "/rust", doc: "https://www.rust-lang.org/learn" },
  react: { route: "/react", doc: "https://react.dev/" },
  bootstrap: {
    route: "/bootstrap",
    doc: "https://getbootstrap.com/docs/4.1/getting-started/introduction/",
  },
  html: {
    route: "/editor",
    doc: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  javascript: {
    route: "/editor",
    doc: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  css: {
    route: "/editor",
    doc: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  swift: { route: "/swift", doc: "https://www.swift.org/documentation/" },
  csharp: {
    route: "/csharp",
    doc: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
};
function Searchbar() {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState(null);

  function handleRequirement() {
    const query = search.toLowerCase().trim();
    if (editorData[query]) {
      setOption(editorData[query]);
    } else {
      alert("Editor not found. Please try a valid editor name.");
      setOption(null);
    }
  }

  function handleSearch(e) {
    if (e.key === "Enter") {
      handleRequirement();
    }
  }
  function handleInput(e) {
    const input = e.target.value;
    setSearch(input);
    if (input === "") {
      setOption(null);
    }
  }
  return (
    <SearchItem>
      <SearchWrapper>
        <SearchBar
          type="text"
          placeholder="Search for documentation..."
          onChange={handleInput}
          value={search}
          onKeyDown={handleSearch}
        />
        {/* <button style={{ marginLeft: "5px" }}>Search</button> */}
        {/* <SearchIcon /> */}
        {option && (
          <ButtonContainer
            style={{
              display: "flex",
              marginBottom: "10px",
              justifyContent: "space-between",
              // backgroundColor: "wheat",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => (window.location.href = option.route)}
              style={{
                backgroundColor: "red",
                border: "none",
                padding: "16px",
                color: "white",
                fontSize: "15px",
              }}
            >
              Open Editor
            </button>
            <button
              onClick={() => window.open(option.doc, "_blank")}
              style={{
                backgroundColor: "blue",
                padding: "16px",
                border: "none",
                color: "white",
                fontSize: "15px",
              }}
            >
              Open Documentation
            </button>
          </ButtonContainer>
        )}
      </SearchWrapper>
    </SearchItem>
  );
}
export default Searchbar;
