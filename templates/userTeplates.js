function loginTemplate(){
  /*html*/
    return ` 
    {{>navigation-template}}
    <section id="viewLogin">
    <h2>Login to your account:</h2>
    <form id="login-form" onsubmit="loginUserOnclick(event)">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" placeholder="Enter your Email">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your Password">
        <input type="submit" class="login" value="Login">
    </form>
</section>
    `
}


function registerTemplate(){
   /*html*/
  return `  
  {{>navigation-template}}
  <h2>Create your account:</h2>
  <form id="register-form" onsubmit="registerOnclick(event)">
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" placeholder="Email">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Password">
      <label for="rePassword">Repeat Password:</label>
      <input type="password" id="rePassword" name="rePassword" placeholder="Repeat Password">
      <input type="submit" class="register" value="Register">
  </form>
</section>
  `
}