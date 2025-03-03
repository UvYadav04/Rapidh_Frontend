'use client'

import { Provider } from 'react-redux'
import { store } from '../../lib/Store'
import { AppStore } from '../../lib/Store'
import { PersistGate } from 'redux-persist/integration/react' // Import PersistGate
import { persistor } from '../../lib/Store' // Import persistor

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Provider store={store}>
            <PersistGate loading={<div className="min-h-fit h-[100vh] min-w-fit w-[100vw] flex place-content-center place-items-center absolute"><span className="loader"></span></div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
