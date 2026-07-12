// Получить все элементы
export const getItemLocalStorage = () => {
    const localData = localStorage.getItem("items");
    return localData ? JSON.parse(localData) : [];
}

// Добавить новый элемент
export const sendItemLocalStorage = (newItem) => {
    const currentItems = getItemLocalStorage();

    const updatedItems = [
        ...currentItems,
        {
            ...newItem,
            id: Date.now() // уникальный id
        }
    ];

    localStorage.setItem("items", JSON.stringify(updatedItems));
    return updatedItems;
}

// Удалить элемент
export const deleteItemLocalStorage = (id) => {
    const currentItems = getItemLocalStorage();
    const updatedItems = currentItems.filter(item => item.id !== id);
    localStorage.setItem("items", JSON.stringify(updatedItems));
    return updatedItems;
}

// Обновить элемент
export const updateItemLocalStorage = (id, updatedData) => {
    const currentItems = getItemLocalStorage();
    const updatedItems = currentItems.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
    );
    localStorage.setItem("items", JSON.stringify(updatedItems));
    return updatedItems;
}