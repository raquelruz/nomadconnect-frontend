import { PageStateCard } from "./PageStateCard";

export const ErrorState = ({ title = "Ha ocurrido un error", message = "Ha ocurrido un error inesperado." }) => {
	return <PageStateCard emoji="⚠️" title={title} description={message} />;
};