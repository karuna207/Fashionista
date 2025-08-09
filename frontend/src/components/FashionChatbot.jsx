import { useState } from "react";
import axios from "axios"; // Import axios
import ReactMarkdown from "react-markdown"; // Import the markdown renderer

const FashionChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // This is the system prompt that guides the chatbot's behavior.
  // It instructs the model to act as a fashion assistant and ignore irrelevant topics.
  const systemPrompt = "You are a friendly and knowledgeable fashion assistant. Your purpose is to provide styling suggestions, discuss fashion trends, and help with clothing sizes. If a user asks a question that is irrelevant to fashion or styling, politely decline to answer. When asked for a dress size, provide a helpful suggestion based on height and weight, acknowledging that fit can vary by brand.";

  const sendMessage = async () => {
    // Exit if the input is empty or we are already loading a response
    if (!input.trim() || loading) return;

    // Add the user's message to the chat history
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      // Create the combined prompt for the API call
      // The system prompt gives the instructions, and the user's input is the question.
      let fullPrompt = systemPrompt + `\n\nUser: ${input}`;

      // Use axios to make the POST request
      const payload = { contents: [{ role: "user", parts: [{ text: fullPrompt }] }] };
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
      // The API key is provided by the environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await axios.post(apiUrl, payload);
      const result = response.data;

      // Extract the text from the API response
      let botReply = "Sorry, I couldn't get a response. Please try again.";
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        botReply = result.candidates[0].content.parts[0].text;
      }

      // Add the assistant's message to the chat history
      setMessages(prev => [...prev, { role: "assistant", text: botReply }]);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      // Add an error message to the chat
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Please check your internet connection or try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 font-sans antialiased">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
          .font-pacifico {
            font-family: 'Pacifico', cursive;
          }
        `}
      </style>
      <div className="border border-gray-300 p-4 rounded-xl shadow-lg bg-white w-full w-2xl">
        {/* Updated heading with new name, font, and pink handbag icon */}
        <h2 className="text-2xl font-bold mb-4 text-pink-800 flex items-center justify-start">
          <span className="inline-block align-middle mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span className="font-pacifico">StyleMate</span>
        </h2>
        <div className="h-96 overflow-y-auto border border-gray-200 p-4 mb-4 rounded-lg bg-gray-50 flex flex-col-reverse">
          {/* Reverse the messages array to show the latest at the bottom */}
          {[...messages].reverse().map((msg, i) => (
            <div key={i} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {/* Now using the ReactMarkdown component to render the text */}
              <div className={`p-3 rounded-xl max-w-[80%] ${msg.role === "user" ? "bg-pink-500 text-white rounded-br-sm" : "bg-gray-200 text-gray-800 rounded-bl-sm"}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="mb-2 flex justify-start">
              <div className="p-3 rounded-xl max-w-[80%] bg-gray-200 text-gray-800 rounded-bl-sm">
                Thinking...
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={input}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            onChange={(e) => setInput(e.target.value)}
            // Updated focus ring color
            className="border border-gray-300 p-3 flex-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Ask for styling tips or your dress size (e.g., 'What size am I? My height is 5'7 and I weigh 150lbs')..."
            disabled={loading}
          />
          {/* Updated button color and hover effect */}
          <button
            onClick={sendMessage}
            className={`bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors w-full md:w-auto ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FashionChatbot;
