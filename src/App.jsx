import React, { useState, useEffect, useRef } from 'react';
import { Smile, Paperclip, Camera, Send } from 'lucide-react';

// Main App Component
export default function App() {
  // State to hold the list of messages
  const [messages, setMessages] = useState([]);
  // State for the user's input text
  const [inputText, setInputText] = useState('');
  // State to track if the AI is currently typing
  const [isLoading, setIsLoading] = useState(false);

  // A ref to the end of the messages list to enable auto-scrolling
  const messagesEndRef = useRef(null);
  // Session ID for better memory management
  const sessionId = useRef(`session-${Date.now()}`).current;

  // The URL for your n8n chat webhook
  const N8N_WEBHOOK_URL = 'https://n8n.srv795148.hstgr.cloud/webhook/eefc0026-c2e2-445c-9fef-0cab5b262745/chat';

  /**
   * Scrolls the chat view to the latest message.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect hook to scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  /**
   * Handles sending the message to the n8n webhook.
   */
  const handleSendMessage = async () => {
    // Trim the input text to remove whitespace
    const userMessageText = inputText.trim();
    // Do nothing if the input is empty
    if (!userMessageText) return;

    // Create a new message object for the user's message
    const userMessage = {
      id: Date.now(),
      text: userMessageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
    };

    // Add the user's message to the messages list and clear the input
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true); // Show the loading indicator

    try {
      // Send the message to the n8n workflow
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The body should match what your n8n Chat Trigger node expects
        body: JSON.stringify({
          text: userMessageText,
          // You might need to include a userId for memory management in n8n
          userId: 'user-123',
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // n8n Chat Trigger typically returns the AI's response directly
      const responseData = await response.text(); // Get as text first to debug
      console.log('Raw response from n8n:', responseData);
      
      let aiMessageText = "Sorry, I didn't get a valid response.";
      
      try {
        // Try to parse as JSON
        const aiResponseData = JSON.parse(responseData);
        console.log('Parsed response:', aiResponseData);
        
        // n8n Chat Trigger might return the response in different formats:
        // 1. Direct text response
        // 2. { "text": "response" }
        // 3. { "output": "response" }
        // 4. { "message": "response" }
        // 5. { "response": "response" }
        
        if (typeof aiResponseData === 'string') {
          aiMessageText = aiResponseData;
        } else if (aiResponseData.text) {
          aiMessageText = aiResponseData.text;
        } else if (aiResponseData.output) {
          aiMessageText = aiResponseData.output;
        } else if (aiResponseData.message) {
          aiMessageText = aiResponseData.message;
        } else if (aiResponseData.response) {
          aiMessageText = aiResponseData.response;
        } else {
          console.error('Unknown response format:', aiResponseData);
        }
      } catch (parseError) {
        // If it's not JSON, use the text directly
        if (responseData && responseData.trim()) {
          aiMessageText = responseData;
        }
      }

      // Create a new message object for the AI's response
      const aiMessage = {
        id: Date.now() + 1,
        text: aiMessageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: false,
      };
      
      // Add the AI's message to the list
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error('Error sending message to n8n:', error);
      // Create an error message to display in the chat
       const errorMessage = {
        id: Date.now() + 1,
        text: `Error: Could not connect to the AI. ${error.message}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: false,
        isError: true, // Custom property for styling
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false); // Hide the loading indicator
    }
  };

  /**
   * Handles key press events in the input field.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white max-w-md mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h1 className="text-lg font-semibold">AI Assistant</h1>
        {/* You can add more header elements here if needed */}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="text-center text-gray-500 text-xs mb-4">
            This is the beginning of your conversation.
        </div>
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${message.sent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                message.sent
                  ? 'bg-red-500 text-white rounded-br-none'
                  : message.isError 
                  ? 'bg-red-800 text-red-100 rounded-bl-none'
                  : 'bg-gray-800 text-gray-200 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 text-right ${message.sent ? 'text-red-200' : 'text-gray-500'}`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator for AI response */}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="max-w-xs px-4 py-3 rounded-2xl bg-gray-800 text-gray-200 rounded-bl-none">
              <div className="flex items-center justify-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Empty div to ensure scrolling to the bottom works correctly */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <button className="text-red-500">
            <Smile size={24} />
          </button>
          
          <div className="flex-1 bg-gray-700 rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
              disabled={isLoading} // Disable input while waiting for a response
            />
            <div className="flex gap-2 ml-2">
              <button className="text-gray-400">
                <Paperclip size={20} />
              </button>
              <button className="text-gray-400">
                <Camera size={20} />
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white disabled:bg-red-800 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={24} />
          </button>
        </div>
        
        {/* Bottom indicator */}
        <div className="mt-2 flex justify-center">
          <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}