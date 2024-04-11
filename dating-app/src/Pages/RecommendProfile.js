import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";



const RecommendProfile = (props) => {

    const accept = () => {
        props.response(true, props.username)
    }

    const reject = () => {
        props.response(true, props.username)
    }
    return (
        <div className="App" style={{ height: 'auto', width: '100%', paddingBottom: 20, marginRight: 20 }}>
            <header className="App-header" style={{ textAlign: "left", minHeight: 10 }}>
                <div className="loginBox">
                    <h7 style={{ color: "wheat", fontSize: 22 }}>
                        Name: {props.user.name}
                    </h7>
                    <br />
                    <h7 style={{ color: "wheat", fontSize: 22 }}>
                        Age: {props.user.age}
                    </h7>
                    <br />
                    <h7 style={{ color: "wheat", fontSize: 22 }}>
                        Gender: {props.user.gender}
                    </h7>
                    <br />
                    <h7 style={{ color: "wheat", fontSize: 22 }}>
                        Skills:
                    </h7>
                    <br />
                    <h7 style={{ color: "wheat", fontSize: 22, marginLeft: 20 }}>
                        Languages:
                    </h7>
                    <br />
                    <div style={{ marginLeft: 40 }}>
                        <h7 style={{ color: "wheat", fontSize: 22 }}>
                            {props.user.skills.languages.map(e => `${e}, `)}
                        </h7>
                        <br />
                    </div>
                    <h7 style={{ color: "wheat", fontSize: 22, marginLeft: 20 }}>
                        Hobbies:
                    </h7>
                    <br />
                    <div style={{ marginLeft: 40 }}>
                        <h7 style={{ color: "wheat", fontSize: 22 }}>
                            {props.user.skills.hobbies.map(e => `${e}, `)}
                        </h7>
                        <br />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button className="button" style={{ marginRight: 40, fontSize: 18 }} onClick={accept}>
                            Accept
                        </button>
                        <button className="button" style={{ marginRight: 40, fontSize: 18 }} onClick={reject}>
                            Reject
                        </button>
                    </div>
                </div>
            </header >
        </div >
    );
};

export default RecommendProfile;