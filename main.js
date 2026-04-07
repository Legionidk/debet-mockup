const cardPlaceholders = {
    "bank-name": "BANK OF LATVERIA",
    "payment-system": "❁",
    "card-number": "0210 8820 1150 0222",
    "card-holder": "VICTOR VON D.",
    "expires-date": "29/08",
};

const paymentSystemClasses = {
    visa: "fa-cc-visa",
    master: "fa-cc-mastercard",
    amrcnexpress: "fa-cc-amex",
    jcb: "fa-cc-jcb",
    paypal: "fa-cc-paypal",
    stripe: "fa-cc-stripe",
};

const form = document.forms[0];
let firstTableAppendCheck = true;

form.addEventListener("input", (e) => {
    // Форматирования ввода номера карты.
    if (e.target.id === "card-number-input") {
        const cardNumberMockup = document.querySelector("#card-number");
        const cleanedValue = e.target.value.replace(/\D/g, "");
        const formattedValue = cleanedValue.match(/.{1,4}/g);

        if (formattedValue) {
            e.target.value = formattedValue.slice(0, 4).join(" ");
            cardNumberMockup.textContent = e.target.value;
            return;
        }

        e.target.value = formattedValue;
        cardNumberMockup.textContent = cardPlaceholders["card-number"];
    }

    // Форматирование ввода срока действия.
    if (e.target.id === "expires-date-input") {
        const expiresDateMockup = document.querySelector("#expires-date");
        const cleanedValue = e.target.value.replace(/\D/g, "");
        const formattedValue = cleanedValue.match(/.{1,2}/g);

        if (formattedValue) {
            e.target.value = formattedValue.slice(0, 2).join("/");
            expiresDateMockup.textContent = e.target.value;
            return;
        }

        e.target.value = formattedValue;
        expiresDateMockup.textContent = cardPlaceholders["expires-date"];
    }

    // Перенос данных из radio кнопок.
    if (e.target.type === "radio") {
        const paymentSystemClass = paymentSystemClasses[e.target.id];
        const paymentSystemLogo = document.createElement("i");
        paymentSystemLogo.classList.add("fa-brands", paymentSystemClass);

        document.querySelector("#payment-system").textContent = "";
        document.querySelector("#payment-system").append(paymentSystemLogo);
        return;
    }

    // Перенос данных для всех остальных полей.
    // Если поле пустое (пользователь стер введенные данные),
    // то в мокап возвращается плейсхолдер из cardPlaceholders.
    const targetId = e.target.id.replace(/-(radio|input|select)/g, "");
    const mockupTarget = document.querySelector(`#${targetId}`);

    if (e.target.value !== "") {
        mockupTarget.textContent = e.target.value;
        return;
    }

    mockupTarget.textContent = cardPlaceholders[targetId];
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const tbody = document.querySelector("tbody");

    // Удаляем плейсхолдер строку из таблицы,
    // если она еще не удалена.
    if (firstTableAppendCheck) {
        tbody.deleteRow(0);
        firstTableAppendCheck = false;
    }

    // Вставляем новую строку и создаем th с ее порядковым номером.
    const tr = tbody.insertRow();
    const countTh = document.createElement("th");
    countTh.textContent = tbody.rows.length;
    tr.append(countTh);

    // Переносим НЕ radio Input'ы в таблицу.
    for (let i = 1; i < 5; i++) {
        const td = document.createElement("td");
        td.textContent = form[i].value;
        tr.append(td);
    }

    // Переносим radio input'ы в таблицу.
    const paymentSystem = form.querySelector("input[type=radio]:checked").id;
    const paymentSystemTd = document.createElement("td");
    paymentSystemTd.textContent = paymentSystem;
    tr.append(paymentSystemTd);

    // Чистим форму и мокап.
    form.reset();
    for (const [key, value] of Object.entries(cardPlaceholders))
        [(document.querySelector(`#${key}`).textContent = value)];
});
