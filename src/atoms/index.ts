import { getMyPets,nearPets} from "../lib/api";
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

export const showPetOptionState = atom({
  key:"showPetOptionState",
  default:""
})

export const useShowPetsSelector = selector({
  key:'useShowPetsSelector',
  get:async({get})=>{
    const option = get(showPetOptionState)
    if(option == "user"){
      const userData = get(userDataState)
      const token = get(tokenState)
      const res = await getMyPets(userData.id,token)
      return res
    }else if(option == "near"){
      const currentLocation = get(userLocationState)
     if(currentLocation.lng && currentLocation.lat){
      const res = await nearPets(currentLocation)
      return res
    }
    }
  }
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

