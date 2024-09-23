import { useState,useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  

const[todos,settodos] = useState([])
const [todoValue, setTodoValue] = useState('')

function persistData(newList){
  localStorage.setItem('todos',JSON.stringify({todos:newList}))
}

function handleAddtodos(newtodo){
  const newtodolist = [...todos,newtodo]
  persistData(newtodolist)
  settodos(newtodolist)
}

function handleDeleteTodo(index){
  const newtodolist = todos.filter((todo,todoIndex) => {
    return todoIndex != index
  })
  persistData(newtodolist)
  settodos(newtodolist)
}
function handleEditTodo(index){
  const valueToBeEdited = todos[index]
  setTodoValue(valueToBeEdited)
  handleDeleteTodo(index)

}
useEffect(()=>{
  if(!localStorage){
    return
  }

  let localTodos = localStorage.getItem('todos')
  if(!localTodos){
    return
  }
    localTodos=JSON.parse(localTodos).todos
    settodos(localTodos)

  
},[])
  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddtodos = {handleAddtodos}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>

      
    </>
  )
}

export default App
