import { Button, Form } from 'antd'
import { FC } from 'react'

type Props = {
  children: React.ReactNode,
  htmlType?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void,
  type?: "link" | "default" | "text" | "primary" | "dashed" |  undefined,
  danger?: boolean,
  loading?: boolean,
  shape?: "default" | "circle" | "round" | undefined,
  icon?: React.ReactNode
}

const CustomButton:FC<Props> = ({
  children, htmlType = 'button', type, danger, loading, shape, icon, onClick
}) => {
  return (
    <Form.Item>
      <Button 
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        >{children}</Button>
    </Form.Item>
  )
}

export default CustomButton
