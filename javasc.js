// Get the login form and registration form elements
var loginContainer = document.querySelector('.wrapper');
var registerContainer = document.querySelector('.wrapper2');
var registerLink = document.querySelector('.registerLink');
var registerLink2 = document.querySelector('.registerLink2');
registerLink.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default behavior of the link

  // Toggle display of the containers
  loginContainer.style.display = 'none';
  registerContainer.style.display = 'block';
})
registerLink2.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the link
  
    // Toggle display of the containers
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    
  });








