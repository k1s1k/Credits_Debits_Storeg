import React, { useState } from 'react';
import { addDebit } from '../../../features/localStorage/debitStorage.jsx';
import '../AddItemStyles.scss';

const AddItemDebit = ({ data_list }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        bankId: '',
        money: '',
        interestFreeDays: '',
        startDate: '',
        endDate: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedBank = data_list?.data?.find(
            bank => bank.id === parseInt(formData.bankId)
        );

        const newDebit = {
            bankId: parseInt(formData.bankId) || 0,
            bankName: selectedBank?.name || 'Неизвестный банк',
            money: parseFloat(formData.money) || 0,
            interestFreeDays: parseInt(formData.interestFreeDays) || 0,
            startDate: formData.startDate || new Date().toISOString().split('T')[0],
            endDate: formData.endDate || ''
        };

        addDebit(newDebit);
        setIsOpen(false);

        setFormData({
            bankId: '',
            money: '',
            interestFreeDays: '',
            startDate: '',
            endDate: ''
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
                    <span className="title">Добавление: займа</span>

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

                    <div className="item_info">
                        <span>Беспроцентный период (дней):</span>
                        <input
                            type="number"
                            name="interestFreeDays"
                            placeholder="30"
                            value={formData.interestFreeDays}
                            onChange={handleInputChange}
                            min="0"
                        />
                    </div>

                    <div className="wrapper_date">
                        <div className="item_info">
                            <span>Дата взятия:</span>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="item_info">
                            <span>Дата погашения:</span>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="add_localStorage">
                        Добавить
                    </button>
                </form>
            )}
        </>
    );
};

export default AddItemDebit;