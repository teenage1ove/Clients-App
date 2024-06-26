import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FC } from 'react'

type Props = {
    name: NamePath | undefined,
    type?: string,
    placeholder?: string
}

const CustomInput:FC<Props> = ({name, type="text", placeholder}) => {
  return (
    <Form.Item 
    name={name}
    rules={[{required: true, message: 'Поле обязательно для заполнения'}]}
    shouldUpdate={true}>
        <Input
        placeholder={placeholder}
        type={type}
        size='large'/>
    </Form.Item>
  )
}

export default CustomInput
