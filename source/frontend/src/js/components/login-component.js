
function signInFunction() {

	var email = document.getElementById('username-input').value;
	var password = document.getElementById('password-input').value;

	var req = JSON.stringify({
        "email": email,
        password
    });

    console.log(email + "\n" + password);
    //return request.get(req);

	
}

function signUpFunction() {

	var email = document.getElementById('username-signup-input').value;
    var password = document.getElementById('password-signup-input').value;
    var passwordconfirm = document.getElementById('password-signup-confirm').value;

    //Check if both passwords match
    console.log(email + ' ' + password + ' ' + (password === passwordconfirm));

	var req = JSON.stringify({
	  "email": email,
	  "password": password
	});
	
}
