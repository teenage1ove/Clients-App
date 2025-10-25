import { FC } from 'react'
import { useCurrentQuery } from '../services/auth'

type Props = {
  children: JSX.Element
}
const Auth:FC<Props> = ({children}) => {
  const {isLoading} = useCurrentQuery()

  if (isLoading) return <span>Загрузка</span>

  return children
}

export default Auth
