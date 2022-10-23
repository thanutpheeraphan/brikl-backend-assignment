import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const query: Resolvers<Context>['Query'] = {
	users: async (_parent, _args, ctx) => ctx.prisma.user.findMany(),
	user: async (_parent, { id }, ctx) =>
		ctx.prisma.user.findUnique({
			where: { id },
		}),
	allListAllTask: async (_parent, _args, ctx) => ctx.prisma.llist.findMany({
		include: {
			taskList: true
		}
	}),
	tasks: async (_parent, _args, ctx) => ctx.prisma.task.findMany(),

}
