// src/components/ExploreHeader.jsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin } from "lucide-react";

export const ExploreHeader = ({ tripCount = 0 }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const date = searchParams.get("date") || "";

    const [inputValue, setInputValue] = useState(search);
    const [inputDate, setInputDate] = useState(date);
    const debounceTimer = useRef(null);

    const buildUrl = (value, dateValue) => {
        const params = new URLSearchParams();
        if (value) params.append("search", value);
        if (dateValue) params.append("date", dateValue);
        return value || dateValue ? `/explore?${params.toString()}` : "/explore";
    };

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            navigate(buildUrl(inputValue, inputDate), { replace: true });
        }, 500);

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [inputValue, inputDate, navigate]);

    const handleSearchClick = () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        navigate(buildUrl(inputValue, inputDate), { replace: true });
    };

    const handleClear = () => {
        setInputValue("");
        setInputDate("");
    };

    const hasFilters = inputValue || inputDate;

    return (
        <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6 md:pt-10">
            <div className="rounded-[20px] px-6 py-10 text-center sm:py-12">
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-card px-3.5 py-1.5 text-xs font-medium text-primary-500">
                    <MapPin size={13} />
                    {tripCount} viaje{tripCount === 1 ? "" : "s"} disponible{tripCount === 1 ? "" : "s"}
                </div>

                <h1 className="text-4xl font-medium tracking-tight text-text-primary sm:text-[2.75rem]">
                    Encuentra tu
                    <br />
                    próxima aventura
                </h1>
                <p className="mx-auto mt-2.5 max-w-md text-sm text-text-secondary">
                    Viajes en grupo creados por la comunidad, listos para unirte
                </p>

                <div className="mt-7 flex justify-center px-2">
                    <div className="w-full max-w-2xl rounded-3xl border border-border-light bg-bg-card p-1.5 shadow-md transition hover:border-primary-500/40 hover:shadow-lg sm:rounded-full">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <label className="flex-1 cursor-text rounded-full px-5 py-2.5 text-left transition hover:bg-bg-secondary">
                                <span className="block text-[11px] font-semibold text-text-primary">Destino</span>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(event) => setInputValue(event.target.value)}
                                    placeholder="Buscar ciudades o países"
                                    autoComplete="off"
                                    className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
                                />
                            </label>

                            <div className="hidden h-8 w-px shrink-0 bg-border sm:block" />

                            <label className="cursor-text rounded-full px-5 py-2.5 text-left transition hover:bg-bg-secondary sm:min-w-37.5">
                                <span className="block text-[11px] font-semibold text-text-primary">Fecha</span>
                                <input
                                    type="date"
                                    value={inputDate}
                                    onChange={(event) => setInputDate(event.target.value)}
                                    className="w-full cursor-pointer bg-transparent text-sm text-text-secondary outline-none focus:text-text-primary"
                                />
                            </label>

                            <div className="flex shrink-0 items-center justify-end gap-1 pr-1 pt-2 sm:pt-0">
                                {hasFilters && (
                                    <button
                                        onClick={handleClear}
                                        title="Limpiar búsqueda"
                                        aria-label="Limpiar filtros"
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition hover:bg-bg-secondary hover:text-error-500"
                                    >
                                        <X size={17} />
                                    </button>
                                )}

                                <button
                                    onClick={handleSearchClick}
                                    title="Buscar"
                                    aria-label="Buscar viajes"
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white shadow-md transition hover:bg-primary-700 active:scale-95"
                                >
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};