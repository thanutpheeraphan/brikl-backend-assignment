import { prisma } from '@prisma/client'
import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export type BatchPayload = {
	count: number
}

export const mutation: Resolvers<Context>['Mutation'] = {
	createUser: async (_parent, { input }, ctx) =>
		ctx.prisma.user.create({ data: input }),
	updateUser: async (_parent, { id, input }, ctx) =>
		ctx.prisma.user.update({
			where: { id },
			data: {
				username: input.username ?? undefined,
			},
		}),

	createNewList: async (_parent, { input }, ctx) => ctx.prisma.llist.create({ data: input }),
	createNewTask: async (_parent, { listID, input }, ctx) =>
		ctx.prisma.task.create({
			data: {
				taskTitle: input.taskTitle,
				pos: await ctx.prisma.task.count({ where: { listID: listID } }),

				Llist: {
					connect: { id: listID },
				}


			},
			include: {
				Llist: true,
			},
		}),
	updateTask: async (_parent, { id, input }, ctx) =>
		ctx.prisma.task.update({
			where: { id },
			data: {
				taskTitle: input.title ?? undefined,
				status: input.status ?? undefined
			}
		}),


	moveTask: async (_parent, { id, input }, ctx) => {
		if (input.oldPosition > input.newPosition) {
			const gte = await ctx.prisma.$executeRaw`UPDATE "Task" SET "pos" = "pos"+1 WHERE ("pos" >= ${input.newPosition}) AND ("pos" < ${input.oldPosition})`

		}
		else {
			const gte = await ctx.prisma.$executeRaw`UPDATE "Task" SET "pos" = "pos"-1 WHERE ("pos" <= ${input.newPosition}) AND ("pos" > ${input.oldPosition})`

		}
		const current = await ctx.prisma.task.update({
			where: {
				id: id
			},
			data: {
				pos: input.newPosition
			}
		})

		return current;

	}
}
