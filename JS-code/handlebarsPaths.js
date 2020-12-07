function route(path) {
  switch (path) {
    case "/":
      return homeTemplate();
    case "/home":
      return homeTemplate();
    case "/login":
      return loginTemplate();
    case "/register":
      return registerTemplate();
    case "/add-object":
      return addObjectTemplate();
    case "/details":
      return objectDetailsTemplate();
    case "/edit":
      return editObjectTemplate();
    case "/my-destinations":
      // case "/details/my-destinations":
      return myDestinationsTemplate();
  }
}
function startLogic() {
  const menuUp = Handlebars.compile(headerTemplate());
  Handlebars.registerPartial("navigation-template", headerTemplate());
  // регистрация на паршали ако елемента е навсякъде
  const addSingleObject = Handlebars.compile(singleObjectTemplate());
  Handlebars.registerPartial("addObject-template", addSingleObject);

  const myDestinations = Handlebars.compile(mySingleDestinationTemplate());
  Handlebars.registerPartial("myDestination-template", myDestinations);

  loadHdbTemplate(route("/home"));
  // зареждане на Home page при старт
}
startLogic();

async function navigateToNext(e) {
  e.preventDefault();
   

 
  if (
    e.target.tagName != "A" &&
    e.target.type != "button" &&
    e.target.tagName != "IMG"
  ) {
    //правим проверка длаи това което цъкаме е анкър таг или бутон
    return;
  }
  let adress = e.target;

  if (e.target.tagName == "IMG") {
    adress = adress.parentNode;
  }
  
  let url = new URL(adress.href);
  
  //метод за взимаме на конкретния адрес
  let [hate, path, id] = url.pathname.split("/");

  switch (url.pathname) {
    case "/details/logout":
    case "/edit/logout":
    case "/logout":
      localStorage.clear();
      let message=document.querySelector('body > div:nth-child(1) > div.notification.infoBox')
     message.style.display=`block`
     message.innerHTML='Logout successfully'
 
function messageTime(){
  
  message.style.display=`none`
}
message.addEventListener('click',messageTime)
setTimeout(messageTime, 3000)

      history.pushState({}, "", "/home");
      loadHdbTemplate(route("/home"), "");
      break;

    case "/edit/add-object":
    case "/details/add-object":
      loadHdbTemplate(route("/add-object"), "");
      history.pushState({}, "", "/add-object");
      break;
    case "/details/home":
    case "/edit/home":
      history.pushState({}, "", "/home");
      loadHdbTemplate(route("/home"), "");
      break;

    

    case "/details/my-destinations":
    case "/edit/my-destinations":
    case "/my-destinations":
      userId = localStorage.getItem("ownerId");

      
      let myTrips= await getLogInUserTrips(userId)
      console.log(myTrips);
      loadHdbTemplate(route("/my-destinations"), myTrips);
      history.pushState({}, "", "/my-destinations");
      break;
    case "/details/" + id:
      history.pushState({}, "", url.pathname);
      let objectDetails = await getSingleObjectByIdController();
      let logInUserId=localStorage.getItem('ownerId');
      let tripCreator=objectDetails.ownerId;
 
if(logInUserId==tripCreator){
  localStorage.setItem("isOwner","yes")
}
      
      //  при натискане на бутон детайлс зареждаме обекта от конкретния адрес

      loadHdbTemplate(route("/details"), objectDetails);
      //зареди страницата за детаийлите и направи гет заявка до сървара
      break;
    case "/edit/" + id:
      history.pushState({}, "", url.pathname);
      let getObjectWithIdAdress = await getSingleObjectByIdController();
      loadHdbTemplate(route("/edit"), getObjectWithIdAdress);
      //  подаваме филма който ше променяме за да имаме неговите данни и ид

      break;

    default:
      loadHdbTemplate(route(url.pathname), "");
      history.pushState({}, "", url.pathname);
      break;
  }

  //да се прати на хоме пейджа
}
async function loadHdbTemplate(hdbTemplate, whatIsgoingToLoad) {
  let context = "";
  // hdbTemplate e адреса на който ще ни прати ханделбар
  if (whatIsgoingToLoad == undefined || whatIsgoingToLoad == null) {
    whatIsgoingToLoad = {};
    // правиме проверка защото в някой случай няма смисъл да добавяме нов обект
    //Детеле логоут и тн.
  }

  context = Object.assign(whatIsgoingToLoad, localStorage);

  let allObjects = await getAllObjectsController();
  //всеки път зареждаме всички обекти в контекстан а темплейта ако ни трябват.
  context.objects = allObjects;
  context.trips = whatIsgoingToLoad;
  console.log(context);
  const all = document.getElementById("container");
  const template = Handlebars.compile(hdbTemplate);
  all.innerHTML = template(context);
}
