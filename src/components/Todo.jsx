import React, { useState } from "react";
import { format } from "date-fns";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [useDate, setUseDate] = useState(false);
  const [useTime, setUseTime] = useState(false);

  const addTodo = () => {
    if (input.trim() && (!useDate || date) && (!useTime || time)) {
      const newTodo = {
        text: input,
        date: useDate ? date : null,
        time: useTime ? time : null,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
      setDate("");
      setTime("");
      setUseDate(false);
      setUseTime(false);
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const moveTask = (index, direction) => {
    const newTodos = [...todos];
    const [movedTask] = newTodos.splice(index, 1);
    if (direction === "up" && index > 0) {
      newTodos.splice(index - 1, 0, movedTask);
    } else if (direction === "down" && index < newTodos.length) {
      newTodos.splice(index + 1, 0, movedTask);
    }
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl flex space-x-8">
        
        {/* Add Task Section */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Task</h1>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task description"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={useDate}
                onChange={() => setUseDate(!useDate)}
                className="mr-2"
              />
              <label className="text-gray-700">Enable Date</label>
            </div>
            {useDate && (
              <input
                type="date"
                className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={useTime}
                onChange={() => setUseTime(!useTime)}
                className="mr-2"
              />
              <label className="text-gray-700">Enable Time</label>
            </div>
            {useTime && (
              <input
                type="time"
                className="border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            )}
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Tasks to Complete</h1>
          <ul className="space-y-4">
            {todos.map((todo, index) => (
              <li key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(index)}
                    className="mr-3"
                  />
                  <div>
                    <p className={`${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>{todo.text}</p>
                    {todo.date && (
                      <p className="text-gray-500 text-sm">
                        {format(new Date(todo.date + (todo.time ? "T" + todo.time : "")), "MMM d, yyyy h:mm a")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => moveTask(index, "up")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveTask(index, "down")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {todos.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
