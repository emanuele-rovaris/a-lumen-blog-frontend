import {configureStore} from '@reduxjs/toolkit'
import {notificationSlice} from "@/store/slices/notificationSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer,
    },
});

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;