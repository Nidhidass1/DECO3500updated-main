'use client';

import React, { useState } from 'react';

const ChatPage = () => {
    const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            // Add the user message to the message list
            setMessages([...messages, { user: 'You', text: inputMessage }]);
            setInputMessage(''); // Clear the input after sending the message

            // Simulate a reply from "Alex"
            setIsTyping(true);
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { user: 'Alex', text: generateAlexReply() },
                ]);
                setIsTyping(false);
            }, 1000); // Delay of 1 second for the reply
        }
    };

    // Function to generate a reply message from Alex
    const generateAlexReply = () => {
        const replies = [
            "That's interesting!",
            "Can you tell me more?",
            "I see, go on...",
            "What do you think about that?",
            "Stop the Smoke!",
        ];
        // Pick a random reply from Alex's preset responses
        return replies[Math.floor(Math.random() * replies.length)];
    };

    return (
        <div className="flex flex-col h-full">
            {/* Hardcoded Chat Title */}
            <div className="bg-green-800 text-white p-4">
                <h2 className="text-lg font-bold">Chat with Alex</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-auto p-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.user === 'You' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`bg-${message.user === 'You' ? 'blue-500' : 'gray-500'} text-white p-3 rounded-lg max-w-xs`}>
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}

                {/* Show typing indicator when Alex is typing */}
                {isTyping && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-gray-300 text-white p-3 rounded-lg max-w-xs">
                            <p>Alex is typing...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Input and Send Button */}
            <div className="p-4 flex items-center space-x-2">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none"
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    className="bg-blue-500 text-white rounded-lg px-4 py-2"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;