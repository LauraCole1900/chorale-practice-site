const userValidate = (user, params) => {
  let errors = {};

  // name errors
  if (!user.fullName) {
    errors.name = "Please enter your name."
  }
  if (!user.firstName) {
    errors.name = "Please enter your first name."
  }
  if (!user.lastName) {
    errors.name = "Please enter your last name."
  }
  if (!user.preferredName) {
    errors.name = "Please enter the name you prefer to be called."
  }

  // birthday errors
  if (!user.birthday) {
    errors.birthday = "Please enter your birthday."
  } else if (!/^(0[1-9]|1[0-2])([/-])(0[1-9]|1\d|2\d|3[01])$/.test(user.birthday)) {
    errors.birthday = "There seems to be a problem with the formatting of your date. Please double-check."
  }

  // email errors
  if (!user.email1 && params) {
    errors.email1 = "Please enter your primary email."
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email1) && params) {
    errors.email1 = "There seems to be a problem with the formatting of your email. Please double-check."
  }
  if (user.email2 && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email2)) {
    errors.email2 = "There seems to be a problem with the formatting of your email. Please double-check."
  }

  // password errors
  if (!user.password && params) {
    errors.password = "Please enter a password."
  }

  // phone errors
  if (!user.phone1) {
    errors.phone1 = "Please enter your primary phone number."
  } else if (!/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(user.phone1)) {
    errors.phone1 = "There seems to be a problem with the formatting of your phone number. Please double-check."
  }
  if (!user.phone1Type) {
    errors.phone1Type = "Please indicate the type of phone number for your primary phone."
  }
  if (user.phone2 && !/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(user.phone2)) {
    errors.phone2 = "There seems to be a problem with the formatting of your phone number. Please double-check."
  }
  if (user.phone2 && !user.phone2Type) {
    errors.phone2Type = "Please indicate the type of phone number for your secondary phone."
  }
  if (user.phone3 && !/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(user.phone3)) {
    errors.phone3 = "There seems to be a problem with the formatting of your phone number. Please double-check."
  }
  if (user.phone3 && !user.phone3Type) {
    errors.phone3Type = "Please indicate the type of phone number for your third phone."
  }

  // address errors
  if (!user.streetAddress) {
    errors.streetAddress = "Please enter your street address."
  }
  if (!user.city) {
    errors.city = "Please enter your city of residence."
  }
  if (!user.state) {
    errors.state = "Please enter your state of residence."
  }
  if (!user.zipCode) {
    errors.zipCode = "Please enter your ZIP code."
  }

  return errors;
}

export default userValidate;