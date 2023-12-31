import {configureStore, createSlice} from "@reduxjs/toolkit";

export let postList = createSlice({
    name: 'postList',
    initialState: [],
    reducers: {
        renderPost(state, action) {
            return action.payload;
        },
        createPost(state, action) {
            state.push(action.payload);
        },
        updatePost(state, action) {
            const idx = state.findIndex(s => s.id === action.payload.id);
            state[idx] = action.payload;
        },
        deletePost(state, action) {
            const idx = state.findIndex(s => s.id === action.payload);
            if (idx !== -1) {
                state.splice(idx, 1);
            } else {
                alert('잘못된 선택입니다.')
            }
        }
    }
})

export default configureStore({
    reducer: {
        postList: postList.reducer
    }
})

export let { renderPost, createPost, updatePost, deletePost } = postList.actions;