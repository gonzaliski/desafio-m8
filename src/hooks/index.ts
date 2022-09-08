import { nearPetsState, reportedPetsState, tokenState, userDataState } from "../atoms";
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



export const useUserData = ()=>{ return useRecoilState(userDataState)}
export const useToken = ()=>{ return useRecoilState(tokenState)}
export const useNearPets = ()=>{ return useRecoilState(nearPetsState)}
export const useReportedPets = ()=>{ return useRecoilState(reportedPetsState)}