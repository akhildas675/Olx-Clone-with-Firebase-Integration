import { createContext, useState } from "react";

export const PostContext = createContext(null);

export const PostContextProvider = ({ children }) => {
    const [postDetails, setPostDetails] = useState(null);
    console.log('Stored in context:', postDetails); // Inspect here
    return (
        <PostContext.Provider value={{ postDetails, setPostDetails }}>
            {children}
        </PostContext.Provider>
    );
};
