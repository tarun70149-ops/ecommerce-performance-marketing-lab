/**
 * VERIDO E-COMMERCE PERFORMANCE MARKETING LAB
 * Form Validation Layer
 */

(function () {

  "use strict";


  /* =========================================
     DATA LAYER
  ========================================= */

  window.dataLayer =
    window.dataLayer || [];


  function pushEvent(
    eventName,
    data = {}
  ) {

    window.dataLayer.push({

      event: eventName,

      ...data

    });

  }


  /* =========================================
     EMAIL VALIDATION
  ========================================= */

  function isValidEmail(
    email
  ) {

    const pattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(
      String(email).trim()
    );

  }


  /* =========================================
     PHONE VALIDATION
  ========================================= */

  function isValidPhone(
    phone
  ) {

    const cleaned =
      String(phone)
        .replace(/\D/g, "");

    return (
      cleaned.length >= 10 &&
      cleaned.length <= 15
    );

  }


  /* =========================================
     REQUIRED FIELD
  ========================================= */

  function isRequired(
    value
  ) {

    return (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    );

  }


  /* =========================================
     ERROR MESSAGE
  ========================================= */

  function showError(
    input,
    message
  ) {

    if (!input) return;


    input.classList.add(
      "validation-error"
    );


    let errorElement =
      input.parentElement
        .querySelector(
          ".field-error"
        );


    if (!errorElement) {

      errorElement =
        document.createElement(
          "small"
        );

      errorElement.className =
        "field-error";


      errorElement.style.display =
        "block";

      errorElement.style.marginTop =
        "5px";

      errorElement.style.fontSize =
        "11px";


      input.parentElement.appendChild(
        errorElement
      );

    }


    errorElement.textContent =
      message;

  }


  /* =========================================
     REMOVE ERROR
  ========================================= */

  function clearError(
    input
  ) {

    if (!input) return;


    input.classList.remove(
      "validation-error"
    );


    const errorElement =
      input.parentElement
        .querySelector(
          ".field-error"
        );


    if (errorElement) {

      errorElement.remove();

    }

  }


  /* =========================================
     VALIDATE CONTACT FORM
  ========================================= */

  function validateContactForm(
    form
  ) {

    if (!form) {
      return false;
    }


    let valid = true;


    const name =
      form.querySelector(
        "[name='name']"
      );


    const email =
      form.querySelector(
        "[name='email']"
      );


    const phone =
      form.querySelector(
        "[name='phone']"
      );


    const message =
      form.querySelector(
        "[name='message']"
      );


    /* NAME */

    if (
      name &&
      !isRequired(name.value)
    ) {

      showError(
        name,
        "Please enter your name."
      );

      valid = false;

    } else {

      clearError(name);

    }


    /* EMAIL */

    if (
      email &&
      !isValidEmail(
        email.value
      )
    ) {

      showError(
        email,
        "Please enter a valid email."
      );

      valid = false;

    } else {

      clearError(email);

    }


    /* PHONE */

    if (
      phone &&
      phone.value &&
      !isValidPhone(
        phone.value
      )
    ) {

      showError(
        phone,
        "Please enter a valid phone number."
      );

      valid = false;

    } else {

      clearError(phone);

    }


    /* MESSAGE */

    if (
      message &&
      !isRequired(
        message.value
      )
    ) {

      showError(
        message,
        "Please enter your message."
      );

      valid = false;

    } else {

      clearError(message);

    }


    return valid;

  }


  /* =========================================
     CONTACT FORM LISTENER
  ========================================= */

  document.addEventListener(
    "submit",
    function (event) {

      const form =
        event.target;


      if (
        !form.matches(
          "#contactForm"
        )
      ) {

        return;

      }


      const valid =
        validateContactForm(
          form
        );


      if (!valid) {

        event.preventDefault();


        pushEvent(
          "form_validation_error",
          {

            form_name:
              "contact_form"

          }
        );


        return;

      }


      pushEvent(
        "form_validation_success",
        {

          form_name:
            "contact_form"

        }
      );

    }
  );


  /* =========================================
     REAL-TIME ERROR CLEARING
  ========================================= */

  document.addEventListener(
    "input",
    function (event) {

      const input =
        event.target;


      if (
        input.classList.contains(
          "validation-error"
        )
      ) {

        clearError(
          input
        );

      }

    }
  );


  /* =========================================
     EXPOSE API
  ========================================= */

  window.VERIDO_VALIDATION = {

    isValidEmail:
      isValidEmail,

    isValidPhone:
      isValidPhone,

    isRequired:
      isRequired,

    validateContactForm:
      validateContactForm

  };


  /* =========================================
     DEBUG
  ========================================= */

  window.veridoValidationDebug =
    function () {

      console.log(
        "=============================="
      );

      console.log(
        "VERIDO VALIDATION DEBUG"
      );

      console.log(
        "Validation API:",
        window.VERIDO_VALIDATION
      );

      console.log(
        "=============================="
      );

    };


  console.log(
    "✅ VERIDO validation.js loaded successfully."
  );

})();
