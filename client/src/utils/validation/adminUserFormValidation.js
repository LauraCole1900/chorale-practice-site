const adminUserValidate = (user, params) => {
  let errors = {};

  // name errors
  if (!user.fullName) {
    errors.name = "Please enter the member's name."
  }
  if (!user.firstName) {
    errors.name = "Please enter the member's first name."
  }
  if (!user.lastName) {
    errors.name = "Please enter the member's last name."
  }
  if (!user.preferredName) {
    errors.name = "Please enter the name the member prefers to be called."
  }

  // birthday errors
  if (!user.birthday) {
    errors.birthday = "Please enter the member's birthday."
  } else if (!/^(0[1-9]|1[0-2])([/-])(0[1-9]|1\d|2\d|3[01])$/.test(user.birthday)) {
    errors.birthday = "There seems to be a problem with the formatting of your date. Please double-check."
  }

  // email errors
  if (!user.email1 && params) {
    errors.email1 = "Please enter the member's primary email."
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email1) && params) {
    errors.email1 = "There seems to be a problem with the formatting of your email. Please double-check."
  }
  if (user.email2 && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email2)) {
    errors.email2 = "There seems to be a problem with the formatting of your email. Please double-check."
  }

  // password errors
  if (!user.password && params) {
    errors.password = "Please enter a temporary password for the member."
  }

  // phone errors
  if (!user.phone1) {
    errors.phone1 = "Please enter the member's primary phone number."
  } else if (!/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(user.phone1)) {
    errors.phone1 = "There seems to be a problem with the formatting of your phone number. Please double-check."
  }
  if (!user.phone1Type) {
    errors.phone1Type = "Please indicate the type of phone number for the member's primary phone."
  }
  if (user.phone2 && !/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(user.phone2)) {
    errors.phone2 = "There seems to be a problem with the formatting of your phone number. Please double-check."
  }
  if (user.phone2 && !user.phone2Type) {
    errors.phone2Type = "Please indicate the type of phone number for the member's secondary phone."
  }
  if (user.phone3 && !/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(user.phone3)) {
    errors.phone3 = "There seems to be a problem with the formatting of your phone number. Please double-check."
  }
  if (user.phone3 && !user.phone3Type) {
    errors.phone3Type = "Please indicate the type of phone number for the member's third phone."
  }

  // section errors
  if (!user.section) {
    errors.section = "Please indicate in which section the member will be."
  }

  // address errors
  if (!user.streetAddress) {
    errors.streetAddress = "Please enter the member's street address."
  }
  if (!user.city) {
    errors.city = "Please enter the member's city of residence."
  }
  if (!user.state) {
    errors.state = "Please enter the member's state of residence."
  }
  if (!user.zipCode) {
    errors.zipCode = "Please enter the member's ZIP code."
  }

    return errors;
}

export default adminUserValidate;