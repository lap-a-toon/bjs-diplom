// Разлогин
const logoutBtn = new LogoutButton();
logoutBtn.action = () => ApiConnector.logout(response=>{
    console.log('logout')
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
const rates = new RatesBoard();
setInterval( ApiConnector.getStocks(response => {
    if(response.success){
        rates.clearTable();
        rates.fillTable(response.data);
    }
}), 1000*60);

// Операции с деньгами
const MM = new MoneyManager();
// пополнение
MM.addMoneyCallback = (data) => ApiConnector.addMoney(data, response=>{
    let {success,error = "Пополнение совершено успешно"} = response;
    if(success){
        ProfileWidget.showProfile(response.data);
    }
    MM.setMessage(success,error);
});

// конвертация
MM.conversionMoneyCallback = data => ApiConnector.convertMoney(data,response=>{
    let {success, error="Конвертация успешно произведена"} = response;
    if(success){
        ProfileWidget.showProfile(response.data);
    }
    MM.setMessage(success,error);
});

// перевод
MM.sendMoneyCallback = data => ApiConnector.transferMoney(data,response=>{
    let {success, error="Перевод успешно произведен"} = response;
    if(success){
        ProfileWidget.showProfile(response.data);
    }
    MM.setMessage(success,error);
});

// Работа с избранным
const fav = new FavoritesWidget();
// получение избранного
ApiConnector.getFavorites(response=>{
    if(response.success){
        refreshFav(response.data);
    }
});

// добавление в избранное
fav.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    let {success, error="Избранный пользователь успешно добавлен"} = response;
    if(success){
        refreshFav(response.data);
    }
    fav.setMessage(success,error);
});

// удаление из избранного
fav.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    let {success, error="Избранный пользователь успешно удалён"} = response;
    if(success){
        refreshFav(response.data);
    }
    fav.setMessage(success,error);
});

// функция для обновления списка и селекта избранного
function refreshFav(data){
    fav.clearTable();
    fav.fillTable(data);
    MM.updateUsersList(data);
}
