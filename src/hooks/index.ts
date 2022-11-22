import {
  reportedPetsState,
  showPetOptionState,
  tokenState,
  userDataState,
  userLocationState,
  userPetsSelector,
  useShowPetsSelector,
} from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";

export const useUserData = () => useRecoilValue(userDataState);
export const useHandleUserData = () => useRecoilState(userDataState);
export const useToken = () => useRecoilValue(tokenState);
export const useHandleToken = () => useRecoilState(tokenState);
export const useUserLocation = () => useRecoilState(userLocationState);
export const useReportedPets = () => useRecoilState(reportedPetsState);
export const useUserPets = () => useRecoilValue(userPetsSelector);
export const usePets = () => useRecoilValue(useShowPetsSelector);
export const useShowOption = () => useRecoilState(showPetOptionState);

export function processUserData(data) {
  let result: userData = {};
  if (data.full_name) {
    result.fullName = data.full_name;
  }
  if (data.email) {
    result.email = data.email;
  }
  if (data.id) {
    result.id = data.id;
  }
  return result;
}
