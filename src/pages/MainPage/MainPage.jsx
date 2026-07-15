import React, { useRef } from 'react';
import CreditList from '../../wigets/CreditList/CreditList.jsx';
import DebitList from '../../wigets/DebitList/DebitList.jsx';
import BankList from '../../../public/data/BacnkList.json';
import { exportData, importData } from '../../utils/exportImportUtils.jsx';
import './MainPage.scss';

const MainPage = () => {
    const fileInputRef = useRef(null);

    const handleExport = () => {
        exportData();
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await importData(file);
            // Очищаем input, чтобы можно было выбрать тот же файл повторно
            event.target.value = '';
        } catch (error) {
            console.error('Ошибка импорта:', error);
        }
    };

    return (
        <div className="main_page">

            <div className="header">

                <button onClick={handleExport} className="export-btn">
                    📤 Экспорт
                </button>
                <span>Система учёта финансов</span>
                <button onClick={handleImportClick} className="import-btn">
                    📥 Импорт
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className="body">
                <DebitList data_list={BankList} />
                <CreditList data_list={BankList} />
            </div>
        </div>
    );
};

export default MainPage;