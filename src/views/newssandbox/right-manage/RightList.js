import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Tag, message, Popconfirm } from 'antd';
import {
  DeleteOutlined, EditOutlined
} from '@ant-design/icons';
import axios from 'axios';
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
    console.log("删除", row);
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
