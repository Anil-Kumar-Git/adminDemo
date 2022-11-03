
import SimpleReactValidator from "simple-react-validator";
import {
    validDigiSpePwd,
    validMinEightPwd,
    validUpLowPwd,
  } from "../Services/Utils/regex";

const validator = new SimpleReactValidator({
    validators: {
      minEtPassword: {
        message: "Minimum eight letter compulasary",
        rule: function (val) {
          if (!validMinEightPwd(val)) {
            return false;
          }
        },
      },
      digSpePassword: {
        message: "Atleast one special Charater and one digit number",
        rule: function (val) {
          if (!validDigiSpePwd(val)) {
            return false;
          }
        },
      },
      upLoPassword: {
        message: "Atleast one uppercase and lowercase letter",
        rule: function (val) {
          if (!validUpLowPwd(val)) {
            return false;
          }
        },
      },
      ConfirmPassword: {
        message: "The confirm password and password are not matched.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function () {
          return false
        },
      },
    },
  });

  export{
    validator
  }