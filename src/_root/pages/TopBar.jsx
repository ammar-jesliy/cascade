import option from '../../assets/Options.svg'

const TopBar = () => {
  return (
    <div className='h-[100px] shadow flex justify-between items-center px-6'>
      <p className='text-primary font-bold text-[28px]'>Exam Preparation</p>
      <div className='flex items-center gap-10'>
        <button 
          className='text-lg font-semibold text-white bg-accent1 py-3 px-6 rounded-full opacity-80 hover:opacity-100 transition'
        >
          + Create New Task
        </button>
        <button><img src={option} alt="more" /></button>
      </div>
    </div>
  )
}

export default TopBar
