ThreeJS Chasecam
================

A basic chase-cam which lives on an elastic leash, for use with ThreeJS.

Chasecam is defined using UMD, but is tested as a RequireJS module.

Using the Chasecam
------------------

Chasecam depends on ThreeJS. Once required in, just initialize it with your chosen ThreeJS camera, leash length and other attributes, set a THREE.Object3D object to chase, then call update(delta) inside your render loop. For example:

    chasecam.init(camera, 100, 30, 30, 1.2, 0.2).chase(obj);

    chasecam.update(deltaInSeconds);  

To switch to chasing another object:

    chasecam.chase(anotherObj);

Calling init()
--------------

Parameters are as follows:

    camera        a ThreeJs Camera
    leashLength   length of the elastic leash between camera and object
    maxSpeed      max speed we can move the camera at
    maxAccel      max accel we can move the camera at
    elasticMargin margin on top of the leash length (e.g. 1.5 when the leash is stretched by 50% )
    decay         deceleration coefficient (as a proportion of max acceleration) when the leash is slack

Tests
-----

Unit tests use Karma. To execute just run:

    ./node_modules/.bin/karma start

