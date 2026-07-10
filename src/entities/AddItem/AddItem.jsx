import React, {useState} from 'react';

import "./AddItemStyles.scss"
import {useAddItem} from "../../app/provider/AddItemProvider/AddItemProvider.jsx";

const AddItem = ( {is_credit= false, id, data_list} ) => {

    const { activeId, toggleItem } = useAddItem();

    const isOpen = activeId === id;

    return (
        <>
            <button
                onClick={()=>{toggleItem(id)}}
                className={"button_add"}
            >
                {isOpen ? "Закрыть" : "Добавить"}
                {isOpen ? "⬆️" : "⬇️"}
            </button>

            {isOpen && (
                <form className={"add_item"}>

                    <span className={"title"}>
                        Добавление: {is_credit ? "заёма денег": "денег под проценты"}
                    </span>

                    <div className={"item_info"}>
                        <span>
                            Название банка:
                        </span>
{/*                        <select name="name" id="">
                            {data_list.map((item) => {
                                return (
                                    <div>
                                        {item.name}
                                    </div>
                                )
                            })}
                        </select>*/}
                    </div>

                    <div className={"item_info"}>
                        <span>
                            {is_credit ? "Дата заёма денег:": "Дата пополнения вклада:"}
                        </span>
                        <input type="date"/>
                    </div>

                    <div className={"item_info"}>
                        <span>
                            {is_credit ? "Дата погашения заёма:": "Дата снятия со вклада:"}
                        </span>
                        <input type="date"/>
                    </div>

                    <div className={"item_info"}>
                        <span>
                            Сумма:
                        </span>
                        <input type="number" placeholder={0}/>
                    </div>

                    <button className={"add_localStorage"}>
                        Добавить
                    </button>

                </form>
            )}

        </>
    );
};

export default AddItem;