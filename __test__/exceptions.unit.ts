import InvalidArgumentException from "../src/exceptions/invalidArgument.exception"


describe("The default HTTPAPP excpetions", () => {
    var exception = new InvalidArgumentException();

    it("should return type INVALID_ARGUMENT_ERROR", () => {
        expect(exception.type).toBe("INVALID_ARGUMENT_ERROR")
    })

})