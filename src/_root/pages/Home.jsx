import React, { useEffect } from 'react'
import { useSignOutAccountMutation } from '../../lib/react-query/queriesAndMutations'
import Button from '../../components/Button';
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
    <div>
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  )
}

export default Home
