import { useState } from 'react'
import TopBar from './pages/TopBar'
import Groups from './pages/Groups'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    const [groups, setGroups] = useState([]);

    const handleCreateGroup = (title) => {
      const newGroup = {id: Date.now().toString(), title};
      setGroups(prevGroups => [...prevGroups, newGroup]);
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
