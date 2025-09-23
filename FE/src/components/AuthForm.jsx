import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import { LOGIN, SIGNUP } from "../contants/endPoints";

export default function AuthForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);
  const { post, loading, error } = useApi();

  const isLogin = location.pathname === "/login";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors = {};

    if (!isLogin && !form.name.trim()) {
      errors.name = "Name is required";
    } else if (!isLogin && form.name.length > 50) {
      errors.name = "Name must be less than 50 characters";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Invalid email format";
    }

    if (!form.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (form.password.length < 6 && !isLogin) {
      errors.password = "Password must be at least 6 characters";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      let res;
      if (isLogin) {
        res = await post(LOGIN, { email: form.email, password: form.password });
      } else {
        res = await post(SIGNUP, form);
      }

      const { user, token } = res;
      setAuthUser(user, token);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const isFormInvalid = Object.keys(validate()).length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Login to your account" : "Create a new account"}
        </h2>

        {(error || Object.keys(formErrors).length > 0) && (
          <div className="mb-4 space-y-1">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {Object.values(formErrors).map((errMsg, idx) => (
              <p key={idx} className="text-red-500 text-sm text-center">
                {errMsg}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  formErrors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                formErrors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading || isFormInvalid}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading || isFormInvalid
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => navigate(isLogin ? "/signup" : "/login")}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
