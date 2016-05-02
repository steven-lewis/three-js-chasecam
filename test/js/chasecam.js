// we're using expect.js and mocha
define(['three', 'js/chasecam'], function(THREE, GfxChasecam) {

    describe('Chase Cam', function() {

        it('will remain static when at rest inside leash length', function() {

            var cam = new THREE.PerspectiveCamera();

            cam.position.set(1,0,0);

            var obj = new THREE.Object3D();

            obj.position.set(30,0, 30);

            // leash length 100 max
            // max speed 30
            // max accel 30

            GfxChasecam.init(cam, 100, 30, 30, 1.2, 0.2).chase(obj);

            GfxChasecam.update(1.0);
            expect(cam.position).to.eql({x: 1, y:0, z:0});
        });

        it('will decelerate when inside leash length', function() {

            var cam = new THREE.PerspectiveCamera();
            var obj = new THREE.Object3D();

            obj.position.set(30,0, 0);

            // leash length 100 max
            // max speed 30
            // max accel 30

            GfxChasecam.init(cam, 100, 30, 30, 1.2, 0.2).chase(obj);
            GfxChasecam.velocity = new THREE.Vector3(10,0,0);

            // after 1 second velocity will have reduced to 4 (orig accel minus 20% of max accel * delta)
            GfxChasecam._updateVelocity(1.0);
            expect(GfxChasecam.velocity).to.eql({ x: 4, y: 0, z: 0 });

            // make sure psoition updates 
            GfxChasecam._updatePosition(1.0);
            expect(cam.position).to.eql({x: 4, y:0, z:0});

        });

        it('will be pulled by leash, slowly when just outside leash', function() {

            var cam = new THREE.PerspectiveCamera();
            var obj = new THREE.Object3D();            

            obj.position.set(110,0, 0);

            // leash length 100 max
            // max speed 30
            // max accel 30

            GfxChasecam.init(cam, 100, 30, 30, 1.2, 0.2).chase(obj);
            GfxChasecam.velocity = new THREE.Vector3(0,0,0);

            // after 1 second velocity will be max 
            GfxChasecam._updateVelocity(1.0);
            expect(GfxChasecam.velocity).to.eql({ x: 15, y: 0, z: 0 });
        });    

        it('camera y position is locked', function() {

            var cam = new THREE.PerspectiveCamera();
            var obj = new THREE.Object3D();            

            obj.position.set(110,10, 0);

            // leash length 100 max
            // max speed 30
            // max accel 30

            GfxChasecam.init(cam, 100, 30, 30, 1.2, 0.2).chase(obj);
            GfxChasecam.velocity = new THREE.Vector3(0,0,0);

            // after 1 second velocity will be max 
            GfxChasecam._updateVelocity(1.0);
            expect(GfxChasecam.velocity).to.eql({ x: 15, y: 0, z: 0 });
        });              

        it('will be pulled by leash, faster when far outside leash', function() {

            var cam = new THREE.PerspectiveCamera();
            var obj = new THREE.Object3D();            

            obj.position.set(150,0, 0);

            // leash length 100 max
            // max speed 30
            // max accel 30

            GfxChasecam.init(cam, 100, 30, 30, 1.2, 0.2).chase(obj);
            GfxChasecam.velocity = new THREE.Vector3(0,0,0);

            // after 1 second velocity will be max 
            GfxChasecam._updateVelocity(1.0);
            expect(GfxChasecam.velocity).to.eql({ x: 30, y: 0, z: 0 });
        });  

        it('will not exceed max velocity', function() {

            var cam = new THREE.PerspectiveCamera();
            var obj = new THREE.Object3D();            

            obj.position.set(150,0, 0);

            // leash length 100 max
            // max speed 30
            // max accel 30

            GfxChasecam.init(cam, 100, 20, 30, 1.2, 0.2).chase(obj);
            GfxChasecam.velocity = new THREE.Vector3(0,0,0);

            // after 1 second velocity will be max 
            GfxChasecam._updateVelocity(1.0);
            expect(GfxChasecam.velocity).to.eql({ x: 20, y: 0, z: 0 });
        });   

    });

});