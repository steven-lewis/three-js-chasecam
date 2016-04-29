ThreeJS Chasecam
================

A basic chase-cam which lives on an elastic leash, for use with ThreeJs.

Chasecam is defined as a RequireJs module.

Using the Chasecam
------------------

Chasecam is defined inside a RequireJs module, and depends on Three.js. Once required in, just initialize it with your chosen camera and leash length and other attributes, set an object to chase, then call update(delta) inside your render loop. For example:

    GfxChasecam.init(camera, 100, 30, 30, 1.2, 0.2).chase(obj);

    GfxChasecam.update(deltaInSeconds);  


Tests
-----

Unit tests use Karma. To execute just run:

   ./node_modules/.bin/karma start

