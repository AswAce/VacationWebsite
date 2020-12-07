function addObjectTemplate() {
  /*html*/
  return ` 
{{>navigation-template}}
   <section id="viewAdddestination">
   <h2>Add new destination</h2>
   <form id="register-object-template" onsubmit="addObjectController(event)">
       <label for="destination">Destination name:</label>
       <input type="text" id="destination" name="destination" placeholder="Destination name">
       <label for="city">City:</label>
       <input type="text" id="city" name="city" placeholder="City">
       <label for="duration">Duration:</label>
       <input type="number" id="duration" name="duration" placeholder="Duration">
       <label for="departureDate">Departure Date:</label>
       <input type="date" id="departureDate" name="departureDate">
       <label for="imgUrl">Image:</label>
       <input type="text" id="imgUrl" name="imgUrl" placeholder="https://">

       <input type="submit" class="create" value="Add">
   </form>
</section>
`;
}

function editObjectTemplate() {
  /*html*/
  return `
    {{>navigation-template}}
        <section id="viewEditdestination">
        <h2>Edit existing destination</h2>
        <form id="edit-object-form" onsubmit="editObjectController(event,'{{objectId}}')">
            <label for="destination">Destination name:</label>
            <input type="text" id="destination" name="destination" value="{{name}}">
            <label for="city">City:</label>
            <input type="text" id="city" name="city" value={{city}}>
            <label for="duration">Duration:</label>
            <input type="number" id="duration" name="duration" value={{duration}}>
            <label for="departureDate">Departure Date:</label>
            <input type="date" id="departureDate" name="departureDate" value={{departureDate}}>
            <label for="imgUrl">Image:</label>
            <input type="text" id="imgUrl" name="imgUrl"
                value={{url}}>

            <input type="submit" class="create" value="Edit">
        </form>
    </section> 
 `;
}

function singleObjectTemplate() {
  /*html*/
  return `
  
  <a href="/details/{{objectId}}"   onclick="navigateToNext(event)" class="added-destination">
  <img src= {{url}} alt="" class="picture-added-destination">
 
  <h3>{{city}}</h3>
 
  <span>{{name}} </span><span>{{departureDate}}</span>
</a>
        `;
}

function objectDetailsTemplate() {
  /*html*/
  return `
{{>navigation-template}}
<section id="viewdestinationDetails">
<div class="destination-area">
    <div class="destination-area-left">
        <img src={{url}}   
            alt="">
    </div>
    <div class="destination-area-right">
        <h3>{{city}}</h3>
        <div>{{name}}</div>
        <div class="data-and-time">
            {{departureDate}}
            {{#if isOwner}}
            <a href="/edit/{{objectId}}" onclick="navigateToNext(event)" class="edit-destination-detail"></a>
       {{/if}}
            </div>
        <div>
            {{duration}} days
        </div>
    </div>
</div>
</section>
`;
}


function myDestinationsTemplate(){
 /*html*/
return `
{{>navigation-template}}
<section id="viewMydestinations">
<h3>Your destinations</h3>
{{#each trips}}
{{>myDestination-template}}
{{/each}}
</section>  
`
}


function mySingleDestinationTemplate(){

    /*html*/
return `
<div class="destination-ticket">
<div class="destination-left">
    <img src={{url}}
        alt="">
</div>
<div class="destination-right">
    <div>
        <h3>{{name}}</h3><span>2020-11-15</span>
    </div>
    <div>
        {{city}}
    </div>
    <p>{{duration}} days </p>
    <a href="/delete" class="remove" onclick="deleteObjectController(event,'{{objectId}}')">REMOVE</a>
    <a href="/details/{{objectId}}"  class="details" onclick="navigateToNext(event)">Details</a>
</div>

</div>
`

    
}