import React, { useEffect, useState } from 'react'

const CreateStatusModal = ({ statusTitle, statusColor, setStatusColor, setStatusTitle, onClick }) => {

  const [title, setTitle] = useState('')
  const [color, setColor] = useState('#000000')

  setStatusColor(color)
  setStatusTitle(title)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 justify-between w-full items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          placeholder="Status Title"
          className="w-full h-40px px-3 py-2 text-black rounded-lg border-grey1 border-2"
        />

        <label htmlFor="color">Color</label>
        <input
          type="color"
          id="color"
          className="border-none h-11 overflow-hidden appearance-none"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <button
        onClick={onClick}
        className="bg-accent1 px-6 py-2 text-white font-semibold rounded-xl"
      >
        Create
      </button>
    </div>
  )
}

export default CreateStatusModal
