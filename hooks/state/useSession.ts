import { BASE_URL } from '@/lib/constant';
import { createContext, use } from 'react'
import { create } from 'zustand'
interface SessionState {
        user?: UserInfo;
        isLoading: boolean,
        isLoggedIn: boolean;
}
export interface UserInfo {
    username: string;
    userId: number;
    description: string;
    avatar: string;
    followData: {
        followers: number;
        follows: number;
        following: boolean;
        upload: boolean;
        curation: boolean;
    };
    type: string;
    admin: boolean;
    curator: boolean;
}

const defaultSession: SessionState = {
    user: undefined,
    isLoggedIn: false,
    isLoading: false,
};

interface SessionActions {
    login: (arg:{username:string, password:string}) => void;
    logout: () => void;
}

export const UserSessionContext = createContext<SessionState>(defaultSession)
export const useUserSessionStore = create<SessionActions&SessionState>(
      (set) => ({
        user: undefined,
        isLoggedIn: false,
        isLoading: false,
        login: async (arg:{username:string, password:string}) => {
            set((state:any) => (
                {
                    ...state,
                    isLoading: true,
                }
            ))
            // @ts-ignore
            const formBody = Object.keys(arg).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(arg[key])).join('&');
            const res = await fetch(`${BASE_URL}/login`, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                credentials: "include",
                method: "POST",
                body: formBody,
                redirect: "manual",
            })
            const userInfo = await getUserStateAsync()
            set((state) => (
                {
                    ...userInfo
                }
            ))
        },
        logout: async () => {
            set((state:any) => (
                {
                    ...state,
                    isLoading: true,
                }
            ))
            await fetch(`${BASE_URL}/logout`, {
                credentials: "include",
            })
            set((state) => (
                {
                    ...state,
                    user: undefined,
                    isLoggedIn: false,
                    isLoading: false,
                }
            ))
        }
      }),
)
const getUserStateAsync = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/me`, {
            credentials: "include",
        }).then((res) => res.json())
    if (res.error) {
        return {
            isLoggedIn: false,
            isLoading: false,
            user: undefined,
        }
    }
    return {
        isLoading: false,
        isLoggedIn: true,
        user: {
            username: res.name,
            userId: res.id,
            description: res.description,
            avatar: res.avatar,
            followData: {
                followers: res.followData.followers,
                follows: res.followData.follows,
                following: res.followData.following,
                upload: res.followData.upload,
                curation: res.followData.curation,
            },
            type: res.type,
            admin: res.admin,
            curator: res.curator,
        } as UserInfo,
    }
  }catch (e) {
    return {
      isLoggedIn: false,
      isLoading: false,
      user: undefined,
    }
  }
}

getUserStateAsync().then((res) => {
    useUserSessionStore.setState({
        ...res,
    })
})