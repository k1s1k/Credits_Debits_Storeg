import React, { useState } from 'react';
import { updateDebit, deleteDebit } from '../../features/localStorage/debitStorage.jsx';
import { formatDate } from '../../utils/dateUtils.jsx';

import "../shared/EditItemDebitStyles.scss"

const EditItemDebit = ({ item, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...item });

    // Расчёт конца беспроцентного периода
    const calculateInterestFreeEnd = (startDate, days) => {
        if (!startDate || !days) return '';
        const date = new Date(startDate);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    };

    const interestFreeEnd = calculateInterestFreeEnd(item.startDate, item.interestFreeDays);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        updateDebit(item.id, formData);
        setIsEditing(false);
        if (onUpdate) onUpdate();
        window.dispatchEvent(new Event('storageUpdate'));
    };

    const handleDelete = () => {
        if (window.confirm('Удалить запись?')) {
            deleteDebit(item.id);
            if (onUpdate) onUpdate();
            window.dispatchEvent(new Event('storageUpdate'));
        }
    };

    return (
        <div className="edit-item-debit">
            {!isEditing ? (
                <div className="view-mode">
                    <div className="info">
                        <div>
                            <div><strong>Банк:</strong> {item.bankName}</div>
                            <div><strong>Сумма:</strong> {item.money} ₽</div>
                            <div><strong>Беспроцентный период:</strong> {item.interestFreeDays} дней</div>
                            <div><strong>Дата взятия:</strong> {formatDate(item.startDate)}</div>
                            <div><strong>Дата погашения:</strong> {formatDate(item.endDate) || 'Не указана'}</div>
                            {interestFreeEnd && (
                                <div className="interest-free-end">
                                    🔥 Конец беспроцентного периода: {formatDate(interestFreeEnd)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="actions">
                        <button className="edit_btn" onClick={() => setIsEditing(true)}>
                            ✏️ Редактировать
                        </button>
                        <button className="delete_btn" onClick={handleDelete}>
                            🗑️ Удалить
                        </button>
                    </div>
                </div>
            ) : (
                <div className="edit-mode">
                    <input
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        placeholder="Название банка"
                    />
                    <input
                        name="money"
                        type="number"
                        value={formData.money}
                        onChange={handleChange}
                        placeholder="Сумма"
                        min="0"
                        step="0.01"
                    />
                    <input
                        name="interestFreeDays"
                        type="number"
                        value={formData.interestFreeDays}
                        onChange={handleChange}
                        placeholder="Беспроцентный период (дней)"
                        min="0"
                    />
                    <input
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    <input
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                    <div className="actions">
                        <button className="save" onClick={handleSave}>💾 Сохранить</button>
                        <button className="cancel" onClick={() => setIsEditing(false)}>❌ Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditItemDebit;