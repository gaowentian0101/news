import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Tag, Modal, message, Switch } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal
export default function RightList() {
  const [data, setdata] = useState([])
  //获取权限列表
  function dataList() {
    axios.get('http://localhost:2000/rights?_embed=children').then((res) => {
      // res.data[0].children = ''
      res.data.map((item) => {
        if (item.children && item.children.length === 0) {
          item.children = ''
        }
        return item
      })
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
      title: '权限名称',
      dataIndex: 'label',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render(key) {
        return <Tag color="blue"> {key} </Tag>
      },
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

            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              checked={row.pagepermisson}
              onChange={() => handleChange(row)}
              disabled={row.pagepermisson === undefined}
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
        if (row.grade === 1) {
          // 删除父节点的数据
          axios.delete(`http://localhost:2000/rights/${row.id}`)
        } else {
          // 删除子节点的数据
          axios.delete(`http://localhost:2000/children/${row.id}`)
        }
        dataList()
        message.success('删除成功')
      },
      onCancel() {
        message.error('取消删除')
      },
    })
  }
  // 页面开关
  const handleChange = (row) => {
    row.pagepermisson = row.pagepermisson === 1 ? 0 : 1
    setdata([...data])
    if (row.grade === 1) {
      // 修改父节点的数据
      axios.patch(`http://localhost:2000/rights/${row.id}`, {
        pagepermisson: row.pagepermisson,
      })
    } else {
      // 修改子节点的数据
      axios.patch(`http://localhost:2000/children/${row.id}`, {
        pagepermisson: row.pagepermisson,
      })
    }
  }
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination />
    </div>
  )
}
