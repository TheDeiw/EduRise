document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const requiredFields = ['companyName', 'institutionType', 'location', 'contactName', 'contactEmail', 'contactPhone', 'password', 'confirmPassword'];
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
  
    let isValid = true;
    requiredFields.forEach(field => {
      if (!formData.get(field)) {
        isValid = false;
        document.getElementById(field).classList.add('border-red-500');
      } else {
        document.getElementById(field).classList.remove('border-red-500');
      }
    });
  
    if (password !== confirmPassword) {
      isValid = false;
      document.getElementById('confirmPassword').classList.add('border-red-500');
      alert('Паролі не співпадають.');
    }
  
    if (isValid) {
      alert('Реєстрація успішна!');
    } else {
      alert('Будь ласка, заповніть усі обов’язкові поля.');
    }
  });
  
  // Логіка для перемикання видимості пароля
  document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.remove('active');
      } else {
        input.type = 'password';
        this.classList.add('active');
      }
    });
  });