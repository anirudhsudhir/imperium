import App from './App';
import Landing from './Landing';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';

const routes = [
    {
        path: "/",
        element: <App />
        ,
        children: [
            {
                index: true,
                element: <Landing />
            },
            {
                path: "/signin",
                element: <SignIn />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
        ]
    },
    {
        path: "/user",
        element: <ProtectedRoute />,
        children: [
            {
                children: [
                    {
                        index: true,
                        element: <Home />

                    },
                    // {
                    //     path: "/user/myblogs",
                    //     element: <MyBlogs />
                    // },
                    // {
                    //     path: "/user/newblog",
                    //     element: <NewBlog />
                    // },
                    // {
                    //     path: "/user/account",
                    //     element: <Account />
                    // },
                    {
                        path: "/user/signout",
                        element: <SignOut />
                    }
                ]
            },
        ]
    }
]

export default routes;