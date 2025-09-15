import type { ColumnsType } from 'antd/es/table'

import { SearchOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Input, Select, Space, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_layout/user/list/')({
  component: RouteComponent,
  staticData: {
    title: 'User List',
    keepAlive: true,
  },
})

interface UserData {
  key: string
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createTime: string
}

// 模拟用户数据
function generateMockUsers(): UserData[] {
  const roles = ['admin', 'editor', 'user', 'guest']
  const statuses = ['active', 'inactive'] as const

  return Array.from({ length: 100 }, (_, index) => ({
    key: `user-${index + 1}`,
    id: index + 1,
    name: `User${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createTime: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
  }))
}

function RouteComponent() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // 模拟数据加载
  useEffect(() => {
    const mockUsers = generateMockUsers()
    setUsers(mockUsers)
    setPagination(prev => ({ ...prev, total: mockUsers.length }))
  }, [])

  // 处理分页变化
  const handleTableChange = (page: number, pageSize: number) => {
    setPagination(prev => ({ ...prev, current: page, pageSize }))
  }

  // 处理搜索
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, current: 1 }))
  }

  // 处理重置
  const handleReset = () => {
    setSearchText('')
    setStatusFilter('all')
    setPagination(prev => ({ ...prev, current: 1 }))
  }

  // 过滤数据
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchText.toLowerCase())
      || user.email.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // 分页数据
  const paginatedUsers = filteredUsers.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize,
  )

  const columns: ColumnsType<UserData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Create Time',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: () => (
        <Space size="small">
          <Button type="link" size="small">
            Edit
          </Button>
          <Button type="link" size="small" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="User List"
      >
        {/* 搜索和筛选区域 */}
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Input
              placeholder="Search by name or email"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
              onPressEnter={handleSearch}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
              ]}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
              Search
            </Button>
            <Button onClick={handleReset}>
              Reset
            </Button>
          </Space>
        </div>

        {/* 用户表格 */}
        <Table
          columns={columns}
          dataSource={paginatedUsers}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: filteredUsers.length,
            onChange: handleTableChange,
          }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  )
}
