import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"; // Make sure to import useState

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/l", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials), // Send the credentials state as JSON
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        alert("Email or password wrong");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (!json.success) {
        console.log("Enter Valid Details");
      }

      if (json.success) {
        console.log("Success");
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authtoken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="mt-5 d-flex justify-content-around">
            <div>
              <Link className="hov dropdown-item">
                <u>Login</u>
              </Link>
            </div>

            <div>
              <Link to="/s" className="hov dropdown-item">
                Sign in
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-5">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-5">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
