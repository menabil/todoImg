// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit, FaRegImage } from "react-icons/fa";

// function App() {
//   let [task, setTask] = useState("");
//   let [priority, setPriority] = useState("");
//   let [status, setStatus] = useState("");
//   let [image, setImage] = useState(null);
//   let [info, setInfo] = useState({});
//   let [data, setData] = useState([]);
//   let [isUpdate, setIsUpdate] = useState(false);
//   let [id, setId] = useState("");

//   const fileInputRef = useRef(null);

//   let handelClick = async () => {
//     const formData = new FormData();
//     formData.append("task", task);
//     formData.append("priority", priority);
//     formData.append("status", status);
//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       let response = await axios.post("http://localhost:5000/todo", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setInfo(response.data);

//       let todoData = await axios.get("http://localhost:5000/allTodo");
//       setData(todoData.data.data);

//       resetForm();
//     } catch (error) {
//       console.error("Error creating todo:", error);
//     }
//   };

//   useEffect(() => {
//     async function todos() {
//       try {
//         let todosData = await axios.get("http://localhost:5000/allTodo");
//         setData(todosData.data.data);
//       } catch (error) {
//         console.error("Error fetching todos:", error);
//       }
//     }
//     todos();
//   }, []);

//   let handelDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/delete/${id}`);
//       let todosData = await axios.get("http://localhost:5000/allTodo");
//       setData(todosData.data.data);
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   let handelTask = (e) => setTask(e.target.value);
//   let handelPriority = (e) => setPriority(e.target.value);
//   let handelStatus = (e) => setStatus(e.target.value);

//   let handelImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   let handelEdit = (item) => {
//     setTask(item.task);
//     setPriority(item.priority || "");
//     setStatus(item.status || "");
//     setIsUpdate(true);
//     setId(item._id);
//   };

//   let handelUpdate = async () => {
//     const formData = new FormData();
//     formData.append("task", task);
//     formData.append("priority", priority);
//     formData.append("status", status);
//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       await axios.post(`http://localhost:5000/update/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       let todoData = await axios.get("http://localhost:5000/allTodo");
//       setData(todoData.data.data);

//       resetForm();
//       setIsUpdate(false);
//     } catch (error) {
//       console.error("Error updating todo:", error);
//     }
//   };

//   const resetForm = () => {
//     setTask("");
//     setPriority("");
//     setStatus("");
//     setImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <>
//       <section className="mx-3 md:mx-auto my-10 max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl bg-[#1A1A1A] shadow-xl border border-zinc-800 text-center">
//         <h1 className="text-3xl md:text-4xl font-extrabold mb-10 text-white tracking-tight">Todo App</h1>

//         {info.message && !info.success && (
//           <p className="text-red-400 bg-red-950/40 border border-red-900/50 p-3 rounded-xl mb-4 text-sm font-medium">
//             {info.message}
//           </p>
//         )}

//         {/* Input Controls Container */}
//         <div className="flex flex-col gap-4">

//           {/* Row 1: Task Input (Full line) */}
//           <div className="w-full">
//             <input
//               value={task}
//               type="text"
//               onChange={handelTask}
//               placeholder="Write a task..."
//               className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-zinc-500 transition-all text-sm"
//             />
//           </div>

//           {/* Row 2: Image, Priority, Status, Button */}
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

//             {/* Image Input */}
//             <div className="md:col-span-5 flex items-center gap-2 bg-zinc-900/40 border border-zinc-700/80 p-2.5 rounded-xl w-full">
//               <FaRegImage className="w-5 h-5 text-zinc-500 shrink-0" />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handelImageChange}
//                 ref={fileInputRef}
//                 className="block w-full text-xs text-zinc-500
//                   file:mr-3 file:py-1 file:px-2.5
//                   file:rounded-lg file:border-0
//                   file:text-xs file:font-semibold
//                   file:bg-zinc-800 file:text-zinc-300
//                   hover:file:bg-zinc-700 cursor-pointer"
//               />
//             </div>

//             {/* Priority Dropdown */}
//             <select
//               value={priority}
//               onChange={handelPriority}
//               className="md:col-span-2 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer w-full"
//             >
//               <option value="" disabled>Priority</option>
//               <option value="Low">Low</option>
//               <option value="Mid">Mid</option>
//               <option value="High">High</option>
//             </select>

//             {/* Status Dropdown */}
//             <select
//               value={status}
//               onChange={handelStatus}
//               className="md:col-span-2 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer w-full"
//             >
//               <option value="" disabled>Status</option>
//               <option value="Pending">Pending</option>
//               <option value="Active">Active</option>
//               <option value="Block">Block</option>
//             </select>

//             {/* Action Button */}
//             <div className="md:col-span-3 w-full">
//               {isUpdate ? (
//                 <button
//                   className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 rounded-xl transition-colors text-sm shadow-md active:scale-95 w-full whitespace-nowrap"
//                   onClick={handelUpdate}
//                 >
//                   Update Task
//                 </button>
//               ) : (
//                 <button
//                   className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors text-sm shadow-md active:scale-95 w-full whitespace-nowrap"
//                   onClick={handelClick}
//                 >
//                   Add Task
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>

//         {/* List items */}
//         {data.length > 0 && (
//           <ul className="bg-zinc-900/50 border border-zinc-800 p-4 md:p-6 mt-6 rounded-2xl text-white divide-y divide-zinc-800 text-left">
//             {data.map((item, index) => (
//               <li key={item._id || item.id || index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3.5 first:pt-0 last:pb-0 gap-3">

//                 <div className="flex items-center gap-3 overflow-hidden max-w-full sm:max-w-[50%]">
//                   {item.path ? (
//                     <img
//                       src={`http://localhost:5000${item.path}`}
//                       alt="task"
//                       className="w-10 h-10 object-cover rounded-lg border border-zinc-700 shrink-0 bg-zinc-800"
//                       onError={(e) => { e.target.style.display = 'none'; }}
//                     />
//                   ) : (
//                     <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 shrink-0">
//                       <FaRegImage className="w-4 h-4 text-zinc-600" />
//                     </div>
//                   )}
//                   <span className="font-medium text-zinc-200 wrap-break-word">
//                     {item.task}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0 w-full sm:w-auto justify-end">
//                   <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
//                     item.priority === 'Mid' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
//                       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
//                     }`}>
//                     {item.priority || 'Low'}
//                   </span>

//                   <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.status === 'Active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
//                     item.status === 'Block' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
//                       'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
//                     }`}>
//                     {item.status || 'Pending'}
//                   </span>

//                   <button
//                     onClick={() => handelEdit(item)}
//                     className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors flex items-center justify-center"
//                     title="Edit Task"
//                   >
//                     <FaEdit className="w-4 h-4" />
//                   </button>

//                   <button
//                     onClick={() => handelDelete(item._id)}
//                     className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center justify-center"
//                     title="Delete Task"
//                   >
//                     <FaTrashAlt className="w-3.5 h-3.5" />
//                   </button>
//                 </div>

//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </>
//   );
// }

// export default App;

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaRegImage } from "react-icons/fa";

function App() {
  let [task, setTask] = useState("");
  let [priority, setPriority] = useState("");
  let [status, setStatus] = useState("");
  let [image, setImage] = useState(null);
  let [info, setInfo] = useState({});
  let [data, setData] = useState([]);
  let [isUpdate, setIsUpdate] = useState(false);
  let [id, setId] = useState("");

  const fileInputRef = useRef(null);

  let handelClick = async () => {
    const formData = new FormData();
    formData.append("task", task);
    formData.append("priority", priority);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }

    try {
      let response = await axios.post("http://localhost:5000/todo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setInfo(response.data);

      let todoData = await axios.get("http://localhost:5000/allTodo");
      setData(todoData.data.data);

      resetForm();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  useEffect(() => {
    async function todos() {
      try {
        let todosData = await axios.get("http://localhost:5000/allTodo");
        setData(todosData.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    todos();
  }, []);

  let handelDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      let todosData = await axios.get("http://localhost:5000/allTodo");
      setData(todosData.data.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  let handelTask = (e) => setTask(e.target.value);
  let handelPriority = (e) => setPriority(e.target.value);
  let handelStatus = (e) => setStatus(e.target.value);

  let handelImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  let handelEdit = (item) => {
    setTask(item.task);
    setPriority(item.priority || "");
    setStatus(item.status || "");
    setIsUpdate(true);
    setId(item._id);
    // নোট: এডিটের সময় আগের ইমেজ ফাইল অবজেক্ট সরাসরি ইনপুটে সেট করা যায় না, 
    // তবে আপনি চাইলে এখানে আলাদা একটি স্টেটে আগের ইমেজের পাথ রেখে প্রিভিউ দেখাতে পারেন।
    setImage(null); 
  };

  let handelUpdate = async () => {
    const formData = new FormData();
    formData.append("task", task);
    formData.append("priority", priority);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`http://localhost:5000/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let todoData = await axios.get("http://localhost:5000/allTodo");
      setData(todoData.data.data);

      resetForm();
      setIsUpdate(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const resetForm = () => {
    setTask("");
    setPriority("");
    setStatus("");
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

        {/* Input Controls Container */}
        <div className="flex flex-col gap-4">

          {/* Row 1: Task Input (Full line) */}
          <div className="w-full">
            <input
              value={task}
              type="text"
              onChange={handelTask}
              placeholder="Write a task..."
              className="bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-zinc-500 transition-all text-sm"
            />
          </div>

          {/* Row 2: Image, Priority, Status, Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

            {/* Image Input & Form Live Preview */}
            <div className="md:col-span-5 flex flex-col gap-2 bg-zinc-900/40 border border-zinc-700/80 p-2.5 rounded-xl w-full">
              <div className="flex items-center gap-2">
                <FaRegImage className="w-5 h-5 text-zinc-500 shrink-0" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handelImageChange}
                  ref={fileInputRef}
                  className="block w-full text-xs text-zinc-500
                    file:mr-3 file:py-1 file:px-2.5
                    file:rounded-lg file:border-0
                    file:text-xs file:font-semibold
                    file:bg-zinc-800 file:text-zinc-300
                    hover:file:bg-zinc-700 cursor-pointer"
                />
              </div>
              
              {/* নতুন ইমেজ সিলেক্ট করলে সাথে সাথে ছোট প্রিভিউ দেখাবে */}
              {image && (
                <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/60 pl-7">
                  <span className="text-[10px] text-zinc-500 font-medium uppercase">Selected:</span>
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Form preview" 
                    className="w-7 h-7 object-cover rounded border border-zinc-700 bg-zinc-800"
                  />
                </div>
              )}
            </div>

            {/* Priority Dropdown */}
            <select
              value={priority}
              onChange={handelPriority}
              className="md:col-span-2 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer w-full"
            >
              <option value="" disabled>Priority</option>
              <option value="Low">Low</option>
              <option value="Mid">Mid</option>
              <option value="High">High</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={status}
              onChange={handelStatus}
              className="md:col-span-2 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer w-full"
            >
              <option value="" disabled>Status</option>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Block">Block</option>
            </select>

            {/* Action Button */}
            <div className="md:col-span-3 w-full">
              {isUpdate ? (
                <button
                  className="bg-amber-600 hover:bg-amber-500 text-white font-medium py-3 rounded-xl transition-colors text-sm shadow-md active:scale-95 w-full whitespace-nowrap"
                  onClick={handelUpdate}
                >
                  Update Task
                </button>
              ) : (
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors text-sm shadow-md active:scale-95 w-full whitespace-nowrap"
                  onClick={handelClick}
                >
                  Add Task
                </button>
              )}
            </div>

          </div>
        </div>

        {/* List items */}
        {data.length > 0 && (
          <ul className="bg-zinc-900/50 border border-zinc-800 p-4 md:p-6 mt-6 rounded-2xl text-white divide-y divide-zinc-800 text-left">
            {data.map((item, index) => (
              <li key={item._id || item.id || index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3.5 first:pt-0 last:pb-0 gap-3">

                <div className="flex items-center gap-3 overflow-hidden max-w-full sm:max-w-[50%]">
                  {item.path ? (
                    <img
                      // এখানে ব্যাকএন্ড ইউআরএল এবং স্ল্যাশ চেক করে ডাইনামিকলি সোর্স বসানো হয়েছে
                      src={item.path.startsWith('http') ? item.path : `http://localhost:5000${item.path.startsWith('/') ? '' : '/'}${item.path}`}
                      alt="task"
                      className="w-10 h-10 object-cover rounded-lg border border-zinc-700 shrink-0 bg-zinc-800"
                      onError={(e) => { 
                        // যদি কোনো কারণে ব্যাকএন্ড থেকে ইমেজ লোড না হয়, তবে এই ডিফল্ট ইমেজটি প্লেসহোল্ডার হিসেবে দেখাবে
                        e.target.onerror = null; 
                        e.target.src = "https://placehold.co/40x40/27272a/a1a1aa?text=No+Img";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 shrink-0">
                      <FaRegImage className="w-4 h-4 text-zinc-600" />
                    </div>
                  )}
                  <span className="font-medium text-zinc-200 wrap-break-word">
                    {item.task}
                  </span>
                </div>

                <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0 w-full sm:w-auto justify-end">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    item.priority === 'Mid' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                    {item.priority || 'Low'}
                  </span>

                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${item.status === 'Active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    item.status === 'Block' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                      'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                    }`}>
                    {item.status || 'Pending'}
                  </span>

                  <button
                    onClick={() => handelEdit(item)}
                    className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors flex items-center justify-center"
                    title="Edit Task"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>

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