import Landing from "./Landing";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import MyBlogs from "./MyBlogs";
import Write from "./Write";
import Account from "./Account";
import SignOut from "./SignOut";
import Blog from "./Blog";
import { ProtectedRoute, UnProtectedRoute } from "./ProtectedRoute";
import {
  FEAuthAccountRoute,
  FEAuthHomeRoute,
  FEAuthMyBlogsRoute,
  FEAuthSignOutRoute,
  FEAuthSpecificBlogRoute,
  FEAuthWriteRoute,
  FELandingRoute,
  FESignInRoute,
  FESignUpRoute,
} from "./RouteDefinitions";

const routes = [
  {
    path: FELandingRoute,
    element: <UnProtectedRoute />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: FESignInRoute,
        element: <SignIn />,
      },
      {
        path: FESignUpRoute,
        element: <SignUp />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: FEAuthHomeRoute,
        element: <Home />,
      },
      {
        path: FEAuthMyBlogsRoute,
        element: <MyBlogs />,
      },
      {
        path: FEAuthWriteRoute,
        element: <Write />,
      },
      {
        path: FEAuthAccountRoute,
        element: <Account />,
      },
      {
        path: FEAuthSignOutRoute,
        element: <SignOut />,
      },
      {
        path: FEAuthSpecificBlogRoute + ":blogId",
        element: <Blog />,
      },
    ],
  },
];

export default routes;
