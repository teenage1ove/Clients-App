import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { FC } from 'react'

type Props = {
    name: string,
    placeholder: string,
    dependencies?: NamePath[]
}

const PasswordInput:FC<Props> = ({
    name, placeholder, dependencies
}) => {
  return (
    <Form.Item
    name={name}
    dependencies={dependencies}
    hasFeedback
    rules={[{required: true, message: 'Поле обязательно для заполнения'}, ({getFieldValue}) => ({validator(_, value) {
        if (!value) {
            return Promise.resolve()
        }
        
        if (name === 'confirmPassword') {
            if (!value || getFieldValue(('password')) === value) {
                return Promise.resolve()
            }
        
            return Promise.reject(new Error('Пароли должны совпадать'))
        } else {
            if (value.length < 6) {
                return Promise.reject(new Error('Пароль должен содержать не менее 6 символов'))
            }

            return Promise.resolve()
        }
    }})]}>
    
        <Input.Password
        placeholder={placeholder} size='large'></Input.Password>
    </Form.Item>
  )
}

export default PasswordInput
