import { getMyPets, getUser, nearPets, signUp, updateUser } from "../lib/api";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();


export const userDataState = atom({
    key: 'userDataState', // unique ID (with respect to other atoms/selectors)
    default: {} as userData, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
  });


export const tokenState = atom({
    key: 'tokenState', // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
  });

export const userLocationState = atom({
  key:'locationState',
  default:{} as location,
})

export const reportedPetsState = atom({
  key:'reportedPetsState',
  default:[],
})

export const userPetsSelector = selector({
  key:'userPetsSelector',
  get:async({get})=>{
    const userData = get(userDataState)
    const token = get(tokenState)
    const res = await getMyPets(userData.id,token)
    return res
  }
})

export const nearPetsSelector = selector({
  key:"nearPetsSelector",
  get:async({get})=>{
    const currentLocation = get(userLocationState)
    if(currentLocation.lng && currentLocation.lat){
      const res = await nearPets(currentLocation)
      return res
    }
  }
})