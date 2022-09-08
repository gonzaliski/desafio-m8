import { getUser, signUp, updateUser } from "../lib/api";
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

export const nearPetsState = atom({
  key:'nearPetsState',
  default:[],
})

export const reportedPetsState = atom({
  key:'reportedPetsState',
  default:[],
})