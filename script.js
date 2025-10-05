function verfication() {
    let firstname = document.getElementById("fname").value
    let lastname = document.getElementById("lname").value
    let subject = document.getElementById("subject").value
    if (firstname.length == 0 || !alpha(firstname)) {
        alert(" Please enter a valid first name (letters only).")
        return false
    }
    if (lastname.length == 0 || !alpha(lastname)) {
        alert(" Please enter a valid last name (letters only).")
        return false
    }
    if (subject.length < 6) {
        alert(" The subject must contain at least 6 characters.")
        return false
    }
    alert("Your message has been sent successfully !")
    return true
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