import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import "../../assets/css/Vanhoa.css"


import ImagesDong from "../../component/ImagesDong";
import FloatinggeminiChat from "../../component/FloatingGeminiChat";


export default function VanhoaLehoi() {


  const [vanhoa, setVanhoa] = useState([]);

useEffect(() => {
  
  // lấy amthuc
  fetch(`${process.env.REACT_APP_URL_VH}`)
    .then((res) => res.json())
    .then((data) => setVanhoa(data))
    .catch((err) => console.error("Lỗi load amthuc:", err));
}, []);


  

  return (
    <div>
      <Header />

      <section id="van-hoa">
        <h2>Ẩm thực & Đặc sản</h2>
        <div className="van-hoa-container">
          {vanhoa.map((item) => (
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
