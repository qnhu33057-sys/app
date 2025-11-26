import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // nếu dùng react-router
import "../assets/css/Marquee.css";

export default function Marquee() {
  const [diadiem, setDiadiem] = useState([]);
  const [amthuc, setAmthuc] = useState([]);
  
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

  const combinedData = [
    ...diadiem.map((item) => ({ ...item, source: "diadiem" })),
    ...amthuc.map((item) => ({ ...item, source: "amthuc" })),
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-track">
        {combinedData.map((item, idx) => (
          <Link key={idx} to={item.link} className="marquee-item">
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
