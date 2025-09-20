import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../store/store'
import { MOCK_USER } from '../../data/mockData'


function UserInfo() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.app.user)

  useEffect(() => {
    setTimeout(() => {
      dispatch(setUser(MOCK_USER))
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