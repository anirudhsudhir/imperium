import { BEAuthDeleteUser, FELandingRoute } from "./RouteDefinitions";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const deleteAccountFetch = async () =>
      await fetch(
        import.meta.env.VITE_BACKEND +
          BEAuthDeleteUser +
          localStorage.getItem("username"),
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        },
      );

    let data = {};
    try {
      const res = await deleteAccountFetch();
      if (res.ok) {
        data = await res.json();
      } else {
        const err = await res.text();
        throw new Error(err);
      }
    } catch (err) {
      console.log(err);
      const errMsg = JSON.parse(err.message);
      console.log("account deletion failed -> ", errMsg);
      return;
    }

    console.log("account deletion succeeded -> ", data);
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    navigate(FELandingRoute);
  };

  return (
    <div
      className="account-container"
      style={{
        height: "50%",
        width: "15%",
        alignSelf: "center",

        display: "flex",
        flexDirection: "column",
        padding: "1em 0.5em 2em",
        gap: "1em",

        border: "2px solid var(--tx-3)",
        borderRadius: "15px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="account-username">
        Username: {localStorage.getItem("username")}
      </div>
      <button
        id="account-delete-btn"
        onClick={() => {
          let res = confirm("Do you wish to delete your account?");
          res && deleteAccount();
        }}
        style={{
          border: "none",
          border: "2px solid var(--tx)",
          borderRadius: "5px",
          fontSize: "1em",
          padding: "0.5em",
          backgroundColor: "var(--ui)",
        }}
      >
        Delete Account
      </button>
    </div>
  );
};

export default Account;
