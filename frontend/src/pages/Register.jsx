
import { useState, useContext,useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../context/authContext";
import "../styles/register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const [emailFocused,setEmailFocused]=useState(false);
const[nameFocused,setNameFocused]=useState(false);
 const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(authContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    let hasError = false;

    // Name validation
    if (name.trim().length < 6) {
      setErrors((prev) => ({
        ...prev,
        name: "Full name must be at least 6 characters",
      }));

      hasError = true;
    }

    // Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));

      hasError = true;
    }

    // Password validation
    if (password.length < 12) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 12 characters",
      }));

      hasError = true;
    }

    if (!/[A-Z]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain an uppercase letter",
      }));

      hasError = true;
    }

    if (!/[a-z]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain a lowercase letter",
      }));

      hasError = true;
    }

    if (!/[0-9]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain a number",
      }));

      hasError = true;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\\/+=;'`~]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain a special character",
      }));

      hasError = true;
    }

    // Stop here if validation failed
    if (hasError) {
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          "Register successful! Please check your email for the welcome OTP"
        );

        login(data);
        navigate("/");
      } else {
        setErrors((prev) => ({
          ...prev,
          email: data.message || "Registration failed",
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>

        {/* NAME */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onFocus={()=>setNameFocused(true)}
            onBlur={()=>setNameFocused(false)}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);

              if (value.trim().length >= 6) {
                setErrors((prev) => ({
                  ...prev,
                  name: "",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  name: "Full name must be at least 6 characters",
                }));
              }
            }}
          />

          {name.length>0 && (
            <p className={(nameFocused && !errors.name) ? "noerr-message" : "error-message"  }>{errors.name || (nameFocused ? "name Format is Correct":"")}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
           onFocus={() => setEmailFocused(true)}
           onBlur={() => setEmailFocused(false)}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              if (emailRegex.test(value)) {
                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  email: "Please enter a valid email address",
                }));
              }
            }}
          />

          {email.length>0 && (
            <p className={(emailFocused && !errors.email) ? "noerr-message" : "error-message"  }>  {errors.email || (emailFocused ? "Email looks good!" : "")}</p>
          )}

         

        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/* Password requirements */}
          <div className="password-requirements">

            <p className={password.length >= 12 ? "valid" : "invalid"}>
              {password.length >= 12 ? "✓" : "✗"} At least 12 characters
            </p>

            <p className={/[A-Z]/.test(password) ? "valid" : "invalid"}>
              {/[A-Z]/.test(password) ? "✓" : "✗"} One uppercase letter
            </p>

            <p className={/[a-z]/.test(password) ? "valid" : "invalid"}>
              {/[a-z]/.test(password) ? "✓" : "✗"} One lowercase letter
            </p>

            <p className={/[0-9]/.test(password) ? "valid" : "invalid"}>
              {/[0-9]/.test(password) ? "✓" : "✗"} One number
            </p>

            <p
              className={
                /[!@#$%^&*(),.?":{}|<>_\-\\[\]\\/+=;'`~]/.test(password)
                  ? "valid"
                  : "invalid"
              }
            >
              {/[!@#$%^&*(),.?":{}|<>_\-\\[\]\\/+=;'`~]/.test(password)
                ? "✓"
                : "✗"}{" "}
              One special character
            </p>

          </div>
        </div>

        <button type="submit" className="btn">
          Register
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

