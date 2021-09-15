export interface IDriver {
	open(): Promise<void>;
	close(): Promise<void>;

	// TODO
}

export function getNotImplementedDriver(): IDriver {
	return {
		open() {
			throw new Error('Not implemented.');
		},
		close() {
			throw new Error('Not implemented.');
		},
	};
}
