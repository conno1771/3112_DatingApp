import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [status, setStatus] = useState("");

  let navigate = useNavigate();

  const loggedIn = () => {
    let path = "/";
    navigate(path);
  };

  const register = async () => {
    try {
        let response = await fetch("https://localhost:7271/Register", {
            method: "POST",
    
            headers: {
              accept: "application/json",
              "Content-Type": "application/json; charset=utf-8",
            },
        body: JSON.stringify({
            "firstName": firstname,
            "lastName": lastname,
            "username": username,
            "email": email,
            "passphrase": password,
            "token": "",
            "age": age,
            "gender": gender,
            "paid": false,
            "isAdmin": false
          }),
      });
      let user = await response.json();

      if (user.token.includes("user registration failed")) {
        setStatus("Registration Failed: email already in use or age too young");
      } else {
        props.user({
            age: user.age,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password,
            gender: user.gender,
            isPaid: user.isPaid,
            admin: user.Admin,
          });
          console.log(props);
          loggedIn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdown = (e) => {
    setGender(e.target.value);
    setDropdown(!dropdown);
  };

  const handleDropdownOpen = () => {
    setDropdown(!dropdown);
  };
  const changePasswordHandler = (e) => {
    setPassword(e);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="registerBox">
          <h7 className="boxheader" style={{ color: "#46475d", fontSize: 48 }}>
            Register
          </h7>
          <br />
          <input
            style={{ color: "#46475d" }}
            className="loginInput"
            placeholder="FirstName"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <br />
          <input
            className="loginInput"
            placeholder="Lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
          <br />
          <input
            className="loginInput"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <br />
          <input
            className="loginInput"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="loginInput"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
              type="password"
              id="password"
              className="loginInput"
              placeholder="Password"
              onChange={(e) => changePasswordHandler(e.target.value)}
            />
          <br />
          {dropdown ? (
            <div>
              {gender !== "" ? (
                <div>
                  <text style={{ fontSize: "16px" }}>
                    Currently Selected Gender: {gender}
                  </text>
                </div>
              ) : null}
              <ul className="genderList">
                <li className="genders">
                  <button
                    className="button"
                    value={"Man"}
                    onClick={handleDropdown}
                  >
                    Man
                  </button>
                </li>
                <li className="genders">
                  <button
                    className="button"
                    value={"Woman"}
                    onClick={handleDropdown}
                  >
                    Woman
                  </button>
                </li>
                <li className="genders">
                  <button
                    className="button"
                    value={"Other"}
                    onClick={handleDropdown}
                  >
                    Other
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {gender !== "" ? (
                <div>
                  <text style={{ fontSize: "16px", color: "#46475d" }}>
                    Currently Selected Gender: {gender}
                  </text>
                  <br />
                </div>
              ) : null}
              <button className="genderButton" onClick={handleDropdownOpen}>
                Gender
              </button>
              <br />
            </div>
          )}
          <button className="button" onClick={register}>
            Register
          </button>
          <p>{status}</p>
        </div>
      </header>
    </div>
  );
}

export default RegisterPage;
