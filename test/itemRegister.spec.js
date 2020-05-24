const supertest = require('supertest');
const app = require('../app');
const agent = supertest.agent(app);
const assert = require('assert');

describe('item registration', () => {
        it('login', function(done) {
            agent
            .post('/auth/login')
            .send(
                {
                    email: 'seller1',
                    password: 'seller1'
                }
            )
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, response) {
                if (err) return done(err);
                done();
            });
        });
        it('regist item', (done) => {
            agent
            .post('/item/register')
            .send(
                {
                    name : 'item3',
                    content : 'content',
                    price : 1000,
                    stock : 100,
                    tilte_img : null,
                }
            )
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, response) => {
                if(err) return done(err);
                console.log(JSON.parse(response.text));
                done();
            });
        })
});
