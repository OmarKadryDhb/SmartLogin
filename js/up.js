// sign up
var signUp = document.getElementById("signUp");
var signName = document.getElementById("signName");
var signEmail = document.getElementById("signEmail");
var signPass = document.getElementById("signPass");
var inputError = document.getElementById("inputError");

var signinList;
// localStorage
if (localStorage.getItem("signinList")) {
  signinList = JSON.parse(localStorage.getItem("signinList"));
} else {
  signinList = [];
}

//signup

signUp.addEventListener("click", function () {
  if (signEmail.value == "" || signPass.value == "" || signName.value == "") {
    inputError.classList.replace("d-none", "d-block");
    document.getElementById("Success").innerHTML = "";
  } else if ( nameValidation() && emailValidation() && passValidation() && duplicated() ) {
    var data = {
      name: signName.value,
      email: signEmail.value,
      pass: signPass.value,
    };
    inputError.classList.replace("d-block", "d-none");
    document.getElementById("Success").innerHTML = "Success!";

    signinList.push(data);
    open("index.html","_self")
    localStorage.setItem("signinList", JSON.stringify(signinList));
    clear();
  }
});
//duplicated
function duplicated() {
  for (let i = 0; i < signinList.length; i++) {
    if (signEmail.value == signinList[i].email) {
      alert("duplicated Error");
      return false;
    }
  }
  return true;
}

//VALIDATION
//NAME_VALIDATION
function nameValidation() {
  var regex = /^[A-Z]?[a-z]{2,20}$/;
  var signNameError = document.getElementById("signNameError");
  if (regex.test(signName.value)) {
    signNameError.classList.replace("d-block", "d-none");
    signName.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    signName.classList.add("is-invalid");
    signNameError.classList.replace("d-none", "d-block");
    return false;
  }
}
//EMAIL_VALIDATION
function emailValidation() {
  var regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  var signEmailError = document.getElementById("signEmailError");
  if (regex.test(signEmail.value)) {
    duplicated();
    signEmailError.classList.replace("d-block", "d-none");
    signEmail.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    signEmail.classList.add("is-invalid");
    signEmailError.classList.replace("d-none", "d-block");
    return false;
  }
}
//PASS_VALIDATION
function passValidation() {
  var regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
  var signPassError = document.getElementById("signPassError");
  if (regex.test(signPass.value)) {
    signPassError.classList.replace("d-block", "d-none");
    signPass.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    signPass.classList.add("is-invalid");
    signPassError.classList.replace("d-none", "d-block");
    return false;
  }
}

//Clear
function clear() {
  signEmail.value = "";
  signPass.value = "";
  signName.value = "";
}
