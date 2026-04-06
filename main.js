// data
const paymentProviderStyles = {
    Visa: "fa-brands fa-cc-visa",
    Mastercard: "fa-brands fa-cc-mastercard",
};

const defaultValues = {
    "#bank-name": "BANK OF MICHAELAND",
    "#payment-provider": "❁",
    "#card-number": "0210 8820 1150 0222",
    "#card-holder-name": "VICTOR VON D.",
    "#date": "01/26",
};

// fill card data
document.addEventListener("input", (e) => {
    if (e.target.type === "radio") {
        document.querySelector("#date").textContent = e.target.id;
        return;
    }

    const targetId = `#${e.target.id.slice(0, -6)}`;

    // if input is empty return placeholder value to the card
    if (e.target.value === "") {
        document.querySelector(targetId).textContent = defaultValues[targetId];
        return;
    }

    // processing logos of payment providers
    if (targetId === "#payment-provider") {
        const target = document.querySelector("#payment-provider");
        const icon = document.createElement("i");

        icon.classList = paymentProviderStyles[e.target.value];
        target.textContent = "";
        target.append(icon);

        return;
    }

    document.querySelector(targetId).textContent = e.target.value;
});

// process buttons
document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        e.preventDefault();

        for (const [key, value] of Object.entries(defaultValues)) {
            document.querySelector(key).textContent = value;
        }

        if (e.target.id === "send-button") {
            const tr = document.createElement("tr");
            const date = document.querySelector(
                "input[name='date-radio']:checked",
            ).id;

            for (const key of Object.keys(defaultValues)) {
                const td = document.createElement("td");

                td.textContent =
                    key === "#date"
                        ? date
                        : document.querySelector(`${key}-input`).value;
                tr.append(td);
            }

            document.querySelector("form").reset();
            document.querySelector("tbody").append(tr);
        }
    }
});

// formatting card number input
document.querySelector("#card-number-input").addEventListener("input", (e) => {
    const cleanedValue = e.target.value.replace(/\D/g, "");
    const formattedValue = cleanedValue.match(/.{1,4}/g);

    if (formattedValue) {
        e.target.value = formattedValue.slice(0, 4).join(" ");
        return;
    }

    e.target.value = formattedValue;
});
