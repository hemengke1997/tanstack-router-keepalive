import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Card, Form, Input, message, Select, Space } from 'antd'
import { useState } from 'react'
import { useActiveEffect } from 'tanstack-router-keepalive'

export const Route = createFileRoute('/_layout/user/add/')({
  component: RouteComponent,
  staticData: {
    title: 'Add User',
    keepAlive: true,
  },
})

const { Option } = Select

interface UserFormData {
  name: string
  email: string
  phone: string
  department: string
  role: string
}

function RouteComponent() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: UserFormData) => {
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 500))

    console.log(values)
    message.success('Success!')
    form.resetFields()
    setLoading(false)
  }

  useActiveEffect(() => {
    console.log('active', '-- User Add')
    return () => {
      console.log('deactive', '-- User Add')
    }
  }, [])

  const onReset = () => {
    form.resetFields()
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <Card title="Add User">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please enter the user name' },
              { min: 2, message: 'The user name must be at least 2 characters' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Please enter the user name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Please enter the email address"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: 'Please enter the phone number' },
              { pattern: /^1[3-9]\d{9}$/, message: 'Please enter a valid phone number' },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Please enter the phone number"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select the department' }]}
          >
            <Select placeholder="Please select the department" size="large">
              <Option value="Technology">Technology</Option>
              <Option value="Product">Product</Option>
              <Option value="Design">Design</Option>
              <Option value="Operation">Operation</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select the role' }]}
          >
            <Select placeholder="Please select the role" size="large">
              <Option value="employee">Employee</Option>
              <Option value="manager">Manager</Option>
              <Option value="director">Director</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space size="middle" style={{ width: '100%', justifyContent: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<UserOutlined />}
              >
                Add User
              </Button>
              <Button
                onClick={onReset}
                size="large"
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
