import React, { useState } from 'react';
import { updateItemLocalStorage, deleteItemLocalStorage } from '../../features/localStorage/CRUDlocalStorage';

import "./EditItemStyles.scss"

const EditItem = ({ item, onUpdate, key }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...item });

  const calculateDays = (start, end) => {
    const diff = new Date(end) - new Date(start);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const calculateProfit = (money, rate, days) => {
    if (!money || !rate || !days) return 0;
    return money * (rate / 100) * (days / 365);
  };

  const daysTotal = calculateDays(item.dateStart, item.dateEnd);
  const daysPassed = Math.min(
      calculateDays(item.dateStart, new Date().toISOString().split('T')[0]),
      daysTotal
  );

  const totalProfit = calculateProfit(item.money, item.annualRate, daysTotal);
  const currentProfit = calculateProfit(item.money, item.annualRate, daysPassed);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateItemLocalStorage(item.id, formData);
    setIsEditing(false);
    if (onUpdate) onUpdate();
    window.dispatchEvent(new Event('storageUpdate'));
  };

  const handleDelete = () => {
    if (window.confirm('Удалить запись?')) {
      deleteItemLocalStorage(item.id);
      if (onUpdate) onUpdate();
      window.dispatchEvent(new Event('storageUpdate'));
    }
  };

  return (
      <div className="edit-item">
        {!isEditing ? (
            <div className="view-mode">
              <div className={"info"}>
                <div>
                  <div><strong>Банк:</strong> {item.bankName}</div>
                  <div><strong>Сумма:</strong> {item.money} ₽</div>
                  <div><strong>Ставка:</strong> {item.annualRate}%</div>
                  <div><strong>Период:</strong> C {item.dateStart} По {item.dateEnd}</div>
                </div>

                {!item.isCredit && (
                    <div className={"info_money"}>
                      <div style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                         Заработано сегодня: {currentProfit.toFixed(2)} ₽
                      </div>
                      <div style={{ color: '#1565c0', fontWeight: 'bold' }}>
                        Заработано за весь срок: {totalProfit.toFixed(2)} ₽
                      </div>
                    </div>
                )}
              </div>

              <div className="actions">
                <button
                    className={"edit_btn"}
                    onClick={() => setIsEditing(true)}
                >
                  ✏️Редактировать
                </button>
                <button
                    onClick={handleDelete}
                    className="delete_btn"
                >
                  🗑️ Удалить
                </button>
              </div>

            </div>
        ) : (
            <div className="edit-mode">
              <input name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Название банка" />
              <input name="money" type="number" value={formData.money} onChange={handleChange} placeholder="Сумма" />
              <input name="annualRate" type="number" value={formData.annualRate} onChange={handleChange} placeholder="Ставка %" />
              <input name="dateStart" type="date" value={formData.dateStart} onChange={handleChange} />
              <input name="dateEnd" type="date" value={formData.dateEnd} onChange={handleChange} />
              <div className="actions">
                <button onClick={handleSave} className={"save"}>Сохранить</button>
                <button onClick={() => setIsEditing(false)} className={"cansel"}>Отмена</button>
              </div>
            </div>
        )}
      </div>
  );
};

export default EditItem;