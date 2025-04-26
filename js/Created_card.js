document.getElementById('investmentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const requiredFields = ['proposalName', 'proposalDescription', 'projectCategory', 'timeline', 'expectedResults'];

  let isValid = true;
  requiredFields.forEach(field => {
    if (!formData.get(field)) {
      isValid = false;
      document.getElementById(field).classList.add('border-red-500');
    } else {
      document.getElementById(field).classList.remove('border-red-500');
    }
  });

  if (isValid) {
    alert('Форма успішно відправлена!');
  } else {
    alert('Будь ласка, заповніть усі обов’язкові поля.');
  }
});

// Логіка для випадаючого списку з чекбоксами Орієнтація на тип закладу
const selectBox = document.getElementById('selectBox');
const selectDropdown = document.getElementById('selectDropdown');
const institutionTypeInput = document.getElementById('institutionType');
const institutionTypeCheckboxes = document.querySelectorAll('input[name="institutionType"]');
const institutionTypeOtherInput = document.getElementById('institutionTypeOtherInput');
const institutionTypeOtherCheckbox = document.getElementById('institutionTypeOther');

function updateInstitutionType() {
  const selectedTypes = Array.from(institutionTypeCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  institutionTypeInput.value = JSON.stringify(selectedTypes);
  selectBox.textContent = selectedTypes.length > 0 ? selectedTypes.map(value => {
    const label = selectDropdown.querySelector(`input[value="${value}"]`).parentElement.textContent.trim();
    return label;
  }).join(', ') : 'Оберіть тип';
  if (institutionTypeOtherInput) {
    institutionTypeOtherInput.classList.toggle('hidden', !institutionTypeOtherCheckbox.checked);
  }
}

selectBox.addEventListener('click', () => {
  selectDropdown.classList.toggle('hidden');
});

institutionTypeCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateInstitutionType);
});

document.addEventListener('click', (e) => {
  if (!selectBox.contains(e.target) && !selectDropdown.contains(e.target)) {
    selectDropdown.classList.add('hidden');
  }
});

// Логіка для кастомного випадаючого списку Географічний фокус
const geoFocusSelectBox = document.getElementById('geoFocusSelectBox');
const geoFocusSelectDropdown = document.getElementById('geoFocusSelectDropdown');
const geoFocusInput = document.getElementById('geoFocus');
const geoFocusOtherInput = document.getElementById('geoFocusOtherInput');

geoFocusSelectBox.addEventListener('click', () => {
  geoFocusSelectDropdown.classList.toggle('hidden');
});

document.querySelectorAll('#geoFocusSelectDropdown li').forEach(item => {
  item.addEventListener('click', () => {
    const value = item.getAttribute('data-value');
    geoFocusSelectBox.textContent = item.textContent;
    geoFocusInput.value = value;
    geoFocusSelectDropdown.classList.add('hidden');
    if (geoFocusOtherInput) {
      geoFocusOtherInput.classList.toggle('hidden', value !== 'other');
    }
  });
});

document.addEventListener('click', (e) => {
  if (!geoFocusSelectBox.contains(e.target) && !geoFocusSelectDropdown.contains(e.target)) {
    geoFocusSelectDropdown.classList.add('hidden');
  }
});

// Логіка для поля Категорія проєкту
const projectCategorySelect = document.getElementById('projectCategory');
const categoryOtherInput = document.getElementById('CategoryOtherInput');

projectCategorySelect.addEventListener('change', () => {
  if (categoryOtherInput) {
    categoryOtherInput.classList.toggle('hidden', projectCategorySelect.value !== 'other');
  }
});

// Ініціалізація стану
updateInstitutionType();