const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE)
var FBXLoader = require('three-fbx-loader');

import tGeo from './tGeo'

class Test {

    constructor() {
        var container = document.getElementById('webGL');
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

        var controls;
        // let tGeometry = new tGeo(THREE, scene);

        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        camera.position.z = 100;

        var loader = new FBXLoader();
        var scene = new THREE.Scene();


        var textureCube = new THREE.CubeTextureLoader().setPath('./assets/cube/').load([
            'px.jpg', 'nx.jpg',
            'py.jpg', 'ny.jpg',
            'pz.jpg', 'nz.jpg'
        ]);

        loader.load('./assets/audi_a5.fbx', function (object3d) {
            scene.add(object3d);
            object3d.traverse((child) => {
                if (child.material) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0x050505, opacity: 1 });
                    child.material.metalness = 0.8;
                    child.material.roughness = 0.0001;
                    child.material.envMap = textureCube;

                }
            });
        });

        //scene.background = textureCube;
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaInput = renderer.gammaOutput = true;
        renderer.setClearColor(0xffffff, 0)
        scene.add(new THREE.AmbientLight(0xffffff))
        document.body.appendChild(renderer.domElement);
        camera.position.set(46, 0, 35);
        controls = new OrbitControls(camera);
        var light = new THREE.HemisphereLight(0xd7ebed, 0xeae3da, 0.5);
        scene.add(light);

        setLights(-16.14, 30.59, -150.4);
        setLights(16.14, 30.59, 155.4);
        function setLights(posX, posY, posZ) {
            var light = new THREE.PointLight(0xffffff, 1, 1000);
            light.position.set(posX, posY, posZ);
            scene.add(light);
        }
        // controls.target.set(0, 4, 0);
        // controls.maxDistance = 100;
        // controls.minDistance = 10;
        // controls.maxPolarAngle = Math.PI/2;


        var ambientLight = new THREE.AmbientLight(0x404040);
        var light1 = new THREE.PointLight(0xffffff, 1.5, 1000);
        light1.position.set(200, 200, 0);
        var light2 = new THREE.PointLight(0xffffff, 1.5, 1000);
        light2.position.set(-200, 200, 0);
        scene.add(ambientLight);
        scene.add(light1);
        scene.add(light2);

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    }
}

export default new Test();