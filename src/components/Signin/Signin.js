import React, { useState } from "react";

import "./signin.css";

const Signin = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logindSatus, setLoginSatus] = useState("");
  

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignin = () => {
    //()=> props.onRouteChanges('register')
    setLoginSatus("");
    if (emailValidate(email)) {
      const user = {
        email: email,
        password: password,
      };

      fetch("http://localhost:3001/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((user) => {
          if(user) {
            props.onUserAccess(user)
            props.onRouteChanges('home')
          }else setLoginSatus("unmatch user credentials");
        })
        .catch((e) => console.log(e));
    } else {
      setLoginSatus("wrong email format.");
    }
  };

  const emailValidate = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return true;
    return false;
  };

  return (
    <article className="br3 ba bg-white-90 b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 white-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 black fw6 ph0 mh0 signTitle">Sign In</legend>
            <div className="mt3">
              <label
                className="db black fw6 lh-copy f6"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent focus-black hover-bg-white hover-black w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={emailChange}
              />
            </div>
            <div className="mv3">
              <label className="db black fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100"
                type="password"
                name="password"
                id="password"
                onChange={passwordChange}
              />
              <label className="db dark-gray lh-copy f6">{logindSatus}</label>
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 black input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={onSubmitSignin}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={()=>props.onRouteChanges('register')}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
};

export default Signin;
