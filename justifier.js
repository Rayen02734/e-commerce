function justify() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email.length === 0) {
        alert("Veuillez saisir votre adresse email ");
        return false;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        alert("L’adresse email semble invalide  (ex: exemple@mail.com)");
        return false;
    }
    if (password.length === 0) {
        alert("Veuillez saisir votre mot de passe ");
        return false;
    }
    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères ");
        return false;
    }

    return true;
}


function script() {
    let firstname = document.getElementById("fname").value
    let lastname = document.getElementById("lname").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    if (firstname.length == 0 || !alpha(firstname)) {
        alert(" Please enter a valid first name (letters only).")
        return false
    }
    if (lastname.length == 0 || !alpha(lastname)) {
        alert(" Please enter a valid last name (letters only).")
        return false
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1 || email.length == 0) {
        alert("L’adresse email semble invalide  (ex: exemple@mail.com)");
        return false;
    }
    if (password.length === 0 || password.length < 6) {
        alert("Veuillez saisir votre mot de passe ");
        return false;
    }

    return true;
}


function alpha(ch) {
    ch = ch.toUpperCase()
    for (let i = 0; i < ch.length; i++) {
        if (ch[i] < "A" || ch[i] > "Z") {
            return false
        }
    }
    return true
}
