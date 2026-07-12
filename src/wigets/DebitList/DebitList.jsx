import React, { useState, useEffect } from 'react';
import AddItem from "../../entities/AddItem/AddItem.jsx";
import EditItem from "../../entities/EditItem/EditItem.jsx";
import { getItemLocalStorage } from "../../features/localStorage/CRUDlocalStorage.jsx";

const DebitList = ({ item, id }) => {
    const [items, setItems] = useState([]);

    const loadItems = () => {
        const all = getItemLocalStorage();
        setItems(all.filter(el => el.isCredit === true));
    };

    useEffect(() => {
        loadItems();

        const handleUpdate = () => loadItems();
        window.addEventListener('storageUpdate', handleUpdate);

        return () => {
            window.removeEventListener('storageUpdate', handleUpdate);
        };
    }, []);

    // Подсчёт общей суммы долга
    const totalDebt = items.reduce((sum, current) => sum + (current.money || 0), 0);

    return (
        <div className="list">
            <div className="title">💰 Деньги взяты из</div>

            <AddItem is_credit={true} id={id} data_list={item} />

            {/* Итоговая статистика - только сумма долга */}
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
                    items.map(el => <EditItem key={el.id} item={el} onUpdate={loadItems} />)
                )}
            </div>
        </div>
    );
};

export default DebitList;