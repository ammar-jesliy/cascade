import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreateStatusModal from './CreateStatusModal';
import { useCreateStatusMutation } from '../../lib/react-query/queriesAndMutations';
import Modal from '../../components/Modal'
import { fetchStatuses } from '../../lib/appwrite/api';
import Spinner from '../../components/Spinner';
import '../../assets/scrollbar.css'

const MainPage = () => {
    const { groupId } = useParams();

    const { mutateAsync: createStatus } = useCreateStatusMutation()
    const [statuses, setStatuses] = useState(() => {
        const savedStatuses = localStorage.getItem('statuses');
        return savedStatuses ? JSON.parse(savedStatuses) : []
    });
    const [statusTitle, setStatusTitle] = useState("");
    const [statusColor, setStatusColor] = useState("#000000");
    const [isLoading, setIsLoading] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const handleCreateStatus = async () => {
        if (statusTitle.trim() !== '') {
            const title = statusTitle;
            const color = statusColor;

            try {
                const newStatus = await createStatus({title, color, groupId});

                if (!newStatus) throw Error;

                setStatuses(prevStatuses => [...prevStatuses, newStatus])
                
            } catch (error) {
                console.log(error);
            }

            setStatusTitle('');
            setStatusColor("#000000")
        }
    }


    useEffect(() => {
        const loadStatuses = async () => {
            try {
                setIsLoading(true)
                const fetchedStatuses = await fetchStatuses(groupId);

                if (!fetchStatuses) throw Error

                setStatuses(fetchedStatuses)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }

        };

        if (groupId) {
            loadStatuses();
        }
    }, [groupId])

    useEffect(() => {
        localStorage.setItem('statuses', JSON.stringify(statuses));
    }, [statuses])

    return (
        <>
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <div className='flex flex-col items-center gap-4'>
                    <div className='flex gap-2 justify-between w-full items-center'>
                        <input 
                            type="text"
                            value={statusTitle}
                            onChange={(e) => setStatusTitle(e.target.value)}
                            placeholder='Status Title'
                            className="w-full h-40px px-3 py-2 text-black rounded-lg border-grey1 border-2"
                            
                        />

                        <label htmlFor="color">Color</label>
                        <input 
                            type="color" 
                            id='color' 
                            className='border-none h-11 overflow-hidden appearance-none'
                            value={statusColor}
                            onChange={(e) => setStatusColor(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleCreateStatus}
                        className='bg-accent1 px-6 py-2 text-white font-semibold rounded-xl' 
                    >
                        Create
                    </button>
                </div>
            </Modal>

            <div className='bg-bgApp flex-1 h-[calc(100vh-100px)] lg:w-[calc(100vw-320px)] overflow-auto mt-[100px] pl-8 pb-8 lg:ml-[320px]'>
                {isLoading ? <Spinner /> : 
                    <div className='z-10 flex'>

                        <ul className='flex gap-10 mr-10'>
                            {statuses && statuses
                            .filter(status => status.groups.$id === groupId)
                            .map(status => {
                                

                                return (
                                    <li 
                                        key={status.$id}
                                        className='w-[300px] flex flex-col'
                                    >
                                        <div className='flex gap-4 items-center sticky top-0 justify-center bg-bgApp py-8 '>
                                            <div 
                                                className='h-6 w-6 rounded-full'
                                                style={{backgroundColor: status.color}}
                                            ></div>
                                            <p className='text-lg font-normal uppercase text-grey2'>{status.title}</p>
                                        </div>
                                        <div>
                                            <div className='bg-bg rounded-xl py-6 px-6 flex flex-col gap-4 cursor-pointer'>
                                                <p className='text-lg font-semibold text-primary'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, sapiente?</p>
                                                <p className='text-sm font-medium text-grey2'>1 of 3 subtasks</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>


                        <button 
                            className='bg-accent2 w-[300px] h-[calc(100vh-224px)] px-10 rounded-2xl text-primary text-[22px] font-bold whitespace-nowrap mr-10 mt-[92px]'
                            onClick={() => openModal(CreateStatusModal)}
                        >
                            + New Status
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default MainPage
