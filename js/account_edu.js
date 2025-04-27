document.addEventListener('DOMContentLoaded', () => {
    // Завантаження даних із localStorage
    const savedData = JSON.parse(localStorage.getItem('profileData')) || {
        name: "Назва установи",
        type: "Тип установи",
        location: "Місцезнаходження",
        contactName: "Ім’я",
        email: "email@example.com",
        phone: "+380123456789"
    };

    // Оновлення вмісту сторінки
    Object.keys(savedData).forEach(key => {
        const element = document.getElementById(key);
        if (element) element.textContent = savedData[key];
    });

    // Функція редагування
    window.makeEditable = function(field) {
        const span = document.getElementById(field);
        const parent = span.parentElement;
        const currentValue = span.textContent;

        // Створюємо input
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.className = span.className;
        input.id = field;

        // Обробка завершення редагування
        input.addEventListener('blur', () => saveValue(field, input));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveValue(field, input);
            }
        });

        // Замінюємо span на input
        parent.replaceChild(input, span);
        input.focus();
    };

    // Функція збереження значення
    function saveValue(field, input) {
        const newValue = input.value.trim();
        if (newValue !== "") {
            const span = document.createElement('span');
            span.id = field;
            span.textContent = newValue;
            span.className = input.className;
            input.parentElement.replaceChild(span, input);

            // Збереження в localStorage
            savedData[field] = newValue;
            localStorage.setItem('profileData', JSON.stringify(savedData));
        } else {
            // Якщо значення порожнє, повертаємо попереднє
            const span = document.createElement('span');
            span.id = field;
            span.textContent = savedData[field];
            span.className = input.className;
            input.parentElement.replaceChild(span, input);
        }
    }
});