-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "avatarUrl" TEXT,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "characters" TEXT,
    "userId" INTEGER,
    CONSTRAINT "Room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "rotation" INTEGER,
    "gridPosition" TEXT,
    "wall" BOOLEAN,
    "walkable" BOOLEAN,
    "roomId" INTEGER NOT NULL,
    CONSTRAINT "Item_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "rotation" INTEGER,
    "price" DECIMAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "reward" DECIMAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "TaskQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "TaskQuestion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isCompleted" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    CONSTRAINT "UserTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
