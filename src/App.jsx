import "./App.css";
import axios from "axios";
import { Home } from "./Home";

function App() {
  axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
