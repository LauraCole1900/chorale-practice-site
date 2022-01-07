const userValidate = (user) => {
  let errors = {};

  // name errors
  if (!user.fullName) {
    errors.name = "Please enter the member's name."
  }

  // date errors
  if (user.date.length === 0) {
    errors.date = "When is your event? Please enter the event date(s)."
    for (let i = 0; i < user.date.length; i++) {
      if (!/^(0[1-9]|1[0-2])([/-])(0[1-9]|1\d|2\d|3[01])([/-])(19|20)\d{2}$/.test(user.date[i])) {
        errors.date = "There seems to be a problem with the formatting of your date(s). Please double-check."
      }
    }
  }

  // time errors
  if (user.time.length === 0) {
    errors.time = "What time is your event? Please enter the event time(s)."
    for (let i = 0; i < user.time; i++) {
      if (/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(user.time[i])) {
        errors.date = "There seems to be a problem with the formatting of your date(s). Please double-check."
      }
    }
  }

  // venue errors
  if (user.venue.length === 0) {
    errors.venue = "Where is your event? Please enter the event venue(s)."
  }

  return errors;
}

export default userValidate;