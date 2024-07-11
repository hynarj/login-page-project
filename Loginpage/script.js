function fun(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    let valid = true;

    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('Message').textContent = '';
    let eref = document.getElementById('emailError');

    /*Validate email*/
    if (email !== '') {
        if (/^[a-z0-9]+[.]?[a-z0-9]+@[a-z]+(\.com|\.in)$/i.test(email)) {
            let res = localStorage.getItem(email);
            if (res !== null) {
                eref.innerHTML = 'Email ID already exists.';
                document.getElementById('emailError').style.display = 'block';
                valid = false;
            }
        } else {
            eref.innerHTML = 'Invalid email format.';
            document.getElementById('emailError').style.display = 'block';
            valid = false;
        }
    } else {
        eref.innerHTML = 'Email should not be empty';
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    }

    // Validate password
    let pref = document.getElementById('passwordError');
    if (password.length >= 6 && password !== '') {
        if (/[A-Z]/.test(password)) {
            if (/[a-z]/.test(password)) {
                if (/[0-9]/.test(password)) {
                    if (/[@#$^&*]/.test(password)) {
                        if (/\s/.test(password)) {
                            pref.innerHTML = 'Password should not contain spaces.';
                            document.getElementById('passwordError').style.display = 'block';
                            valid = false;
                        }
                    } else {
                        pref.innerHTML = 'Password should contain at least one special character (@#$^&*).';
                        document.getElementById('passwordError').style.display = 'block';
                        valid = false;
                    }
                } else {
                    pref.innerHTML = 'Password should contain at least one digit.';
                    document.getElementById('passwordError').style.display = 'block';
                    valid = false;
                }
            } else {
                pref.innerHTML = 'Password should contain at least one lowercase letter.';
                document.getElementById('passwordError').style.display = 'block';
                valid = false;
            }
        } else {
            pref.innerHTML = 'Password should contain at least one uppercase letter.';
            document.getElementById('passwordError').style.display = 'block';
            valid = false;
        }
    } else {
        pref.innerHTML = 'Password should not be empty or at least 6 characters long.';
        document.getElementById('passwordError').style.display = 'block';
        valid = false;
    }

    if (valid) {
        // Store email and password in local storage
        localStorage.setItem(email, password);
        document.getElementById('Message').textContent = 'Form submitted successfully!';

        // Send a POST request to the API
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('Message').textContent = 'Logged in successfully!';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('Message').textContent = 'Error occurred during login.';
        });
    } else {
        document.getElementById('Message').textContent = 'Please fix the errors above.';
    }
}
// Show and hide password
function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
