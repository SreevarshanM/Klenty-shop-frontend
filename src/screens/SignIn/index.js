import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Api } from "../../utils/Api";
import { setToken } from "../../utils/localstorage";
import "./signIn.css";
import { useAlert } from "react-alert";
import { Circles } from "react-loader-spinner";
function Index() {
  const { replace, push } = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const _handleSubmit = useCallback(async () => {
    if (!email || !password) {
      alert.error("Enter all input !");
      return;
    }

    // callback
    if (email.length > 2 && password.length > 2) {
      setLoading(true);
      const { statusCode, data } = await Api.postRequest("/api/user/signin", {
        email,

        password,
      });
      setLoading(false);

      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false);
        alert.error(data);
        return;
      }
      const { token } = JSON.parse(data);
      setToken(token);
      replace("/");
    }
  }, [email, password, replace]);

  if (loading)
    return (
      <div className="center">
        <Circles
          height="80"
          width="80"
          color="#6f114f"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  return (
    <div className="signinscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              // backgroundColor: 'red',
            }}
          >
            <div style={{ cursor: "pointer" }} onClick={() => push("/")}>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Sign In</p>
          </div>

          <label for="email">Email</label>
          <input
            required
            type="email"
            id="lname"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            required
            type="password"
            id="lname"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/signup" className="link">
            <span>Creat a new account ?</span>
          </Link>
          <br />

          <input type="submit" value="Sign in" onClick={_handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Index;
