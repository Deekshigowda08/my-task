import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './navbar'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { MdDataSaverOn } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const App = () => {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const addthetodo = () => {
    settodos([...todos, { todo, id: uuidv4(), isCompleted: false }])
    settodo("")
    localstore();
  }
  const [showfinished, setshowfinished] = useState(true)
  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const localstore = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const changing = (e) => {
    settodo(e.target.value)
  }
  const checkboxchanging = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(index => {
      return index.id === id;
    })
    console.log(id, index)
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    localstore();
  }
  const handledelete = (e, id) => {
    let index = todos.findIndex(index => {
      return index.id === id;
    })
    console.log(id, index)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newtodos)
    localstore();
  }
  const handleedit = (e, id) => {
    let index = todos.findIndex(index => {
      return index.id === id;
    })
    console.log(id, index)
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    let newtodo = todos.filter(item => {
      return item.id === id;
    })
    settodo(newtodo[0].todo)
    settodos(newtodos)
    localstore();
  }
  const Toggleshow = () => {
    setshowfinished(!showfinished)
  }

  return (
    <>
      <Navbar />
      <div className='bg-[#87fbc5] mt-3 rounded-2xl  font-semibold mx-auto md:w-[60%] p-10'>
        <div className='font-extrabold text-2xl text-black'>Your-Tasks: Just Complete It...</div>
        <div className='flex gap-5 mt-3' >
          <input onChange={changing} value={todo} className='text-black w-[60%] pl-4 rounded-full pt-1 pb-1' type="text" />
          <button onClick={addthetodo} disabled={todo.length<3} className='bg-green-600 disabled:bg-red-700 rounded-md p-2 text-white text-xl '><MdDataSaverOn /></button>
        </div>
        <input  className="m-5 bg-blue-500" onChange={Toggleshow} type="checkbox" checked={showfinished} id="" />Show Finished
        <div className='mt-1 mb-2 h-[1px] bg-slate-400 rounded-full'></div>
        <div className='font-extrabold text-2xl mt-2 mb-2 text-white'>Your-Tasks</div>
       
        {todos.length == 0 && <div className='m-5'>No task found</div>}
        {todos.map(items => {
          return (showfinished || !items.isCompleted) && <div key={items.id} className='flex md:w-3/4 justify-between md:m-5 '>
            <div className='flex gap-3 p-1'>
              <input onChange={checkboxchanging} name={items.id} type="checkbox" checked={items.isCompleted} />
              <div className={items.isCompleted ? "line-through" : ""}>{items.todo}</div>
            </div>
            <div className='flex gap-1 p-1'>
              <button onClick={(e) => { handleedit(e, items.id) }} className='bg-blue-600 rounded-md p-3'><FaEdit /></button>
              <button onClick={(e) => { handledelete(e, items.id) }} className='bg-blue-600 rounded-md p-3'><MdDeleteSweep /></button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App

