import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Tag, Modal, message } from 'antd';
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;
export default function RightList() {
  const [data, setdata] = useState([])
  useEffect(() => {
    axios.get('http://localhost:2000/rights?_embed=children').then(res => {
      res.data[0].children = ''
      setdata(res.data)
    })
  }, [])
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'label',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render(key) {
        return <Tag color='blue'> {key}</Tag>
      }
    },
    {
      title: '操作',
      render(row) {
        return <Space >
          <Button type="primary" danger shape="round" ghost icon={<DeleteOutlined />} onClick={() => handleDelelt(row)} />
          <Button type="primary" shape="round" ghost icon={<EditOutlined />} onClick={() => handleEdit(row)} />
        </Space>
      }
    }
  ];
  const handleDelelt = (row) => {
    confirm({
      title: '是否删除当前数据?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        
        message.success('删除成功');
      },
      onCancel() {
        message.error('取消删除');
      },
    });
  }
  const handleEdit = (row) => {
    console.log("编辑", row);
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination />
    </div>

  )
}
