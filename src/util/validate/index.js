let validators = {
  URL: function validateURL(url) {
    //TODO enhance regex
    let reg = new RegExp(
      "((http|https)://)?(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
    );
    return reg.test(url);
  },
};
module.exports = validators;
