import { useEffect, useState } from 'react'
import TopBar from './pages/TopBar'
import Groups from './pages/Groups'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUserContent } from '../context/AuthContext'
import { useCreateGroupMutation } from '../lib/react-query/queriesAndMutations'
import { fetchGroups } from '../lib/appwrite/api'
import Modal from '../components/Modal'

const RootLayout = () => {
    const [groups, setGroups] = useState(() => {
        const savedGroups = localStorage.getItem('groups');
        return savedGroups ? JSON.parse(savedGroups) : []
    });
    const { user } = useUserContent();
    const { mutateAsync: createGroup } = useCreateGroupMutation();
    const navigate = useNavigate()
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);


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


    const openModal = (content) => {
        setModalContent(content);
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    }


    useEffect(() => {
        const loadGroups = async () => {
            const fetchedGroups = await fetchGroups(user.$id);
            setGroups(fetchedGroups)
        };

        if (user.$id) {
            loadGroups();
        }
    }, [user.$id])

    useEffect(() => {
        localStorage.setItem('groups', JSON.stringify(groups));
    }, [groups])


    return (
        <div className='flex w-full'>

            <Modal isVisible={isModalVisible} onClose={closeModal}>
                {modalContent}
            </Modal>

            <Groups onCreateGroup={handleCreateGroup} groups={groups} openModal={openModal} />
            

            <section className='flex-1 flex flex-col h-screen'>
                <TopBar groups={groups} openModal={openModal}/>
                <Outlet openModal={openModal} />
            </section>
        </div>
    )
}

export default RootLayout
