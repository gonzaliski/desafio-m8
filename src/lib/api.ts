const API_BASE_URL = "https://petfinder-9v4v.onrender.com";
import { map } from "lodash";

export async function getUser(email: string) {
  const emailExist = await fetch(API_BASE_URL + "/email" + "?email=" + email, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  return await emailExist.json();
}
export async function processEmail(email: string) {
  const userRes = await getUser(email);
  return userRes;
}
export async function signUp(data) {
  const createdUser = await fetch(API_BASE_URL + "/auth", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
    }),
  });
  const newUser = await createdUser.json();

  return {
    id: newUser,
  };
}

export async function signIn(email: string, password: string) {
  const passwordVerif = await fetch(API_BASE_URL + "/auth/token", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const verifRes = await passwordVerif.json();
  return verifRes;
}

export async function updateUser(userData) {
  console.log(userData);

  const updateUser = await fetch(
    API_BASE_URL + "/update-user" + "?userId=" + userData.id,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userData.token}`,
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        password: userData.password,
      }),
    }
  );
  const newData = await updateUser.json();
  console.log(newData);

  return { fullName: newData.full_name };
}
export async function reportPet(data, token, userId) {
  const createPet = await fetch(
    API_BASE_URL + "/new-pet" + "?userId=" + userId,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const newPet = await createPet.json();
  return newPet;
}
export async function updatePet(data, token, id) {
  const updatePet = await fetch(API_BASE_URL + "/update-pet" + "?petId=" + id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const updatePetRes = await updatePet.json();
  return updatePetRes;
}

export async function getMyPets(userId: number, token: string) {
  const myPets = await fetch(API_BASE_URL + "/me/pets" + "?userId=" + userId, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
  let petsToJson = await myPets.json();

  let petsToList = processPets(petsToJson);
  return petsToList;
}
export async function reportFound(petId, token) {
  const reportPetFound = await fetch(
    API_BASE_URL + "/pet-found" + "?petId=" + petId,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }
  );
  const updatePetRes = await reportPetFound.json();
  return updatePetRes;
}

export async function deletePet(petId, token) {
  const deletePet = await fetch(API_BASE_URL + "/pet" + "?petId=" + petId, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  });
  const deletePetRes = await deletePet.json();
  return deletePetRes;
}
export async function nearPets(ubication) {
  const getNearPets = await fetch(
    API_BASE_URL +
      "/pets-near-me" +
      "?lat=" +
      ubication.lat +
      "&lng=" +
      ubication.lng,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const petsToJson = await getNearPets.json();
  const petsToList = processPets(petsToJson);
  return petsToList;
}
export async function reportInfo(info, id) {
  const reportPetInfo = await fetch(API_BASE_URL + "/report" + "?petId=" + id, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  return reportPetInfo;
}

function processPets(dataToProcess) {
  let petsToList = map(dataToProcess);
  let petsProcessed = petsToList.map((pet: any) => {
    return {
      id: pet.id,
      name: pet.name,
      imageURL: pet.image_URL,
      found: pet.found,
      lat: pet.lat,
      lng: pet.lng,
      locationName: pet.zone,
    };
  });
  return petsProcessed;
}
