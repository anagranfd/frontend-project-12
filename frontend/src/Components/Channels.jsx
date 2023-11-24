import React from 'react';

export const Channels = ({
  channels,
  handleChannelClick,
  currentChannelId,
}) => {
  return (
    <div className="list-group">
      {Object.entries(channels).map(([id, ch]) => (
        <a
          href={`#${id}`}
          id={id}
          className={`list-group-item list-group-item-action${
            Number(id) === currentChannelId ? ' active' : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleChannelClick(ch);
          }}
          key={id}
        >
          {`#${ch.name}`}
        </a>
      ))}
    </div>
  );
};
