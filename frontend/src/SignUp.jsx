import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { BESignUpRoute, FEAuthHomeRoute } from "./RouteDefinitions";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [usernameAlert, setUsernameAlert] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const signUpFetch = async () =>
      await fetch(import.meta.env.VITE_BACKEND + BESignUpRoute, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

    let data = {};
    try {
      const res = await signUpFetch();
      if (res.ok) {
        data = await res.json();
      } else {
        const err = await res.text();
        throw new Error(err);
      }
    } catch (err) {
      const errMsg = JSON.parse(err.message);
      console.log("sign up failed -> ", errMsg);
      setUsernameAlert(errMsg["username"]);
      return;
    }

    console.log("successful sign up with token -> ", data);
    localStorage.setItem("jwt", data);
    navigate(FEAuthHomeRoute);
  };
  return (
    <div className="sign-in-container">
      <div className="sign-in">
        <h2>Create an Account</h2>
        <form id="sign-in-form" onSubmit={handleSignUp}>
          <div className="form-element">
            <label htmlFor="form-email">Email</label>
            <input type="email" name="email" id="form-email" required />
          </div>
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
            <input
              type="password"
              name="password"
              id="form-password"
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
