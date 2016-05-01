(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['three'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('three'));
    } else {
        root.ThreeChaseCam = factory(root.THREE);
    }
}(this, function (THREE) {

    var GfxChasecam = {

        camera: null,
        object: null,
        velocity: new THREE.Vector3(0,0,0),
        up : new THREE.Vector3(0,1,0),
        leashLength: 100,
        maxSpeed: 30,
        maxAccel: 30,
        elasticMargin: 1.2, 
        decay: 0.2,

        /**
         * [init description]
         * @param  {[type]} camera        a ThreeJs Camera
         * @param  {[type]} leashLength   length of the elastic leash between camera and object
         * @param  {[type]} maxSpeed      max speed we can move the camera at
         * @param  {[type]} maxAccel      max accel we can move the camera at
         * @param  {[type]} elasticMargin margin on top of the leash length (e.g. 1.5 when the leash is stretched by 50% )
         * @param  {[type]} decay         deceleration coefficient (as a proportion of max acceleration) when the leash is slack
         * @return {[type]}               [description]
         */
        init: function(camera, leashLength, maxSpeed, maxAccel, elasticMargin, decay) {

            this.camera         = camera;
            this.leashLength    = leashLength;
            this.maxSpeed       = maxSpeed;
            this.maxAccel       = maxAccel;
            this.elasticMargin  = elasticMargin;
            this.decay          = decay;

            return this;
        },

        /**
         * set the up vector for the camera
         * 
         * @param {[type]} up [description]
         */
        setUp: function(up) {

            this.up = up;

            return this;
        },

        /**
         * the object we're currently chasing
         * can be changed at any time
         * 
         * @param  {[type]} object [description]
         * @return {[type]}        [description]
         */
        chase: function(object) {

            this.object = object;

            return this;
        },

        /**
         * update the camera position and lookAt
         * should be called on tick()
         * 
         * @param  {[type]} delta [description]
         * @return {[type]}       [description]
         */
        update: function(delta) {

            this._updateVelocity(delta);
            this._updatePosition(delta);

            this.camera.up = this.up;
            this.camera.lookAt(this.object.position);     
        },

        /**
         * [_updateVelocity description]
         * @param  {[type]} delta [description]
         * @return {[type]}       [description]
         */
        _updateVelocity: function(delta) {

            var moveVector = this.object.position.clone().sub(this.camera.position);

            // current length of the leash 
            var l = moveVector.length(), a;
            
            // within the limits of our leash, just slow decelerate (20% of max accel) or remain at zero
            if(l < this.leashLength) {

                a = this.velocity.clone().negate().normalize().multiplyScalar(this.maxAccel * this.decay * delta);

            }
            else if (l < this.leashLength * this.elasticMargin) { // just outside the leash, but not outside its elastic limit

                var c = (l - this.leashLength) / (this.leashLength * this.elasticMargin - this.leashLength);

                a = moveVector.clone().normalize().multiplyScalar(this.maxAccel * delta * c);
            }
            else { // fully outside the leash's elastic limit

                a = moveVector.clone().normalize().multiplyScalar(this.maxAccel * delta);
            }

            this.velocity.add(a);                
        },

        /**
         * [_updatePosition description]
         * @param  {[type]} delta [description]
         * @return {[type]}       [description]
         */
        _updatePosition: function(delta) {

            this.camera.position.add(this.velocity.clone().multiplyScalar(delta));
        }

    };

    return GfxChasecam;
}));