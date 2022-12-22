import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import ChatMessage from './ChatMessage';

const SOCKET_URL_ONE = 'wss://echo.websocket.events';
const READY_STATE_OPEN = 1;

//Generates the click handler, which returns a promise that resovles to the provided url.
const generateAsyncUrlGetter =
  (url, timeout = 2000) =>
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(url);
      }, timeout);
    });
  };

export const App = () => {
  const [name, setName] = useState('');
  const [currentSocketUrl, setCurrentSocketUrl] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [inputtedMessage, setInputtedMessage] = useState('');
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    currentSocketUrl,
    {
      share: true,
      shouldReconnect: () => false,
    }
  );

  useEffect(() => {
    lastMessage &&
      setMessageHistory([
        ...messageHistory,
        { name, message: lastMessage.data },
      ]);
  }, [lastMessage]);

  useEffect(() => {
    setCurrentSocketUrl(generateAsyncUrlGetter(SOCKET_URL_ONE));
  }, []);

  const readyStateString = {
    0: 'CONNECTING',
    1: 'OPEN',
    2: 'CLOSING',
    3: 'CLOSED',
  }[readyState];

  const handleSubmit = () => {
    if (inputtedMessage) {
      sendMessage(inputtedMessage);
      setInputtedMessage('');
    }
  };
  const messagesData = [...messageHistory];
  messagesData.shift();
  console.log(messagesData);
  return (
    <div>
      ReadyState: {readyStateString}
      <div>
        <input
          type={'text'}
          value={name}
          placeholder="Enter your Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type={'text'}
          value={inputtedMessage}
          placeholder="Enter your message"
          onChange={(e) => setInputtedMessage(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={readyState !== READY_STATE_OPEN}
        >
          Send
        </button>
      </div>
      <div>
        {messagesData.length > 0
          ? messagesData.map(({ message, name }, index) => (
              <ChatMessage key={index} message={message} name={name} />
            ))
          : null}
      </div>
    </div>
  );
};
export default App;
