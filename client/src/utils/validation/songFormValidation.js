const songValidate = (song) => {
  let errors = {};

  // title errors
  if (!song.title) {
    errors.name = "Please enter the title of this selection."
  }

  // composer errors
  if (song.composer.length === 0) {
    errors.date = "Who wrote this selection? Please enter the name(s) of the composer(s)."
  }

  return errors;
}

export default songValidate;