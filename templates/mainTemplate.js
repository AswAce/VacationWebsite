function headerTemplate(){
   /*html*/
  return `
    <!-- Header -->
    <nav>
    <div class="left-container" onclick="navigateToNext(event)">
        <ul>
        {{#if email}}
            <li><a href="home">Home</a></li>
            <li><a href="my-destinations">Destinations</a></li>
            <li><a href="add-object">Add +</a></li>
            {{else}}
            <li><a href="home">Home</a></li>
            <li><a href="login">Login</a></li>
            <li><a href="register">Register</a></li>
            {{/if}}
        </ul>
    </div>
    {{#if email}}
    <div class="right-container">
        <span>Welcome, {{email}} |</span>
        <a href="logout" class="log-out" onclick="navigateToNext(event)">Logout</a>
    </div>
    {{/if}}
</nav>
  `
 
}

function homeTemplate(){

  /*html*/
return `
{{>navigation-template}}
<section id="viewCatalog" class="background-img">
{{#if email}}
<div class="added-destinations">
{{#each objects}}
{{>addObject-template}}

{{/each}}
</div>
{{else}}
<div class="guest">
    No destinations possible! Please sign in...
</div>
{{/if}}
</section>
`}