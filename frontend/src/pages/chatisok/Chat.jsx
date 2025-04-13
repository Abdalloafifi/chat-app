import ChatMessage from "../../components/Chat-message";
import ClinesChat from "./Clines-Chat";
import "../chat/ChatStayle.css";
const Chat = () => {
    return (
        <div className="all-chat-page">
        <div className="chat-page">
        <div className="chat-clines">
        <ClinesChat />
        </div>
        <div className="chat-containers">
          <ChatMessage />
        </div>
      </div>
      </div>
    );
}
 
export default Chat;