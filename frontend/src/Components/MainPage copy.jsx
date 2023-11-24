// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import React, { useEffect, useState, useRef } from 'react';
// import { normalize, schema } from 'normalizr';
// // Хуки находятся в react-redux
// import { useSelector, useDispatch } from 'react-redux';
// // Импортируем нужные действия
// import { addChannel, removeChannel } from '../slices/channelsSlice.js';
// import { addMessage } from '../slices/messagesSlice.js';
// // import { useLocation, useNavigate } from 'react-router-dom';
// import routes from '../routes.js';

// const getAuthHeader = () => {
//   const userId = JSON.parse(localStorage.getItem('userId'));
//   if (userId && userId.token) {
//     return { Authorization: `Bearer ${userId.token}` };
//   }
//   return {};
// };

// const getNormalized = (data) => {
//   const channel = new schema.Entity('channels');
//   const message = new schema.Entity('messages');

//   const normalizedData = normalize(data, {
//     channels: [channel],
//     messages: [message],
//   });

//   return normalizedData;
// };

// const getNormalizedChannels = (data) => {
//   const channel = new schema.Entity('channels');
//   const mySchema = { channels: [channel] };
//   const normalizedData = normalize(data, mySchema);

//   return normalizedData;
// };

// const getNormalizedMessages = (data) => {
//   const message = new schema.Entity('messages');
//   const mySchema = { messages: [message] };
//   const normalizedData = normalize(data, mySchema);

//   return normalizedData;
// };

// const Channels = ({ channels, handleChannelClick, currentChannelId }) => {
//   return (
//     <div className="list-group">
//       {channels.map((ch) => (
//         <a
//           href={`#${ch.id}`}
//           id={ch.id}
//           className={`list-group-item list-group-item-action${
//             ch.id === currentChannelId ? ' active' : ''
//           }`}
//           onClick={(e) => {
//             e.preventDefault();
//             handleChannelClick(ch);
//           }}
//           key={ch.id}
//         >
//           {ch.name}
//         </a>
//       ))}
//     </div>
//   );
// };

// const Messages = ({ messages, currentChannelId }) => {
//   return (
//     <div className="card-body chat-messages">
//       {messages
//         .filter((m) => m.channelId === currentChannelId)
//         .map((m) => (
//           <p key={m.id}>
//             <strong>{`${m.username}:`}</strong> {m.body}
//           </p>
//         ))}
//     </div>
//   );
// };

// export const MainPage = () => {
//   // Вытаскиваем данные из хранилища
//   // Здесь state — это все состояние
//   const channels = useSelector((state) => state.channels);
//   const messages = useSelector((state) => state.messages);
//   // Возвращает метод store.dispatch() текущего хранилища
//   const dispatch = useDispatch();

//   const [data, setData] = useState(null);
//   const [channels, setChannels] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [currentChannelId, setCurrentChannel] = useState(null);
//   const username = JSON.parse(localStorage.getItem('userId')).username;
//   const messageInputRef = useRef(null);
//   const [normalizedData, setNormalizedData] = useState({});
//   console.log(normalizedData);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const response = await axios.get(routes.dataPath(), {
//           headers: getAuthHeader(),
//         });
//         const { channels, messages, currentChannelId } = response.data;
//         // setData(response.data);
//         // setChannels(channels);
//         // setMessages(messages);
//         // setCurrentChannel(currentChannelId);
//         channels.forEach((ch) => {dispatch(addChannel(ch))});
//         messages.forEach((m) => {dispatch(addMessage(m))});
//         // const normalizedData = getNormalized({
//         //   channels,
//         //   messages,
//         //   currentChannelId,
//         // });

//         setNormalizedData(
//           JSON.stringify(
//             getNormalized({
//               channels,
//               messages,
//               currentChannelId,
//             })
//           )
//         );
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchContent();
//   }, []);

//   useEffect(() => {
//     console.log(messages);
//     messages &&
//       setNormalizedData(
//         getNormalized({ channels, messages, currentChannelId })
//       );
//   }, [messages]);

//   const handleChannelClick = (channel) => {
//     setCurrentChannel(channel.id);
//   };

//   const handleMessageSending = (e) => {
//     e.preventDefault();
//     const messageText = messageInputRef.current.value;
//     if (messageText.trim() === '') {
//       return;
//     }
//     const newMessage = {
//       id: messages.length + 1,
//       body: messageText,
//       channelId: currentChannelId,
//       username,
//     };
//     setMessages([...messages, newMessage]);
//     messageInputRef.current.value = '';
//   };

//   return (
//     <>
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//       {/* <pre>{JSON.stringify(normalizedData, null, 2)}</pre> */}
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-3 chat-sidebar">
//             <Channels
//               channels={channels}
//               handleChannelClick={handleChannelClick}
//               currentChannelId={currentChannelId}
//             />
//           </div>
//           <div className="col-9">
//             <div className="card">
//               <div className="card-header">
//                 {currentChannelId &&
//                   channels.find((ch) => ch.id === currentChannelId)?.name}
//               </div>
//               <Messages
//                 messages={messages}
//                 currentChannelId={currentChannelId}
//               />
//               <div className="card-footer">
//                 <form className="input-group" onSubmit={handleMessageSending}>
//                   <input
//                     type="text"
//                     className="form-control"
//                     ref={messageInputRef}
//                     placeholder="Введите сообщение..."
//                   />
//                   <div className="input-group-append">
//                     <button className="btn btn-outline-secondary" type="submit">
//                       Отправить
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
