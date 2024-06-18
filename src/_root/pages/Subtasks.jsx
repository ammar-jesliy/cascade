import React, { useEffect, useState } from "react";

const Subtasks = ({ subtask, updateSubtaskStatus }) => {
  const [checked, setChecked] = useState(subtask.completed);

  const handleCheckboxChange = async () => {
    const newStatus = !checked;
    setChecked(newStatus);

    await updateSubtaskStatus(subtask.$id, newStatus);
  };

  useEffect(() => {
    setChecked(subtask.completed);
  }, [subtask.completed]);

  return (
    <div
      className="flex items-center bg-grey1 rounded-md py-3 px-3 gap-4 mb-2"
      key={subtask.$id}
    >
      <input
        type="checkbox"
        name="completed"
        id={`completed-${subtask.$id}`}
        className="h-6 w-6 checked:bg-accent1"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor={`completed-${subtask.$id}`}
        className="text-sm font-normal"
      >
        {subtask.title}
      </label>
    </div>
  );
};

export default Subtasks;
