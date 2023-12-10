import axios from 'axios';
import React, {
  useEffect, useState, useRef, useContext,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { SocketContext } from '../contexts/index.jsx';
import getModal from './modals/index.js';
import { addChannel, setCurrentChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import { showModal } from '../slices/modalSlice.js';
import routes from '../routes.js';
import PlusSquareIcon from '../assets/plus-square.svg';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import 'react-toastify/dist/ReactToastify.css';

filter.clearList();

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('ru'));

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = ({ notify, setisLogoutButtonDisabled }) => {
  const { t } = useTranslation();
  const messageInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const addChannelButtonRef = useRef(null);

  const focusMessageInput = () => {
    messageInputRef.current.value = '';
    messageInputRef.current.focus();
  };

  const [isChannelButtonDisabled, setIsChannelButtonDisabled] = useState(false);

  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  console.log(messages);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  // console.log(`onUseSelector currentChannelId: ${currentChannelId}`);

  const dispatch = useDispatch();

  const { username } = JSON.parse(localStorage.getItem('userId'));

  const disableButtons = () => {
    submitButtonRef.current.disabled = true;
    setIsChannelButtonDisabled(true);
    setisLogoutButtonDisabled(true);
  };

  const enableButtons = () => {
    submitButtonRef.current.disabled = false;
    setIsChannelButtonDisabled(false);
    setisLogoutButtonDisabled(false);
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(routes.dataPath(), {
          headers: getAuthHeader(),
        });
        const responseChannels = response.data.channels;
        const responseMessages = response.data.messages;
        const responseCurrentChannelId = response.data.currentChannelId;
        responseChannels.forEach((ch) => {
          dispatch(addChannel({ channel: ch }));
        });
        responseMessages.forEach((m) => {
          dispatch(addMessage({ message: m }));
        });
        dispatch(setCurrentChannel({ channelId: responseCurrentChannelId }));
        // console.log(`onAxios ${responseCurrentChannelId}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContent();
    focusMessageInput();
  }, [dispatch]);

  const socket = useContext(SocketContext);

  const handleMessageSending = (e) => {
    e.preventDefault();
    disableButtons();
    const messageText = messageInputRef.current.value;
    if (messageText.trim() === '') {
      enableButtons();
      return;
    }
    const newMessage = {
      body: filter.clean(messageText),
      channelId: currentChannelId,
      username,
    };

    socket.emit('newMessage', newMessage, (response) => {
      if (response && response.status === 'ok') {
        // setToastMessage(t('authForm.fetchingErrors.newMessageDelivered'));
        console.log(t('authForm.fetchingErrors.newMessageDelivered'));
        // notify(t('authForm.fetchingErrors.newMessageDelivered'));
        enableButtons();
      } else {
        // setToastMessage(t('authForm.fetchingErrors.newMessageDeliveryFailed'));
        console.log(t('authForm.fetchingErrors.newMessageDeliveryFailed'));
        // notify(t('authForm.fetchingErrors.newMessageDeliveryFailed'));
        enableButtons();
      }
    });
    focusMessageInput();
  };

  const renderModal = ({
    modalInfoRender,
    disableButtonsRender,
    enableButtonsRender,
    notifyRender,
    filterRender,
    socketRender,
    focusMessageInputRender,
  }) => {
    if (!modalInfoRender.type) {
      return null;
    }

    const Component = getModal(modalInfoRender.type);
    // console.log(modalInfoRender);
    return (
      <Component
        modalInfo={modalInfoRender}
        disableButtons={disableButtonsRender}
        enableButtons={enableButtonsRender}
        notify={notifyRender}
        filter={filterRender}
        socket={socketRender}
        focusMessageInput={focusMessageInputRender}
      />
    );
  };

  return (
    <>
      {renderModal({
        modalInfoRender: useSelector((state) => state.modal),
        disableButtonsRender: disableButtons,
        enableButtonsRender: enableButtons,
        notifyRender: notify,
        filterRender: filter,
        socketRender: socket,
        focusMessageInputRender: focusMessageInput,
      })}
      <div
        className="container d-flex flex-column p-3 mt-2 overflow-hidden rounded shadow position-relative"
        style={{ height: '90vh' }}
      >
        <div className="row d-flex flex-row flex-grow-1 m-0">
          <div
            className="col-3 chat-sidebar p-0 pe-3"
            style={{ height: '545px', position: 'relative' }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 mt-2 w-100">
              <strong>{t('mainPage.channels')}</strong>
              <button
                type="button"
                onClick={() => {
                  if (!isChannelButtonDisabled) {
                    dispatch(showModal({ type: 'addChannel' }));
                  }
                }}
                className="p-0 mt-1 text-primary"
                style={{
                  opacity: isChannelButtonDisabled ? 0.5 : 1,
                  border: 'none',
                  background: 'none',
                }}
                disabled={isChannelButtonDisabled}
                ref={addChannelButtonRef}
              >
                <img src={PlusSquareIcon} alt="+" width="24" height="24" />
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <div className="overflow-auto mt-5 pt-2" style={{ height: '100%' }}>
              <Channels
                channels={channels.entities}
                focusMessageInput={focusMessageInput}
                t={t}
              />
            </div>
          </div>
          <div className="col-9 d-flex flex-column flex-grow-1 p-0">
            <div className="card d-flex flex-column flex-grow-1">
              <div className="card-header">
                <strong>
                  {`# ${
                    currentChannelId
                    && channels.entities[currentChannelId]?.name
                  }`}
                </strong>
                <p>
                  {t('mainPage.messages.key', {
                    count: Object.values(messages.entities).filter(
                      (m) => Number(m.channelId) === currentChannelId,
                    ).length,
                  })}
                </p>
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
                    aria-label={t('mainPage.newMessageLabel')}
                    ref={messageInputRef}
                    placeholder={t('mainPage.newMessagePlaceholder')}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="submit"
                      ref={submitButtonRef}
                    >
                      {t('mainPage.newMessageButton')}
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

export default MainPage;
