import React, { useEffect, useState } from 'react'
import { useSignOutAccountMutation } from '../../lib/react-query/queriesAndMutations'
import { useNavigate } from 'react-router-dom';
import { useUserContent } from '../../context/AuthContext';

const Home = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();
  const { user } = useUserContent

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess])

  return (
    <>
      <div className='flex'>
        <div>
          <button onClick={() => signOut()}>SignOut</button>
          <a href=""></a>
        </div>
      </div>
    </>
  )
}

export default Home
