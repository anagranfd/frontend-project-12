import React from 'react';

export const Messages = ({ messages, currentChannelId }) => {
  return (
    <div className="card-body chat-messages">
      {Object.entries(messages)
        .filter(([id, m]) => m.channelId === currentChannelId)
        .map(([id, m]) => (
          <p key={id}>
            <strong>{`${m.username}:`}</strong> {m.body}
          </p>
        ))}
    </div>
  );
};
