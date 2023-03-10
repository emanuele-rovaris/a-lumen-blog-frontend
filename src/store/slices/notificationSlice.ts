import {INotificationState} from "@/store/models/notification.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INotification} from "@/utils";

const initialState: INotificationState = {
    open: false,
    status: null,
    message: null,
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationAction: (state, action: PayloadAction<INotification>) => {
            state.open = action.payload.open;
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
    }
});

export const {setNotificationAction} = notificationSlice.actions;
export default notificationSlice.reducer;