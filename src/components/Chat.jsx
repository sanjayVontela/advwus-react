import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageBox, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import io from 'socket.io-client';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
// const socket = io('http://localhost:4444', { 
//     withCredentials: true 
// });

var socket, selectedChatCompare;
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
const Chat = ({allMessages,id,sendMessage, handleSendMessage,data}) => {

    


    // const { id } = useParams(); // ID of the user you are chatting with
    // // useEffect(()=>{
    // //     socket = io("http://localhost:4444");
    // //     socket.emit("setup",localStorage.getItem("id"));
    // //     socket.on("connection",()=>{})
    // // },[])
    const [message, setMessage] = useState("");
    // const [allMessages, setAllMessages] = useState([]);

    // // Function to send a message


    // useEffect(()=>{
    //     fetch(`http://localhost:4444/c/`,{
    //         method:"POST",
    //         body:JSON.stringify({
    //             userId:id
    //         }),
    //         credentials:"include",
    //         headers:{
    //             'Content-Type':'application/json'
    //         }
    //     })
    //     .then(response=>response.json())
    //     .then(data=>console.log(data))
    //     .catch(err=>console.error(err))

    // },[])

    // useEffect(()=>{
    //     fetch(`http://localhost:4444/message/${id}`,{
    //         method:"get",
    //         credentials:"include",
    //         headers:{
    //             'Content-Type':'application/json'
    //         }
    //     })
    //     .then(response=>response.json())
    //     .then(data=>setAllMessages(data))
    //     .catch(err=>console.error(err))

    // },[])
    // console.log(allMessages);
    
    // const sendMessage = (event) => {
    //     event.preventDefault();

    //     if (message.trim() === "") {
    //         return;
    //     }

    //     const data = {
    //         chatId: id,
    //         content: message
    //     };

    //     // socket.emit('chatMessage', data);
    //     setAllMessages(prev => [...prev, { sender: "You", message: message }]);
    //     setMessage("");
    //     fetch("http://localhost:4444/message",{
    //         method:"POST",
    //         body:JSON.stringify(data),
    //         credentials:"include",
    //         headers:{
    //             'Content-Type':'application/json'
    //         }
    //     })
        
    // };

    // // // Handle incoming messages
    // // useEffect(() => {
    // //     socket.on('chatMessage', (newMessage) => {
    // //         setAllMessages(prev => [...prev, newMessage]);
    // //     });

    // //     // Cleanup on component unmount
    // //     return () => {
    // //         socket.off('chatMessage');
    // //     };
    // // }, []);

    // // // Fetch conversation messages on component mount
    // useEffect(() => {
    //     fetch(`http://localhost:4444/chat/conversation/${id}`, {
    //         method: 'GET',
    //         credentials: "include",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setAllMessages(data.messages)
    //         // socket.emit("join chat",id)
    //     })
    //     .catch(error => console.log('Error fetching messages:', error));
    // }, [id]);

    return (
        <Col xs={8} md={9} style={{ backgroundColor: darkTheme.palette.background.default }}>
        <Box p={2} style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
          {id ? (
            <>
              <Typography variant="h6" gutterBottom color="textPrimary">
                Chat with {data.find((user) => user._id === id).fname}
              </Typography>
              {allMessages.map((d, index) => (
                <MessageBox
                    styles={{ color: "black", padding: "1%" }}
                    key={index}
                    position={d.sender === id ? "left" : "right"}
                    type={"text"}
                    title={d.sender == id ? "selectedChatName" : "You"}
                    text={d.message}
                />
            ))}
            </>
          ) : (
            <Typography variant="h6" gutterBottom color="textPrimary">
              Select a user to start chatting
            </Typography>
          )}
        </Box>
        
        {id && (
          <Box p={2} style={{ backgroundColor: darkTheme.palette.background.paper, borderTop: '1px solid #333' }}>
            <input
              type="text"
              placeholder="Type a message..."
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleSendMessage}>
              Send
            </button>
          </Box>
        )}
      </Col>
    );
};

export default Chat;
