import { GraphQLError } from "graphql";
import z from "zod";

export class ZodValidator<T extends z.ZodTypeAny> {
  private schema: T;

  constructor(zodSchema: T) {
    this.schema = zodSchema;
  }

  validate(data: z.infer<T>) {
    const parsedData = this.schema.safeParse(data);
    if (parsedData.error) {
      throw new GraphQLError("Validation failed", {
        extensions: {
          code: "BAD_REQUEST",
          errors: this.formatZodErrors(parsedData.error.issues),
        },
      });
    }


  }

  formatZodErrors(issues: z.ZodIssue[]): { path: string; message: string }[] {
    return issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

}
