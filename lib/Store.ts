import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from './redux/persistConfig';
import { combineReducers } from 'redux';
import hospitalReducer from './redux/slices/Hospitals'
import reviewReducer from './redux/slices/Reviews'
import userReducer from './redux/slices/User'
import bookingReducer from './redux/slices/Mybookings'

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    reviews: reviewReducer,
    hospitals: hospitalReducer,
    mybookings: bookingReducer
});

// Persist configuration
const persistConfig = {
    key: 'root',
    storage: storage,  // Using localStorage
    whitelist: ['user', 'reviews', 'hospitals', 'mybookings']
};



// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with serializable check disabled for async thunks
export const store = configureStore({
    reducer: persistedReducer,
    // Disable the serializability check for thunks and persist actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],  // Ignore persist actions
            },
        }),
});

// Persistor
// export const persistor = persistStore(makeStore());
export const persistor = persistStore(store);

// Infer the type of the store
export type AppStore = ReturnType<typeof store.getState>;

// Infer the `RootState` and `AppDispatch` types from the store itself
// Correctly infer RootState from the store's state
export type RootState = ReturnType<typeof store.getState>;

// Correctly infer AppDispatch from the store's dispatch
export type AppDispatch = typeof store.dispatch;

