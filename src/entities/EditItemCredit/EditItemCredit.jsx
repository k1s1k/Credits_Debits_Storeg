import React, { useState } from 'react';
import { updateCredit, deleteCredit } from '../../features/localStorage/creditStorage.jsx';

const EditItemCredit = ({ item, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...item });

    // Расчёт процентов
    const calculateDays = (startDate) => {
        const start = new Date(startDate);
        const now = new Date();
        const diff = now - start;
        return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    const calculateSimpleInterest = (money, rate, days) => {
        if (!money || !rate || !days) return 0;
        return money * (rate / 100) * (days / 365);
    };

    const calculateCompoundInterest = (money, rate, days) => {
        if (!money || !rate || !days) return 0;
        return money * Math.pow(1 + (rate / 100) / 365, days) - money;
    };

    const calculateProfit = (money, rate, days, isCompound) => {
        if (isCompound) {
            return calculateCompoundInterest(money, rate, days);
        }
        return calculateSimpleInterest(money, rate, days);
    };

    const calculateMonthProfit = (money, rate, isCompound) => {
        if (isCompound) {
            return money * Math.pow(1 + (rate / 100) / 365, 30) - money;
        }
        return money * (rate / 100) * (30 / 365);
    };

    const daysPassed = calculateDays(item.startDate);
    const currentProfit = calculateProfit(
        item.money,
        item.annualRate,
        daysPassed,
        item.isCompound
    );
    const monthProfit = calculateMonthProfit(
        item.money,
        item.annualRate,
        item.isCompound
    );

    // Сумма на конец месяца = вклад + проценты за месяц
    const totalMonthEnd = item.money + monthProfit;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        updateCredit(item.id, formData);
        setIsEditing(false);
        if (onUpdate) onUpdate();
        window.dispatchEvent(new Event('storageUpdate'));
    };

    const handleDelete = () => {
        if (window.confirm('Удалить запись?')) {
            deleteCredit(item.id);
            if (onUpdate) onUpdate();
            window.dispatchEvent(new Event('storageUpdate'));
        }
    };

    return (
        <div className="edit-item">
            {!isEditing ? (
                <div className="view-mode">
                    <div className="info">
                        <div>
                            <div><strong>Банк:</strong> {item.bankName}</div>
                            <div><strong>Сумма:</strong> {item.money} ₽</div>
                            <div><strong>Ставка:</strong> {item.annualRate}%</div>
                            <div><strong>Дата начала:</strong> {item.startDate}</div>
                            <div><strong>Сложный процент:</strong> {item.isCompound ? 'Да' : 'Нет'}</div>
                        </div>
                        <div className="info_money">
                            <div style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                                💰 Заработано сегодня: {currentProfit.toFixed(2)} ₽
                            </div>
                            <div style={{ color: '#1565c0', fontWeight: 'bold' }}>
                                📈 Заработано за месяц: {monthProfit.toFixed(2)} ₽
                            </div>
                            <div style={{ color: '#1a237e', fontWeight: 'bold' }}>
                                📊 Сумма на конец месяца: {totalMonthEnd.toFixed(2)} ₽
                            </div>
                            <div style={{ color: '#4a148c', fontWeight: 'bold' }}>
                                📊 Итого с процентами (на сегодня): {(item.money + currentProfit).toFixed(2)} ₽
                            </div>
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
                        name="annualRate"
                        type="number"
                        value={formData.annualRate}
                        onChange={handleChange}
                        placeholder="Ставка %"
                        min="0"
                        step="0.01"
                    />
                    <input
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="isCompound"
                                checked={formData.isCompound}
                                onChange={handleChange}
                            />
                            Сложный процент
                        </label>
                    </div>
                    <div className="actions">
                        <button className="save" onClick={handleSave}>💾 Сохранить</button>
                        <button className="cancel" onClick={() => setIsEditing(false)}>❌ Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditItemCredit;