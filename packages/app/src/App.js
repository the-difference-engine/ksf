import React from "react";
import logo from "./logo.svg";
import GoogleBtn from "./components/GoogleBtn/GoogleBtn";
import "./App.css";
import FamilyMemberInfo from "./components/familyInformation/familyInformation";
import family_info from "./components/familyInformation/dummyData";

function App() {
  return (
    <div className="App">
      <div>
        <GoogleBtn />
        <div style={{ width: "40vw", margin: "0 auto" }}>
          <FamilyMemberInfo {...family_info} />
        </div>
      </div>
    </div >
  );
}

export default App;
