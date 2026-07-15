import React from 'react';
import CreditList from '../../wigets/CreditList/CreditList.jsx';
import DebitList from '../../wigets/DebitList/DebitList.jsx';
import BankList from '../../../public/data/BacnkList.json';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div className="main_page">
            <div className="header">
                Система учёта финансов
            </div>

            <div className="body">
                <DebitList data_list={BankList} />
                <CreditList data_list={BankList} />
            </div>
        </div>
    );
};

export default MainPage;