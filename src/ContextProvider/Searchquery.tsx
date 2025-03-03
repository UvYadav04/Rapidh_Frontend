import React, { ReactNode, useState } from 'react'
import { createContext } from 'react'
interface queryinterface {
    query: string,
    setquery: (status: string) => void;
}
const queryContext = createContext<queryinterface | undefined>(undefined)
function Searchquery({ children }: { children: ReactNode }) {
    const [query, setquery] = useState<string>("")
    return (
        <queryContext.Provider value={{ query, setquery }}>
            {children}
        </queryContext.Provider>
    )
}

export default Searchquery
