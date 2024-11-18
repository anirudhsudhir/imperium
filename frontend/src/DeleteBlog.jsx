import { useNavigate, useParams } from "react-router-dom";
import {
  BEAuthSpecificPostRoute,
  FEAuthMyBlogsRoute,
} from "./RouteDefinitions";
import { useEffect } from "react";

const DeleteBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

  const handleBlogDelete = async () => {
    const deleteFetch = async () =>
      await fetch(
        import.meta.env.VITE_BACKEND + BEAuthSpecificPostRoute + blogId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );

    let data = {};
    try {
      const res = await deleteFetch();
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
      console.log("delete failed -> ", errMsg);
      return;
    }

    console.log("successful blog delete -> ", data);
    navigate(FEAuthMyBlogsRoute);
  };

  useEffect(() => {
    handleBlogDelete();
  }, []);
};

export default DeleteBlog;
