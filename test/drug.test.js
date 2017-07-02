
var request = require('supertest');
var should = require('should');
var mocha = require('mocha');
var app = require('../app.js');

const agent = request.agent(app);

var drug =
    {
        dname : "Afrin",
        dcat : "Narcotics",
        dtype : "Aop",
        dprice : "100",
        dreorder : "100",
        ddanger : "50",
        dremark : "bgyfege",
        requests : [],
        mails:[],
        batches:[],

    }






    describe("SAMPLE unit test",function(){
    it("should get all drugs",function(done){
        //calling ADD api
        agent
            .get('/drug')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });


        it('should add new patient', (done) => {
            agent
                .post('/drug')
                .send(patient)
                .expect(201)
                .end(function (err, res) {
                    patientId = res.body._id;
                    res.body.should.be.an.Object().and.have.property('_id');
                    done();
                });
        });




});