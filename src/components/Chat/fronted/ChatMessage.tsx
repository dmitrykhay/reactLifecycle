import { IChatMessage } from "./Chat";

export const ChatMessage: React.FC<{ message: IChatMessage; isOwnMessage: boolean }> = ({ message, isOwnMessage }) => {
	
	return (
		<div className={`chat-message ${isOwnMessage ? 'my' : 'other'}`}>
			{message.content}
		</div>
	)
}
