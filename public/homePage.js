// Разлогин
const logoutBtn = new LogoutButton();
logoutBtn.action = () => ApiConnector.logout(response=>{
    if(response.success){
        location.reload();
    }
})

// Получение информации о пользователе
ApiConnector.current(response=>{
    if(response.success){
        ProfileWidget.showProfile(response.data);
    }
});


// Получение текущих курсов валюты
const ratesObj = new RatesBoard();
const refreshCurrencies = () => ApiConnector.getStocks(response => {
    if(response.success){
        ratesObj.clearTable();
        ratesObj.fillTable(response.data);
    }
});
refreshCurrencies();
setInterval(refreshCurrencies, 1000*60);


// Операции с деньгами
const moneyManagerObj = new MoneyManager();
// пополнение
moneyManagerObj.addMoneyCallback = (data) => ApiConnector.addMoney(data, response=>{
    let {success,error = "Пополнение совершено успешно"} = response;
    if(success){
        ProfileWidget.showProfile(response.data);
    }
    moneyManagerObj.setMessage(success,error);
});

// конвертация
moneyManagerObj.conversionMoneyCallback = data => ApiConnector.convertMoney(data,response=>{
    let {success, error="Конвертация успешно произведена"} = response;
    if(success){
        ProfileWidget.showProfile(response.data);
    }
    moneyManagerObj.setMessage(success,error);
});

// перевод
moneyManagerObj.sendMoneyCallback = data => ApiConnector.transferMoney(data,response=>{
    let {success, error="Перевод успешно произведен"} = response;
    if(success){
        ProfileWidget.showProfile(response.data);
    }
    moneyManagerObj.setMessage(success,error);
});

// Работа с избранным
const favoritesObj = new FavoritesWidget();
// получение избранного
ApiConnector.getFavorites(response=>{
    if(response.success){
        refreshFav(response.data);
    }
});

// добавление в избранное
favoritesObj.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    let {success, error="Избранный пользователь успешно добавлен"} = response;
    if(success){
        refreshFav(response.data);
    }
    favoritesObj.setMessage(success,error);
});

// удаление из избранного
favoritesObj.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    let {success, error="Избранный пользователь успешно удалён"} = response;
    if(success){
        refreshFav(response.data);
    }
    favoritesObj.setMessage(success,error);
});

// функция для обновления списка и селекта избранного
function refreshFav(data){
    favoritesObj.clearTable();
    favoritesObj.fillTable(data);
    moneyManagerObj.updateUsersList(data);
}
