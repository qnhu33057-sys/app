import Header from "../../component/Header";
import Footer from "../../component/Footer";
import "../../assets/css/Lienhe.css"
import ImagesDong from "../../component/ImagesDong";
import FloatinggeminiChat from "../../component/FloatingGeminiChat";

export default function Gioithieu() {
  return (
    <div>
      <Header />

      <main className="MainLH">
        <h1>Thông tin liên hệ</h1>
      
          <div >
            <ul>
              <li>
                <a
                  href="https://zalo.me/0396945640"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7o9w5nKE-Scl6VfHWM3lp5dieoPClpxQBQ&s"
                    alt="Zalo"
                    style={{ width: 20, marginRight: 8 }}
                  />
                  Zalo
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/hoangtrung.luu.73"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s"
                    alt="Facebook"
                    style={{ width: 20, marginRight: 8 }}
                  />
                  Facebook
                </a>
              </li>
              <li>
                <a href="tel:0396945640">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4367/4367049.png"
                    alt="Phone"
                    style={{ width: 20, marginRight: 8 }}
                  />
                  0396945640
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="https://zalo.me/0396945640"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-7o9w5nKE-Scl6VfHWM3lp5dieoPClpxQBQ&s"
                    alt="Zalo"
                    style={{ width: 20, marginRight: 8 }}
                  />
                  Zalo
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/hoangtrung.luu.73"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s"
                    alt="Facebook"
                    style={{ width: 20, marginRight: 8 }}
                  />
                  Facebook
                </a>
              </li>
              <li>
                <a href="tel:0396945640">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4367/4367049.png"
                    alt="Phone"
                    style={{ width: 20, marginRight: 8 }}
                  />
                  0396945640
                </a>
              </li>
            </ul>
          </div>
    
      </main>
      {/* ✅ Chat nổi góc phải */}
      <FloatinggeminiChat />

      <ImagesDong />

      <Footer />
    </div>
  );
}
