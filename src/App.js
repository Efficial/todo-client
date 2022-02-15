import { useState, useEffect } from "react";


function App() {
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(true);
  useEffect(()=>{
    if(refresh){
      fetch("http://localhost:8080")
        .then(response => {
          response.json()
          .then(data => {
            console.log(data)
            setTodos(data)
          })
        })
        setRefresh(false);
    }
  },[refresh])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {

      "body": event.target[0].value
    }
    fetch("http://localhost:8080",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    })
    setRefresh(true);

  }
  return (
<div className="App">
      <form onSubmit={handleSubmit}>
        <label>Enter a Task:
          <input
            type="text"
            name="todo"
            />
        </label>
        <input type="submit" />
      </form>
      {todos.map((todo, i) =>
        <li key={i}>
          {todo.body}
        </li>
      )}
    </div>
  );
}

export default App;
