document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.getElementById("auth-button");
    const authForm = document.getElementById("form-auth");
    const authFormContainer = document.querySelector(".form_auth_container");

    if (authButton && authForm && authFormContainer) {
        // Відкриття/закриття форми при кліку на кнопку
        authButton.addEventListener("click", function (event) {
            event.preventDefault();
            authForm.classList.toggle("active");
            toggleScroll();
        });

        // Закриття форми при кліку поза .form_auth__container
        document.addEventListener("click", function (event) {
            const isClickInsideContainer = authFormContainer.contains(event.target);
            const isClickOnButton = authButton.contains(event.target);

            // Якщо клік відбувся поза контейнером і не на кнопці авторизації
            if (!isClickInsideContainer && !isClickOnButton && authForm.classList.contains("active")) {
                authForm.classList.remove("active");
                toggleScroll();
            }
        });

        // Функція для перемикання прокручування
        function toggleScroll() {
            if (authForm.classList.contains("active")) {
                document.body.classList.add("no-scroll");
            } else {
                document.body.classList.remove("no-scroll");
            }
        }
    } else {
        console.error("Елемент auth-button, auth-form або form_auth__container не знайдено");
    }
});
