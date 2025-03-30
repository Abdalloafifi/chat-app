import ChatMessage from "../../components/Chat-message";
import ClinesChat from "../../components/Clines-Chat";
import "./ChatStayle.css"
const Startsend = () => {
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
 
export default Startsend;