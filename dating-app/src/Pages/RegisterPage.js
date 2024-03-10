import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [dropdown, setDropdown] = useState(false);

    let navigate = useNavigate();


    const loggedIn = () => {
        let path = '/';
        navigate(path);
    }

    const register = async () => {
        try {
            let response = await fetch("http://localhost:7271/Register", {
                method: "POST",

                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(`{ "firstName": "${firstname}", "lastName": "${lastname}", "username": "${username}", "email": "${email}", "passphrase": "${password}", "age": ${age}, "gender": "${gender}" }`),
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

    const handleDropdown = (e) => {
        setGender(e.target.value)
        setDropdown(!dropdown)
    }

    const handleDropdownOpen = () => {
        setDropdown(!dropdown)
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="loginBox">
                    <h7 className="boxheader">
                        Register
                    </h7>
                    <br />
                    <input className="loginInput" placeholder="FirstName" onChange={(e) => setFirstname(e.target.value)} />
                    <br />
                    <input className="loginInput" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
                    <br />
                    <input className="loginInput" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                    <br />
                    <input className="loginInput" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <input className="loginInput" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <input className="loginInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    {dropdown ? (
                        <div>
                            {gender !== "" ? (
                                <div>
                                    <text style={{ fontSize: '16px' }}>Currently Selected Gender: {gender}</text>
                                </div>
                            ) : null}
                            <ul className="genderList">
                                <li className='genders'><button className='button' value={"Man"} onClick={handleDropdown}>Man</button></li>
                                <li className='genders'><button className='button' value={"Woman"} onClick={handleDropdown}>Woman</button></li>
                                <li className='genders'><button className='button' value={"Other"} onClick={handleDropdown}>Other</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            {gender !== "" ? (
                                <div>
                                    <text style={{ fontSize: '16px' }}>Currently Selected Gender: {gender}</text>
                                    <br />
                                </div>
                            ) : null}
                            <button className='genderButton' onClick={handleDropdownOpen}>Gender</button>
                            <br />
                        </div>
                    )}
                    <button className='button' onClick={register}>Register</button>
                </div>
            </header >
        </div >
    );
}

export default RegisterPage;
