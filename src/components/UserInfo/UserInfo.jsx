import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/store'

function UserInfo() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.user)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setUser({
        id: 1,
        name: 'Иван Иванов',
        email: 'ivan@example.com'
      }))
    }, 500)
  }, [dispatch])

  return (
    <>
      <div className="user-info">
        {user ? (
          <span>Привет, {user.name}!</span>
        ) : (
          <span>Загрузка...</span>
        )}
      </div>
    </>
  )
}

export default UserInfo