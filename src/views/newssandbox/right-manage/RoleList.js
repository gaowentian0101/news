import React, { useState, useEffect } from 'react'
import { Button, Space, Table, Modal, message, Tree } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import axios from 'axios'
const { confirm } = Modal
export default function RoleList() {
  const [data, setdata] = useState([])
  const [roleData, setRoledata] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  //获取角色列表
  function dataList() {
    axios.get('http://localhost:2000/roles').then((res) => {
      setdata(res.data)
    })
  }
  // 权限列表
  function roleList(list) {
    return list.map(item => {
      if (item.label) {
        item.title = item.label
        if (item.children && item.children.length > 0) {
          item.children = roleList(item.children)
        } else {
          item.children = ''
        }
      }
      return item
    })
  }
  function roleDataList() {
    axios.get('http://localhost:2000/rights?_embed=children').then((res) => {
      const rolelist = roleList(res.data)
      setRoledata(rolelist)
      console.log(rolelist);
    })
  }
  useEffect(() => {
    dataList()
    roleDataList()
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
              icon={<UnorderedListOutlined />}
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
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {/* 表格 */}
      <Table columns={columns} dataSource={data} pagination />
      {/* 弹窗详情 */}
      <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="确认"
        cancelText="取消">
        <Tree
          checkable
          treeData={roleData}
        />
      </Modal>
    </div>
  )
}
