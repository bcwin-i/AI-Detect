//Import libraries
import React from "react";

//import files
import "../../colors.css";
import "./navigation.css";

const Navigation = ({ ...props }) => {
  return (
    <nav>
      {props.onState ? (
        <div
          onClick={() => props.onRouteChanges("signin")}
          id="first"
          className="buttonBox">
          <button>{props.onState === "signin" ? "Sign in" : "Sign out"}</button>
          <div className="border"></div>
          <div className="border"></div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navigation;
