import React, { useState, useEffect } from 'react';
import SeminarList from './components/SeminarsList';
import Modal from './components/Modal';
import './App.css';

const API_URL = 'http://localhost:3001/seminars';

function App() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSeminar, setEditingSeminar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Загрузка данных с сервера
  useEffect(() => {
    const fetchSeminars = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSeminars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSeminars();
  }, []);

  // Удаление семинара
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот семинар?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setSeminars(seminars.filter(seminar => seminar.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };
  const handleEdit = (seminar) => {
    setEditingSeminar(seminar);
    setIsModalOpen(true);
  };

  // Сохранение изменений
  const handleSave = async (updatedSeminar) => {
    try {
      const response = await fetch(`${API_URL}/${updatedSeminar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSeminar)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSeminars(seminars.map(seminar =>
        seminar.id === updatedSeminar.id ? data : seminar
      ));
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className='app'>
      <SeminarList
        seminars={seminars}
        onDelete={handleDelete}
        onEdit={handleEdit} 
      />
      {isModalOpen && (
        <Modal
          seminar={editingSeminar}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;