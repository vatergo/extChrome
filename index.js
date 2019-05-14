let itemTitle = document.getElementById('itemTitle');
let button = document.createElement("button");
button.textContent = '+';
button.addEventListener('click', function () {
    alert('click');
    let value;
    try {
        value = window.location.href.split('/')[5].split('?')[0];
    } catch (e) {

    }
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Cookie', `userName=${getCookie()}`);
    alert(value);
    fetch(`https://localhost:5001/api/things/${value}`, {
        method: 'GET',
        headers,
    })
        .then(function (response) { if (response.status !== 201) throw new Error(response.status); alert('Продукт добавлен'); })
        .catch(function (error) { alert('Что-то пошло не так ' + error.message) });
});
itemTitle.appendChild(button);

function getCookie() {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + 'userName'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    if (matches) {
        return decodeURIComponent(matches[1]);
    }
    return undefined;
}