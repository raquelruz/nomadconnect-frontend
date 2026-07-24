import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

export const useTripSearch = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [inputValue, setInputValue] = useState(searchParams.get("search") || "");
	const [inputDate, setInputDate] = useState(searchParams.get("date") || "");

	const buildUrl = (value, dateValue) => {
		const params = new URLSearchParams();
		if (value) params.append("search", value);
		if (dateValue) params.append("date", dateValue);
		return value || dateValue ? `/explore?${params.toString()}` : "/explore";
	};

	const search = (options = {}) => {
		navigate(buildUrl(inputValue, inputDate), options);
	};

	const clear = () => {
		setInputValue("");
		setInputDate("");
		navigate("/explore");
	};

	const hasFilters = Boolean(inputValue || inputDate);

	return { inputValue, setInputValue, inputDate, setInputDate, search, clear, hasFilters };
};
