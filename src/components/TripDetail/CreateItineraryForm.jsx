import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api"

export const CreateItineraryForm = ({ onCreated }) => {
    const { id } = useParams();

    const emptyItineraryForm = {
        tripId: id,
        title: "",
        description: "",
        days: "",
    };

    const [form, setForm] = useState(emptyItineraryForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post("/itineraries", form);

            if (onCreated) {
                onCreated(response.data);
            }

            setForm(emptyItineraryForm);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label>Título</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div>
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={4}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
            >
                {loading ? "Creando..." : "Crear itinerario"}
            </button>

        </form>
    );
};