import { useParams } from "react-router-dom";
import { useState } from "react";
import { Table, Button, Input, Modal, Space } from "antd";

export default function ManagePage() {
  const { page } = useParams();
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [text, setText] = useState("");

  const showModal = (index = null) => {
    setEditingIndex(index);
    setText(index !== null ? items[index] : "");
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = text;
      setItems(updated);
    } else {
      setItems([...items, text]);
    }
    setIsModalOpen(false);
    setText("");
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setText("");
    setEditingIndex(null);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const columns = [
    {
      title: "Nội dung",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record, index) => (
        <Space>
          <Button type="primary" onClick={() => showModal(index)}>
            Sửa
          </Button>
          <Button danger onClick={() => deleteItem(index)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const data = items.map((item, i) => ({ key: i, text: item }));

  return (
    <div>
      <h2>Quản lý: {page}</h2>
      <Button type="primary" onClick={() => showModal()}>
        + Thêm mới
      </Button>
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />

      <Modal
        title={editingIndex !== null ? "Sửa nội dung" : "Thêm mới"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập nội dung..."
        />
      </Modal>
    </div>
  );
}
