import React, { useState } from 'react';
import "./AddItemStyles.scss"
import { useAddItem } from "../../app/provider/AddItemProvider/AddItemProvider.jsx";
import { sendItemLocalStorage } from "../../features/localStorage/CRUDlocalStorage.jsx"

const AddItem = ({ is_credit = false, id, data_list }) => {
    const { activeId, toggleItem } = useAddItem();
    const isOpen = activeId === id;

    // Состояние формы
    const [formData, setFormData] = useState({
        bankId: '',
        startDate: '',
        endDate: '',
        money: '',
        annualRate: ''
    });

    // Обработчик изменения полей
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // Находим выбранный банк
        const selectedBank = data_list?.data?.find(
            bank => bank.id === parseInt(formData.bankId)
        );

        // Подготавливаем данные
        const newItem = {
            bankId: parseInt(formData.bankId),
            bankName: selectedBank?.name || 'Неизвестный банк',
            isCredit: is_credit,
            money: parseFloat(formData.money) || 0,
            annualRate: parseFloat(formData.annualRate) || 0,
            dateStart: formData.startDate,
            dateEnd: formData.endDate,
            createdAt: new Date().toISOString()
        };

        // Сохраняем
        sendItemLocalStorage(newItem);

        // Закрываем модалку и очищаем форму
        toggleItem(id);
        setFormData({
            bankId: '',
            startDate: '',
            endDate: '',
            money: '',
            annualRate: ''
        });

        // Обновляем список (вызываем перерендер)
        window.dispatchEvent(new Event('storageUpdate'));
    };

    return (
        <>
            <button
                onClick={() => { toggleItem(id) }}
                className={"button_add"}
            >
                {isOpen ? "Закрыть" : "Добавить"}
                {isOpen ? "⬆️" : "⬇️"}
            </button>

            {isOpen && (
                <form className={"add_item"} onSubmit={handleSubmit}>
                    <span className={"title"}>
                        Добавление: {is_credit ? "заёма денег" : "денег под проценты"}
                    </span>

                    <div className={"wrapper_date"} style={{backgroundColor: "transparent"}}>
                        <div className={"item_info"}>
                            <span>Название банка:</span>
                            <select
                                name="bankId"
                                value={formData.bankId}
                                onChange={handleInputChange}
                            >
                                <option value="">Выберите банк</option>
                                {data_list?.data?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={"item_info"}>
                            <span>Годовая ставка (%):</span>
                            <input
                                type="number"
                                name="annualRate"
                                placeholder="Например, 10.5"
                                value={formData.annualRate}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className={"wrapper_date"} style={{backgroundColor: "transparent"}}>
                        <div className={"item_info"}>
                            <span>{is_credit ? "Дата заёма:" : "Дата начала:"}</span>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={"item_info"}>
                            <span>{is_credit ? "Дата погашения:" : "Дата окончания:"}</span>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className={"item_info"}>
                        <span>Сумма:</span>
                        <input
                            type="number"
                            name="money"
                            placeholder="0"
                            value={formData.money}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <button type="submit" className={"add_localStorage"}>
                        Добавить
                    </button>
                </form>
            )}
        </>
    );
};

export default AddItem;