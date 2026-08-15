import { useState, useCallback, useEffect, useMemo } from "react";
import api from "../api";

export const useBlockedUsers = () => {
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const blockedIds = useMemo(
        () => blockedUsers.map((u) => u.id || u._id),
        [blockedUsers]
    );

    const fetchBlockedUsers = useCallback(async () => {
        try {
            const response = await api.get("/users/blocked");
            setBlockedUsers(response.data);
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

    return { blockedUsers, blockedIds, loading, blockUser, unblockUser };
};