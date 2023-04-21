import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    organisation: {},
};

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        storeUser(state, { payload }) {
            state.user = payload;
        },
        storeOrganization(state, { payload }) {
            state.organisation = payload;
        },
        storeProfile(state, { payload }) {
            state.profile = payload;
        },
        storeSchool(state, { payload }) {
            state.school = payload;
        },
        clearUser: () => initialState,
    },
});

export const { storeUser, storeOrganization, clearUser, storeProfile, storeSchool } =
    userSlice.actions;

export default userSlice.reducer;
