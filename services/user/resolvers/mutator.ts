
import { prisma } from '@prisma/client'
import { Context } from '../../../libs/context'

export const createNewList = async (input: any, ctx: Context) => ctx.prisma.llist.create({ data: input })

export const createNewTask = async (listID: any, input: any, ctx: Context) =>
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
	})
export const updateTask = async (id: any, input: any, ctx: Context) =>
	ctx.prisma.task.update({
		where: { id },
		data: {
			taskTitle: input.title ?? undefined,
			status: input.status ?? undefined
		}
	})

export const moveTask = async (id: any, input: any, ctx: Context) => {
	if (input.oldPosition > input.newPosition) {
		await ctx.prisma.$executeRaw`UPDATE "Task" SET "pos" = "pos"+1 WHERE ("pos" >= ${input.newPosition}) AND ("pos" < ${input.oldPosition})`

	}
	else {
		await ctx.prisma.$executeRaw`UPDATE "Task" SET "pos" = "pos"-1 WHERE ("pos" <= ${input.newPosition}) AND ("pos" > ${input.oldPosition})`

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