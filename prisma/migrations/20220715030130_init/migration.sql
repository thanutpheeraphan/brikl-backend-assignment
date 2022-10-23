-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateListTable
CREATE TABLE "Llist" ( 
    "id" TEXT NOT NULL,
    "listName" TEXT NOT NULL,


    CONSTRAINT "Llist_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Task" ( 
    "id" TEXT NOT NULL,
    "taskTitle" TEXT NOT NULL,
	"status" BOOLEAN NOT NULL,
	"pos" INTEGER NOT NULL,
	"taskID" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id"),
    FOREIGN KEY ("taskID") REFERENCES "Llist" ("id")

);