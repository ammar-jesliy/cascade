import React, { useState, useEffect, useRef } from 'react'
import Dropdown from '../../components/Dropdown';
import { useCreateTaskMutation, useCreateSubtaskMutation } from '../../lib/react-query/queriesAndMutations';
import Delete from '../../assets/X-delete.svg';

const CreateTaskModal = ({ groupId, onClose }) => {

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [taskDescription, setTaskDescription] = useState('')
  const [taskTitle, setTaskTitle] = useState('')
  const [subtasks, setSubtasks] = useState([{ title: ''}])

  const { mutateAsync: createTask } = useCreateTaskMutation();
  const { mutateAsync: createSubtask } = useCreateSubtaskMutation()

  const hasSetDefaultStatus = useRef(false);

  const getStatuses = () => {
    const savedStatuses = localStorage.getItem('statuses');
    return savedStatuses ? JSON.parse(savedStatuses) : []
  }

  const statuses = getStatuses()


  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].title = value;
    setSubtasks(newSubtasks);
  };

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { title: '' }]);
  };
  
  const handleRemoveSubtask = (index) => {
    const newSubtasks = subtasks.filter((_, idx) => idx !== index);
    setSubtasks(newSubtasks);
  };


  const handleCreateTask = async () => {
    try {
      // Create the task
      const newTask = await createTask({
        title: taskTitle,
        description: taskDescription,
        statusId: selectedStatus.$id, 
      });

      if (!newTask) throw Error

      // Create each subtask and link it to the created task
      const subtaskPromises = subtasks.map((subtask) =>
        createSubtask({
          title: subtask.title,
          taskId: newTask.$id, // Link subtask to the created task
        })
      );

      await Promise.all(subtaskPromises);

      // Close modal after task and subtask creation
      onClose();

    } catch (error) {
      console.error('Error creating task and subtasks:', error);
    }
  };


  useEffect(() => {
    if (!hasSetDefaultStatus.current && statuses && statuses.length > 0) {
      setSelectedStatus(statuses[0]); // Set default status
      hasSetDefaultStatus.current = true
    }
  }, [statuses]);


  return (
    <div className='flex flex-col'>
      <h2 className='font-semibold text-lg mb-5'>Create New Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
      />
      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg mb-2 w-full max-h-32"
      />

      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Subtasks</h3>
        <div className='max-h-[150px] overflow-auto'>
          {subtasks.map((subtask, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                placeholder={`Subtask ${index + 1}`}
                value={subtask.title}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
              />
              <button
                onClick={() => handleRemoveSubtask(index)}
                className="ml-2 px-2 py-1"
              >
                <img src={Delete} alt="Remove" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddSubtask}
          className="px-4 py-2 bg-accent1 text-white rounded-3xl w-full mb-12"
        >
          + Add Subtask
        </button>
      </div>

      <Dropdown
        options={statuses || []}
        selectedOption={selectedStatus}
        onOptionSelect={setSelectedStatus}
      />
      <div className='flex gap-3 mt-4'>
        <button 
          onClick={onClose}
          className='flex-1 border-accent1 border-2 rounded-3xl text-accent1 font-semibold text-lg'
        >
          Cancel
        </button>
        <button 
          onClick={handleCreateTask}
          className='flex-1 bg-accent1 rounded-3xl py-3 text-white text-lg font-semibold'
        >
          Create Task
        </button>
      </div>
    </div>
  )
}

export default CreateTaskModal