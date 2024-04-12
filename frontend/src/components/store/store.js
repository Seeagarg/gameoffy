import { configureStore,combineReducers } from '@reduxjs/toolkit';
import gameReducer from './Slice';
import langSliceReducer from './langSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import langSlice from './langSlice';
import persistStore from "redux-persist/es/persistStore";


const persistConfig={
  key:'root',
  storage
}

const rootReducer=combineReducers({
  langSlice:langSliceReducer,
})

const persistedReducer=persistReducer(persistConfig,rootReducer)





export const store = configureStore({
  reducer: {
    langSlice:persistedReducer,
    game: gameReducer,
  },
});

export const persistor = persistStore(store);