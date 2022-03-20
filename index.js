var username = document.getElementById('nam')
var password = document.getElementById('pass')
var loginContainer = document.getElementById('loginContainer')
var SignupContainer = document.getElementById('SignupContainer')
var newusername = document.getElementById('newusername')
var newpassword = document.getElementById('newpass')
var MainContainer = document.getElementById('MainContainer')
var detail = document.getElementById('details')
var addtrans = document.getElementById('addtrans')
var search = document.getElementById('search')
var transction
var users = []
var Currentuser

function addNewUSER() {

    if (!newusername.value || !newpassword.value) {
        return alert("Please enter all Fields");

    }
    var createuser = {
        name: newusername.value,
        password: newpassword.value,
        Balance: 0,
        transaction: []
    }
    users.push(createuser);
    alert("You can Login Now!")
    loginContainer.classList.remove('hide');
    SignupContainer.classList.add('hide');
    localStorage.setItem('userarray', JSON.stringify(users));

}
function Login() {
    var retrievedData = JSON.parse(localStorage.getItem("userarray"));
    let UserFind = retrievedData.find(function (user) {
        if (user.name == username.value && user.password == password.value) {
            return true;
        }
    });
    if (UserFind) {
        Currentuser = UserFind
        MainContainer.innerHTML = ""
        document.getElementById('usr').innerHTML = UserFind.name
        loginContainer.classList.add('hide');
        dashboardContainer.classList.remove('hide');

    } else {
        alert("Incorrect Details");
    }

}
function GoToSignup() {
    loginContainer.classList.add('hide');
    SignupContainer.classList.remove('hide');

}
function GoToSignin() {
    loginContainer.classList.remove('hide');
    SignupContainer.classList.add('hide');

}
function Transaction(type) {
    var addMoney = prompt("Enter Amount")
    var purpose = prompt("Purpose")
    let trans = {
        amount: addMoney,
        purpse: purpose,
        date: new Date,
        type: type
    }


    if (type == 'deposit') {
        Currentuser.Balance += +trans.amount
        document.getElementById('bal').innerHTML = Currentuser.Balance


    }

    else {
        if (Currentuser.Balance >= trans.amount) {
            Currentuser.Balance -= trans.amount
            document.getElementById('bal').innerHTML = Currentuser.Balance

        }
        else {
            return alert("insufficient amount")
        }


    }
    Currentuser.transaction.push(trans)
    display()
}
function display(sh) {
    addtrans.innerHTML = "";
    if (sh) {
        sh.forEach(function (user) {
            detail.classList.remove('hide');
            addtrans.innerHTML += `<tr class=${user.type}>
            <td>${user.date.toLocaleString()}</td>
            <td>${user.amount}</td>
            <td>${user.purpse}</td>
        </tr>`
        })
    }
    else {
        Currentuser.transaction.forEach(function (user) {
            detail.classList.remove('hide');
            addtrans.innerHTML += `<tr class=${user.type}>
        <td>${user.date.toLocaleString()}</td>
        <td>${user.amount}</td>
        <td>${user.purpse}</td>
    </tr>`
        })
    }
}

function match(tag) {
    let show = Currentuser.transaction.filter(function (trns) {
        if (trns.amount.includes(tag.value)) {
            return true
        }
    })
    display(show)
}


