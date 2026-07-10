import React from 'react';
import AddItem from "../../entities/AddItem/AddItem.jsx";


const CreditList = ( { item, id } ) => {
    return (
        <div className={"list "}>
            <div className={"title"}>
                Деньги лежат под проценты
            </div>

            <AddItem
                is_credit={false}
                id={id}
                data_list={ item }
            />
        </div>
    );
};

export default CreditList;