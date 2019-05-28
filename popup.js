document.addEventListener('DOMContentLoaded', function () {
    let buttonIn = document.querySelector('.in');
    let buttonOut = document.querySelector('.out');
    let login = document.querySelector('.login');
    let pass = document.querySelector('.password');
    chrome.storage.local.get(['logged'], function (result) {
        if (!result.logged) {
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
    });
    buttonIn.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            fetch('http://localhost:8080/api/users/auth', {
                method: 'POST',
                body: JSON.stringify({
                    login: login.value,
                    password: pass.value
                }), headers: { 'content-type': 'application/json' }
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    response.json().then(data => {
                        let date = new Date(new Date().getTime() + 60 * 100000);
                        chrome.tabs.executeScript({              
                            code: `document.cookie = 'userId=${data.userId}; path=/; expires=${date.toUTCString()}'`
                        });
                    });
                    chrome.storage.local.set({ logged: true }, function () {
                        login.style = "display: none";
                        pass.style = "display: none";
                        buttonIn.style = "display: none";
                        buttonOut.style = "";
                    });
                })
                .catch(function (error) { document.querySelector('.auth-caption').innerText = 'Неверный логин или пароль' });
        });
    }, false);
    buttonOut.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.executeScript({
                code: `document.cookie = 'userId=; path=/; expires=0'`
            });
            chrome.storage.local.set({ logged: false }, function () {
                login.style = "";
                pass.style = "";
                buttonIn.style = "";
                buttonOut.style = "display: none";
            });
        });
    }, false);
}, false);

