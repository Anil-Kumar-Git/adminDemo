//password regex..........
const upLowCase = /^(?=.*[a-z])(?=.*[A-Z]).{2,}$/;
const digitSoecialCase = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{2,}$/;
const minEight = /^.{8,}$/;

//email regex........
const emailReg = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z])(.[a-z]+)?$/;

//mobile number regex (india)...
const phoneIn =
  /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}$/;
const phoneReg =
  /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

const match = (a, b) => {
  return a === b ? true : false;
};

const validUpLowPwd = (pwd) => {
  return upLowCase.test(pwd) ? true : false;
};
const validDigiSpePwd = (pwd) => {
  return digitSoecialCase.test(pwd) ? true : false;
};
const validMinEightPwd = (pwd) => {
  return minEight.test(pwd) ? true : false;
};

const validPhone = (num) => {
  return phoneIn.test(num) ? true : false;
};

const validEmail = (email) => {
  return emailReg.test(email) ? true : false;
};

export {
match,
validUpLowPwd,
validDigiSpePwd,
validMinEightPwd,
validEmail,
validPhone
}