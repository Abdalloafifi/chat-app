import React from 'react';
import { useState } from 'react';
import "./profilePage.css";

const EditContentModal = ({ profile, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        username: profile.username || '',
        phone: profile.phone || '',
        Address: profile.Address || '',
        description: profile.description || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal">
                <h3>تعديل المحتوي</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <input
                            type="text"
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="description-buttons">
                        <button type="button" onClick={onClose} className="btn-cancel">
                            <i className="bi bi-x-lg"></i> إلغاء
                        </button>
                        <button type="submit" className="btn-save">
                            <i className="bi bi-check-lg"></i> تأكيد
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContentModal;