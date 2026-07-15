export const formatDate = (dateString) => {
    if (!dateString) return '—';
    
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    
    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
};

export const formatDateLocale = (dateString, locale = 'ru-RU') => {
    if (!dateString) return '—';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};