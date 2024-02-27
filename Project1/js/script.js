// JavaScript Document


//Function to add or subtract quantity on product pages
function changeQuantity(num){
	var inputQuantityElement = document.getElementById('inputQuantity');
	var currentQuantity = parseInt(inputQuantityElement.value);
	var newQuantity = currentQuantity + num;
	
	//check that number to add to cart is more than 0
	if(newQuantity > 0){
		inputQuantityElement.value = newQuantity;
	}
	
}

//Code to call changeQuantity function when + or - buttons are pressed on product pages.
document.addEventListener('DOMContentLoaded', function(){
	var subtractButton = document.querySelector('.sub-quantity');
	var addButton = document.querySelector('.add-quantity');
	
	//Add to cart button later
	//var addToCart = document.querySelector('.add-to-cart');
	
	subtractButton.addEventListener('click', function(){
		changeQuantity(-1);
	});
	
	addButton.addEventListener('click', function(){
		changeQuantity(1);
	});
	
});

//Code to handle account creation form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('createAccountForm');
	
	const username = document.getElementById('username');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
	const successMessage = document.getElementById('successMessage');
	

    form.addEventListener('submit', function (event) {				//validate input on submission
        event.preventDefault(); // Prevent default form submission
		
		var isUsernameValid = validateUsername(username),
		isEmailValid = validateEmail(email),
        isPasswordValid = validatePassword(password),
        isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
		
		if(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid){
			successMessage.style.display = 'block';
			}
		
    });

	function validateUsername(username) {
        if (username.value.length >= 4) {			//only accept usernames 4 characters or longer
            username.classList.remove('is-invalid');		//use is-valid/is-invalid classes to highlight fields are green or red respectively
            username.classList.add('is-valid');
			return true;
        } else {
            username.classList.remove('is-valid');
            username.classList.add('is-invalid');
            return false;
        }
    }
	
	function validateEmail(email) {
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.value)) {			//only accept email values(starts with alphanumeric character, has an @ symbol, and is followed by several characters containing domain)
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
			return true;
        } else {
            email.classList.remove('is-valid');
            email.classList.add('is-invalid');
            return false;
        }
    }
	
    function validatePassword(password) {			//only accept passwords 7 characters or longer and containing a number
        if (password.value.length >= 7 && /\d/.test(password.value)) {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
			return true;
        } else {
            password.classList.remove('is-valid');
            password.classList.add('is-invalid');
            return false;
        }
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (confirmPassword.value === password.value && confirmPassword.value.length >= 7 && /\d/.test(password.value)) {		//confirm user password by checking if second input is equal to first
            confirmPassword.classList.remove('is-invalid');
            confirmPassword.classList.add('is-valid');
			return true;
        } else {
            confirmPassword.classList.remove('is-valid');
            confirmPassword.classList.add('is-invalid');
            return false;
        }
    }
});

//Login check
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    //const messageDiv = document.getElementById('loginMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Display the error message
        document.getElementById('loginMessage').style.visibility = 'visible';

    });
});


//Make user's password visible if they check box
document.addEventListener('DOMContentLoaded', function() {
    const passwordCheckbox = document.getElementById('showPassword');
	const passwordValue = document.getElementById('password');
	
	passwordCheckbox.addEventListener('change', function(){
		if(this.checked){
			passwordValue.type = 'text';
		}
		
		else{
			passwordValue.type = 'password';
		}
		
	});
    
});
