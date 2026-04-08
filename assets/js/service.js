const subWrapper=document.querySelector(".subscribe-wrapper")
const subMail=subWrapper.querySelector(".email-input");
const subBtn=subWrapper.querySelector(".submit-btn");
const errorElement=subWrapper.querySelector(".error")

subBtn.addEventListener('click',  () => {
    if (!validate()) {
        return; 
    }
    else{
         setSUccess(`Thank you for subscribing!
        We’ll reach out to you soon.`);
        subMail.value="";
        setTimeout(() => {
            errorElement.classList.remove("show", "success");
            errorElement.textContent="";
        }, 2000);
    }


})


function validate(){
  let success=true;
  const emailVal=subMail.value.trim();
  if(emailVal===""){
    setError("Please enter the email");
    success=false;
  }
  else if(!validateEmail(emailVal)){
    setError("Please enter the valid email");
    success=false;
  }  
  else{
    setSUccess(`Thank you for subscribing! 
    We'll reach out to you soon.`);
  }
  return success;  
}

const validateEmail=(email)=>{
  return String(email)
  .toLowerCase()
  .match(
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
  );
}

function setError(message){
  errorElement.innerHTML= message;
  errorElement.classList.remove("success");
  errorElement.classList.add("show");
}
function setSUccess(message){
  errorElement.innerHTML= message;
  errorElement.classList.add("show");
  errorElement.classList.add("success");
}
