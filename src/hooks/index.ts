import { nearPetsSelector, reportedPetsState, tokenState, userDataState, userLocationState, userPetsSelector } from "../atoms";
import {useEffect} from "react"
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"

export function processUserData(data) {
   let result:userData = {}
   if(data.full_name){
    result.fullName = data.full_name
    }
   if(data.email){
        result.email = data.email
    }
   if(data.id){
        result.id = data.id
    }
    return result
}



export const useUserData = ()=>useRecoilState(userDataState)
export const useToken = ()=>useRecoilState(tokenState)
export const useNearPets = ()=>useRecoilValue(nearPetsSelector)
export const useUserLocation = ()=>useRecoilState(userLocationState)
export const useReportedPets = ()=>useRecoilState(reportedPetsState)
export const useUserPets = ()=>useRecoilValue(userPetsSelector)