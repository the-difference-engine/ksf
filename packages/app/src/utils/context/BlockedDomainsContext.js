import React, { createContext, useEffect, useState } from 'react';

export const BlockedDomainsContext = createContext();

export const BlockedDomainsProvider = (props) => {
    const [blockedDomains, setBlockedDomains] = useState([]);

    return(
        <BlockedDomainsContext.Provider
            value={[blockedDomains, setBlockedDomains]} >
            {props.children}
        </BlockedDomainsContext.Provider>
    )
}