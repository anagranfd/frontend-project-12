import React from 'react';
import { useSelector } from 'react-redux';
import { actionsChannels } from '../slices/channelsSlice.js';
import { actionsModal } from '../slices/modalSlice.js';
import store from '../slices/index.js';

const Channels = ({ channels, focusMessageInput, t }) => {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );

  const handleChannelClick = (channel) => {
    store.dispatch(
      actionsChannels.setCurrentChannel({ channelId: channel.id }),
    );
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
                      onClick={() => store.dispatch(
                        actionsModal.showModal({
                          type: 'removeChannel',
                          item: ch,
                        }),
                      )}
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
                      onClick={() => store.dispatch(
                        actionsModal.showModal({
                          type: 'renameChannel',
                          item: ch,
                        }),
                      )}
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
