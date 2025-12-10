import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:3000");

let uid;
let pid;

describe("Tests simples de Adoption Router", () => {

    before(async () => {
        // Generar 1 usuario y 1 mascota reales en la BD
        const res = await request
            .post("/api/mocks/generateData")
            .send({ users: 1, pets: 1 });

        expect(res.status).to.equal(200);

        // Obtener usuarios reales de la BD
        const usersRes = await request.get("/api/users");
        expect(usersRes.status).to.equal(200);

        uid = usersRes.body.payload[0]._id;

        // Obtener mascotas reales de la BD
        const petsRes = await request.get("/api/pets");
        expect(petsRes.status).to.equal(200);

        pid = petsRes.body.payload[0]._id;

        console.log("✔ Usuario real:", uid);
        console.log("✔ Mascota real:", pid);
    });

    it("GET /api/adoptions debe devolver un array", async () => {
        const res = await request.get("/api/adoptions");
        expect(res.status).to.equal(200);
        expect(res.body.payload).to.be.an("array");
    });

    it("GET /api/adoptions/:aid debe devolver 400 si el ID es invalido", async () => {
        const res = await request.get("/api/adoptions/12345");
        expect(res.status).to.equal(400);
    });

    it("GET /api/adoptions/:aid debe devolver 404 si la adopcion no existe", async () => {
        const fakeId = "65aa3bbf8f5c2bd5f8a23b11";
        const res = await request.get(`/api/adoptions/${fakeId}`);
        expect(res.status).to.equal(404);
    });

    it("POST /api/adoptions/:uid/:pid debe crear una adopcion", async () => {
        const res = await request.post(`/api/adoptions/${uid}/${pid}`);

        expect(res.status).to.equal(201);
        expect(res.body.payload).to.have.property("_id");
    });

});
