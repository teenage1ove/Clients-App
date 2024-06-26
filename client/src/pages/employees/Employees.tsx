import { PlusCircleOutlined } from '@ant-design/icons'
import CustomButton from '../../components/custom-button/CustomButton'
import Layout from '../../components/layout/Layout'
import { Table } from 'antd'
import { useGetAllEmployeesQuery } from '../../services/employees'
import type { ColumnsType } from 'antd/es/table'
import { Employee } from '@prisma/client'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../paths/paths'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/authSlice'
import { useEffect } from 'react'

const columns: ColumnsType<Employee> = [
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName'
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address'
    },
]

const Employees = () => {
    const navigate = useNavigate()
    const {data, isLoading} = useGetAllEmployeesQuery()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            navigate(Paths.login)
        }
    }, [navigate, user])

    const goToAddUser = () => {
        navigate(Paths.employeeAdd)
    }

  return (
    <Layout>
        <CustomButton type='primary' onClick={goToAddUser} icon={<PlusCircleOutlined />}>
            Добавить
        </CustomButton>
        <Table 
            loading={isLoading}
            dataSource={data}
            pagination={false}
            columns={columns}
            rowKey={record => record.id}
            onRow={record => {
                return {
                    onClick: () => navigate(`${Paths.employee}/${record.id}`)
                }
            }}
        />
    </Layout>
  )
}

export default Employees
