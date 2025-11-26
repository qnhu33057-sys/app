import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/Auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_AUTH_URL_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Sai username hoặc password");
        return;
      }

      const { token, user } = data;

      // ✅ Lưu token + user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`Đăng nhập thành công! Chào ${user.fullname}`);

      // ✅ Điều hướng theo role
      navigate(user.role === "admin" ? "/homeadmin" : "/");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      alert("Đăng nhập thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-page">
        <form onSubmit={handleLogin}>
          <h3>Login</h3>

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Login"}
          </button>

          <div>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
