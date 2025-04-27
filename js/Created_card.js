document.addEventListener("DOMContentLoaded", () => {
    // Логіка для селекторів із чекбоксами (Тип закладу)
    const selectBox = document.getElementById("selectBox");
    const selectDropdown = document.getElementById("selectDropdown");
    const institutionTypeInput = document.getElementById("institutionType");
    const institutionCheckboxes = document.querySelectorAll('input[name="institutionType"]');

    selectBox.addEventListener("click", () => {
        selectDropdown.classList.toggle("hidden");
    });

    institutionCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const selectedTypes = Array.from(institutionCheckboxes)
                .filter((cb) => cb.checked)
                .map((cb) => cb.parentElement.textContent.trim());
            selectBox.textContent = selectedTypes.length > 0 ? selectedTypes.join(", ") : "Оберіть тип";
            institutionTypeInput.value = JSON.stringify(
                Array.from(institutionCheckboxes)
                    .filter((cb) => cb.checked)
                    .map((cb) => cb.value)
            );
        });
    });

    // Логіка для вибору регіону (Географічний фокус)
    const geoFocusSelectBox = document.getElementById("geoFocusSelectBox");
    const geoFocusDropdown = document.getElementById("geoFocusSelectDropdown");
    const geoFocusInput = document.getElementById("geoFocus");

    geoFocusSelectBox.addEventListener("click", () => {
        geoFocusDropdown.classList.toggle("hidden");
    });

    geoFocusDropdown.addEventListener("click", (e) => {
        if (e.target.tagName === "LI" && e.target.dataset.value) {
            geoFocusSelectBox.textContent = e.target.textContent;
            geoFocusInput.value = e.target.dataset.value;
            geoFocusDropdown.classList.add("hidden");
        }
    });

    // Закриття випадаючих списків при кліку поза ними
    document.addEventListener("click", (e) => {
        if (!selectBox.contains(e.target) && !selectDropdown.contains(e.target)) {
            selectDropdown.classList.add("hidden");
        }
        if (!geoFocusSelectBox.contains(e.target) && !geoFocusDropdown.contains(e.target)) {
            geoFocusDropdown.classList.add("hidden");
        }
    });

    // Обробка відправки форми
    // const form = document.getElementById('investmentForm');
    // form.addEventListener('submit', (e) => {
    //   e.preventDefault();

    //   const formData = new FormData(form);
    //   const proposal = {
    //     proposalName: formData.get('proposalName'),
    //     proposalDescription: formData.get('proposalDescription'),
    //     institutionType: formData.get('institutionType'),
    //     Category: formData.get('Category'),
    //     geoFocus: formData.get('geoFocus'),
    //     timeline: formData.get('timeline'),
    //     expectedResults: formData.get('expectedResults'),
    //     additionalMaterials: formData.get('additionalMaterials') ? Array.from(formData.getAll('additionalMaterials')).map(file => file.name) : []
    //   };

    //   // Збереження у localStorage
    //   let proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    //   proposals.push(proposal);
    //   localStorage.setItem('proposals', JSON.stringify(proposals));

    //   alert('Пропозицію успішно збережено!');
    //   form.reset();
    //   selectBox.textContent = 'Оберіть тип';
    //   geoFocusSelectBox.textContent = 'Оберіть регіон';
    // });
});
