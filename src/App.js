import React, { useState, useEffect } from 'react';
import SeminarList from './components/SeminarsList';
import './App.css';

const API_URL = 'http://localhost:3001/seminars';

function App() {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className='app'>
      <SeminarList
        seminars={seminars}
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;