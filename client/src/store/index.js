import {configureStore} from '@reduxjs/toolkit'
import infoListReducer from './modules/restaurant'

const store = configureStore({
    reducer: {
        infoList: infoListReducer
    }
})

export default store