export interface ILogger {
	debug(summary: string, data?: any): Promise<void>;
	error(summary: string, data?: any): Promise<void>;
}

export function getDiscardLogger(): ILogger {
	return {
		debug: () => Promise.resolve(),
		error: () => Promise.resolve(),
	};
}
