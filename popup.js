document.addEventListener('DOMContentLoaded', function () {
    let buttonIn = document.querySelector('.in');
    let buttonOut = document.querySelector('.out');
    let login = document.querySelector('.login');
    let pass = document.querySelector('.password');
    if (localStorage['loged']) {
        login.style = "";
        pass.style = "";
        buttonIn.style = "";
        buttonOut.style = "display: none";
    } else {
        login.style = "display: none";
        pass.style = "display: none";
        buttonIn.style = "display: none";
        buttonOut.style = "";
    }
    buttonIn.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            fetch('https://localhost:5001/api/user/Auth', {
                method: 'POST',
                body: JSON.stringify({
                    Login: login.value,
                    Password: pass.value
                }), headers: { 'content-type': 'application/json' }
            })
                .then(function (response) {
                    if (response.status !== 201)
                        throw new Error(response.status);
                    chrome.tabs.executeScript({
                        code: `document.cookie = 'userName=${login.value}'`
                    });
                    login.style = "display: none";
                    pass.style = "display: none";
                    buttonIn.style = "display: none";
                    buttonOut.style = "";
                    localStorage['loged'] = true;
                })
                .catch(function (error) { alert('Неверный логин или пароль ' + error.message) });
        });
    }, false);
    buttonOut.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.executeScript({
                code: `document.cookie = 'userName='`
            });
            login.style = "";
            pass.style = "";
            buttonIn.style = "";
            buttonOut.style = "display: none";
            localStorage['loged'] = false;
        });
    }, false);
}, false);

