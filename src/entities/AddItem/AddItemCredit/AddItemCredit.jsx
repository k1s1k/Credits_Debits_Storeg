import React, { useState } from 'react';
import { addCredit } from '../../../features/localStorage/creditStorage.jsx';
import '../AddItemStyles.scss';

const AddItemCredit = ({ data_list }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        bankId: '',
        annualRate: '',
        startDate: '',
        money: '',
        isCompound: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedBank = data_list?.data?.find(
            bank => bank.id === parseInt(formData.bankId)
        );

        const newCredit = {
            bankId: parseInt(formData.bankId) || 0,
            bankName: selectedBank?.name || 'Неизвестный банк',
            annualRate: parseFloat(formData.annualRate) || 0,
            startDate: formData.startDate || new Date().toISOString().split('T')[0],
            money: parseFloat(formData.money) || 0,
            isCompound: formData.isCompound || false
        };

        addCredit(newCredit);
        setIsOpen(false);

        setFormData({
            bankId: '',
            annualRate: '',
            startDate: '',
            money: '',
            isCompound: false
        });

        window.dispatchEvent(new Event('storageUpdate'));
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="button_add"
            >
                {isOpen ? 'Закрыть' : 'Добавить'}
                {isOpen ? '⬆️' : '⬇️'}
            </button>

            {isOpen && (
                <form className="add_item" onSubmit={handleSubmit}>
                    <span className="title">
                        Добавление: денег под проценты
                    </span>

                    <div className="wrapper_date">
                        <div className="item_info">
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

                        <div className="item_info">
                            <span>Ставка (%):</span>
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

                    <div className="item_info">
                        <span>Дата начала:</span>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="item_info">
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

                    <div className="item_info checkbox">
                        <span>Сложный процент:</span>
                        <input
                            type="checkbox"
                            name="isCompound"
                            checked={formData.isCompound}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="add_localStorage">
                        Добавить
                    </button>
                </form>
            )}
        </>
    );
};

export default AddItemCredit;