const { generate, validate, config } = require(`../services/auth.service`);

test('success: generate token', () => {
    const token = generate(config.client_id)
    expect(validate(token)).toBe(true)
})

test(`error: invalid client id`, () => {
    try {
        generate(`random client id`)
    } catch (error) {
        expect(error.message).toBe(`Invalid Client ID`)
    }
})

test(`error: empty client id`, () => {
    try {
        generate()
    } catch (error) {
        expect(error.message).toBe(`Invalid Client ID`)
    }
})