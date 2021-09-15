import Koa from 'koa';

import {
	HttpError,

	NotFoundError,
} from './errors';

import {
	IState,
	getDefaultState,
} from './state';

import { router } from './routes';

export function getApp(): Koa<IState> {
	const app = new Koa<IState>();

	// Fallback error handler.
	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			ctx.status = 500;
			ctx.body = {
				message: 'Internal server error.',
			};

			// TODO: Log to stderr or something.
		}
	});

	// Initialize state.
	app.use(async (ctx, next) => {
		ctx.state = getDefaultState();

		return next();
	});

	// Main error handler.
	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			if (err instanceof HttpError) {
				ctx.status = err.statusCode;
				ctx.body = {
					message: err.message,
				};
			} else {
				ctx.status = 500;
				ctx.body = {
					message: 'Internal server error.',
				};
			}

			await ctx.logger.error(err.message, {
				message: err.message,
				stack: err.stack,
			});
		}
	});

	app.use(router());

	app.use(() => {
		throw new NotFoundError();
	});

	return app;
}
