import Landing from './Landing';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import MyBlogs from './MyBlogs';
import Write from './Write';
import Account from './Account';
import SignOut from './SignOut';
import { ProtectedRoute, UnProtectedRoute } from './ProtectedRoute';
import { FEAuthAccountRoute, FEAuthHomeRoute, FEAuthMyBlogsRoute, FEAuthSignOutRoute, FEAuthWriteRoute, FELandingRoute, FESignInRoute, FESignUpRoute } from './AppRoutes';

const routes = [
    {
        path: FELandingRoute,
        element: <UnProtectedRoute />,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: FESignInRoute,
                element: <SignIn />
            },
            {
                path: FESignUpRoute,
                element: <SignUp />
            },
        ]
    },
    {
        path: "/user",
        element: <ProtectedRoute />,
        children: [
            {
                path: FEAuthHomeRoute,
                element: <Home />
            },
            {
                path: FEAuthMyBlogsRoute,
                element: <MyBlogs />
            },
            {
                path: FEAuthWriteRoute,
                element: <Write />
            },
            {
                path: FEAuthAccountRoute,
                element: <Account />
            },
            {
                path: FEAuthSignOutRoute,
                element: <SignOut />
            }
        ]
    },
]

export default routes;