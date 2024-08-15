import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageBox, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import io from 'socket.io-client';

const socket = io('http://localhost:4444', { 
    withCredentials: true 
});

const Chat = () => {
    const { id } = useParams(); // ID of the user you are chatting with
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

    // Function to send a message
    const sendMessage = (event) => {
        event.preventDefault();

        if (message.trim() === "") {
            return;
        }

        const data = {
            receiver: id,
            message: message
        };

        socket.emit('chatMessage', data);
        setAllMessages(prev => [...prev, { sender: "You", message: message }]);
        setMessage("");
    };

    // Handle incoming messages
    useEffect(() => {
        socket.on('chatMessage', (newMessage) => {
            setAllMessages(prev => [...prev, newMessage]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('chatMessage');
        };
    }, []);

    // Fetch conversation messages on component mount
    useEffect(() => {
        fetch(`http://localhost:4444/chat/conversation/${id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setAllMessages(data.messages))
        .catch(error => console.log('Error fetching messages:', error));
    }, [id]);

    return (
        <div style={{ margin: "20px" }}>
            <div>
                {allMessages.map((d, index) => (
                    <MessageBox
                        styles={{ color: "black", padding: "1%" }}
                        key={index}
                        position={d.sender === id ? "left" : "right"}
                        type={"text"}
                        title={d.senderName || "You"}
                        text={d.message}
                    />
                ))}
            </div>

            <form onSubmit={sendMessage}>
                <Input
                    placeholder="Type here..."
                    multiline={true}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
};

export default Chat;
