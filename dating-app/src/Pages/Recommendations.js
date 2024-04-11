import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";
import Profile from './RecommendProfile'

const testusers = [{
    name: "firstname lastname",
    age: "age",
    gender: "gender",
    skills: {
        languages: ["c++", "java"],
        hobbies: ["basketball", "chess", "baseball", "soccer", "kickboxing"]
    }
}, {
    name: "firstname lastname",
    age: "age",
    gender: "gender",
    skills: {
        languages: ["c++", "java"],
        hobbies: ["basketball", "chess", "baseball", "soccer", "kickboxing"]
    }
}, {
    name: "firstname lastname",
    age: "age",
    gender: "gender",
    skills: {
        languages: ["c++", "java"],
        hobbies: ["basketball", "chess", "baseball", "soccer", "kickboxing"]
    }
},]


const RecommendProfile = () => {

    return (
        <div className="App" style={{ height: '100%' }}>
            <header className="App-header" >
                <div className="loginBox" style={{ width: 'auto' }}>
                    <h7 style={{ color: "wheat", fontSize: 22 }}>
                        Recommendations:
                    </h7>
                    <div style={{ marginTop: 10 }}>
                        {testusers.map(e => (
                            <Profile user={e} />
                        ))}
                    </div>
                </div>
            </header>
        </div >
    );
};

export default RecommendProfile;