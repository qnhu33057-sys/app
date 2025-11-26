import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeAdmin from "./pages/admin/Dashboard";
import HomeUser from "./pages/user/HomeUser";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import GioiThieu from "./pages/user/Gioithieu";
import DiaDiem from "./pages/user/Diadiem";
import AmThuc from "./pages/user/Amthuc_Dacsan";
import VanHoa from "./pages/user/Vanhoa_Lehoi";
import LienHe from "./pages/user/Lienhe";

import LanghoaSadec from "./pages/user/DiaDiem_DuLich/Lang_Hoa_Sa_Dec";

import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <Router basename="/website_react_DongThap">
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/dia-diem" element={<DiaDiem />} />
        <Route path="/dia-diem/1" element={<LanghoaSadec />} />
        <Route path="/am-thuc" element={<AmThuc />} />
        <Route path="/van-hoa-le-hoi" element={<VanHoa />} />
       
        <Route path="/lien-he" element={<LienHe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin route bảo vệ */}
        <Route
          path="/homeadmin"
          element={
            <PrivateRoute role="admin">
              <HomeAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
