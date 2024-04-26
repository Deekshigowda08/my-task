import './App.css'
import React from 'react'

const Navbar = () => {
  return (
    <div className='text-white bg-violet-800 flex justify-between py-4 px-10 mx-auto w-[100%]'>
      <div className='font-extrabold text-xl '>My-Task</div>
      <div className='flex md:gap-32 gap-2 font-semibold '>
        <div className='hover:font-bold cursor-pointer transition-all'>Home</div>
      <div className='hover:font-bold cursor-pointer transition-all'>My Task</div>
      </div>
    </div>
  )
}

export default Navbar
