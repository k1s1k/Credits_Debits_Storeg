import React, { useState, useEffect } from 'react';
import AddItem from "../../entities/AddItem/AddItem.jsx";
import EditItem from "../../entities/EditItem/EditItem.jsx";
import { getItemLocalStorage } from "../../features/localStorage/CRUDlocalStorage.jsx";

const CreditList = ({ item, id }) => {
    const [items, setItems] = useState([]);

    const loadItems = () => {
        const all = getItemLocalStorage();
        setItems(all.filter(el => el.isCredit === false));
    };

    useEffect(() => {
        loadItems();

        const handleUpdate = () => loadItems();
        window.addEventListener('storageUpdate', handleUpdate);

        return () => {
            window.removeEventListener('storageUpdate', handleUpdate);
        };
    }, []);

    // Подсчёт общей суммы вкладов
    const totalMoney = items.reduce((sum, current) => sum + (current.money || 0), 0);

    // Функция для расчёта процентов по одному вкладу
    const calculateProfit = (money, rate, startDate, endDate) => {
        if (!money || !rate || !startDate || !endDate) return 0;

        const diff = new Date(endDate) - new Date(startDate);
        const days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));

        return money * (rate / 100) * (days / 365);
    };

    // Подсчёт общей заработанной суммы (проценты за весь период)
    const totalEarned = items.reduce((sum, current) => {
        const profit = calculateProfit(
            current.money,
            current.annualRate,
            current.dateStart,
            current.dateEnd
        );
        return sum + profit;
    }, 0);

    return (
        <div className="list">
            <div className="title">📈 Деньги лежат под проценты</div>

            <AddItem is_credit={false} id={id} data_list={item} />

            {/* Итоговая статистика с процентами */}
            <div className="total-stats credit_total">
                <div className="stat-item">
                    <span className="stat-label">Количество вкладов:</span>
                    <span className="stat-value">{items.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Общая сумма вкладов:</span>
                    <span className="stat-value">{totalMoney.toFixed(2)} ₽</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Заработано за весь срок:</span>
                    <span className="stat-value profit">{totalEarned.toFixed(2)} ₽</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Итого с процентами:</span>
                    <span className="stat-value total">{(totalMoney + totalEarned).toFixed(2)} ₽</span>
                </div>
            </div>

            <div className="items-list">
                {items.length === 0 ? (
                    <div className="empty-message">Нет активных вкладов</div>
                ) : (
                    items.map(el => <EditItem key={el.id} item={el} onUpdate={loadItems}/>)
                )}
            </div>
        </div>
    );
};

export default CreditList;