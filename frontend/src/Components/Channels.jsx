import React from 'react';

export const Channels = ({
  channels,
  handleChannelClick,
  showModal,
  currentChannelId,
}) => {
  return (
    <ul className="nav flex-column nav-pills nav-fill mb-3 overflow-auto h-100 d-block">
      {Object.entries(channels).map(([id, ch]) => {
        const listItemClass =
          Number(id) === currentChannelId ? 'btn-secondary ' : '';

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
        } else {
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
                    <span className="visually-hidden">Menu</span>
                  </button>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby={`dropdownButton-${id}`}
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#remove"
                        onClick={() => showModal('removeChannel', ch)}
                      >
                        Удалить канал
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#rename"
                        onClick={() => showModal('renameChannel', ch)}
                      >
                        Переименовать канал
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          );
        }
      })}
    </ul>
  );
};
