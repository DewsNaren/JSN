const contactForm = document.querySelector(".contact-form");

const contactInputs = contactForm.querySelectorAll("input,select");
const formSubmitBtn = contactForm.querySelector(".submit-btn");


  function validateContactForm() {
    let isValid = true;
    contactInputs.forEach((input) => {
      const value = input.value.trim().toLowerCase();
      const formGroup = input.closest(".form-container");
      const errorElement = formGroup.querySelector(".error");
      if (value === "") {
        isValid = false;
        formGroup.classList.add("error");
        errorElement.textContent = `please enter the ${input.name}`;

      }

      else if (input.name === "email") {
        if (!validateEmailField(input)) {
          isValid = false;
        }
      }

      else {
        formGroup.classList.remove("error");
        errorElement.textContent = "";
      }
    });
    return isValid;
  }

  function validateEmailField(input) {
    const value = input.value.trim();
    const formGroup = input.closest(".form-container");
    const errorElement = formGroup.querySelector(".error");

    if (value === "") {
      formGroup.classList.add("error");
      errorElement.textContent = "Please enter the email";
      return false;
    }

    if (!validateEmail(value)) {
      formGroup.classList.add("error");
      errorElement.textContent = "Please enter the valid email";
      return false;
    }

    formGroup.classList.remove("error");
    errorElement.textContent = "";
    return true;
  }


  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("valival",validateContactForm())
    if (validateContactForm()) {

      formSubmitBtn.disabled = true;
      console.log(getContactFormData());

    //   showToast("success", "Message sent Successfully");

      setTimeout(() => {
        delFormData();
        formSubmitBtn.disabled = false;
      }, 3000);

    } else {
      console.log("not validated");
    }
  });

  /*input click listeners*/
  contactInputs.forEach(inp => {
    inp.addEventListener('input', (e) => {
      const value = inp.value;
      const formGroup = inp.closest(".form-container");
      const errorElement = formGroup.querySelector(".error");
      if (value === "") {
        formGroup.classList.add("error");
        errorElement.textContent = `please enter the ${inp.name}`;
      }
      else if (inp.name === "email") {
        if (!validateEmailField(inp)) {
          isValid = false;
        }
      }
      else {
        formGroup.classList.remove("error");
        errorElement.textContent = "";
      }
    });
  });

  function getContactFormData() {
    const contactFormData = {};
    contactInputs.forEach((input) => {
      if (input.value.trim() !== "") {
        contactFormData[input.id] = input.value.trim();

      }
    });
    return contactFormData;
  }

  function delFormData() {
    contactForm.reset();
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
      );
  }

