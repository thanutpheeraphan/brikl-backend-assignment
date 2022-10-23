import { gql } from 'apollo-server'


export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }
  
  type BatchPayload {
	count: Int!
  }

  type Llist {
	id: ID!
	listName: String!
	taskList: [Task!]
  }

  type ListsAndTasks {
	id: ID!
	listName: String!
	taskList: String!
	
  }

  type Task {
	id: ID!
	taskTitle: String!
	status: Boolean!
	pos: Int!
	listID: String
  }

  input CreateUserInput {
    username: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
  }

  input CreateListInput {
    listName: String!
  }
  input CreateTaskInput {
	taskTitle: String!
  }
  input UpdateTaskInput {
	title: String
	status: Boolean
  }

  input ChangePosInput {
	oldPosition: Int!
	newPosition: Int!
	
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
	allListAllTask : [Llist!]!
	tasks: [Task!]!

  }
  

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): MutationResult!

	createNewList(input: CreateListInput!): Llist! 
	createNewTask(listID:ID!, input: CreateTaskInput!): Task! 
	updateTask(id: ID! , input: UpdateTaskInput!): Task!
	moveTask(id: ID! , input: ChangePosInput!): Task

	
	
  }
`
