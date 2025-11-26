import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import "../assets/css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Thông tin */}
        <div className="footer-col">
          <h3>Đồng Tháp</h3>
          <p>Khám phá vẻ đẹp miền Tây sông nước</p>
          <p>
            <strong>Địa chỉ:</strong> TP. Cao Lãnh, Đồng Tháp
          </p>
          <p>
            <strong>Điện thoại:</strong> 0396945640
          </p>
          <p>
            <strong>Email:</strong> lhtrung87864@gmail.com
          </p>
        </div>

        {/* Cột 2: Menu */}
        <div className="footer-col">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li>
              <Link to="/">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/gioi-thieu">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/dia-diem">Địa điểm du lịch</Link>
            </li>
            <li>
              <Link to="/lien-he">Liên hệ</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Biểu tượng mạng xã hội (trang trí) */}
        <div className="footer-col">
          <h3>Kết nối với chúng tôi</h3>
          <div className="socials">
            <span className="icon facebook">
              <FaFacebook />
            </span>
            <span className="icon youtube">
              <FaYoutube />
            </span>
            <span className="icon instagram">
              <FaInstagram />
            </span>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer-bottom">
        <p>© 2025 Đồng Tháp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
