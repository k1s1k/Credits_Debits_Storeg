import React, { useState, useEffect } from 'react';
import AddItemCredit from '../../entities/AddItem/AddItemCredit/AddItemCredit.jsx';
import EditItemCredit from '../../entities/EditItemCredit/EditItemCredit.jsx';
import { getCredits } from '../../features/localStorage/creditStorage.jsx';

const CreditList = ({ data_list }) => {
    const [items, setItems] = useState([]);

    const loadItems = () => {
        const credits = getCredits();
        setItems(credits);
    };

    useEffect(() => {
        loadItems();
        const handleUpdate = () => loadItems();
        window.addEventListener('storageUpdate', handleUpdate);
        return () => window.removeEventListener('storageUpdate', handleUpdate);
    }, []);

    const totalMoney = items.reduce((sum, current) => sum + (current.money || 0), 0);

    return (
        <div className="list">
            <div className="title">📈 Деньги лежат под проценты</div>

            <AddItemCredit data_list={data_list} />

            <div className="total-stats credit_total">
                <div className="stat-item">
                    <span className="stat-label">Количество вкладов:</span>
                    <span className="stat-value">{items.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Общая сумма вкладов:</span>
                    <span className="stat-value">{totalMoney.toFixed(2)} ₽</span>
                </div>
            </div>

            <div className="items-list">
                {items.length === 0 ? (
                    <div className="empty-message">Нет активных вкладов</div>
                ) : (
                    items.map(el => <EditItemCredit key={el.id} item={el} onUpdate={loadItems} />)
                )}
            </div>
        </div>
    );
};

export default CreditList;