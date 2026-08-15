import { useState, useCallback, useEffect } from "react";
import api from "../api";

export const useBlockedUsers = () => {
    const [blockedIds, setBlockedIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBlockedUsers = useCallback(async () => {
        try {
            const response = await api.get("/users/blocked");
            setBlockedIds(response.data.map((u) => u.id || u._id));
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchBlockedUsers();
    }, [fetchBlockedUsers]);

    const blockUser = async (userId) => {
        try {
            setLoading(true);
            await api.post(`/users/${userId}/blocked`);
            await fetchBlockedUsers();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const unblockUser = async (userId) => {
        try {
            setLoading(true);
            await api.delete(`/users/${userId}/blocked`);
            await fetchBlockedUsers();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return { blockedIds, loading, blockUser, unblockUser };
};