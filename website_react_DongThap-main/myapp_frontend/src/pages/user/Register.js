import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/Auth.css";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ Password strength checker
  const getPasswordStrength = (password) => {
    if (password.length === 0) return null;
    if (password.length < 6) return "weak";
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])/.test(password))
      return "weak";
    if (password.length < 10 || !/(?=.*\d)/.test(password)) return "medium";
    if (!/(?=.*[!@#$%^&*])/.test(password)) return "medium";
    return "strong";
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  // ✅ Submit Register
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    if (passwordStrength === "weak") {
      alert("Mật khẩu quá yếu. Vui lòng chọn mật khẩu mạnh hơn.");
      return;
    }

    // chỉ gửi fullname, username, password (khớp server)
    const newUser = { fullname, username, password };

    try {
      const res = await fetch(`${process.env.REACT_APP_AUTH_URL_REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đăng ký thành công, mời đăng nhập!");
        navigate("/login");
      } else {
        alert(data.error || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi đăng ký");
    }
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case "weak":
        return "Yếu";
      case "medium":
        return "Trung bình";
      case "strong":
        return "Mạnh";
      default:
        return "";
    }
  };

  return (
    <div className="login-page">
      <div className="auth-page">
        <form onSubmit={handleRegister}>
          <h3>Register</h3>

          <label>Full name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Nhập họ và tên"
            required
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Strength indicator */}
          {password && (
            <>
              <div className="password-strength">
                <div
                  className={`password-strength-fill ${passwordStrength}`}
                ></div>
              </div>
              <div className={`password-strength-text ${passwordStrength}`}>
                Độ mạnh: {getStrengthText(passwordStrength)}
              </div>
            </>
          )}

          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {confirmPassword && (
            <div
              className={`confirm-password-status ${
                passwordsMatch ? "match" : "no-match"
              }`}
            >
              {passwordsMatch ? "✓ Mật khẩu khớp" : "✗ Mật khẩu không khớp"}
            </div>
          )}

          <button
            type="submit"
            disabled={!passwordsMatch || passwordStrength === "weak"}
          >
            Register
          </button>

          <div>
            Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
