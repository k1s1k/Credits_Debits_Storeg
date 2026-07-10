import React from 'react';

import "./MainPage.scss"

import CreditList from "../../wigets/CreditList/CreditList.jsx";
import DebitList from "../../wigets/DebitList/DebitList.jsx";

import BunckList from "../../../public/data/BacnkList.json"

const MainPage = () => {
    return (
        <div className={'main_page'}>

            <div className={"header"}>
                Система учёта финансов
            </div>


            <div className={"body"}>

                <CreditList
                    id="creditList"
                    item={ BunckList }
                />

                <DebitList
                    id="debitList"
                    item={ BunckList }
                />

            </div>

        </div>
    );
};

export default MainPage;