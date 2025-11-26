import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../component/Header";
import Footer from "../../../component/Footer";
import "../DiaDiem_DuLich/style.css"

import ImagesDong from "../../../component/ImagesDong";

import FloatinggeminiChat from "../../../component/FloatingGeminiChat";



export default function Langhoasadec() {
    const navigate = useNavigate();
      const [user, setUser] = useState(null);

     
  
  

  useEffect(() => {
      const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedUser && loggedUser.role === "user") {
        setUser(loggedUser);
      } else {
        setUser(null);
      }
    }, [navigate]);
  
    const handleLogout = () => {
      localStorage.removeItem("loggedInUser");
      setUser(null);
      navigate("/");
    };
  
  
  
  return (
    <div>
        <>
         <Header user={user} handleLogout={handleLogout} />
          <h2 class="title_DT">Làng hoa Sa Đéc</h2>

         <main className="langhoa-container">
            

      {/* Ảnh bên trái */}

      <div className="langhoa-image">
        <img src= "https://media.vov.vn/sites/default/files/styles/large/public/2022-01/vinh_gau_x_sa_dec_-_19.jpg"
         alt="Làng Hoa Sa Đéc" />

        <p className="caption">Làng Hoa Sa Đéc – Đồng Tháp</p>
      </div>

      {/* Nội dung bên phải */}
      <div className="langhoa-content">
        <h1>Làng Hoa Sa Đéc – “Xứ sở của trăm hoa bốn mùa”</h1>
        <p>
          <strong>Vị trí & lịch sử:</strong> Làng Hoa Sa Đéc thuộc phường Tân Quy
          Đông, thành phố Sa Đéc, tỉnh Đồng Tháp. Nghề trồng hoa bắt đầu từ cuối
          thế kỷ XIX, trải qua nhiều thế hệ và nay đã trở thành làng nghề truyền thống
          nổi tiếng cả nước.
        </p>
        <p>
          <strong>Quy mô:</strong> Hiện nay, diện tích trồng hoa khoảng 500–700 ha,
          với hơn 2.300 hộ dân, hơn 2.000 loại hoa khác nhau. Nổi bật nhất là hoa hồng
          với hơn 50 giống, được xuất khẩu sang nhiều nước.
        </p>
        <p>
          <strong>Kỹ thuật trồng:</strong> Hoa được trồng trên giàn cao, phía dưới là
          mặt nước. Vào mùa nước nổi, người dân phải dùng xuồng để chăm sóc, tạo cảnh
          quan đặc trưng rất độc đáo.
        </p>
        <p>
          <strong>Du lịch:</strong> Hoa Sa Đéc nở quanh năm, rực rỡ nhất dịp Tết Nguyên
          Đán. Du khách có thể tham quan, chụp ảnh, ở homestay và trải nghiệm cuộc sống
          làng hoa.
        </p>
        <p>
          <strong>Giá trị:</strong> Đây là vựa hoa lớn nhất miền Tây Nam Bộ, vừa mang
          giá trị kinh tế, vừa góp phần gìn giữ văn hóa truyền thống Đồng Tháp.
        </p>
      </div>
    </main>

           {/* ✅ Chat nổi góc phải */}
        <FloatinggeminiChat />
        {/* cuoi trang */}
        <ImagesDong />

        <Footer />
        </>
    </div>
  );
}