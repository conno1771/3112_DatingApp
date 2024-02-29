import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useState } from 'react';



function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();
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
                    <button onClick={routeChange}>Create Account</button>
                    <button onClick={() => setUsername(" ")}>Login</button>
                </div>
            </header>
        </div >
    );
}

export default LoginPage;
