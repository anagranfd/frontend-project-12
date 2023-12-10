import React, { useEffect, useRef } from 'react';

const Messages = ({ messages, currentChannelId }) => {
  const lastMessageRef = useRef(null);

  const filteredMessages = Object.values(messages).filter(
    (m) => m.channelId === currentChannelId,
  );

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredMessages]);

  return (
    <div
      className="card-body chat-messages overflow-auto"
      style={{ maxHeight: '490px' }}
    >
      {filteredMessages.map((m, index) => (
        <p
          key={m.id}
          ref={index === filteredMessages.length - 1 ? lastMessageRef : null}
        >
          <strong>{`${m.username}:`}</strong>
          {' '}
          {m.body}
        </p>
      ))}
    </div>
  );
};

export default Messages;
