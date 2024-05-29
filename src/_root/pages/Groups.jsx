import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logoText from '../../assets/Logo-text.svg'
import logoIcon from '../../assets/Logo-icon.png'
import add from '../../assets/Add.svg'
import Exit from '../../assets/Exit.svg'
import { useUserContent } from '../../context/AuthContext';
import { useSignOutAccountMutation } from '../../lib/react-query/queriesAndMutations'
import ProfileModal from './ProfileModal'

const Groups = ({ onCreateGroup, groups, openModal }) => {
    const { pathname } = useLocation();
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [groupTitle, setGroupTitle] = useState('');
    const { user } = useUserContent()
    const { mutate: signOut, isSuccess } = useSignOutAccountMutation();

    const handleCreateGroup = () => {
        if (groupTitle.trim() !== '') {
            onCreateGroup(groupTitle);
            setGroupTitle('');
            setIsCreatingGroup(false);
        }
    };


    useEffect(() => {
        if (isSuccess) navigate('/');
    }, [isSuccess])

  return (
    <div className='hidden fixed lg:flex flex-col w-80 bg-bg h-[100vh] shadow p-8 pt-6 justify-between overflow-y-auto'>
        <div>
            <div className='flex'>
                <img src={logoIcon} alt="Logo" />
                <img src={logoText} alt="Cascade" />
            </div>

            <button 
                className='flex items-center gap-3 mb-12 mt-7'
                onClick={() => openModal(ProfileModal)}
            >
                <div className='h-14 w-14 rounded-full bg-grey2'>
                </div>
                <div className='flex flex-col items-start'>
                    <p className='text-primary font-bold text-2xl'>{user.name}</p>
                    <p className='text-primary opacity-70 text-sm'>{user.email}</p>
                </div>
                
            </button>
            
            <h2 className='text-xs font-normal text-grey2 mb-3'>All Groups ({groups.length})</h2>

            <ul>
                {groups.map(group => {
                    const groupId = group.$id
                    const isActive = pathname === `/groups/${groupId}`

                    return (
                    <li key={groupId} className='group'>
                        <NavLink
                            to={`/groups/${groupId}`}
                            className={`flex text-left w-full py-3 pl-8  mx-[-32px] rounded-r-3xl gap-2 items-center group-hover:text-grey1 group-hover:bg-accent1 transition ${isActive ? `text-grey1 bg-accent1` : `text-grey2`}`}
                        >
                            <svg 
                                width="30" height="30" viewBox="0 0 30 30" fill="none" 
                                className={`fill-current group-hover:text-grey1 transition ${isActive ? `text-grey1` : `text-grey2`}`} 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 6C15.8285 6 16.5 6.67158 16.5 7.5V21C16.5 21.8284 15.8285 22.5 15 22.5C14.1715 22.5 13.5 21.8284 13.5 21V7.5C13.5 6.67158 14.1715 6 15 6ZM21 9C21.8284 9 22.5 9.67158 22.5 10.5V21C22.5 21.8284 21.8284 22.5 21 22.5C20.1716 22.5 19.5 21.8284 19.5 21V10.5C19.5 9.67158 20.1716 9 21 9ZM10.5 13.5C10.5 12.6715 9.82843 12 9 12C8.17158 12 7.5 12.6715 7.5 13.5V21C7.5 21.8284 8.17158 22.5 9 22.5C9.82842 22.5 10.5 21.8284 10.5 21V13.5ZM7.8751 0.58173C9.82317 0.1488 12.1865 0 15 0C17.8135 0 20.1768 0.1488 22.1249 0.58173C24.09 1.01846 25.7232 1.764 26.9796 3.02037C28.236 4.27674 28.9815 5.91003 29.4183 7.8751C29.8512 9.82317 30 12.1865 30 15C30 17.8135 29.8512 20.1768 29.4183 22.1249C28.9815 24.09 28.236 25.7232 26.9796 26.9796C25.7232 28.236 24.09 28.9815 22.1249 29.4183C20.1768 29.8512 17.8135 30 15 30C12.1865 30 9.82317 29.8512 7.8751 29.4183C5.91003 28.9815 4.27674 28.236 3.02037 26.9796C1.764 25.7232 1.01846 24.09 0.58173 22.1249C0.1488 20.1768 0 17.8135 0 15C0 12.1865 0.1488 9.82317 0.58173 7.8751C1.01846 5.91003 1.764 4.27674 3.02037 3.02037C4.27674 1.764 5.91003 1.01846 7.8751 0.58173Z" fill="currentColor"/>
                            </svg>
                            <p className='text-[18px] font-semibold'>{group.title}</p>
                        </NavLink>
                    </li>
                )})}
            </ul>

            {isCreatingGroup && (
                <div className='flex mt-2'>
                    <input 
                        type="text"
                        value={groupTitle}
                        onChange={(e) => setGroupTitle(e.target.value)}
                        placeholder='Group Title'
                        className="w-full h-40px px-3 py-2 text-black rounded-l"
                    />
                    <button 
                        onClick={handleCreateGroup}
                        className="bg-accent1 opacity-70 hover:opacity-100 transition text-white font-bold py-2 px-4 rounded-r"
                    >
                        Save
                    </button>
                </div>
            )}

            <button 
                onClick={() => setIsCreatingGroup(!isCreatingGroup)} className='group flex items-center gap-2 w-full my-3'
            >
                {isCreatingGroup ? (
                    <p className='flex bg-red-500 py-1 px-2 mt-1 rounded text-white font-bold'>Cancel</p>
                ) : (
                    <>
                        <img src={add} alt="Add" className='opacity-80 group-hover:opacity-100 transition'/>
                        <p className='text-accent1 text-lg font-semibold opacity-80 group-hover:opacity-100 transition'>Create New Group</p>
                    </>
                )}
            </button>
        </div>

        <div className='py-5'>
            <button 
                className='flex items-center gap-3' 
                onClick={() => signOut()}
            >
                <img src={Exit} alt="Exit" />
                <p className='text-[20px] font-bold text-grey2'>Log Out</p>
            </button>
        </div>

    </div>
  )
}

export default Groups
