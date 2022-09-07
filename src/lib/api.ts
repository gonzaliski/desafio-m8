const API_BASE_URL = "https://dwf-m7-petfinder-app.herokuapp.com"
import {map} from "lodash"

export async function getUser(email:string){
    const emailExist = await fetch(API_BASE_URL + "/email" +  "?email=" + email,{
      method: "get",
      headers: { "Content-Type": "application/json" },
     });
     return await emailExist.json()
 }
export async function processEmail(email:string){
     const userRes = await getUser(email)
   return userRes
 }
 export async function signUp(data){
   const createdUser = await fetch(API_BASE_URL + "/auth",{
     method:"post",
     headers:{ "Content-Type": "application/json" },
     body:JSON.stringify({
       ...data
     })
   })
   const newUser = await createdUser.json()
    //  cs.userId = newUser
   let token
   signIn(data.email,data.password).then((tk)=>{
    token = tk

    return {
     id:newUser,
     token,
           }       
  })
 }

 export async function signIn(email:string,password:string){
   const passwordVerif = await fetch(API_BASE_URL + "/auth/token",{
     method:"post",
     headers:{ "Content-Type": "application/json" },
     body:JSON.stringify({
       email,
       password
     })
   })
   const verifRes = await passwordVerif.json()
   return verifRes        
 }

 export async function updateOrCreateUser(userData){
   const cs = this.getState()
   const userExist = await getUser(cs.email)
   var res
   if(userExist){
    res = await this.updateUser(userData)
   }else{
     res = await this.signUp(userData)
   }
   return res
 }
 
 export async function updateUser(userData){
  console.log(userData);
  
   const updateUser = await fetch(API_BASE_URL + "/update-user" + "?userId=" + userData.id,{
     method:"put",
     headers:{
       "Content-Type": "application/json",
       Authorization: `bearer ${userData.token}`,
     },
     body:JSON.stringify({fullName:userData.fullName,password:userData.password})
   })
   const newData = await updateUser.json()
   console.log(newData);
   
   return {fullName:newData.full_name}
 }
 export async function reportPet(data){
   const cs = this.getState()
   const createPet = await fetch(API_BASE_URL + "/new-pet" + "?userId=" + cs.userId,{
     method:"post",
     headers:{
       "Content-Type": "application/json",
       Authorization: `bearer ${cs.token}`,
     },
     body:JSON.stringify(data)
   })
   const newPet = await createPet.json()
   return newPet
 }
 export async function updatePet(data){
   const cs = this.getState()
   const updatePet = await fetch(API_BASE_URL + "/update-pet" + "?petId=" + cs.petToEdit.id,{
     method:"put",
     headers:{
       "Content-Type": "application/json",
       Authorization: `bearer ${cs.token}`,
     },
     body:JSON.stringify(data)
   })
   const updatePetRes = await updatePet.json()
   return updatePetRes
 }
 function currentMarkerPosition(lng, lat){
   const cs = this.getState()
   cs.petToReportLat = lat
   cs.petToReportLng = lng
   console.log("lat:",cs.petToReportLat," lng:",cs.petToReportLng);
   
   
 }

 export async function getMyPets(){
   const cs = this.getState()
   const myPets = await fetch(API_BASE_URL + "/me/pets" + "?userId=" + cs.userId,
   {
     method:"get",
     headers:{
     "Content-Type": "application/json",
     Authorization: `bearer ${cs.token}`,
   }})
   let petsToJson = await myPets.json()
   
   let petsToList = this.processPets(petsToJson)
   return petsToList
 }
 export async function reportFound(petId){
   const cs = this.getState()
   const reportPetFound = await fetch(API_BASE_URL + "/pet-found" + "?petId=" + petId,{
     method:"put",
     headers:{
       "Content-Type": "application/json",
       Authorization: `bearer ${cs.token}`,
     } })
   const updatePetRes = await reportPetFound.json()
   return updatePetRes
 }
 
 export async function deletePet(petId){
   const cs = this.getState()
   let index = cs.userPets.indexOf(cs.userPets.find((pet)=>{return pet.id == petId}))
   cs.userPets.splice(index,1)
   
   const deletePet = await fetch(API_BASE_URL + "/pet" + "?petId=" + petId,{
     method:"delete",
     headers:{
       "Content-Type": "application/json",
       Authorization: `bearer ${cs.token}`,
     } })
   const deletePetRes = await deletePet.json()
   return deletePetRes
 }
 export async function nearPets(ubication){
   const getNearPets = await fetch(API_BASE_URL + "/pets-near-me" + "?lat="+ ubication.lat + "&lng=" + ubication.lng,{
     method:"get",
     headers:{
     "Content-Type": "application/json"
           }})
   const petsToJson = await getNearPets.json()
   const petsToList = processPets(petsToJson)
   return petsToList
 }
 export async function reportInfo(info,id){
   const reportPetInfo = await fetch(API_BASE_URL + "/report" + "?petId=" + id,{
     method:"post",
     headers:{
     "Content-Type": "application/json"
       },
     body:JSON.stringify(info)})
   return reportPetInfo
 }

 function processPets(dataToProcess){
    console.log(dataToProcess);
    
   let petsToList = map(dataToProcess)
   let petsProcessed = petsToList.map(pet=>{return {
     id: pet.id,
     name: pet.name,
     imageURL:pet.image_URL,
     found:pet.found,
     lat:pet.lat,
     lng:pet.lng,
     locationName:pet.zone
   }})
   return petsProcessed
 }
 
