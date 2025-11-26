import React, { useEffect, useState } from "react";
import "../assets/css/ImagesDong.css";

export default function Main() {
  // Hàm shuffle mảng (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const [diadiem, setDiadiem] = useState([]);
  const [amthuc, setAmthuc] = useState([]);
  const [places, setPlaces] = useState([]); // ✅ lưu dữ liệu gộp & random

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

  // ✅ Mỗi khi diadiem hoặc amthuc thay đổi thì gộp & random lại
  useEffect(() => {
    if (diadiem.length > 0 || amthuc.length > 0) {
      setPlaces(shuffleArray([...diadiem, ...amthuc]));
    }
  }, [diadiem, amthuc]);

  const groupSize = 5; // số ảnh hiển thị cùng lúc
  const delay = 5000; // thời gian đổi ảnh

  const [index, setIndex] = useState(0);

  // Tự động chuyển nhóm ảnh
  useEffect(() => {
    if (places.length === 0) return; // tránh lỗi khi chưa load xong dữ liệu

    const interval = setInterval(() => {
      setIndex((prev) => (prev + groupSize) % places.length); // xoay vòng
    }, delay);

    return () => clearInterval(interval);
  }, [places, groupSize]);

  // Lấy đúng groupSize ảnh, không bao giờ thiếu
  const displayed = [];
  for (let i = 0; i < groupSize; i++) {
    if (places.length > 0) {
      displayed.push(places[(index + i) % places.length]);
    }
  }

  return (
    <div className="image-slider">
      {displayed.map((place, i) => (
        <a key={`${place.id || i}-${i}`} href={place.link} className="image-item">
          <img src={place.img} alt={place.title} />
        </a>
      ))}
    </div>
  );
}
