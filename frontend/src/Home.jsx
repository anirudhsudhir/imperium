import { useEffect, useState } from "react";
import { BEAuthHomeRoute, FEAuthSpecificBlogRoute } from "./RouteDefinitions";
import { Link } from "react-router-dom";

const Home = () => {
  let [allPosts, setAllPosts] = useState([]);
  let [allPostsAlert, setAllPostsAlert] = useState("");

  const fetchAllPosts = async () => {
    const handleFetch = async () => {
      return await fetch(import.meta.env.VITE_BACKEND + BEAuthHomeRoute, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
    };
    try {
      const res = await handleFetch();
      if (res.ok) {
        const allPosts = await res.json();
        const allPostCards = allPosts.map((post) => (
          <div
            className="post-card-container"
            key={post._id}
            style={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid var(--tx)",
              padding: "0.5em",
              gap: "0.2em",
            }}
          >
            <div className="post-card-title">
              <Link to={FEAuthSpecificBlogRoute + post._id}>{post.title}</Link>
            </div>
            <div className="post-card-author">Author: {post.author}</div>
            {post.date && (
              <div className="post-card-date">
                Date:
                {" " + post["date"].split("T")[0]}
              </div>
            )}
          </div>
        ));
        setAllPosts(allPostCards);
      } else {
        const err = await res.text();
        throw new Error(err);
      }
    } catch (err) {
      console.log(err);
      const errMsg = JSON.parse(err.message);
      console.log("failed to fetch all posts -> ", errMsg);
      setAllPostsAlert(errMsg);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div
      className="home-container"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1em 0.5em 2em",
        gap: "0.5em",
      }}
    >
      {allPosts}
    </div>
  );
};

export default Home;
