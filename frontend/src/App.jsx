import "./css/ColorTemplate.css";
import "./App.css";
import "./css/Mobile.css";
import { Outlet } from "react-router-dom";
import Background from "./components/Background.jsx";
import MenuBar from "./components/MenuBar.jsx";

function App() {

  return(
    <div className="App">
      <Background />
      <div className="Main-Project">
        <MenuBar />
        <Outlet />
      </div>
    </div>
  )
}

export default App;
