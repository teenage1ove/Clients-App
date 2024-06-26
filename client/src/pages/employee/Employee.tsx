import {useState} from 'react'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import {useGetEmployeeQuery, useRemoveEmployeeMutation} from '../../services/employees'
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/authSlice'
import {Paths} from '../../paths/paths'
import Layout from '../../components/layout/Layout'
import {Descriptions, Divider, Modal, Space} from 'antd'
import CustomButton from '../../components/custom-button/CustomButton'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ErrorMessage from '../../components/error-message/ErrorMessage'
import { isErrorWithMessage } from '../../utils/isErrorWithMess'

const Employee = () => {
    const navigation = useNavigate()
    const [error, setError] = useState('')
    const params = useParams < {
        id: string
    } > ()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {data, isLoading} = useGetEmployeeQuery(params.id || '')
    const [removeEmployee] = useRemoveEmployeeMutation()
    const user = useSelector(selectUser)

    if (isLoading) 
        return <span>Загрузка</span>
    if (!data) 
        return <Navigate to={Paths.home}/>

    const showModal = () => {
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    const handleDeleteUser = async() => {
        hideModal()
        try {
            await removeEmployee(data.id).unwrap()
            navigation(Paths.status + '/deleted')
        } catch (error) {
            const maybeError = isErrorWithMessage(error)
            if (maybeError) {
                setError(error.data.message)
            } else {
                setError('Неизвестная ошибка')
            }
        }
    }

    return (
        <Layout>
            <Descriptions title="Информация о сотруднике" bordered={true} layout='vertical'>
                <Descriptions.Item label="Имя">{`${data.firstName} ${data.lastName}`}</Descriptions.Item>
                <Descriptions.Item label="Возраст">{`${data.age}`}</Descriptions.Item>
                <Descriptions.Item label="Адрес">{`${data.address}`}</Descriptions.Item>
            </Descriptions>
                {
                    user?.id === data.userId && (
                        <>
                            <Divider orientation='left'>Действия</Divider>
                            <Space>
                                <Link to={Paths.employeeEdit + `/${data.id}`}>
                                    <CustomButton shape='round' type='default' icon={<EditOutlined />}>Редактировать</CustomButton>
                                </Link>
                                <CustomButton shape='round' danger onClick={showModal} icon={<DeleteOutlined />} >Удалить</CustomButton>
                            </Space>
                        </>
                    )
                }
                <ErrorMessage message={error}/>
                <Modal title="Подтвердите удаление" open={isModalOpen} onOk={handleDeleteUser} okText="Удалить" cancelText="Отмена" onCancel={hideModal}>
                    Вы действительно хотите удалить сотрудника?
                </Modal>
            
        </Layout>
    )
}

export default Employee
