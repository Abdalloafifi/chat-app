import React, { useState } from 'react';
import './EditMessageModal.css';

const EditMessageModal = ({ message, onClose, onSave }) => {
    const [text, setText] = useState(message.text);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSave(message._id, text);
            onClose();
        }
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-content">
                <h3>تعديل الرسالة</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                    />
                    <div className="edit-modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">إلغاء</button>
                        <button type="submit" className="save-btn">حفظ</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMessageModal;
