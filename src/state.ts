import {
	IDriver,
	getNotImplementedDriver,
} from './drivers/types';

import {
	ILogger,
	getDiscardLogger,
} from './logger';

export interface IState {
	driver: IDriver;
	logger: ILogger;
}

export function getDefaultState(): IState {
	const driver = getNotImplementedDriver();
	const logger = getDiscardLogger();

	return {
		driver,
		logger,
	};
}
