import React, { useState, useEffect } from 'react';
import AddItemDebit from '../../entities/AddItem/AddItemDebit/AddItemDebit.jsx';
import EditItemDebit from '../../entities/EditItemDebit/EditItemDebit.jsx';
import { getDebits } from '../../features/localStorage/debitStorage.jsx';

const DebitList = ({ data_list }) => {
    const [items, setItems] = useState([]);

    const loadItems = () => {
        const debits = getDebits();
        setItems(debits);
    };

    useEffect(() => {
        loadItems();
        const handleUpdate = () => loadItems();
        window.addEventListener('storageUpdate', handleUpdate);
        return () => window.removeEventListener('storageUpdate', handleUpdate);
    }, []);

    const totalDebt = items.reduce((sum, current) => sum + (current.money || 0), 0);

    return (
        <div className="list">
            <div className="title">💰 Деньги взяты из</div>

            <AddItemDebit data_list={data_list} />

            <div className="total-stats">
                <div className="stat-item">
                    <span className="stat-label">Количество займов:</span>
                    <span className="stat-value">{items.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Общая сумма долга:</span>
                    <span className="stat-value debt">{totalDebt.toFixed(2)} ₽</span>
                </div>
            </div>

            <div className="items-list">
                {items.length === 0 ? (
                    <div className="empty-message">Нет активных займов</div>
                ) : (
                    items.map(el => <EditItemDebit key={el.id} item={el} onUpdate={loadItems} />)
                )}
            </div>
        </div>
    );
};

export default DebitList;