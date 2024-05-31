import option from '../../assets/Options.svg'
import { useParams } from 'react-router-dom'
import CreateTaskModal from './CreateTaskModal';

const TopBar = ({ groups, openModal, groupId, onClose }) => {
  const activeGroup = groups.find(group => group.$id === groupId);

  return (
    <div className='h-[100px] fixed left-0 lg:left-[320px] right-0 bg-bg shadow flex justify-between items-center px-6 z-20'>
      <p className='text-primary font-bold text-[28px]'>{activeGroup && activeGroup.title}</p>
      <div className='flex items-center gap-10'>
        <button 
          className='text-lg font-semibold text-white bg-accent1 py-3 px-6 rounded-full opacity-80 hover:opacity-100 transition'
          onClick={() => openModal(<CreateTaskModal groupId={groupId} onClose={onClose}/>)}
        >
          + Create New Task
        </button>
        <button><img src={option} alt="more" /></button>
      </div>
    </div>
  )
}

export default TopBar
