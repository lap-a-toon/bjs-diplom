const userObj = new UserForm();

// авторизация
userObj.loginFormCallback = data => ApiConnector.login(data,response=>{
    if(response.success===false){
        userObj.setLoginErrorMessage(response.error);
    }else{
        location.reload();
    }
});

// регистрация
userObj.registerFormCallback = data => ApiConnector.register(data,response=>{
    if(response.success===false){
        userObj.setLoginErrorMessage(response.error);
    }else{
        location.reload();
    }
});