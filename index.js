let itemTitle = document.getElementById('itemTitle');
let button = document.createElement("button");
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

button.textContent = '+';
button.addEventListener('click', function () {
    let value;
    try {
        value = window.location.href.split('/')[5].split('?')[0];
    } catch (e) {

    }
    fetch(`https://marks-server.herokuapp.com/api/things/${value}`, { method: 'GET', headers: { 'set-cookie': `userId=${getCookie('userId')}; expires=0` } })
        .then(function (response) { if(response.ok) alert('Продукт добавлен'); else alert('Продукт уже добавлен')})
        .catch(function (error) { alert('Что-то пошло не так ' + error.message) });
});
itemTitle.appendChild(button);
