import "./css/ColorTemplate.css";
import "./App.css";
import "./mediaApp.css";
import { Outlet } from "react-router-dom";

function App() {

  return(
    <div className="App">
      <Outlet />
    </div>
  )
}

export default App;
