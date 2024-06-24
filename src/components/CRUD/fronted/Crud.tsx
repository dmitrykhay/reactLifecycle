import { useEffect, useState } from "react";
import "./crud.css";

interface INoteData {
	id: number;
	content: string;
}
export const Crud = () => {
  const [notes, setNotes] = useState<INoteData[]>([]);
  const [newNote, setNewNote] = useState('');

	// При загрузке компонента, получаем заметки с сервера
  useEffect(() => {
    fetchNotes();
  }, []);

  // Функция для получения заметок с сервера
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:7070/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Ошибка при получении заметок:', error);
    }
  };

  // Функция для обновления значения новой заметки
	const handleNewNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {		
    setNewNote(e.target.value);
  };

  // Функция для добавления новой заметки
  const handleAddNote = async () => {
    try {
      await fetch('http://localhost:7070/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newNote }),
      });
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при добавлении заметки:', error);
    }
  };

  // Функция для удаления заметки
  const handleDeleteNote = async (id: number) => {
    try {
      await fetch(`http://localhost:7070/notes/${id}`, {
        method: 'DELETE',
      });
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  return (
    <div className="crud">
      <div className="crud-header">
        <h1 className="crud-title">Заметки</h1>
        <button className="crud-btn-update" type="button" onClick={fetchNotes}>
          &#128259;
        </button>
      </div>
      <div className="crud-content">
        {notes.map((note) => (
          <div key={note.id} className="crud-content-item">
            <p className="crud-content-item-text">{note.content}</p>
            <button
              className="crud-content-item-btn"
              type="button"
              onClick={() => handleDeleteNote(note.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="crud-new">
        <label htmlFor="new-note">Новая заметка</label>
        <textarea
          className="crud-new-text"
          name="new"
          id="new-note"
          value={newNote}
          onChange={handleNewNoteChange}
        ></textarea>
        <button className="crud-new-btn" type="button" onClick={handleAddNote}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

