import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Modal, message } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal
export default function RoleList() {
  const [data, setdata] = useState([])
  //获取角色列表
  function dataList() {
    axios.get('http://localhost:2000/roles').then((res) => {
      setdata(res.data)
    })
  }
  useEffect(() => {
    dataList()
  }, [])
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render(row) {
        return (
          <Space>
            <Button
              type="primary"
              danger
              shape="round"
              ghost
              icon={<DeleteOutlined />}
              onClick={() => handleDelelt(row)}
            />
            <Button
              type="primary"
              shape="round"
              ghost
              icon={<AppstoreAddOutlined />}
              onClick={() => handleDeatil(row)}
            />

          </Space>
        )
      },
    },
  ]
  // 删除
  const handleDelelt = (row) => {
    confirm({
      title: '是否删除当前数据?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        // 删除节点的数据
        axios.delete(`http://localhost:2000/roles/${row.id}`).then(res => {
          dataList()
          message.success('删除成功')
        })
      },
      onCancel() {
        message.error('取消删除')
      },
    })
  }
  // 弹窗详情
  const handleDeatil = (row) => {
    console.log(row);
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination />
    </div>
  )
}
