const user = new UserForm();

// авторизация
user.loginFormCallback = data => ApiConnector.login(data,response=>{
    console.log(response);
    if(response.success===false){
        user.setLoginErrorMessage(response.error);
    }else{
        location.reload();
    }
});

// регистрация
user.registerFormCallback = data => ApiConnector.register(data,response=>{
    console.log(response);
    if(response.success===false){
        user.setLoginErrorMessage(response.error);
    }else{
        location.reload();
    }
});