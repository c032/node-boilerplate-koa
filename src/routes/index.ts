import Koa from 'koa';

import { BadRequestError } from '../errors';
import { IState } from '../state';

interface IHeadTail {
	head: string;
	tail: string;
}

function splitHeadTail(path: string): IHeadTail {
	let parts = path.split('/');
	if (parts.length > 0 && parts[0] === '') {
		parts = parts.slice(1);
	}

	let head: string = '';
	let tail: string = '';

	if (parts.length > 0) {
		head = parts[0] || '';
		tail = parts.slice(1).join('/');
	}

	return {
		head,
		tail,
	};
}

function getRequestPathHeadTail(ctx: Koa.Context): IHeadTail {
	const { request } = ctx;
	const { path } = request;

	return splitHeadTail(path);
}

function parseUserId(rawUserId: string): number|null {
	const userId = parseInt(rawUserId, 10);
	if (userId.toString() !== rawUserId) {
		return null;
	}

	return userId;
}

function handleUsers(path: string): Koa.Middleware<IState> {
	return async (ctx: Koa.ParameterizedContext<IState>, next) => {
		const {
			head,
			tail,
		} = splitHeadTail(path);

		const method = ctx.request.method.toLowerCase();
		if (head === '') {
			switch (method) {
			case 'get':
				// TODO: Get all users.
				return next();
			case 'post':
				// TODO: Create user.
				return next();
			default:
				return next();
			}
		} else {
			const userId = parseUserId(tail);
			if (userId === null) {
				throw new BadRequestError('Invalid user ID.');
			}

			switch (method) {
			case 'get':
				// TODO: Get specific user.
				return next();
			case 'put':
				// TODO: Replace specific user.
				return next();
			case 'patch':
				// TODO: Update specific user.
				return next();
			case 'delete':
				// TODO: Delete specific user.
				return next();
			default:
				return next();
			}
		}
	};
}

export function router(): Koa.Middleware<IState> {
	return async (ctx, next) => {
		const {
			head,
			tail,
		} = getRequestPathHeadTail(ctx);

		switch (head) {
		case 'users':
			return handleUsers(tail)(ctx, next);
		default:
			return next();
		}
	};
}
