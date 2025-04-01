import React from 'react';

const SeminarList = ({ seminars, onDelete }) => {
    return (
        <div className="seminars">
            {seminars.map(seminar => (
                <div key={seminar.id} className="seminars-card">
                    <h2>{seminar.title}</h2>
                    <p><strong>Описание:</strong> {seminar.description}</p>
                    <p><strong>Дата:</strong> {seminar.date}</p>
                    <p><strong>Время:</strong> {seminar.time}</p>
                    <img src={seminar.photo} alt="фото" />

                    <button onClick={() => onDelete(seminar.id)}>Удалить</button>
                </div>
            ))}
        </div>
    );
};

export default SeminarList;