import { useNavigate, useParams } from "react-router-dom";
import "./Write.css";
import {
  BEAuthSpecificPostRoute,
  FEAuthSpecificBlogRoute,
} from "./RouteDefinitions";
import { useEffect, useState } from "react";

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [titleAlert, setTitleAlert] = useState("");
  const [bodyAlert, setBodyAlert] = useState("");

  const [postData, setPostData] = useState({
    loaded: false,
    title: "",
    body: "",
  });

  const fetchBlog = async () => {
    const handleFetch = async () => {
      return await fetch(
        import.meta.env.VITE_BACKEND + BEAuthSpecificPostRoute + blogId,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
    };
    try {
      const res = await handleFetch();
      if (res.ok) {
        const post = await res.json();
        post.loaded = true;
        post.date = " " + post["date"].split("T")[0];
        setPostData(post);
      } else {
        const err = await res.text();
        throw new Error(err);
      }
    } catch (err) {
      const errMsg = JSON.parse(err.message);
      console.log("failed to fetch the specific blog -> ", errMsg);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleBlogWrite = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const writeFetch = async () =>
      await fetch(
        import.meta.env.VITE_BACKEND + BEAuthSpecificPostRoute + blogId,
        {
          method: "PUT",
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

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
      console.log("blog update failed -> ", errMsg);
      setTitleAlert(errMsg["title"]);
      setBodyAlert(errMsg["body"]);
      return;
    }

    console.log("successful blog update -> ", data);
    navigate(FEAuthSpecificBlogRoute + blogId);
  };

  return (
    <div className="write-container">
      <div className="write">
        <h2>Pen your thoughts</h2>
        <form id="write-form" onSubmit={handleBlogWrite}>
          <div className="form-element">
            <label htmlFor="form-title">Title of the blog</label>
            {titleAlert && (
              <label htmlFor="form-title-alert" className="form-alert">
                {titleAlert}
              </label>
            )}
            <input
              type="text"
              name="title"
              id="form-title"
              defaultValue={postData.title}
              required
            />
          </div>
          <div className="form-element">
            <label htmlFor="form-body">Contents</label>
            {bodyAlert && (
              <label htmlFor="form-body-alert" className="form-alert">
                {bodyAlert}
              </label>
            )}
            <textarea
              name="body"
              id="form-body"
              defaultValue={postData.body}
              required
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
