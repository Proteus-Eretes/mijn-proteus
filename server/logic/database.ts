import { PrismaClient } from "@prisma/client";

export class Database {
  private static prisma: PrismaClient;

  /**
   * Get an instance of the prisma client.
   * The client is cached to improve performance.
   * @returns A prisma client.
   */
  public static get(): PrismaClient {
    if (!Database.prisma) {
      // Client doesn't exist yet, so we create one transparently.
      Database.prisma = new PrismaClient();
    }

    return Database.prisma;
  }
}
