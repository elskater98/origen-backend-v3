const request = require('supertest');
const app = require('../app');
const { User } = require('../schemas/user')


describe('Users', function () {
    let token = "";

    beforeAll(async () => {
        const response = await request(app)
            .post("/auth")
            .expect(200)
            .send({ email: "origen@challenge.com", password: "password" });
        token = response.body.token
    });

    afterEach(async () => {
        await User.deleteOne({ "email": "admin1@gmail.com" });
    })

    it('As User I would like to authenticate.', function () {
        return request(app)
            .post("/auth")
            .expect(200)
            .send({ email: "origen@challenge.com", password: "password" })
            .then(response => {
                expect(response.statusCode).toBe(200);
            })
    });

    it('As Admin I would like to know all the users.', async (done) => {
        return request(app)
            .get("/user")
            .query({ token: token })
            .expect(200)
            .then(async (response) => {
                const num_users = await User.find({});
                expect(response.body.users.length).toBe(num_users.length);
                done();
            })
    });

    it('As User I would like to know a concrete user.', async (done) => {
        return request(app)
            .get("/user/" + "origen@challenge.com")
            .query({ token: token })
            .expect(200)
            .then(async (response) => {
                let user = response.body.user;
                expect(user.first_name).toBe("Origen");
                expect(user.last_name).toBe("Challenge v3");
                expect(user.email).toBe("origen@challenge.com");
                done();
            })
    });

    it('As User I would like to create a new user', async (done) => {
        return request(app)
            .post("/user")
            .query({ token: token })
            .expect(201)
            .send({
                "email": "invite@gmail.com",
                "first_name": "HackEPS",
                "last_name": "Invite",
                "password": "password",
                "roles": ["User"]
            }).then(async () => {
                const user = await User.findOne({ "email": "invite@gmail.com" }, { password: 0, __v: 0, createdAt: 0, _id: 0 });
                expect("invite@gmail.com").toBe(user.email);
                expect("HackEPS").toBe(user.first_name);
                expect("Invite").toBe(user.last_name);
                done();
            })
    });

    it('As User I would like to delete my account.', async (done) => {
        let email = "invite@gmail.com";

        return request(app)
            .delete("/user/" + email)
            .query({ token: token })
            .expect(200).then(async () => {
                expect(await User.findOne({ email: email })).toBeNull();
                done();
            })
    });

    it('As User I would like to edit my profile.', async (done) => {
        let email = "admin1@gmail.com";
        const user = new User({
            "email": email,
            "first_name": "Admin2",
            "last_name": "Admin2",
            "password": "password",
            "roles": ["Administrator"]
        });
        user.save();

        return request(app)
            .patch("/user/" + email)
            .query({ token: token })
            .send({
                first_name: "Juan",
                last_name: "Manolo"
            })
            .expect(200).then(async () => {
                let user = await User.findOne({ email: email });
                expect("Juan").toBe(user.first_name);
                expect("Manolo").toBe(user.last_name);
                done();
            })
    });
});
