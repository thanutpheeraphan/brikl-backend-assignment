import { prismaMock } from "../../../singleton"
import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'
import { MockContext, Context, createMockContext } from '../../../libs/context'
import { mutation as mutations } from './mutation'
import { createNewList, createNewTask, updateTask, moveTask } from './mutator'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
	mockCtx = createMockContext()
	ctx = mockCtx as unknown as Context
	mockReset(prismaMock)
})

test('should create a new list', async () => {
	const temp_list = {

		"id": "0a187d91-3d1e-4a7f-880b-2045da3d9535",
		"listName": "test_list",

	}
	mockCtx.prisma.llist.create.mockResolvedValue(temp_list)

	await expect(createNewList(temp_list, ctx)).resolves.toEqual({
		"id": "0a187d91-3d1e-4a7f-880b-2045da3d9535",
		"listName": "test_list",
	})

})

test('should create a new task', async () => {
	const test_task = {

		"id": "254c508e-5980-44e6-9216-ff979eb11a3b",
		"taskTitle": "Task Title",
		"status": false,
		"pos": 0,
		"listID": "0a187d91-3d1e-4a7f-880b-2045da3d9076"

	}
	mockCtx.prisma.task.create.mockResolvedValue(test_task)

	await expect(createNewTask(test_task.listID, { "taskTitle": "Task Title" }, ctx)).resolves.toEqual(
		test_task
	)

})

test('should update a task title', async () => {
	const test_task = {

		"id": "254c508e-5980-44e6-9216-ff979eb11a3b",
		"taskTitle": "New Task Title",
		"status": false,
		"pos": 0,
		"listID": "0a187d91-3d1e-4a7f-880b-2045da3d9076"


	}
	mockCtx.prisma.task.update.mockResolvedValue(test_task)

	await expect(updateTask(test_task.id, { "title": "New Task Title" }, ctx)).resolves.toEqual(
		test_task
	)

})

test('should update a task status', async () => {
	const test_task = {

		"id": "254c508e-5980-44e6-9216-ff979eb11a3b",
		"taskTitle": "Task Title",
		"status": true,
		"pos": 0,
		"listID": "0a187d91-3d1e-4a7f-880b-2045da3d9076"


	}
	mockCtx.prisma.task.update.mockResolvedValue(test_task)

	await expect(updateTask(test_task.id, { "status": true }, ctx)).resolves.toEqual(
		test_task
	)

})

test('should move a task upwards', async () => {
	const test_task = {

		"id": "bbf476c6-9285-4528-af88-ed7cda66197c",
		"taskTitle": "Going Upwards",
		"status": false,
		"pos": 0,
		"listID": "6075dc19-596d-410f-93b9-6d0cb019597a"

	}

	mockCtx.prisma.$executeRaw.mockImplementation()
	mockCtx.prisma.task.update.mockResolvedValue(test_task)

	const input = { "oldPosition": 4, "newPosition": 0 };

	await expect(moveTask(test_task.id, input, ctx)).resolves.toEqual(
		test_task
	)

	expect(mockCtx.prisma.$executeRaw).toBeCalledWith(["UPDATE \"Task\" SET \"pos\" = \"pos\"+1 WHERE (\"pos\" >= ", ") AND (\"pos\" < ", ")"], 0, 4)

})

test('should move a task downwards', async () => {
	const test_task = {

		"id": "bbf476c6-9285-4528-af88-ed7cda66197c",
		"taskTitle": "Going Downwards",
		"status": false,
		"pos": 0,
		"listID": "6075dc19-596d-410f-93b9-6d0cb019597a"

	}

	mockCtx.prisma.$executeRaw.mockImplementation()
	mockCtx.prisma.task.update.mockResolvedValue(test_task)

	const input = { "oldPosition": 0, "newPosition": 3 };

	await expect(moveTask(test_task.id, input, ctx)).resolves.toEqual(
		test_task
	)

	expect(mockCtx.prisma.$executeRaw).toBeCalledWith(["UPDATE \"Task\" SET \"pos\" = \"pos\"-1 WHERE (\"pos\" <= ", ") AND (\"pos\" > ", ")"], 3, 0)

})
