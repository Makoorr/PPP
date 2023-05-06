import * as express from "express"
import { Request, Response } from "express"
import { Routes } from "./routes"
import * as jwt from 'jsonwebtoken'
import { User } from "./entity/User"
import { AppDataSource } from "./data-source"
require('dotenv').config()

function createServer(){
    // create express app
    const app = express()

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    // Middleware to set Access-Control-Allow-Origin header for every request
    app.use((req: Request, res: Response, next: Function) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "access-control-allow-headers, Authorization");
        next();
    });

    interface RequestWithUser extends Request {
        headers: any 
        user?: any
    }

    // authentication middleware:
    function authentify(req: RequestWithUser, res: Response, next: Function) {
        // 1. get token from headers
        // token format: "Bearer <token>"
        const authorization = req.headers['authorization']

        if (!authorization) {
            return res.status(401).send('Unauthorized')
        }

        if (authorization.split(' ').length !== 2) {
            return res.status(401).send('Unauthorized')
        }

        if (authorization.split(' ')[0] !== 'Bearer') {
            return res.status(401).send('Unauthorized')
        }

        const token = authorization.split(' ')[1]

        try {
            // 2. validate token
            const secret = process.env.JWT_SECRET || 'secret'
            const payload = jwt.verify(token, secret)

            // 3. if valid, continue + set req.user
            req.user = payload
            next()
        } catch (e) {
            console.log(e);
            return res.status(401).send('Unauthorized')
        }
    }

    app.post('/auth', async (req, res) => {

        const { login, password } = req.body

        const user = await AppDataSource.manager.findOne(User, {
            where: { login },
            select: ['id', 'login', 'name', 'password', 'projects']
        });

        if (!user) {
            return res.status(401).send('User not Found.')
        }

        if (login === user.login  && password === user.password) {
            // Generate token payload
            const payload = {
                id: user.id,
                login: user.login,
                name: user.name,
            };

            const secret = process.env.JWT_SECRET || 'secret'

            // 2. generate token
            const token = jwt.sign(payload, secret, {
                // expriation
                expiresIn: '10h'
            })

            // 3. send token
            return res.send({ token })
        }

        else {
            return res.status(401).send('Unauthorized')
        }
    })

    app.post("/auth/register", async (req, res) => {
        const { login, password, name } = req.body;

        const user = await AppDataSource.manager.findOne(User, {
            where: { login },
        });

        if (user) {
            return res.status(401).send("User already exists.");
        }

        const newUser = new User();
        newUser.login = login;
        newUser.password = password;
        newUser.name = name;

        await AppDataSource.manager.save(newUser);

        return res.send({ message: "User created." });
    });

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, authentify, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    return app;
}

export default createServer;