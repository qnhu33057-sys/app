import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Gioithieus.css";
import { useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Search from "../../component/Search";

import FloatinggeminiChat from "../../component/FloatingGeminiChat";
import ImageDong from "../../component/ImagesDong";

import Images from "../../assets/image/Dongthap.png";

export default function GioiThieu() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [diadiem, setDiadiem] = useState([]);
  const [amthuc, setAmthuc] = useState([]);

  const [results, setResults] = useState([]);

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
  }, []);

  // Kết hợp dữ liệu
  const combinedData = [
    ...diadiem.map((item) => ({ ...item, source: "diadiem" })),
    ...amthuc.map((item) => ({ ...item, source: "amthuc" })),
  ];
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
      // navigate("/login");
      setUser(null); // ❌ Không điều hướng, chỉ để user = null
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    // navigate("/login");
    setUser(null); // reset lại user về null
    navigate("/"); // đưa về trang chủ sau khi logout
  };

  return (
    <div>
      <>
        <Header user={user} handleLogout={handleLogout} />

        <main>
          {/* Banner hình ảnh */}
          <section id="banner">
            <img src={Images} alt="Cảnh đẹp Đồng Tháp" />

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

          {/* Giới thiệu ngắn gọn */}
          <section id="gioi-thieu">
            <h2>Giới thiệu về tỉnh Đồng Tháp</h2>
            <div>
              <div>
                <h3>Trước sáp nhập tỉnh</h3>
                <p>
                  Tỉnh Đồng Tháp là một trong những địa phương thuộc vùng Đồng
                  bằng sông Cửu Long, miền Tây Nam Bộ, Việt Nam.
                </p>

                <p>
                  Trước khi thực hiện việc sắp xếp đơn vị hành chính, tỉnh Đồng
                  Tháp có 12 đơn vị hành chính cấp huyện, bao gồm 3 thành phố và
                  9 huyện.
                </p>

                <p>
                  <strong>Đơn vị hành chính cấp huyện:</strong>
                </p>

                <p>
                  <strong>Thành phố Cao Lãnh:</strong> Được thành lập vào năm
                  2007 và đạt đô thị loại II vào năm 2020. Thành phố có diện
                  tích 107 km² và dân số khoảng 164.835 người.
                </p>

                <p>
                  <strong>Thành phố Sa Đéc:</strong> Được công nhận là thành phố
                  trực thuộc tỉnh vào năm 2013 và đạt đô thị loại II vào năm
                  2018. Thành phố có diện tích 118 km² và dân số khoảng 135.000
                  người.
                </p>

                <p>
                  <strong>Thành phố Hồng Ngự:</strong> Được công nhận là thành
                  phố trực thuộc tỉnh vào năm 2020. Thành phố có diện tích
                  121,84 km² và dân số khoảng 76.462 người.
                </p>

                <p>
                  <strong>Huyện Cao Lãnh:</strong> Có diện tích lớn và dân số
                  đông nhất trong tỉnh.
                </p>

                <p>
                  <strong>Huyện Châu Thành:</strong> Nổi bật với các làng nghề
                  truyền thống.
                </p>

                <p>
                  <strong>Huyện Lai Vung:</strong> Nổi tiếng với đặc sản quýt
                  hồng.
                </p>

                <p>
                  <strong>Huyện Lấp Vò:</strong> Có nhiều di tích lịch sử và văn
                  hóa.
                </p>

                <p>
                  <strong>Huyện Tam Nông:</strong> Được biết đến với khu du lịch
                  sinh thái Gáo Giồng.
                </p>

                <p>
                  <strong>Huyện Tân Hồng:</strong> Giáp với biên giới Campuchia,
                  có nhiều nét văn hóa đặc sắc.
                </p>

                <p>
                  <strong>Huyện Thanh Bình:</strong> Nổi bật với nghề trồng lúa
                  và thủy sản.
                </p>

                <p>
                  <strong>Huyện Tháp Mười:</strong> Có nhiều di tích lịch sử và
                  cảnh quan thiên nhiên đẹp.
                </p>

                <p>
                  <strong>Huyện Hồng Ngự:</strong> Giáp với biên giới Campuchia,
                  có nhiều nét văn hóa đặc sắc.
                </p>

                <p>
                  <strong>Kinh tế và văn hóa:</strong> Trước khi sáp nhập, Đồng
                  Tháp là tỉnh có nền kinh tế chủ yếu dựa vào nông nghiệp, với
                  sản phẩm chủ lực là lúa gạo, thủy sản và cây ăn trái. Tỉnh
                  cũng nổi tiếng với các làng nghề truyền thống, như làng nghề
                  làm nem, làng nghề đan lát, và các sản phẩm thủ công mỹ nghệ.
                </p>

                <p>
                  Văn hóa Đồng Tháp phong phú với nhiều lễ hội dân gian, như lễ
                  hội đua bò, lễ hội Sen Đồng Tháp, và các làn điệu dân ca Nam
                  Bộ. Người dân nơi đây hiền hòa, mến khách, và luôn giữ gìn
                  những giá trị văn hóa truyền thống.
                </p>
              </div>
              <div>
                <h3>Sau sáp nhập tỉnh</h3>
                <p>
                  <strong>Hành chính – Địa giới</strong>
                </p>

                <p>
                  <strong>Ngày sáp nhập:</strong> 1/7/2025, theo Nghị quyết số
                  1663/NQ-UBTVQH15 của Ủy ban Thường vụ Quốc hội.
                </p>
                <p>
                  <strong>Tên gọi mới:</strong> Tỉnh Đồng Tháp (giữ nguyên tên
                  cũ để bảo tồn thương hiệu và thuận tiện trong giao dịch hành
                  chính).
                </p>
                <p>
                  <strong>Đơn vị hành chính cấp xã:</strong> Sau sáp nhập, tỉnh
                  Đồng Tháp có tổng cộng 102 đơn vị hành chính cấp xã, bao gồm
                  82 xã và 20 phường.
                </p>

                <p>
                  <strong>Trung tâm hành chính</strong>
                </p>
                <p>
                  <strong>Trụ sở chính quyền tỉnh:</strong> Đặt tại phường Mỹ
                  Tho, tỉnh Tiền Giang (nay thuộc tỉnh Đồng Tháp mới).
                </p>

                <p>
                  <strong>Vận hành chính quyền địa phương:</strong> Từ ngày
                  1/7/2025, chính quyền hai cấp tỉnh Đồng Tháp và Tiền Giang bắt
                  đầu vận hành theo mô hình mới.
                </p>

                <p>
                  <strong>Kinh tế và phát triển nông nghiệp</strong>
                </p>
                <p>
                  <strong>Mục tiêu chiến lược:</strong> Phát triển mô hình "tam
                  nông" hiện đại, bao gồm nông nghiệp, nông dân và nông thôn.
                </p>
                <p>
                  <strong>Điểm mạnh:</strong> Đồng Tháp tiếp tục duy trì vị thế
                  là trung tâm sản xuất nông sản lớn của Đồng bằng sông Cửu
                  Long, với các sản phẩm chủ lực như lúa gạo, thủy sản và trái
                  cây.
                </p>

                <p>
                  <strong>Cải cách hành chính</strong>
                </p>
                <p>
                  <strong>Sắp xếp đơn vị hành chính cấp xã:</strong> Theo Nghị
                  quyết số 1663/NQ-UBTVQH15, tỉnh Đồng Tháp đã thực hiện sắp xếp
                  lại các đơn vị hành chính cấp xã để tinh gọn bộ máy và nâng
                  cao hiệu quả quản lý.
                </p>

                <p>
                  <strong>Lý do sáp nhập</strong>
                </p>
                <p>
                  <strong>Mục tiêu:</strong> Nâng cao hiệu lực, hiệu quả quản lý
                  nhà nước, mở rộng không gian phát triển và kết nối vùng Đồng
                  bằng sông Cửu Long với vùng kinh tế trọng điểm Đông Nam Bộ.
                </p>
              </div>
            </div>
          </section>

          {/* Các mục nổi bật */}
          <section id="noi-bat">
            <h2>Các mục nổi bật</h2>
            <div>
              <div className="card">
                <Link to="/dia-diem">
                  <img
                    src="https://dulichvietnam.com.vn/kinh-nghiem/wp-content/uploads/2019/04/kinh-nghiem-du-lich-vuon-quoc-gia-tram-chim-2-696x391.jpg"
                    alt="Du lịch"
                    className="animate-img"
                  />
                </Link>
                <h3>Du lịch</h3>
              </div>

              <div className="card">
                <Link to="/am-thuc">
                  <img
                    src="https://tuilanguoimientay.vn/wp-content/uploads/2022/06/nem-lai-vung-1-1.jpg"
                    alt="Đặc sản"
                    className="animate-img"
                  />
                </Link>
                <h3>Ẩm thực & Đặc sản</h3>
              </div>
              <div className="card">
                <Link to="/van-hoa">
                  <img
                    src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/472188aEm/lang-chieu-dinh-yen-bi-mat-cua-ngoi-lang-nghe-100-tuoi_9"
                    alt="Văn hóa"
                    className="animate-img"
                  />
                </Link>
                <h3>Văn hóa & Lễ hội</h3>
              </div>
            </div>
          </section>
        </main>
        {/* ✅ Chat nổi góc phải */}
        <FloatinggeminiChat />
        <ImageDong />
        <Footer />
      </>
    </div>
  );
}
