import React, { useState, useEffect } from "react";
import "../assets/css/Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    
  };

  return (
    <header>
      <nav className="nav-left">
        <ul>
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/gioi-thieu">Giới thiệu về Đồng Tháp</Link>
          </li>
          <li>
            <Link to="/dia-diem">Địa điểm du lịch</Link>
          </li>
          <li>
            <Link to="/am-thuc">Ẩm thực - Đặc sản</Link>
          </li>
          <li>
            <Link to="/van-hoa-le-hoi">Văn hóa - Lễ hội</Link>
          </li>
          
          <li>
           
            <Link to="/lien-he">Liên hệ</Link>
          </li>
          {/* Chỉ admin mới thấy link quản trị
          {user?.role === "admin" && <Link to="/homeadmin">Quản trị</Link>} */}
        </ul>
      </nav>

      <nav className="nav-right">
        <ul>
          {user ? (
            <>
              <li>
                <strong>Xin chào {user.fullname}</strong>
              </li>
              <li>
                <button onClick={handleLogout}>Đăng xuất</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="login-link">
                  Đăng nhập
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
