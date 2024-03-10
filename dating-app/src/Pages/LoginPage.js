import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useState, useEffect } from 'react';



function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            let login = ""
            username.includes('@') ? login = "email" : login = "username";
            let response = await fetch("http://localhost:7271/Login", {
                method: "POST",

                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(`{ "${login}": "${username}", "passphrase": "${password}" }`),
            });

            let user = await response.json();
            props.user({
                age: user.age,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                password: user.password,
                gender: user.gender
            })
            console.log(props)
            loggedIn();
        } catch (error) {

            console.log(error);
        }
    }

    useEffect(() => {
        if (props.userData.username !== undefined) {
            loggedIn()
        }
    }, []);

    let navigate = useNavigate();

    const loggedIn = () => {
        let path = '/home';
        navigate(path);
    }

    const routeChange = () => {
        let path = '/register';
        navigate(path);
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className="loginBox">
                    <h7 className="boxheader">
                        Sign in
                    </h7>
                    <br />
                    <input className="loginInput" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <input className="loginInput" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button className='button' onClick={routeChange}>Create Account</button>
                    <button className='button' onClick={login}>Login</button>
                </div>
            </header>
        </div >
    );
}

export default LoginPage;