import React, { useState } from "react";
import "./imagelinkform.css";
import searchIcon from "../../images/qr-code-scan.png";

const ImageLinkForm = ({ urlChange, onEnterKey, onButtonClick }) => {
  const [status, setStatus] = useState("..");

  return (
    <div className="mb5">
      <p className="block">
        Paste image file url to detect face in picture {status}
      </p>
      <div style={{ position: "relative", height: "60px"}}>
        <div className="searchBox">
          <input
            onChange={urlChange}
            onKeyDown={onEnterKey}
            className="searchInput"
            type="text"
            name=""
            placeholder="image file url"
          />
          <button className="searchButton" onClick={onButtonClick}>
            <img className="imag" alt="search_icon" src={searchIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
