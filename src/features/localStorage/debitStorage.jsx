const STORAGE_KEY = 'debits';

export const getDebits = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const addDebit = (newDebit) => {
    const debits = getDebits();
    const updated = [
        ...debits,
        {
            ...newDebit,
            id: Date.now(),
            createdAt: new Date().toISOString()
        }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};

export const updateDebit = (id, updatedData) => {
    const debits = getDebits();
    const updated = debits.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};

export const deleteDebit = (id) => {
    const debits = getDebits();
    const updated = debits.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};