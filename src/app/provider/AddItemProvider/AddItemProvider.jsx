import React, {createContext, useContext, useState} from 'react';

const AddItemContext = createContext();

export const AddItemProvider = ({ children }) => {
    const [activeId, setActiveId] = useState(null);

    const toggleItem = (id) =>{
        setActiveId(activeId === id ? null : id);
    }


    return (
        <AddItemContext.Provider value={{ activeId, toggleItem }}>
            {children}
        </AddItemContext.Provider>
    )
};

export const useAddItem = () => useContext(AddItemContext);