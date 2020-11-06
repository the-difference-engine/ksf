import React from "react";
import logo from "./logo.svg";
import GoogleBtn from "./components/GoogleBtn/GoogleBtn";
import "./App.css";
import FamilyMemberInfo from "./family_information#121/family_information"
import family_info from "./family_information#121/family_info"

function App() {
  return (
    <div className="App">
      <div>
        <GoogleBtn />
        <FamilyMemberInfo {...family_info} />
      </div>
    </div>
  );
}

export default App;
