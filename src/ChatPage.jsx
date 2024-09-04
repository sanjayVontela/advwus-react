import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-chat-elements/dist/main.css';
import { MessageBox, Input } from "react-chat-elements";
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import getSender from './components/getSender';
import Header from './Header';
import { AuthState } from './AuthContext';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Darker background for paper components
    },
    text: {
      primary: '#ffffff', // Text color in dark mode
      secondary: '#b0b0b0', // Secondary text color
    },
  },
});

const socket = io('http://localhost:4444', { withCredentials: true });

var selectedChatCompare;

const ChatPage = () => {
  const { chatId } = useParams();
  const { userId, setUserId, notification, setNotification } = AuthState();

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [data, setData] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:4444', { withCredentials: true });

    socket.on('connect', () => {
      setSocketConnected(true);
    });

    socket.on('chatMessage', (newMessage) => {
      if (!selectedChatCompare || selectedChatCompare !== newMessage.sender) {
        if (!notification.find((notif) => notif._id === newMessage._id)) {
          newMessage['name'] = selectedChatName;
          setNotification([newMessage, ...notification]);
          console.log(notification);
        }
      } else {
        setAllMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [notification, selectedChatCompare, selectedChatName, allMessages]);

  useEffect(() => {
    if (chatId) {
      fetch(`http://localhost:4444/chat/getSender/${chatId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => setData(data.data));
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatId) {
      fetch("http://localhost:4444/chat/all", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        console.log(data);
      })
      .catch(err => console.error(err));
    }
  }, []);

  const getSelectedChat = (id, name) => {
    setSelectedChat(id);
    setSelectedChatName(name);

    selectedChatCompare = id;  // Updated to use the latest selected chat

    fetch(`http://localhost:4444/chat/conversation/${id}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setAllMessages(data.messages);
      data.messages.forEach((message) => {
        if (!message.readBy && message.sender === id) {
          fetch("http://localhost:4444/chat/markAsRead", {
            method: "POST",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messageId: message._id }),
          });
        }
      });
    })
    .catch(error => console.log('Error fetching messages:', error));
  };

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage = {
        position: 'right',
        type: 'text',
        text: messageText,
        date: new Date(),
      };

      setMessageText('');
      const data = {
        receiver: selectedChat,
        message: newMessage.text,
        name:selectedChatName
      };
      socket.emit('chatMessage', data);  // The socket needs to be accessible here.
      setAllMessages((prev) => [...prev, { sender: "You", message: messageText }]);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Header x={localStorage.getItem("role")} />
      <Container fluid className="p-0" style={{ backgroundColor: darkTheme.palette.background.default, minHeight: '100vh' }}>
        <Row noGutters>
          <Col xs={4} md={3} style={{ backgroundColor: darkTheme.palette.background.paper, borderRight: '1px solid #333' }}>
            <Box p={2} style={{ height: '100vh', overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom color="textPrimary">
                Chats
              </Typography>
              <ListGroup variant="flush">
                {data.map((user) => (
                  <ListGroup.Item
                    key={user._id}
                    action
                    active={selectedChat === user._id}
                    onClick={() => getSelectedChat(user._id, user.fname)}
                    style={{
                      backgroundColor: selectedChat === user._id ? '#333' : darkTheme.palette.background.paper,
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <strong>{user.fname} {user.lname}</strong>
                      <span style={{ float: 'right', fontSize: '0.85em', color: darkTheme.palette.text.secondary }}>
                        {user.lastMessage && new Date(user.lastMessage.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85em', color: darkTheme.palette.text.secondary }}>
                      {user.lastMessage ? user.lastMessage.message : 'No messages yet'}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Box>
          </Col>
          <Col xs={8} md={9} style={{ backgroundColor: darkTheme.palette.background.default }}>
            <Box p={2} style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
              {selectedChat ? (
                <>
                  <Typography variant="h6" gutterBottom color="textPrimary">
                    Chat with {data.find((user) => user._id === selectedChat).fname}
                  </Typography>
                  {allMessages.map((d, index) => (
                    <MessageBox
                      styles={{ color: "black", padding: "1%" }}
                      key={index}
                      position={d.sender === selectedChat ? "left" : "right"}
                      type={"text"}
                      title={d.sender === selectedChat ? selectedChatName : "You"}
                      text={d.message}
                      date={new Date(d.createdAt)}
                      status={d.readBy ? 'Read' : 'Sent'} // Example of displaying read status
                    />
                  ))}
                </>
              ) : (
                <Typography variant="h6" gutterBottom color="textPrimary">
                  Select a user to start chatting
                </Typography>
              )}
            </Box>

            {selectedChat && (
              <Box p={2} style={{ backgroundColor: darkTheme.palette.background.paper, borderTop: '1px solid #333' }}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="form-control"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={handleSendMessage}>
                  Send
                </button>
              </Box>
            )}
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default ChatPage;
