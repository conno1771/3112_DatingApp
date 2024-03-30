import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";

export const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      let login = "";
      username.includes("@") ? (login = "email") : (login = "username");
      let response = await fetch("https://localhost:7271/Login", {
        method: "POST",

        headers: {
          accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        },
        body:JSON.stringify({ "firstName": "",
        "lastName": "",
        "username": "",
        "email": username,
        "passphrase": password,
        "token": "",
        "age": 0,
        "gender": "",
        "paid": false,
        "isAdmin": false })
      });

      let user = await response.json();
      props.user({
        age: user.age,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        gender: user.gender,
        isPaid: user.isPaid,
        Admin: user.Admin,
      });
      console.log(props);
      loggedIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.userData.username !== undefined) {
      loggedIn();
    }
  }, []);

  let navigate = useNavigate();

  const loggedIn = () => {
    let path = "/home";
    navigate(path);
  };

  const routeChange = () => {
    let path = "/register";
    navigate(path);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="loginBox">
          <h7 className="boxheader" style={{ color: "#46475d", fontSize: 48 }}>
            Sign in
          </h7>
          <br />
          <input
            className="loginInput"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            className="loginInput"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="button" onClick={routeChange}>
            Create Account
          </button>
          <button className="button" onClick={login}>
            Login
          </button>
        </div>
      </header>
    </div>
  );
};
