import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./Pages/Homepage.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import MainEditor from "./ui/MainEditor.jsx";
import PythonEditor from "./ui/PythonEditor.jsx";
import JavaEditor from "./ui/JavaEditor.jsx";
import CppEditor from "./ui/CppEditor.jsx";

import CSharpEditor from "./ui/CSharpEditor.jsx";
import RubyEditor from "./ui/RubyEditor.jsx";
import PhpEditor from "./ui/PhpEditor.jsx";
import CEditor from "./ui/CEditor.jsx";

import Error from "./Pages/Error.jsx";
import GoEditor from "./ui/GoEditor.jsx";
import ReactEditor from "./ui/ReactEditor.jsx";
import BootstrapEditor from "./ui/BootstrapEditor.jsx";
import SwiftEditor from "./ui/SwiftEditor.jsx";
import RustEditor from "./ui/RustEditor.jsx";

function App() {
  return (
    // <Login />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/editor" element={<MainEditor />} />
        <Route path="/go" element={<GoEditor />} />
        <Route path="/py" element={<PythonEditor />} />
        <Route path="/java" element={<JavaEditor />} />
        <Route path="/cpp" element={<CppEditor />} />
        <Route path="/csharp" element={<CSharpEditor />} />
        <Route path="/ruby" element={<RubyEditor />} />
        <Route path="/php" element={<PhpEditor />} />
        <Route path="/c" element={<CEditor />} />
        <Route path="/error" element={<Error />} />
        <Route path="/react" element={<ReactEditor />} />
        <Route path="/swift" element={<SwiftEditor />} />
        <Route path="/bootstrap" element={<BootstrapEditor />} />
        <Route path="/rust" element={<RustEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
