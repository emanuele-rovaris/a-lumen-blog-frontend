import {IUserState} from "@/store/models/user.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IUserState = {
    id: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserAction: (state, action: PayloadAction<IUserState>) => {
            state.id = action.payload.id;
        },
    },
});

export const {setUserAction} = userSlice.actions;
export default userSlice.reducer;