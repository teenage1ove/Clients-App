import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { store } from './store/store'
import { Paths } from './paths/paths'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './index.css'
import Auth from './features/Auth'
import Employees from './pages/employees/Employees'
import AddEmployee from './pages/add-employee/AddEmployee'
import Status from './pages/status/Status'
import Employee from './pages/employee/Employee'
import EmployeeEdit from './pages/edit-employee/EmployeeEdit'


const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.register,
    element: <Register />
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EmployeeEdit />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
          <Auth>
            <RouterProvider router={router}/>
          </Auth>
        </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)