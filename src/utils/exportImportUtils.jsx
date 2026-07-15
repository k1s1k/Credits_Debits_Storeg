export const exportData = () => {
    try {
        // Собираем все данные из localStorage
        const credits = localStorage.getItem('credits');
        const debits = localStorage.getItem('debits');

        const data = {
            credits: credits ? JSON.parse(credits) : [],
            debits: debits ? JSON.parse(debits) : [],
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };

        // Создаём JSON строку
        const jsonString = JSON.stringify(data, null, 2);

        // Создаём Blob
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Создаём ссылку для скачивания
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Имя файла с текущей датой
        const date = new Date().toISOString().split('T')[0];
        link.download = `finance_data_${date}.json`;

        // Триггерим скачивание
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Ошибка при экспорте данных:', error);
        alert('Ошибка при экспорте данных. Проверьте консоль.');
        return false;
    }
};

export const importData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                // Проверяем структуру данных
                if (!data.credits || !data.debits) {
                    alert('Некорректный формат файла. Проверьте структуру данных.');
                    reject(new Error('Invalid data structure'));
                    return;
                }

                // Подтверждение перед импортом
                if (!confirm('Импорт данных заменит все текущие данные. Продолжить?')) {
                    resolve(false);
                    return;
                }

                // Сохраняем данные в localStorage
                localStorage.setItem('credits', JSON.stringify(data.credits));
                localStorage.setItem('debits', JSON.stringify(data.debits));

                // Уведомляем об успешном импорте
                alert(`Данные успешно импортированы!\nКредитов: ${data.credits.length}\nДебетов: ${data.debits.length}`);

                // Обновляем страницу для отображения новых данных
                window.dispatchEvent(new Event('storageUpdate'));

                resolve(true);
            } catch (error) {
                console.error('Ошибка при импорте данных:', error);
                alert('Ошибка при импорте данных. Проверьте формат файла.');
                reject(error);
            }
        };

        reader.onerror = (error) => {
            console.error('Ошибка чтения файла:', error);
            alert('Ошибка чтения файла.');
            reject(error);
        };

        reader.readAsText(file);
    });
};