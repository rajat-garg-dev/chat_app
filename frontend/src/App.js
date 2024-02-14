import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");
function App() {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const join = () => {
    if (name !== "") {
      socket.emit("join", name);
      setShow(true);
    } else if (name === "") {
      const p = document.getElementById("error");
      p.innerText = "Enter the field ";
    }
  };
  return (
    <div className="App">
      <div className={`flex justify-center ${show ? "py-0" : "py-[10%]"}`}>
        {!show ? (
          <div className="bg-sky-400 flex flex-col gap-[4px] w-[300px] p-[20px] rounded-[4px] items-center">
            <h1 className="text-white font-[800] text-[30px] ">
              Start Chatting
            </h1>
            <div className=" flex flex-col gap-[1px]">
              <label className="text-white font-[500]">Name</label>
              <input
                className="rounded-[4px] px-[4px]"
                type="text"
                placeholder="Enter your Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>

            <button
              className="border-[4px] w-[120px] mx-auto px-[4px] mt-2 text-white font-[600] rounded-[4px]"
              onClick={join}>
              Join
            </button>
            <p className="text-red-600" id="error"></p>
          </div>
        ) : (
          <Chat socket={socket} name={name} />
        )}
      </div>
    </div>
  );
}

export default App;
