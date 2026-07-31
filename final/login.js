function togglePassword(){

let password=document.getElementById("password");

let eye=document.getElementById("eye");

if(password.type==="password"){

password.type="text";

eye.classList.remove("bi-eye-slash-fill");

eye.classList.add("bi-eye-fill");

}else{

password.type="password";

eye.classList.remove("bi-eye-fill");

eye.classList.add("bi-eye-slash-fill");

}

}