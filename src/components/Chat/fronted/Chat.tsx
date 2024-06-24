import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './chat.css';

import { ChatMessage } from "./ChatMessage";

export interface IChatMessage {
	id: number,
	userId: string,
	content: string
}

export const Chat = () => {
  // Используем для хранения идентификатора пользователя
  // Если идентификатор не найден в localStorage, генерируем новый
  const [userId, _setUserId] = useState<string>(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId || uuidv4();
  });

  // Используем для хранения массива сообщений
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  // Используем для хранения текста нового сообщения
  const [newMessage, setNewMessage] = useState('');

  // Используем для отслеживания состояния загрузки
  const [loading, setLoading] = useState(true);

  // Используем для получения ссылки на контейнер с сообщениями
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // При изменении идентификатора пользователя сохраняем его в localStorage
  useEffect(() => {
		localStorage.setItem('userId', userId);		
  }, [userId]);

  // Устанавливаем интервал для периодического получения новых сообщений
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Получаем идентификатор последнего сообщения, если оно есть
        const lastMessageId = messages.length > 0 ? messages[messages.length - 1].id : 0;
        // Делаем запрос на сервер, чтобы получить новые сообщения
        const response = await fetch(`http://localhost:7070/messages?from=${lastMessageId}`);
        const data = await response.json();
        // Обновляем состояние сообщений, добавляя новые сообщения
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, ...data];
          // Скроллим контейнер с сообщениями вниз, чтобы отобразить новые сообщения
					if (chatMessagesRef.current) {						
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
          }
          return newMessages;
        });
        // Устанавливаем состояние загрузки в false
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении сообщений:', error);
      }
    }, 1000);

    // Очищаем интервал, когда компонент размонтируется
    return () => clearInterval(interval);
  }, [messages]);

  // Обработчик отправки нового сообщения
  const handleSendMessage = async () => {
    try {
      if (newMessage.trim()) {
        await fetch('http://localhost:7070/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: 0, userId, content: newMessage }),
				});
				
				setNewMessage('');
				
        // Скроллим контейнер с сообщениями вниз, чтобы отобразить новое сообщение
        if (chatMessagesRef.current) {
          chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  };

  return (
    <div className="chat">
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.userId === userId}
          />
        ))}
        {loading && <div className="loading">Loading...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          className="chat-input-text"
          placeholder="Введите сообщение"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="chat-input-btn" onClick={handleSendMessage}>
          &#8594;
        </button>
      </div>
    </div>
  );
};
