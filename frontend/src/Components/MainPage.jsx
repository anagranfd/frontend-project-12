import axios from 'axios';
import { io } from 'socket.io-client';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addChannel, removeChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import routes from '../routes.js';
import { Channels } from './Channels.jsx';
import { Messages } from './Messages.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const MainPage = () => {
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [data, setData] = useState(null);
  const [currentChannelId, setCurrentChannel] = useState(null);
  const username = JSON.parse(localStorage.getItem('userId')).username;
  const messageInputRef = useRef(null);

  const socket = io();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        const { channels, messages, currentChannelId } = response.data;
        channels.forEach((ch) => {
          dispatch(addChannel({ channel: ch }));
        });
        messages.forEach((m) => {
          dispatch(addMessage({ message: m }));
        });
        // console.log(channels, messages);
        setCurrentChannel(currentChannelId);
        // setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContent();

    socket.on('connect_error', () => {
      console.log('Произошла ошибка соединения с сервером.');
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    socket.on('newMessage', (message) => {
      dispatch(addMessage({ message }));
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        socket.connect();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChannelClick = (channel) => {
    setCurrentChannel(channel.id);
  };

  const handleMessageSending = (e) => {
    e.preventDefault();
    const messageText = messageInputRef.current.value;
    if (messageText.trim() === '') {
      return;
    }
    const newMessage = {
      body: messageText,
      channelId: currentChannelId,
      username,
    };
    // console.log('Новое сообщение:', newMessage);
    // console.log(messages);
    socket.emit('newMessage', newMessage, (response) => {
      if (response && response.status === 'ok') {
        console.log('Сообщение успешно обработано сервером.');
      } else {
        console.log('Произошла ошибка при обработке сообщения сервером.');
      }
    });
    messageInputRef.current.value = '';
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    socket.disconnect();
    navigate(routes.loginPagePath());
  };

  return (
    <>
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MyChat
          </a>

          <div className="d-flex">
            <button
              onClick={() => {
                handleLogout();
              }}
              className="btn btn-primary"
              type="button"
            >
              Выйти
            </button>
          </div>
        </div>
      </nav>
      <div
        className="container d-flex flex-column p-3 overflow-hidden rounded shadow"
        style={{ height: '90vh' }}
      >
        <div className="row d-flex flex-row flex-grow-1">
          <div className="col-3 chat-sidebar">
            <Channels
              channels={channels.entities}
              handleChannelClick={handleChannelClick}
              currentChannelId={currentChannelId}
            />
          </div>
          <div className="col-9 d-flex flex-column flex-grow-1">
            <div className="card d-flex flex-column flex-grow-1">
              <div className="card-header">
                <strong>{`#${
                  currentChannelId && channels.entities[currentChannelId]?.name
                }`}</strong>
                <p>{`${
                  Object.values(messages.entities).filter(
                    (m) => Number(m.channelId) === currentChannelId
                  ).length
                } сообщений`}</p>
              </div>
              <Messages
                messages={messages.entities}
                currentChannelId={currentChannelId}
              />
              <div className="card-footer p-2">
                <form className="input-group" onSubmit={handleMessageSending}>
                  <input
                    type="text"
                    className="form-control rounded-2 me-2"
                    ref={messageInputRef}
                    placeholder="Введите сообщение..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                      Отправить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
