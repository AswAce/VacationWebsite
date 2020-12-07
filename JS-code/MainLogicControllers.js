async function loginUserOnclick(e,email,password){
    e.preventDefault()
     

    let formLogin =new FormData(document.forms['login-form'])
   ///Формата от логин страницата трябва да има ИД 'login-form'
    if(email==undefined||password==undefined){
     email= formLogin.get("email")
     password= formLogin.get("password")
    }
   try{
    let user=await  loginUser(email,password);
    if (user.hasOwnProperty('errorData')){
        const error=new Error();
        Object.assign(error,user);
        throw error;
 
       
    }
  
    localStorage.setItem("email",user.email)
    localStorage.setItem("ownerId",user.ownerId)
    localStorage.setItem("user-token",user['user-token'])
    localStorage.setItem("login",'Yes')
 
  
  loadHdbTemplate(route("/home"))
   history.pushState({},"","/home")
 
}catch(err){
    console.error(err);
    // alert(err.message);
 
    let message=document.querySelector( 'body > div:nth-child(1) > div.notification.errorBox')
    message.style.display=`block`
    message.innerHTML=err.message
   
function messageTime(){
 
 message.style.display=`none`
}
message.addEventListener('click',messageTime)
setTimeout(messageTime, 3000)
   }
 
   
}

async function  registerOnclick(e){
    e.preventDefault()
     
   let formRegister =new FormData(document.forms['register-form'])
  
   if(formRegister.get("password")!==formRegister.get("rePassword")){
       alert('Possword must be the same')
    
       return
   }
    
   try{
    let newUserRegister= await registerUser(formRegister.get("email"),formRegister.get("password"))
    if (newUserRegister.hasOwnProperty('errorData')){
        const error=new Error();
        Object.assign(error,newUserRegister);
        throw error;
    }
  }
    catch(err){
      console.error(err);
      // alert(err.message);
   
      let message=document.querySelector( 'body > div:nth-child(1) > div.notification.errorBox')
      message.style.display=`block`
      message.innerHTML=err.message
     
  function messageTime(){
   
   message.style.display=`none`
  }
  message.addEventListener('click',messageTime)
  setTimeout(messageTime, 3000)
     }
 let logUser=loginUserOnclick(e,formRegister.get("email"),formRegister.get("password"))
//  loadHdbTemplate(route('/home'))
     //да се прати на логин  
}


async function addObjectController(e){
  //препащани бутон субмит от формата
    e.preventDefault()
    const token=localStorage['user-token']
    console.log(localStorage['user-token'])
	
	
   
    let formAddObject =new FormData(document.forms['register-object-template'])
	let destination=formAddObject.get('destination')
	let city=formAddObject.get('city')
	let duration=formAddObject.get('duration')
  let departureDate=formAddObject.get('departureDate')
	let imageUrl=formAddObject.get('imgUrl')
  
    //Важно  провеми параметрите във формата
    if(destination.length==0   ||
      city.length==0
      ||duration.length==0
      ||departureDate.length==0
      ||imageUrl.length==0
      ){
        alert('You have empty field')
         
        return 
      }
      if(Number(duration)<1||Number(duration)>100){
        alert('Duration must be between 1 and 100 days')
        return 
      }
      try{
        let createdObject= await addObjectToDB(token, destination,city,duration,departureDate,imageUrl)
        if (createdObject.hasOwnProperty('errorData')){
            const error=new Error();
            Object.assign(error,createdObject);
            throw error;
    
           
        }

    }catch(err){
        console.error(err);
        alert(err.message);
       }
      
       loadHdbTemplate(route("/home"))
  
}

async function getAllObjectsController(){
  const token=localStorage['user-token']
  let objects= await getAllObjectsFromDb(token);
  
 //обектите трябва да са в арейЛист ако не са използвай доланта логика да ги преобразиш
 // а от метода върни .json();
  // let movies=[]
  // Object.values(moviesz).forEach(e=>movies.push(e))  
 
    // localStorage.setItem('movies',allmovies)
     return  await(objects)
}

async function getSingleObjectByIdController(){
  const token=localStorage['user-token']
 
    let movie=await getObjectByID(token)
    return movie;
}

async function deleteObjectController(e,id){
  e.preventDefault()
 await deleteObjectFromDb(id)
 

let userId=localStorage.getItem("ownerId")
 
  let myTrips= await getLogInUserTrips(userId)
    
      loadHdbTemplate(route("/my-destinations"), myTrips);
      history.pushState({}, "", "/my-destinations");
}


async function editObjectController(e, idObject){
  e.preventDefault()
 
  let formEdit =new FormData(document.forms['edit-object-form'])
  console.log(formEdit);
  
	let destination=formEdit.get('destination')
	let city=formEdit.get('city')
	let duration=formEdit.get('duration')
  let departureDate=formEdit.get('departureDate')
	let imageUrl=formEdit.get('imgUrl')
  
    //Важно  провеми параметрите във формата
    if(destination.length==0   ||
      city.length==0
      ||duration.length==0
      ||departureDate.length==0
      ||imageUrl.length==0
      ){
        alert('You have empty field')
         
        return 
      }
      if(Number(duration)<1||Number(duration)>100){
        alert('Duration must be between 1 and 100 days')
        return 
      }
    let editedObject= await editObjectById(idObject,destination,city,duration,departureDate,imageUrl)
    // console.log(idObject);
    loadHdbTemplate(route("/details"),editedObject)
    // history.pushState({},"","/details/"+idObject)
    // navigateToNext(e)
}


async function addUserToObjectController(e,idObject){
e.preventDefault();
try{
  let updatedObject= userAddToTheObjectArray()
  //полъчения обект е с добавения юзер в себе си и тн в зависимост от логиката
  if (updatedObject.hasOwnProperty('errorData')){
      const error=new Error();
      Object.assign(error,updatedObject);
      throw error;

     
  }

}catch(err){
  console.error(err);
  alert(err.message);
 }

  console.log(route("/details"));
  loadHdbTemplate(route("/details"),updatedObject)
history.pushState({},"","/details/"+idObject)
//връща ни на страницата на обекта ако не е упдейтнато ще го пратиме на home
}

async function getLogInUserTrips(userId){
  let allDestinations = await getAllObjectsController();
      let myTrips = allDestinations.filter((d) => d.ownerId == userId);
      return myTrips
}


 
 

 