import { useEffect, useState } from "react";
import { fetchDepartments } from "@/services/spring-apis/public.service";
import { showError } from "@/utils/toast";
import type { DepartmentResponse } from "@/types";

export const useGetDepartments = () => {
    const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
    const [loadingDepartments, setLoadingDepartments] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                setLoadingDepartments(true);
                const data = await fetchDepartments();
                setDepartments(data);
            } catch (error) {
                console.error("Error loading departments:", error);
                setError(error)
                showError("Failed to load departments", "load-departments-error");
            } finally {
                setLoadingDepartments(false);
            }
        };
        loadDepartments();
    }, []);

    return { departments, loadingDepartments, error };
};