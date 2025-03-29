import React, { createContext, useState, useContext, useEffect } from 'react';
import { ServiceFactory } from '@/dao/serviceFactory';
import Suggestion from '@/models/suggestion';
import Voucher from '@/models/voucher';
import NearbyLocation from '@/models/nearbyLocation';
import Message from '@/models/message';

export const AppContext = createContext<{
    suggestions: Suggestion[];
    vouchers: Voucher[];
    nearbyLocations: NearbyLocation[];
    messages: Message[];
    setMessages: (messages: Message[]) => void;
  } | null>(null);
  

import { ReactNode } from 'react';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [nearbyLocations, setNearbyLocations] = useState<NearbyLocation[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const dao = ServiceFactory.getMockDao();
        setSuggestions(dao.getSuggestions() || []);
        setVouchers(dao.getVouchers() || []);
        setNearbyLocations(dao.getNearbyLocations() || []);
        setMessages(dao.getMessages() || []);
    }, []);

    return (
        <AppContext.Provider value={{ suggestions, vouchers, nearbyLocations, messages, setMessages }}>
            {children}
        </AppContext.Provider>
    );
};

export const getAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('getAppContext must be used within a ContextProvider');
    }
    return context;
};