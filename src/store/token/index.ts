import axios from 'axios';
import create from 'zustand';

export interface AccessTokenStore {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  killAccessToken: () => void;
}

export const useAccessToken = create<AccessTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (accessToken: string) => {
    set(() => {
      localStorage.setItem("access_token", accessToken);
      axios.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` };
      return { accessToken: accessToken }
    })
  },
  killAccessToken: () => {
    set(() => {
      localStorage.removeItem("access_token");
      delete axios.defaults.headers.common['Authorization']
      return { accessToken: "" };
    })
  },
})
);
