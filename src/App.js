//Import libraries
import React, { useState, useEffect } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

//Import local files
import "./colors.css";
import "./fonts.css";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ImageResultDisplay from "./components/ImageResultDisplay/ImageResultDisplay";
import particlesConfig from "./config/particlesjs-config.json";
import FaceDetect from "./components/FaceDetect/FaceDetect";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

//Clarifai API key declaration
const app = new Clarifai.App({
  apiKey: "6f0f80702be84d528801372489f1eefa",
});

function App() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("0");
  const [result, setResult] = useState("");
  const [recFace, setRecFace] = useState([]);
  const [loadinStatus, setLoadingStatus] = useState("0");
  const [route, setRoute] = useState("signin");
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  //Connecting to server
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = "AI DETECT";

  //   //Creating a server
  //   fetch("http://localhost:3001/")
  //     .then((response) => response.json())
  //     .then((values) => console.log(values))
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // });

  const updateUser = (user) => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    });
    //console.log(user.name)
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log("dimension", width + " " + height);
    return clarifaiFace.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
  };

  const displayFaceBox = (recFace) => {
    user.entries++
    recFace.length ? setRecFace(recFace) : setStatus("2.2");
  };

  const onUrlChange = (event) => {
    var urlValue = event.target.value;
    setUrl(urlValue);
  };

  const onLoadError = () => {
    setLoadingStatus("0");
    setStatus("1.2");
  };

  const onLoadChange = () => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, url).then(
      function (response) {
        // response data fetch from FACE_DETECT_MODEL
        console.log(response);
        /* the data needed from the response data from clarifai API,
         note we are just comparing the two*/
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        );

        console.log("step", 1.1);
        displayFaceBox(calculateFaceLocation(response));
      },
      function (err) {
        console.log("step", 1.2);
      }
    );
  };

  const detectImage = () => {
    setResult(url);
    setStatus("1");
    setLoadingStatus("1");
    console.log("step", 1);
  };

  const scanImage = () => {
    console.log("step", 0);
    url.length ? detectImage() : setStatus("0");
  };

  const EnterKeyDown = (event) => {
    if (event.key === "Enter") {
      var urlValue = event.target.value;
      setUrl(urlValue);
      scanImage();
    }
  };

  const onRouteChange = (route) => {
    console.log("route", route);
    setRoute(route);

    if (route !== "signin" && route !== "register") setLogin(true);
    else setLogin(false);
  };

  return (
    <div className="App">
      <Particles params={particlesConfig} className="partback" />
      <header className="App-header">
        <Navigation onRouteChanges={onRouteChange} onState={login} />
      </header>
      <h1 className="try">AI system</h1>
      <p className="desc">machine learning powered detecting system</p>
      {route === "signin" ? (
        <Signin onRouteChanges={onRouteChange} onUserAccess={updateUser}/>
      ) : route === "register" ? (
        <Register onRouteChanges={onRouteChange}  onUserAccess={updateUser}/>
      ) : (
        <div>
          <h2>
            <ImageResultDisplay name={user.name} entries={user.entries}/>
          </h2>
          <ImageLinkForm
            urlChange={onUrlChange}
            onEnterKey={EnterKeyDown}
            onButtonClick={scanImage}
          />
          <FaceDetect
            status={status}
            result={result}
            box={recFace}
            onLoad={onLoadChange}
            onError={onLoadError}
            loadinStatus={loadinStatus}
          />
        </div>
      )}
    </div>
  );
}

export default App;
