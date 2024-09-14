import { ColorEnum } from "@/app/Data/ColorData"
import messages from "@/app/Data/MessaeData";
const Chat = () => {
    const data = [
        { firstName: 'Alice', lastName: 'Smith', unreadMessages: 5 },
        { firstName: 'Bob', lastName: 'Johnson', unreadMessages: 2 },
        { firstName: 'Charlie', lastName: 'Brown', unreadMessages: 0 },
        { firstName: 'David', lastName: 'Williams', unreadMessages: 8 },
        { firstName: 'Eve', lastName: 'Davis', unreadMessages: 1 },
      ];
  return (
    <>
    <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div
            className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Chats</div>
        </div>
        
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
            <span
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >{data.length}</span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            {
                data.map((con,index)=>{
                    return(
                        <button key={index}
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div 
                className={`flex items-center justify-center h-8 w-8 ${ColorEnum[con.firstName[0]]}  rounded-full`}
              >
               {con.firstName[0]}
              </div>
              <div className="ml-2 text-sm font-semibold">{con.firstName + " "+ con.lastName}</div>
              {
                con.unreadMessages > 0 && (
                    <div
                className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
              >
                {con.unreadMessages}
              </div>
                )
              }
            </button>
                    )
                })
            }
          </div>
          <div className="flex flex-row items-center justify-between text-xs mt-6">
            <span className="font-bold">Archivied</span>
            <span
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >7</span
            >
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2">
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                H
              </div>
              <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto w-full h-full p-6">
        <div
          className="flex flex-col flex-auto flex-shrink-0 w-full rounded-2xl bg-gray-100 h-full p-4"
        >
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full w-full">
              <div className="grid grid-cols-12 gap-y-2">
                <div className="col-start-1 col-end-13 p-3  w-full rounded-lg">
                  {
                    messages.map((mes,index) => {
                        return(
                         <>
                            {
                                mes.isSending == false ? (
                                    <div key={index} className="flex flex-row items-center">
                                    <div
                                      className={`flex items-center justify-center h-10 w-10 rounded-full ${ColorEnum[mes.sender[0].toUpperCase()]} flex-shrink-0`}
                                    >
                                      {mes.sender[0].toUpperCase()}
                                    </div>
                                    <div
                                      className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                    >
                                      <div>{mes.content}</div>
                                    </div>
                                  </div>
                                ):(
                                    <div className="col-start-10 col-end-24 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-full ${ColorEnum[mes.sender[0].toUpperCase()]} flex-shrink-0`}
                    >
                      {mes.sender[0].toUpperCase()}
                    </div>
                    <div
                      className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>{mes.content}</div>
                    </div>
                  </div>
                </div>
                                )
                            }
                         </>
                        )
                    })
                  }
                </div>
               
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div className="flex flex-row items-center">
                        <button
                          className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10"
                        >
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            ></path>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </button>
                        <div className="flex flex-row items-center space-x-px ml-4">
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-12 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-6 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-5 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-3 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                          <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
          >
            <div>
              <button
                className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Chat
