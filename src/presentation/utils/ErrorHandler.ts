export class ErrorHandler {
    static getStatusCode(error: unknown): number {
        if (error instanceof Error && 'statusCode' in error) {
            const customError = error as { statusCode: number };
            return customError.statusCode;
        }
        return 500;
    }

    static getMessage(error: unknown): string {
        return error instanceof Error ? error.message : "Internal server error";
    }
}