import { useState } from 'react'
import TopBar from './pages/TopBar'
import Groups from './pages/Groups'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContent } from '../context/AuthContext'
import { useCreateGroupMutation } from '../lib/react-query/queriesAndMutations'

const RootLayout = () => {
    const [groups, setGroups] = useState([]);
    const { user } = useUserContent();
    const { mutateAsync: createGroup } = useCreateGroupMutation();
    const navigate = useNavigate()

    const handleCreateGroup = async (title) => {
        const userId = user.$id 
        try {
            const newGroup = await createGroup({title, userId})

            if (!newGroup) throw Error;

            setGroups(prevGroups => [...prevGroups, newGroup]);

            navigate(`/groups/${newGroup.$id}`)

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='flex w-full'>
            <Groups onCreateGroup={handleCreateGroup} groups={groups} />
            

            <section className='flex-1 flex flex-col'>
                <TopBar />
                <Outlet />
            </section>
        </div>
    )
}

export default RootLayout
