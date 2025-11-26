import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Marquee from "../../component/Marquee";
import "../../assets/css/HomeUser.css";
import Search from "../../component/Search";




import ImagesDong from "../../component/ImagesDong";

import FloatinggeminiChat from "../../component/FloatingGeminiChat";

import Images from "../../assets/image/Dongthap.png";

export default function HomeUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [Diadiem, setDiadiem] = useState([]);
  const [Amthuc, setAmthuc] = useState([]);
  const [Sections, setSections] = useState([]);

useEffect(() => {
    // lấy diadiem
    fetch(`${process.env.REACT_APP_URL_DD}`)
      .then((res) => res.json())
      .then((data) => setDiadiem(data))
      .catch((err) => console.error("Lỗi load diadiem:", err));

    // lấy amthuc
    fetch(`${process.env.REACT_APP_URL_AT}`)
      .then((res) => res.json())
      .then((data) => setAmthuc(data))
      .catch((err) => console.error("Lỗi load amthuc:", err));
 
  // lay sections

  fetch(`${process.env.REACT_APP_URL_SS}`)
    .then((res) => res.json())
    .then((data) => setSections(data))
    .catch((err) => console.error("Lỗi load sections:", err));
}, []);

const combinedData = [
  ...Diadiem.map((item) => ({ ...item, source: "diadiem" })),
  ...Amthuc.map((item) => ({ ...item, source: "amthuc" })),
];

  const [results, setResults] = useState([]);

  // Xử lý tìm kiếm
  const handleSearch = (keyword) => {
    if (!keyword) {
      setResults([]); // clear nếu không có từ khóa
      return;
    }
    const filtered = combinedData.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setResults(filtered);
  };

  

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

  // Tự động đổi ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % combinedData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [combinedData.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % combinedData.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + combinedData.length) % combinedData.length
    );
  };

  const handleClick = () => {
    navigate(combinedData[currentImage].link);
  };

  return (
    <div>
      <>
        <Header user={user} handleLogout={handleLogout} />

        {/* Banner hình ảnh */}
        <section id="banner">
          <img src={Images} alt="Cảnh đẹp Đồng Tháp" className="banner-image" />

          <div>
            {/* Ô tìm kiếm */}
            <Search combinedData={combinedData} onSearch={handleSearch} />

            {/* Hiển thị kết quả */}
            {results.length > 0 && (
              <div className="search-results">
                <h3>Kết quả tìm kiếm:</h3>
                <ul>
                  {results.map((r, idx) => (
                    <li key={idx}>
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {r.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <h2 class="title_DT">Đồng Tháp – Đất Sen Hồng</h2>

        <main className="home-main">
          {/* Dòng chữ chạy */}

          <Marquee />

          <div className="content-wrapper">
            {/* Slideshow ảnh */}
            
            <div className="slideshow">
              {combinedData.length > 0 && (
                <img
                src={combinedData[currentImage].img}
                alt={combinedData[currentImage].title}
                className="slideshow-img"
                onClick={() => handleClick(combinedData[currentImage].link)}
                style={{ cursor: "pointer" }}
                
              />
              )}

              <button className="btn prev" onClick={prevImage}>
                ❮
              </button>
              <button className="btn next" onClick={nextImage}>
                ❯
              </button>
            </div>

            <div className="news-list">
              <ul>
                {combinedData.map((item, index) => (
                  <li key={index}>
                    <a href={item.link}>
                      {item.title} - {item.description}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* phóng sự */}
          <div className="news-sections">
            {Sections.map((section, idx) => (
              <div key={idx} className="news-block">
                <h2 className="section-title">{section.title}</h2>

                {section.articles.map((article, index) => (
                  <div key={index}>
                    <a href={article.imgLink}>
                      <img
                        src={article.img} // ❌ bỏ dấu ngoặc kép
                        alt={article.main.text}
                        className="news-img"
                      />
                    </a>

                    <h3 className="main-article">
                      <a href={article.main.link}>{article.main.text}</a>
                    </h3>

                    <ul className="sub-articles">
                      {article.subs.map((s, i) => (
                        <li key={i}>
                          <a href={s.link}>{s.text}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
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
