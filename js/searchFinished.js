document.addEventListener("DOMContentLoaded", () => {
    // Дані про школи
    const schools = [
        {
            name: "Гурток робототехніки",
            institution: "Київська школа №1",
            category: ["technology", "equipment"],
            image: "assets/img/robotics.jpg",
        },
        {
            name: "Мистецький простір",
            institution: "Львівська школа мистецтв",
            category: ["programs", "other"],
            image: "assets/img/art.jpg",
        },
        {
            name: "Танцювальний колектив",
            institution: "Одеська профшкола",
            category: ["other"],
            image: "assets/img/dance.jpg",
        },
    ];

    // Читання з localStorage
    const storedProposals = JSON.parse(localStorage.getItem("proposals") || "[]");
    const storedSchools = storedProposals.map((proposal) => ({
        name: proposal.schoolName || proposal.proposalName,
        institutionType: proposal.institutionType ? [proposal.institutionType] : [],
        geoFocus: [proposal.geoFocus],
        projectCategory: proposal.Category ? [proposal.Category] : [],
        image: proposal.image || "assets/img/default.jpg",
    }));

    // Об'єднання статичних даних і даних із localStorage
    const allSchools = [...schools, ...storedSchools];

    // Функція для відображення шкіл
    function renderSchools(filteredSchools) {
        const schoolGrid = document.getElementById("schoolGrid");
        if (!schoolGrid) return;
        schoolGrid.innerHTML = "";
        filteredSchools.forEach((school) => {
            const card = document.createElement("div");
            card.className = "school-card";
            card.innerHTML = `
					<img src="${school.image}" alt="${school.name}" class="school-image">
					<h3>${school.name}</h3>
					<p><strong>Тип:</strong> ${school.institutionType
                        .map(
                            (type) =>
                                ({
                                    school: "Школа",
                                    college: "Коледж",
                                    university: "Університет",
                                    vocational: "Професійна освіта",
                                    other: "Інше",
                                }[type] || type)
                        )
                        .join(", ")}</p>
					<p><strong>Регіон:</strong> ${school.geoFocus
                        .map(
                            (region) =>
                                ({
                                    "kyiv-region": "Київська область",
                                    lviv: "Львівська область",
                                    // Додайте інші регіони за потреби
                                }[region] || region)
                        )
                        .join(", ")}</p>
					<p><strong>Категорія:</strong> ${school.projectCategory
                        .map(
                            (cat) =>
                                ({
                                    equipment: "Обладнання",
                                    programs: "Навчальні програми",
                                    scholarships: "Стипендії",
                                    technology: "Технології",
                                    other: "Інше",
                                }[cat] || cat)
                        )
                        .join(", ")}</p>
			  `;
            schoolGrid.appendChild(card);
        });
    }

    // Фільтрація шкіл
    function filterSchools() {
        const searchInput = document.getElementById("searchInput");
        if (!searchInput) return;
        const searchValue = searchInput.value.toUpperCase();
        const categories = Array.from(document.querySelectorAll(".category-tag")).map((tag) => tag.dataset.value);

        const filteredSchools = allSchools.filter((school) => {
            const matchesSearch = school.name.toUpperCase().includes(searchValue);
            const matchesCategory =
                categories.length === 0 || categories.some((cat) => school.projectCategory.includes(cat));
            return matchesSearch && matchesCategory;
        });

        renderSchools(filteredSchools);
    }

    // Логіка для селекторів із чекбоксами
    function setupCheckboxSelector(selectBoxId, dropdownId, checkboxName) {
        const selectBox = document.getElementById(selectBoxId);
        const dropdown = document.getElementById(dropdownId);
        if (!selectBox || !dropdown) return;

        const checkboxes = document.querySelectorAll(`input[name="${checkboxName}"]`);

        function updateSelectBox() {
            const selected = Array.from(checkboxes)
                .filter((cb) => cb.checked)
                .map((cb) => cb.parentElement.textContent.trim());
            selectBox.textContent =
                selected.length > 0
                    ? selected.join(", ")
                    : selectBoxId.includes("institutionType")
                    ? "Оберіть тип"
                    : "Оберіть регіон";
            filterSchools();
        }

        selectBox.addEventListener("click", () => {
            dropdown.classList.toggle("hidden");
        });

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", updateSelectBox);
        });

        document.addEventListener("click", (e) => {
            if (!selectBox.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.add("hidden");
            }
        });

        updateSelectBox();
    }

    // Логіка для пошуку категорій
    function setupCategoryFilter() {
        const input = document.getElementById("categoryFilterInput");
        const ul = document.getElementById("categoryFilterList");
        if (!input || !ul) return;

        const customSelect = input.closest(".custom-select");
        const selectedCategories = document.getElementById("selectedCategories");

        input.addEventListener("click", (e) => {
            e.stopPropagation();
            ul.classList.toggle("hidden");
        });

        input.addEventListener("keyup", () => {
            const filter = input.value.toUpperCase();
            const li = ul.getElementsByTagName("li");
            for (let i = 0; i < li.length; i++) {
                const a = li[i].getElementsByTagName("a")[0];
                const txtValue = a.textContent || a.innerText;
                li[i].classList.toggle("hidden", txtValue.toUpperCase().indexOf(filter) === -1);
            }
        });

        ul.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                e.preventDefault();
                const value = e.target.dataset.value;
                const text = e.target.textContent;
                if (!selectedCategories.querySelector(`.category-tag[data-value="${value}"]`)) {
                    const tag = document.createElement("div");
                    tag.className = "category-tag";
                    tag.dataset.value = value;
                    tag.innerHTML = `${text} <span class="remove-tag">×</span>`;
                    selectedCategories.appendChild(tag);
                    filterSchools();
                }
            }
        });

        selectedCategories.addEventListener("click", (e) => {
            if (e.target.className === "remove-tag") {
                e.target.parentElement.remove();
                filterSchools();
            }
        });

        document.addEventListener("click", (e) => {
            if (!customSelect.contains(e.target) && !selectedCategories.contains(e.target)) {
                ul.classList.add("hidden");
            }
        });
    }

    // Ініціалізація
    setupCheckboxSelector("institutionTypeSelectBox", "institutionTypeSelectDropdown", "institutionTypeFilter");
    setupCheckboxSelector("geoFocusSelectBox", "geoFocusSelectDropdown", "geoFocusFilter");
    setupCategoryFilter();

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", filterSchools);
    }

    renderSchools(allSchools);
});
