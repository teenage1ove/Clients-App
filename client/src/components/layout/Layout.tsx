import { FC } from 'react'
import {Layout as AntdLayout} from 'antd'
import styles from './layout.module.scss'
import Header from '../header/Header'

type Props = {
    children: React.ReactNode
}

const Layout:FC<Props> = ({children}) => {
  return (
    <div className={ styles.main }>
      <Header />
      <AntdLayout.Content style={{height: '100%', color: 'white'}}>
        {children}
      </AntdLayout.Content>
    </div>
  )
}

export default Layout
