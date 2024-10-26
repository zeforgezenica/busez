import { timeToMinutes } from "./route.progress.handler";

describe("timeToMinutes", () => {
    test("For 1:30 return 90 minutes", () => {
        const result = timeToMinutes("1:30");

        expect(result).toBe(90);
    })
});