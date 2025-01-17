import {Layout, Space, Typography} from 'antd'
import styles from './header.module.scss'
import { LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import CustomButton from '../custom-button/CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths/paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/authSlice'

const Header = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogoutClick = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate(Paths.login)
    }

  return (
    <Layout.Header className={styles.header}>
        <Space>
            <TeamOutlined className={styles.teamIcon}/>
            <Link to={Paths.home}>
                <CustomButton type='link'>
                    <Typography.Title level={1} style={{margin: 0}}>Сотрудники</Typography.Title>    
                </CustomButton> 
            </Link>
        </Space>
        {user ? (
            <Space>
                <CustomButton
                type='text'
                icon={<LogoutOutlined />}
                onClick={onLogoutClick}>
                    Выйти
                </CustomButton>
            </Space>
        ) : (
            <Space>
            <Link to={Paths.register}>
                <CustomButton
                type='text'
                icon={<UserOutlined />}>
                    Зарегистрироваться 
                </CustomButton>
            </Link>
            <Link to={Paths.login}>
                <CustomButton
                type='text'
                icon={<LoginOutlined />}>
                    Войти 
                </CustomButton>
            </Link>
        </Space>
            )}
        
    </Layout.Header>
  )
}

export default Header
