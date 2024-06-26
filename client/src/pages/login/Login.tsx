import { Card, Form, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../../components/custom-button/CustomButton'
import CustomInput from '../../components/custom-input/CustomInput'
import ErrorMessage from '../../components/error-message/ErrorMessage'
import Layout from '../../components/layout/Layout'
import PasswordInput from '../../components/password-input/PasswordInput'
import { Paths } from '../../paths/paths'
import { UserData, useLoginMutation } from '../../services/auth'
import { isErrorWithMessage } from '../../utils/isErrorWithMess'

const Login = () => {
	const [loginUser, loginUserResult] = useLoginMutation() // 1- вызывает запрос, 2- получает данные
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const login = async (data: UserData) => {
		try {
			await loginUser(data).unwrap()
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
					title='Войти'
					style={{
						width: '30rem',
					}}
				>
					<Form onFinish={login}>
						<CustomInput type='email' name='email' placeholder='Email' />
						<PasswordInput name='password' placeholder='Пароль' />
						<CustomButton type='primary' htmlType='submit' loading={false}>
							Войти
						</CustomButton>
					</Form>
					<Space direction='vertical' size='large'>
						<Typography.Text>
							Нет аккаунта?
							<Link to={Paths.register}> Зарегистрироваться</Link>
						</Typography.Text>
						<ErrorMessage message={error} />
					</Space>
				</Card>
			</Row>
		</Layout>
	)
}

export default Login
