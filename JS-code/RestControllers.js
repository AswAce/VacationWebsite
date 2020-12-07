//URL LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function urlEnd(end) {
  //адни базисния път на базатаданни
  return  `https://api.backendless.com/DD8236DB-5170-08BF-FF48-CCF47FB09400/15002677-61C0-4022-964D-CEF3845F69BD/${end}`;
}

const endpoints = {
  REGISTER: "users/register",
  LOGIN: "users/login",
  GET_USER: "data/users",
  CREATE_OBJECT: "data/destinations",
  UPDATE_OBJECT: "data/destinations",
  GET_ALL_OBJECTS: "data/destinations",
  
};
//URL LOGIC END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//USER LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function registerUser(email, password) {
  //ВИЖ ДаЛи ТРЯБВАТ ДРУГИ ПОЛЕТА за регистриране на юзера
  return (
    await fetch(urlEnd(endpoints.REGISTER), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  ).json();
}
async function loginUser(email, password) {
  //ВИЖ ДаЛи ТРЯБВАТ ДРУГИ ПОЛЕТА за регистриране на юзера
  return (
    await fetch(urlEnd(endpoints.LOGIN), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: email,
        password,
      }),
    })
  ).json();
}

async function getUser(id) {
  //връща ни конкретен юзер ако искаме дап роверим как е взаимоделствал с обекта.
  let user = await fetch(urlEnd(endpoints.GET_USER + "/" + id));
  console.log(user);
  let jsonUser = await user.json();
  return jsonUser;
}
//USER LOGIC END<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



//OBJECT LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function addObjectToDB(token, name,city,duration,departureDate,url) {
  // const token=''
  //ДОбави токена от логнатия юзер  като го инициализираш тук ако не работи отвънка
  // let token = localStorage.getItem("user-token");  

  return (
    await fetch(urlEnd(endpoints.CREATE_OBJECT), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
      body: JSON.stringify({
        name,city,duration,departureDate,url
       
      }),
    })
  ).json();
}
async function editObjectById(id, name,city,duration,departureDate,url) {
  //    const token=''
 //пробвай да вкарат ид-то от вънка ако не стане  долниям етод го вика от урл адреса
  let token = localStorage.getItem("user-token");
  let ids = getId(window.location.pathname);
  return (
    await fetch(urlEnd(endpoints.UPDATE_OBJECT + "/" + ids), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
      body: JSON.stringify({
        name,
        city,
        duration,
        departureDate,
        url
      
        //тук виждаме колко юзера са взаимодей ствалия с този обект
        //може да ги броим да запазваме имената в зависимост от задачата.
      }),
    })
  ).json();
}

async function getObjectByID(idOut) {
  //пробвай да вкарат ид то от вънка ако не стане  долниям етод го вика от урл адреса
  let id = getId(window.location.pathname);
  let token = localStorage.getItem("user-token");


  let one = await fetch(urlEnd(endpoints.GET_ALL_OBJECTS + "/" + id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-token": token,
    },
  }).then((e) => e.json());

  return one;
}
async function getAllObjectsFromDb(token) {
  //ДОбави токена от логнатия юзер  като го инициализираш тук ако не работи отвънка
  // let token = localStorage.getItem("user-token");
  let all = await fetch(urlEnd(endpoints.GET_ALL_OBJECTS), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "user-token": token,
    },
  }).then((e) => e.json());
//връща арей от обектите.
return Object.keys(all).map(key=>({key,...all[key]}));
}

async function deleteObjectFromDb(id) {
  //пробвай да вкарат ид-то от вънка ако не стане  долниям етод го вика от урл адреса
  let token = localStorage.getItem("user-token");
  // let ids = getId(window.location.pathname);
  return (
    await fetch(urlEnd(endpoints.UPDATE_OBJECT + "/" + id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "user-token": token,
      },
    })
  ).json();
}

//OBJECT LOGIC END<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function getId(webPath) {
  // това е метод който дава ид то от пътя на страницата ,ако не може да го подадем отвънка
  let [hate, path, id] = webPath.split("/");
  return id;
}





 


 
