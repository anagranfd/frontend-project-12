import React from 'react';

const Messages = ({ messages, currentChannelId }) => (
  <div className="card-body chat-messages">
    {Object.entries(messages)
      .filter(([, m]) => m.channelId === currentChannelId)
      .map(([id, m]) => (
        <p key={id}>
          <strong>{`${m.username}:`}</strong>
          {' '}
          {m.body}
        </p>
      ))}
  </div>
);

export default Messages;
