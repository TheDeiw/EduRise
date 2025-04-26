document.addEventListener('DOMContentLoaded', () => {
  // Логіка для випадаючого списку (Тип установи)
  const selectBox = document.getElementById('selectBox');
  const selectDropdown = document.getElementById('selectDropdown');
  const institutionTypeInput = document.getElementById('institutionType');
  const institutionTypeOtherInput = document.getElementById('institutionTypeOtherInput');
  const institutionTypeCustom = document.getElementById('institutionTypeCustom');

  selectBox.addEventListener('click', () => {
    selectDropdown.classList.toggle('hidden');
  });

  selectDropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI' && e.target.dataset.value) {
      const value = e.target.dataset.value;
      const text = e.target.textContent;
      selectBox.textContent = text;
      institutionTypeInput.value = value;
      selectDropdown.classList.add('hidden');
      institutionTypeOtherInput.classList.toggle('hidden', value !== 'other');
      if (value !== 'other') {
        institutionTypeCustom.value = '';
      }
    }
  });

  // Закриття списку при кліку поза ним
  document.addEventListener('click', (e) => {
    if (!selectBox.contains(e.target) && !selectDropdown.contains(e.target)) {
      selectDropdown.classList.add('hidden');
    }
  });

  // Логіка для показу/приховання пароля
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);
      const eyeImg = button.querySelector('.button-eye');
      if (input.type === 'password') {
        input.type = 'text';
        eyeImg.src = 'assets/img/eye-on.svg';
        eyeImg.alt = 'Приховати пароль';
      } else {
        input.type = 'password';
        eyeImg.src = 'assets/img/eye-off.svg';
        eyeImg.alt = 'Показати пароль';
      }
    });
  });

  // Обробка відправки форми
  const form = document.getElementById('registerForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const institutionType = formData.get('institutionType');

    // Валідація пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Пароль має містити принаймні 8 символів, великі та малі літери, цифри.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Паролі не збігаються.');
      return;
    }

    // Валідація типу установи
    if (institutionType === 'other' && !formData.get('institutionTypeCustom')) {
      alert('Вкажіть тип установи для "Інше".');
      return;
    }

    // Збереження даних
    const registration = {
      companyName: formData.get('companyName'),
      institutionType: institutionType === 'other' ? formData.get('institutionTypeCustom') : institutionType,
      location: formData.get('location'),
      contactName: formData.get('contactName'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
      password: password
    };

    // Збереження у localStorage
    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    alert('Реєстрацію успішно завершено!');
    form.reset();
    selectBox.textContent = 'Оберіть тип';
    institutionTypeOtherInput.classList.add('hidden');
  });
});