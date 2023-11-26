import { create } from 'zustand'

export interface IAppActions {
	changeSidebarVisible: (value: boolean) => void
}

export interface IAppState {
	isSidebarVisible: boolean
}

const initialState: IAppState = {
	isSidebarVisible: false,
}

export const useAppStore = create<IAppState & IAppActions>()((set) => ({
	...initialState,
	changeSidebarVisible: (value: boolean) => {
		set({isSidebarVisible: value})
	},
}))