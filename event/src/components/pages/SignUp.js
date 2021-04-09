import React, { useEffect, useState } from "react";
import "./Sign in & Sign up Form.css";
import log from "../../Assets/log.png";
import register from "../../Assets/register.png";
import axios from "axios";
// import { Redirect } from "react-router";
export default function SignUp({ history }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState({});
  const [errorlogin, setErrorlogin] = useState("");
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    let newUser = { firstName, lastName, email, password };
    console.log(user);
    try {
      const { data } = await axios.post("/api/auth/register", newUser);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      console.log(user);
      // const container = document.querySelector(".container");
      // container.classList.add("sign-up-mode");
      console.log(data);
      // history.push("/services");
    } catch (error) {
      console.log(error);
    }
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    let newUser = { email, password };
    console.log(user);
    try {
      const res = await axios.post("/api/auth/login", newUser);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      // console.log(user);
      // console.log(data);
      window.location.assign("/services");
    } catch (error) {
      console.log(error.response.data);
      setErrorlogin(error.response.data[0].msg);
    }
  };
  useEffect(async () => {
    const isAuth = await axios.get("api/auth/current_user");
  }, []);
  return (
    <>
      <div className="container">
        <h1 style={{ color: "red" }}>{errorlogin}</h1>
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" onSubmit={handlelogin}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Login" className="btn2 solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
            <form onSubmit={handleRegister} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="FirstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="LastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="btn2" type="submit">
                Sign up
              </button>
              {/* <input
                type="submit"
                className="btn2"
                value="Sign up"
                onClick={handleRegister}
              /> */}
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button className="btn2 transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={log} className="imagesign" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button className="btn2 transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={register} className="imagesign" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
