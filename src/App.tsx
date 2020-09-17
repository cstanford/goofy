import React from "react";
import Header from "./components/header";
import Search from "./components/search";

import "./App.css";

function App() {
  const [showNsfw, setShowNsfw] = React.useState(true);
  return (
    <div className="App">
      <Header showNsfw={showNsfw} setShowNsfw={setShowNsfw}/>
      <Search showNsfw={showNsfw} setShowNsfw={setShowNsfw}/>
    </div>
  );
}

export default App;
