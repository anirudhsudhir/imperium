import { useNavigate } from "react-router-dom";
import "./SignIn.css"
import { BESignInRoute, FEAuthHomeRoute } from "./RouteDefinitions";

const SignIn = () => {
    const navigate = useNavigate();
    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form)

        fetch(process.env.REACT_APP_BACKEND + BESignInRoute, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error("failed to sign up")
        }).then((resJson) => {
            console.log("successful sign in")
            console.log(resJson)
            localStorage.setItem('jwt', resJson)
            navigate(FEAuthHomeRoute)
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className="sign-in-container">
            <div className="sign-in">
                <h2>Login To Your Account</h2>
                <form id="sign-in-form" onSubmit={handleSignIn}>
                    <div className='form-element'>
                        <label htmlFor='form-username'>Username</label>
                        <input type='text' name="username" id='form-username' required />
                    </div>
                    <div className='form-element'>
                        <label htmlFor='form-password'>Password</label>
                        <input type='password' name="password" id='form-password' required />
                    </div>
                    <button type='submit'>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;