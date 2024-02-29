import '../App.css';
import { useState } from 'react';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="App">
            <header className="App-header">
                <div className="loginBox">
                    <h7 className="boxheader">
                        Register
                    </h7>
                    <br />
                    <input className="loginInput" placeholder="email" onChange={(e) => setUsername(e.target.value)} />
                    <text>{username}</text>
                    <br />
                    <input className="loginInput" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <text>{username}</text>
                    <br />
                    <input className="loginInput" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <text>{password}</text>
                    <br />
                    <button onClick={() => setUsername(" ")}>Register</button>
                </div>
            </header>
        </div >
    );
}

export default RegisterPage;