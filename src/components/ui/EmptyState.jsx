import { PageStateCard } from "./PageStateCard";

export const EmptyState = ({
	emoji = "📭",
	title = "No hay contenido",
	description = "No hay información para mostrar.",
	action = null,
}) => {
	return <PageStateCard emoji={emoji} title={title} description={description} action={action} />;
};