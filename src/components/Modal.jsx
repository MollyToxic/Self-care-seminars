import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

const Modal = ({ seminar, onSave, onClose }) => {
    const [editedSeminar, setEditedSeminar] = useState(seminar);

    useEffect(() => {
        setEditedSeminar(seminar);
    }, [seminar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedSeminar(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedSeminar);
    };

    return (
        <ReactModal
            isOpen={!!seminar}
            onRequestClose={onClose}
            contentLabel="Редактирование семинара"
            className="modal"
            overlayClassName="overlay"
        >
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h2>Редактирование семинара</h2>
                    <label>Название:</label>
                    <input
                        type="text"
                        name="title"
                        value={editedSeminar?.title || ''}
                        onChange={handleChange}
                        required />
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        value={editedSeminar?.description || ''}
                        onChange={handleChange}
                        required />
                    <label>Дата:</label>
                    <input
                        type="date"
                        name="date"
                        value={editedSeminar?.date || ''}
                        onChange={handleChange}
                        required />

                    <label>Время:</label>
                    <input
                        type="time"
                        name="time"
                        value={editedSeminar?.time || ''}
                        onChange={handleChange}
                        required />
                    <div className="actions">
                        <button type="submit">Сохранить</button>
                        <button type="button" onClick={onClose}>Отмена</button>
                    </div>
                </div>
            </form>

        </ReactModal>
    );
};

export default Modal;