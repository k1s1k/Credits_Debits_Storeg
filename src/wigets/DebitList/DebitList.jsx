import React from 'react';
import AddItem from "../../entities/AddItem/AddItem.jsx";

const DebitList = ( { item, id } ) => {
    return (
        <div className={"list"}>
            <div className={"title"}>
                Деньги взяты из
            </div>

            <AddItem
                is_credit={true}
                id={id}
                data_list={ item }
            />
        </div>
    );
};

export default DebitList;