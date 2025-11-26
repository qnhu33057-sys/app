import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  CoffeeOutlined,
  FlagOutlined,
  ReadOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider, Content, Header } = Layout;

export default function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div style={{ color: "white", padding: "20px", fontWeight: "bold" }}>
          Admin
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/admin/manage/home">Trang Chủ</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            <Link to="/admin/manage/gioi-thieu">Giới thiệu</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<EnvironmentOutlined />}>
            <Link to="/admin/manage/dia-diem">Địa điểm du lịch</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<CoffeeOutlined />}>
            <Link to="/admin/manage/am-thuc">Ẩm thực</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FlagOutlined />}>
            <Link to="/admin/manage/van-hoa-le-hoi">Văn hóa - Lễ hội</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ReadOutlined />}>
            <Link to="/admin/manage/tin-tuc-su-kien">Tin tức - Sự kiện</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<PhoneOutlined />}>
            <Link to="/admin/manage/lien-he">Liên hệ</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: "0 20px", }}>
          <h2>Admin Dashboard</h2>
          
        </Header>
        <Content style={{ margin: "20px", background: "#fff", padding: 20 }}>
          <h3>Chọn menu bên trái để quản lý nội dung</h3>
        </Content>
      </Layout>
    </Layout>
  );
}
