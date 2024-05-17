-- CreateTable
CREATE TABLE "Bot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "inviteLink" TEXT NOT NULL,
    "pfpLink" TEXT NOT NULL,
    "srcLink" TEXT,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bot" ADD CONSTRAINT "Bot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
