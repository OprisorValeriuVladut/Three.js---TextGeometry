const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)

import tGeo from './tGeo'

class Test {

    constructor() {
        var container = document.getElementById('webGL');
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientWidth, 1, 10000);

        let tGeometry = new tGeo(THREE, scene);
        
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientWidth);
        document.body.appendChild(renderer.domElement);

        camera.position.z = 1000;

        let controls = new OrbitControls(camera);

        var light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    }
}

export default new Test();