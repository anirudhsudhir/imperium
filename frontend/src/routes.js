import App from './App';
import Landing from './Landing';
import SignIn from './SignIn';
import SignUp from './SignUp';

const routes = [
    {
        path: "/",
        element: <App />,
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
]

export default routes;