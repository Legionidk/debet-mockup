const form = document.forms[0];
console.log(form);

form.addEventListener("input", (e) => {
    // Форматирование ввода номера карты
    if (e.target.id === "card-number-input") {
        const cleanedValue = e.target.value.replace(/\D/g, "");
        const formattedValue = cleanedValue.match(/.{1,4}/g);

        if (formattedValue) {
            e.target.value = formattedValue.slice(0, 4).join(" ");
            return;
        }

        e.target.value = formattedValue;
    }

    // Форматирование ввода срока действия
    if (e.target.id === "expires-date-input") {
        const cleanedValue = e.target.value.replace(/\D/g, "");
        const formattedValue = cleanedValue.match(/.{1,2}/g);

        if (formattedValue) {
            e.target.value = formattedValue.slice(0, 2).join("/");
            return;
        }

        e.target.value = formattedValue;
    }
});

form.addEventListener("submit", (e) => {});
