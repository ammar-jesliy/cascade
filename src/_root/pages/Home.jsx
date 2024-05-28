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
      <div className='flex items-center justify-center flex-1'>
        main
      </div>
    </>
  )
}

export default Home
