import { useNavigate } from "react-router-dom";
import "./Write.css";
import { BEAuthWriteRoute, FEAuthSpecificBlogRoute } from "./RouteDefinitions";
import { useState } from "react";

const Write = () => {
  const navigate = useNavigate();
  const [titleAlert, setTitleAlert] = useState("");
  const [bodyAlert, setBodyAlert] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const writeFetch = async () =>
      await fetch(import.meta.env.VITE_BACKEND + BEAuthWriteRoute, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

    let data = {};
    try {
      const res = await writeFetch();
      if (res.ok) {
        data = await res.json();
        console.log(data);
      } else {
        const err = await res.text();
        throw new Error(err);
      }
    } catch (err) {
      console.log(err);
      const errMsg = JSON.parse(err.message);
      console.log("write failed -> ", errMsg);
      setTitleAlert(errMsg["title"]);
      setBodyAlert(errMsg["body"]);
      return;
    }

    console.log("successful blog write -> ", data.blogId);
    navigate(FEAuthSpecificBlogRoute + data.blogId);
  };

  return (
    <div className="write-container">
      <div className="write">
        <h2>Pen your thoughts</h2>
        <form id="write-form" onSubmit={handleSignIn}>
          <div className="form-element">
            <label htmlFor="form-title">Title of the blog</label>
            {titleAlert && (
              <label htmlFor="form-title-alert" className="form-alert">
                {titleAlert}
              </label>
            )}
            <input type="text" name="title" id="form-title" required />
          </div>
          <div className="form-element">
            <label htmlFor="form-body">Contents</label>
            {bodyAlert && (
              <label htmlFor="form-body-alert" className="form-alert">
                {bodyAlert}
              </label>
            )}
            <textarea name="body" id="form-body" required />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default Write;
