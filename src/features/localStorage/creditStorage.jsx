const STORAGE_KEY = 'credits';

export const getCredits = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const addCredit = (newCredit) => {
    const credits = getCredits();
    const updated = [
        ...credits,
        {
            ...newCredit,
            id: Date.now(),
            createdAt: new Date().toISOString()
        }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};

export const updateCredit = (id, updatedData) => {
    const credits = getCredits();
    const updated = credits.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};

export const deleteCredit = (id) => {
    const credits = getCredits();
    const updated = credits.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};