import { MessageStateProps } from "../../../UserManagerSection/UserActions/UserActionTypes";
import { useUserSnackbar } from "./useUserSnackbar";

export const useSnackMessageInfo = (): [JSX.Element | null, (message: string) => void] => {
	const [snack, setSnackMessage] = useUserSnackbar();

	return [
		snack,
		(message: string): void => {
			const messageProps: MessageStateProps = {
				message,
				severity: "warning",
			};
			setSnackMessage(messageProps);
		},
	];
};
