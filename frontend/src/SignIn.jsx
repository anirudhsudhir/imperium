import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { BESignInRoute, FEAuthHomeRoute } from "./RouteDefinitions";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [usernameAlert, setUsernameAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const signinFetch = async () =>
      await fetch(import.meta.env.VITE_BACKEND + BESignInRoute, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

    let data = {};
    try {
      const res = await signinFetch();
      if (res.ok) {
        data = await res.json();
      } else {
        const err = await res.text();
        throw new Error(err);
      }
    } catch (err) {
      const errMsg = JSON.parse(err.message);
      console.log("sign in failed -> ", errMsg);
      setUsernameAlert(errMsg["username"]);
      setPasswordAlert(errMsg["password"]);
      return;
    }

    console.log("successful sign in with token -> ", data);
    localStorage.setItem("jwt", data);
    localStorage.setItem("username", formData.get("username"));
    navigate(FEAuthHomeRoute);
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in">
        <h2>Login To Your Account</h2>
        <form id="sign-in-form" onSubmit={handleSignIn}>
          <div className="form-element">
            <label htmlFor="form-username">Username</label>
            {usernameAlert && (
              <label htmlFor="form-username-alert" className="form-alert">
                {usernameAlert}
              </label>
            )}
            <input type="text" name="username" id="form-username" required />
          </div>
          <div className="form-element">
            <label htmlFor="form-password">Password</label>
            {passwordAlert && (
              <label htmlFor="form-password-alert" className="form-alert">
                {passwordAlert}
              </label>
            )}
            <input
              type="password"
              name="password"
              id="form-password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
