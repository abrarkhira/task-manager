import { useState } from "react";
import styles from "./LoginPage.module.css";
import { loginAPI, registerAPI } from "../../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (currentForm === "signup" && !formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const { data, status } = await (currentForm === "signup"
        ? registerAPI(formData)
        : currentForm === "login"
        ? loginAPI(formData)
        : null);
      console.log(status);
      if (status >= 400) {
        return toast.error("Invalid Credentials");
      }
      localStorage.setItem("authToken", data.token);
      toast.success("Login Successful");
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.mainContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.contentContainer}>
          <h1>Welcome Back!</h1>
          <p>Please login with your personal info</p>
        </div>
        <div className={styles.formConatiner}>
          <div>
            <h1>
              <span
                style={{
                  color: "#5783db",
                  fontWeight: "700",
                  letterSpacing: "2px",
                }}
              >
                Task Management System
              </span>
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            {currentForm === "login" ? (
              <div className={styles.formInput}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className={styles.errorText}>{errors.email}</p>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <p className={styles.errorText}>{errors.password}</p>
                  )}
                </div>
                <button type="submit">Login</button>
                <p className={styles.signupText}>
                  Don't have an account?
                  <span
                    onClick={() => {
                      setCurrentForm("signup");
                      setErrors({ name: "", email: "", password: "" });
                      setFormData({ name: "", email: "", password: "" });
                    }}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            ) : (
              <div className={styles.formInput}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <p className={styles.errorText}>{errors.name}</p>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className={styles.errorText}>{errors.email}</p>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <p className={styles.errorText}>{errors.password}</p>
                  )}
                </div>
                <button type="submit">Sign Up</button>
                <p className={styles.signupText}>
                  Already have an account?
                  <span
                    onClick={() => {
                      setCurrentForm("login");
                      setErrors({ name: "", email: "", password: "" });
                      setFormData({ name: "", email: "", password: "" });
                    }}
                  >
                    Login
                  </span>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
