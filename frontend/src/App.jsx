import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // এডিট আইকন যুক্ত করা হয়েছে

function App() {
  let [task, setTask] = useState("");
  let [priority, setPriority] = useState("");
  let [status, setStatus] = useState("");
  let [info, setInfo] = useState({});
  let [data, setData] = useState([]);
  let [isUpdate, setIsUpdate] = useState(false);
  let [id, setId] = useState("");

  let handelClick = async () => {
    let response = await axios.post("http://localhost:5000/todo", {
      task: task,
      priority: priority,
      status: status,
    });

    setInfo(response.data);

    let todoData = await axios.get("http://localhost:5000/allTodo");
    setData(todoData.data.data);
    setTask("");
    setPriority("");
    setStatus("");
  };

  useEffect(() => {
    async function todos() {
      let todosData = await axios.get("http://localhost:5000/allTodo");
      setData(todosData.data.data);
    }
    todos();
  }, []);

  let handelDelete = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    let todosData = await axios.get("http://localhost:5000/allTodo");
    setData(todosData.data.data);
  };

  let handelTask = (e) => setTask(e.target.value);
  let handelPriority = (e) => setPriority(e.target.value);
  let handelStatus = (e) => setStatus(e.target.value);

  let handelEdit = (item) => {
    setTask(item.task)
    setPriority(item.priority)
    setStatus(item.status)
    setIsUpdate(true)
    setId(item._id)
  }

  let handelUpdate = async () => {
    await axios.post(`http://localhost:5000/update/${id}`, {
      task: task,
      priority: priority,
      status: status,
    })
    let todoData = await axios.get("http://localhost:5000/allTodo");
    setData(todoData.data.data);
    setTask("");
    setPriority("");
    setStatus("");
    setIsUpdate(false);
  };

  return (
    <>
      <section className="mx-3 md:mx-auto my-10 max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl bg-[#1A1A1A] shadow-xl border border-zinc-800 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-white tracking-tight">Todo App</h1>

        {info.message && !info.success && (
          <p className="text-red-400 bg-red-950/40 border border-red-900/50 p-3 rounded-xl mb-4 text-sm font-medium">
            {info.message}
          </p>
        )}

        {/* Input Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch justify-center">
          <input
            value={task}
            type="text"
            onChange={handelTask}
            placeholder="Write a task..."
            className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-zinc-500 transition-all text-sm"
          />

          <select
            value={priority}
            onChange={handelPriority}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer w-full md:w-auto"
          >
            <option value="" disabled>Priority</option>
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </select>

          <select
            value={status}
            onChange={handelStatus}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer w-full md:w-auto"
          >
            <option value="" disabled>Status</option>
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Block">Block</option>
          </select>

          {isUpdate ? (
            <button
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm shadow-md active:scale-95 w-full md:w-auto whitespace-nowrap"
              onClick={handelUpdate}
            >
              Update Task
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm shadow-md active:scale-95 w-full md:w-auto whitespace-nowrap"
              onClick={handelClick}
            >
              Add Task
            </button>
          )}
        </div>

        {/* List items */}
        {data.length > 0 && (
          <ul className="bg-zinc-900/50 border border-zinc-800 p-4 md:p-6 mt-6 rounded-2xl text-white divide-y divide-zinc-800 text-left">
            {data.map((item, index) => (
              <li key={item._id || item.id || index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3.5 first:pt-0 last:pb-0 gap-3">

                <span className="font-medium text-zinc-200 overflow-hidden max-w-full sm:max-w-[45%] break-words">
                  {item.task}
                </span>

                <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0 W-full sm:w-auto justify-end">
                  {/* Dynamic Priority Badge */}
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      item.priority === 'Mid' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                    {item.priority || 'Low'}
                  </span>

                  {/* Clean Status Design */}
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.status === 'Active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      item.status === 'Block' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                        'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}>
                    {item.status || 'Pending'}
                  </span>

                  {/* Styled Edit Button with Icon */}
                  <button
                    onClick={() => handelEdit(item)}
                    className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors flex items-center justify-center"
                    title="Edit Task"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>

                  {/* Sleek Red Trash Delete Button */}
                  <button
                    onClick={() => handelDelete(item._id)}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center"
                    title="Delete Task"
                  >
                    <FaTrashAlt className="w-3.5 h-3.5" />
                  </button>
                </div>

              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default App;