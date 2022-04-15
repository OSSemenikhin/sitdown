const validateForm = (values) => {
  const errors = {};
  errors.err = false;
  if (values.name) {
    const name = values.name.trim();
    if (name == '') errors.name = "Введите Ваше имя";
    else if (name.length < 2) errors.name = "Введите Ваше имя";
    else if (/[0-9]/.test(name)) errors.name = "Недопустимый формат";
    else errors.name = false;
  }
  else errors.name = "Введите Ваше имя";

  if (values.phone) {
    const phone = values.phone.trim();
    if (/[a-zA-zа-яА-Я]/.test(phone)) errors.phone = "Недопустимый формат";
    else if (phone.length < 6) errors.phone = "Номер слишком короткий";
    else if (phone.length > 15) errors.phone = "Номер слишком длинный";
    else errors.phone = false;
  }
  else errors.phone = "Введите Ваш номер телефона";

  if (values.email) {
    const email = values.email.trim().toLowerCase();
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (email.length < 4) errors.email = "Некорректный адрес";
    else if (!re.test(email)) errors.email = "Некорректный адрес";
    else errors.email = false;
  }
  else if (values.email == '') errors.email = "Укажите адрес";

  if (!values.check) {
    errors.checked = "Для продолжения необходимо принять условия пользовательского соглашения";
  }
  else errors.checked = false;

  if (
    errors.name ||
    errors.phone ||
    errors.email ||
    errors.checked
  ) {
    errors.err = true;
  }

  return errors;
}

const hidenErrors = (input, message, className) => {
  input.classList.remove('error');
  input.classList.remove('validate');
  message.classList.add(className);
  message.textContent = '';
}

const addErrors = (input, messageEl, message, className) => {
  input.classList.add('error');
  messageEl.classList.remove(className);
  messageEl.textContent = message;
}

const addListenersToForm = (elements) => {
  if (elements.nameInput) {
    elements.nameInput.addEventListener('input', () => {
      hidenErrors(elements.nameInput, elements.messageName, elements.errClassName);
      let value = elements.nameInput.value;
      value = value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase();
      elements.nameInput.value = value.trim();
    });

    elements.nameInput.addEventListener('blur', () => {
      const validation = validateForm({ name: elements.nameInput.value });
      if (validation.name) {
        addErrors(elements.nameInput, elements.messageName, validation.name, elements.errClassName);
      } else {
        elements.nameInput.classList.add('validate');
      }
    });
  }
  if (elements.phoneInput) {
    elements.phoneInput.addEventListener('focus', () => {
      if (elements.phoneInput.value == '') elements.phoneInput.value = "+7";
    });

    elements.phoneInput.addEventListener('input', () => {
      hidenErrors(elements.phoneInput, elements.messagePhone, elements.errClassName);
    })

    elements.phoneInput.addEventListener('blur', () => {
      const validation = validateForm({ phone: elements.phoneInput.value });
      if (validation.phone) {
        addErrors(elements.phoneInput, elements.messagePhone, validation.phone, elements.errClassName);
      } else {
        elements.phoneInput.classList.add('validate');
      }
    });
  }
  if (elements.emailInput) {
    elements.emailInput.addEventListener('input', () => {
      hidenErrors(elements.emailInput, elements.messageEmail, elements.errClassName);
    })
    elements.emailInput.addEventListener('blur', () => {
      const validation = validateForm({ email: elements.emailInput.value });
      if (validation.email) {
        addErrors(elements.emailInput, elements.messageEmail, validation.email, elements.errClassName);
      } else {
        elements.emailInput.classList.add('validate');
      }
    });
  }
  if (elements.checkInput) {
    elements.checkInput.addEventListener('click', () => {
      hidenErrors(elements.checkInput, elements.messageCheck, elements.errClassName);
    });
  }
  elements.sendForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const values = {
      name: elements.nameInput.value,
      phone: elements.phoneInput.value,
      check: elements.checkInput.checked,
    }
    if (elements.emailInput) values.email = elements.emailInput.value;

    const validate = validateForm(values);

    if (validate.err) {
      if (validate.name) {
        addErrors(elements.nameInput, elements.messageName, validate.name, elements.errClassName);
      }
      if (validate.phone) {
        addErrors(elements.phoneInput, elements.messagePhone, validate.phone, elements.errClassName);
      }
      if (validate.email) {
        addErrors(elements.emailInput, elements.messageEmail, validate.email, elements.errClassName);
      }
      if (validate.checked) {
        elements.messageCheck.classList.remove('modal-form__error--hidden');
        elements.messageCheck.textContent = validate.checked;
        addErrors(elements.checkInput, elements.messageCheck, validate.checked, elements.errClassName);
      }
    } else {
      elements.nameInput.value = '';
      elements.phoneInput.value = '';
      if (elements.emailInput) elements.phoneInput.value = '';
      elements.checkInput.checked = false;
      if (elements.submit) elements.submit();
      hidenErrors(elements.nameInput, elements.messageName, elements.errClassName);
      hidenErrors(elements.phoneInput, elements.messagePhone, elements.errClassName);
      if (elements.emailInput) hidenErrors(elements.emailInput, elements.messageEmail, elements.errClassName);
      hidenErrors(elements.checkInput, elements.messageCheck, elements.errClassName);
    }
  });
}

export { addListenersToForm }