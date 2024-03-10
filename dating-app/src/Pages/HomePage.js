import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useState, useEffect } from 'react';



function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        if (props.userData.username === undefined) {
            notLoggedIn();
        } else {
            setUsername(props.userData.username);
            setPassword(props.userData.password);
            setAge(props.userData.age);
            setFirstname(props.userData.firstname);
            setLastname(props.userData.lastname);
            setEmail(props.userData.email);
            setGender(props.userData.gender);
        }
    }, []);

    let navigate = useNavigate();

    const notLoggedIn = () => {
        let path = '/';
        navigate(path);
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="loginBox">
                    <h7 className="boxheader">
                        {age} {firstname} {lastname} {email}
                    </h7>
                </div>
            </header>
        </div >
    );
}

export default LoginPage;