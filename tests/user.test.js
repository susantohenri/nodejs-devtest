const { create, retrieve, remove } = require(`../services/user.service`)

test(`success: create user`, async () => {
    const user = {
        name: `some name`,
        username: `some username`
    }
    const id = await create(user.name, user.username)
    const retrieved = await retrieve(id)  

    expect(retrieved.name).toBe(user.name)
    expect(retrieved.username).toBe(user.username)

    remove(id)
})