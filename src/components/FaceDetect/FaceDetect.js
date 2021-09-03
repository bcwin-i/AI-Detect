import React from "react";
import "./facedetect.css";

const FaceDetect = ({ status, result, box, onLoad, loadingSatus, onError }) => {
  console.log("topRow", box.topRow);
  console.log("bottomRow", box.bottomRow);
  console.log("topRow", box.topRow);
  console.log("bottomRow", box.bottomRow);
console.log('step', 3);
console.log('status results', status);
  return (
    <div className='center ma'>
      {(status === "1" && loadingSatus !== "0") ? (
        <div className='absolute'>
          <img
            id="input-image"
            alt=""
            src={result}
            width='500px' heigh='auto'
            onLoad={onLoad}
            onError={onError}
          />
          {box.map((box, i) => {
            console.log('faces', box)
            const { topRow, rightCol, bottomRow, leftCol } = box;
            return (
              <div
                key={i}
                className="bounding-box"
                style={{
                  top: topRow,
                  right: rightCol,
                  bottom: bottomRow,
                  left: leftCol,
                }}
              ></div>
            );
          })}
        </div>
      ) : (
        
          <div className="white">
            {
              status === "0"
              ? "load image..": 
              status === "0.1"
              ? "loading image..": 
              status === "1.2"
              ? "error loading..":
              status === "2.2" 
              ? "no face detected" : ""
            }
          </div>
      )}
    </div>
  );
};

export default FaceDetect;
