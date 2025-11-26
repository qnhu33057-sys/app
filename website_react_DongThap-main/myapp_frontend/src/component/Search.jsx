import { useState } from "react";
import "../assets/css/Search.css";

export default function Search({ combinedData, onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    // Lọc gợi ý theo keyword
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = combinedData.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // giới hạn 5 gợi ý
    }
  };

  const handleSearch = () => {
    if (onSearch) onSearch(keyword);
    setSuggestions([]); // ẩn gợi ý khi bấm tìm
  };

  const handleSelect = (value) => {
    setKeyword(value); // set keyword theo gợi ý chọn
    if (onSearch) onSearch(value);
    setSuggestions([]); // ẩn gợi ý
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm..."
        className="search-input"
        value={keyword}
        onChange={handleChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Tìm kiếm
      </button>

      {/* Danh sách gợi ý */}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((s, idx) => (
            <li key={idx} onClick={() => handleSelect(s.title)}>
              {s.title} - {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
