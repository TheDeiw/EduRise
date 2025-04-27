function makeEditable(id) {
    const element = document.getElementById(id);
    const currentValue = element.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    input.style.width = '100%';
    
    input.addEventListener('blur', () => {
        element.textContent = input.value;
        input.replaceWith(element);
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            element.textContent = input.value;
            input.replaceWith(element);
        }
    });
    
    element.replaceWith(input);
    input.focus();
}