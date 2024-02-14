import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import chaticon from "./Images/chaticon.jpg";
export default function Chat({ socket, name }) {
  const [currentmessage, setCurrentMessage] = useState("");
  const [messagelist, setMessagelist] = useState([]);
  const SendMessage = async () => {
    if (currentmessage !== "") {
      const messageData = {
        name: name,
        message: currentmessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessagelist((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMessagelist((list) => [...list, data]);
    });
  }, [socket]);
  console.log(messagelist, "message ");
  return (
    <div className="w-[300px] max-md:w-[100%] h-[100%] flex flex-col justify-between  bg-black">
      {/* Header */}
      <div className="bg-[#f6265a]  h-[5vh] px-2  flex gap-2 ">
        <img height={32} width={32} src={chaticon} />
        <p className="font-[800] text-white text-[18px]">Live Chat</p>
      </div>
      {/* body */}
      <ScrollToBottom className="h-[90vh]  overflow-x-hidden">
        {messagelist.map((item) => {
          return (
            <div
              className={` flex px-2 py-1 ${
                name === item.name ? "justify-end" : "justify-start"
              }`}>
              <div>
                <div
                  className={`text-white max-w-[100px] overflow-hidden rounded-[8px] w-[100%] px-2 py-[2px] ${
                    name === item.name ? " bg-green-500 right-2" : "bg-blue-400"
                  }`}>
                  <p>{item.message}</p>
                </div>
                <div
                  className={`text-gray-300 text-[12px] ${
                    name === item.name ? "flex-row-reverse" : "flex"
                  } flex gap-3`}>
                  <p>{name === item.name ? <p>you</p> : <p>{item.name}</p>}</p>
                  <p>{item.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>

      {/* footer */}
      <div className="w-[100%] h-[5vh] gap-2 px-2 flex ">
        <input
          className="w-[100%] px-2 rounded-[4px] py-[1px]"
          type="text"
          value={currentmessage}
          placeholder="hey.."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && SendMessage();
          }}
        />
        <button
          className="bg-green-400 text-white px-2 font-[600] rounded-[4px] py-[1px]"
          onClick={SendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
