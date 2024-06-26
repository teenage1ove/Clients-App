import { Card, Form, Row, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../components/custom-button/CustomButton'
import CustomInput from '../../components/custom-input/CustomInput'
import Layout from '../../components/layout/Layout'
import PasswordInput from '../../components/password-input/PasswordInput'
import { Paths } from '../../paths/paths'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/authSlice'
import { useState } from 'react'
import { useRegisterMutation } from '../../services/auth'
import { User } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/isErrorWithMess'
import ErrorMessage from '../../components/error-message/ErrorMessage'

type RegisterData = Omit<User, "id"> & {confirmPassword: string}

const Register = () => {
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [error, setError] = useState('')
	const [registerUser] = useRegisterMutation()

	const register = async (data: RegisterData) => {
		try {
			await registerUser(data).unwrap()
			navigate(Paths.home)
		} catch (err) {
			const maybeError = isErrorWithMessage(err)

			if (maybeError) {
				setError(err.data.message)
			} else {
				setError('Неизвестная ошибка')
			}
		}
	}

	return (
		<Layout>
			<Row align='middle' justify='center'>
				<Card
					title='Зарегистрироваться'
					style={{
						width: '30rem',
					}}
				>
					<Form onFinish={register}>
						<CustomInput name='name' placeholder='Имя' />
						<CustomInput type='email' name='email' placeholder='Email' />
						<PasswordInput name='password' placeholder='Пароль' />
						<PasswordInput
							name='confirmPassword'
							placeholder='Повторите пароль'
						/>
						<CustomButton type='primary' htmlType='submit' loading={false}>
							Войти
						</CustomButton>
					</Form>
					<Space direction='vertical' size='large'>
						<Typography.Text>
							Уже зарегистрированы?
							<Link to={Paths.login}> Войти</Link>
						</Typography.Text>
						<ErrorMessage message={error} />	
					</Space>
				</Card>
			</Row>
		</Layout>
	)
}

export default Register
