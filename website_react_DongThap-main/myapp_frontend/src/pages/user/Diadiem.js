import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import "../../assets/css/Diadiem.css";

import ImagesDong from "../../component/ImagesDong";
import FloatinggeminiChat from "../../component/FloatingGeminiChat";

export default function DiaDiems() {
  
  const [diadiem, setDiadiem] = useState([]); // ✅ state để lưu dữ liệu từ API



 
useEffect(() => {
    // lấy diadiem
    fetch(`${process.env.REACT_APP_URL_DD}`)
      .then((res) => res.json())
      .then((data) => setDiadiem(data))
      .catch((err) => console.error("Lỗi load diadiem:", err));
  }, []);


  return (
    <div>
      <Header />
      <section id="dia-diem">
        <h2>Địa điểm du lịch</h2>
        <div className="dia-diem-container">
          {diadiem.map((item) => (
            <a key={item.id} href={item.link} className="card">
              <img src={item.img} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      {/* ✅ Chat nổi góc phải */}
      <FloatinggeminiChat />
      <ImagesDong />
      <Footer />
    </div>
  );
}
