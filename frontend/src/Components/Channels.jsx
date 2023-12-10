import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import { showModal } from '../slices/modalSlice.js';

const Channels = ({
  channels,
  // handleChannelClick,
  // showModal,
  focusMessageInput,
  t,
}) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  // Number(sessionStorage.getItem('currentChannelId')) || 1

  const handleChannelClick = (channel) => {
    // setCurrentChannelId(channel.id);
    dispatch(setCurrentChannel({ channelId: channel.id }));
    sessionStorage.setItem('currentChannelId', channel.id);
    focusMessageInput();
  };

  return (
    <ul className="nav flex-column nav-pills nav-fill overflow-auto h-100 d-block">
      {Object.entries(channels).map(([id, ch]) => {
        const listItemClass = Number(id) === currentChannelId ? 'btn-secondary ' : '';

        if (!ch.removable) {
          return (
            <li key={id} className="nav-item w-100">
              <button
                type="button"
                key={id}
                className={`btn ${listItemClass}w-100 rounded text-start`}
                onClick={(e) => {
                  e.preventDefault();
                  handleChannelClick(ch);
                }}
              >
                {`# ${ch.name}`}
              </button>
            </li>
          );
        }
        return (
          <li key={id} className="nav-item w-100">
            <div className="d-flex btn-group rounded">
              <button
                id={id}
                key={id}
                type="button"
                className={`btn ${listItemClass}w-100 text-start text-truncate rounded-0 rounded-start`}
                style={{ border: 'none' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleChannelClick(ch);
                }}
              >
                {`# ${ch.name}`}
              </button>

              <div className="dropdown">
                <button
                  className={`btn ${listItemClass}dropdown-toggle dropdown-toggle-split flex-grow-0 rounded-0 rounded-end`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id={`dropdownButton-${id}`}
                  data-bs-reference="parent"
                >
                  <span className="visually-hidden">
                    {t('channelMenu.handleChannel')}
                  </span>
                </button>

                <ul
                  className="dropdown-menu"
                  aria-labelledby={`dropdownButton-${id}`}
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="#remove"
                      onClick={() => dispatch(showModal({ type: 'removeChannel', item: ch }))}
                      // onClick={() => showModal('removeChannel', ch)}
                    >
                      {t('channelMenu.removeChannel')}
                    </a>
                    <span className="visually-hidden">
                      {t('channelMenu.removeChannelLabel')}
                    </span>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#rename"
                      onClick={() => dispatch(showModal({ type: 'renameChannel', item: ch }))}
                      // onClick={() => showModal('renameChannel', ch)}
                    >
                      {t('channelMenu.renameChannel')}
                    </a>
                    <span className="visually-hidden">
                      {t('channelMenu.renameChannelLabel')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Channels;
