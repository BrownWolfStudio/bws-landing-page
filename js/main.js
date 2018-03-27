var ref;

document.onload = (function()
{
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAh-hbsD7YjHHgsv4-2BlcanQaXLa8ctUs",
        authDomain: "bws-landing-page.firebaseapp.com",
        databaseURL: "https://bws-landing-page.firebaseio.com",
        projectId: "bws-landing-page",
        storageBucket: "",
        messagingSenderId: "710945074260"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    ref = database.ref('email-ids');
})();

document.getElementById("sbmtBtn").onclick = emailSubmitted;
var checker = true;

function emailSubmitted()
{
    if (checker)
    {
        removeRow();
        checker = !checker;
    }
    var email = document.getElementById("email").value;
    if(validateEmail(email))
    {
        var data = {
            emailID: email
        }
        ref.push(data, function(error){
            if (error) someError();
            else subbed();
        });
    }
    else
    {
        if (checker) {
            removeRow();
            checker = !checker;
        }
        addRow("warning", "Email Is Not Correct!");
        checker = !checker;
    }
}

function subbed() {
    if (checker) {
        removeRow();
        checker = !checker;
    }
    addRow("info", "Thanks For Signing Up!");
    checker = !checker;
}
function someError() {
    if (checker) {
        removeRow();
        checker = !checker;
    }
    addRow("danger", "Something Is Wrong!");
    checker = !checker;
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function addRow(toastType, message) {
    var div = document.createElement('div');

    div.className = 'row-3 toastStyle';
    div.id = 'remover';

    div.innerHTML =
        '<div class="col-3 toastStyle">\
            <div class="alert alert-' + toastType + ' alert-dismissable fade show toastInnerStyle   " >\
                <span id="toastTxt">' + message + '</span>\
                <button class="close" type="button" data-dismiss="alert">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div >\
        </div >';

    document.getElementById('toast').appendChild(div);
}

function removeRow() {
    let t = document.getElementById('remover');
    t.parentNode.removeChild(t);
}