import { useParams } from "react-router-dom";
import { BEAuthSpecificPostRoute } from "./RouteDefinitions";
import { useEffect, useState } from "react";

const Blog = () => {
  const { blogId } = useParams();
  const [postData, setPostData] = useState({ loaded: false });

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
      setAllPostsAlert(errMsg);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    postData.loaded && (
      <div
        className="post-container"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1em 0.5em 2em",
          gap: "1em",
        }}
      >
        <div
          className="post-title"
          style={{
            fontWeight: 700,
            fontSize: "1.5em",
          }}
        >
          {postData.title}
        </div>
        <div
          className="post-author"
          style={{
            fontWeight: 600,
            fontSize: "1.2em",
          }}
        >
          {postData.author}
        </div>
        <div
          className="post-date"
          style={{
            fontWeight: 600,
            fontSize: "1.1em",
          }}
        >
          {postData.date}
        </div>
        <div className="post-body">{postData.body}</div>
      </div>
    )
  );
};

export default Blog;
