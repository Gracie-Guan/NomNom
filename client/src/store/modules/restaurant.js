import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const infoStore = createSlice({
    name: 'restaurant',
    initialState: {
        infoList: []
    },
    reducers: {
        setInfoList(state, action){
            state.infoList = action.payload
        }
    }
})
const {setInfoList} = infoStore.actions

const fetchInfoList = () => {
    return async(dispatch) => {
        try {
            const res = await axios.get('http://localhost:8888/restaurant');
            console.log('Fetched data:', res.data);  // Log fetched data
            dispatch(setInfoList(res.data));
        } catch (error) {
            console.error("Failed to fetch restaurant info:", error);
        }
    }
}

export {setInfoList, fetchInfoList}

const reducer = infoStore.reducer
export default reducer