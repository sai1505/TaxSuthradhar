import { createContext, useContext } from 'react';

// 1. Create the context
const UserChatContext = createContext(null);

// 2. Create a custom hook to make it easy for components to use the context
export function useChat() {
    return useContext(UserChatContext);
}

export default UserChatContext;