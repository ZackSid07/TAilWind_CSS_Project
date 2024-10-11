const Emailpatternt = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const PasswordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/;



const isEmailValid=(email = "algalib()8@gmail.com"/**here this isa default parameters*/)=>{
    return Emailpatternt.test(email.toLowerCase())
    
}

const userNameValidator  = (userNmae = "Galib") =>{
    if(userNmae.length >= 5 && userNmae.length <= 20){
        return true;
    }
    else{
        return false; 
    }
}

const PasswordValidation =(userPassword)=>
{
   return PasswordPattern.test(userPassword);
   
    // if(userPassword.length < 8 && userPassword.search(a-z))
}

export{isEmailValid , userNameValidator , PasswordValidation};