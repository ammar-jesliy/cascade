import React from 'react'
import { useParams } from 'react-router-dom'

const MainPage = () => {
    const { groupId } = useParams();

  return (
    <div>
      {groupId}
    </div>
  )
}

export default MainPage
