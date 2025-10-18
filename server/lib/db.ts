import { PrismaClient } from "@prisma/client";

class Database {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  private async prismaConnect(): Promise<void> {
    await this.prisma.$connect();
  }
  private async prismaDisconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
  async prismaConfigure(successFn: () => any, errorFn: (error: any) => void) {
    try {
      await this.prismaConnect();
      return await successFn();
    } catch (error) {
      return errorFn(error);
    } finally {
      await this.prismaDisconnect();
    }
  }
}

export const db = new Database();