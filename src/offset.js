const THREE = require('three');

export default class Offset {
    constructor(scene) {
        this.scene = scene;
    }

    setPath(path) {
        for (let i = 0; i < path.length; i++) {
            var points = path[i].getPoints();
            for (let j = 1; j < points.length - 1; j++) {

                let sphere = this.makeSphere(0xffff00);
                sphere.position.set(points[j].x, points[j].y, 0);
                this.scene.add(sphere);

                let A = points.extends(j - 1);
                let B = points.extends(j);
                let C = points.extends(j + 1);


                let angle = this.getAngle(A, B, C);

                let origin = new THREE.Vector2(B.x, B.y)
                let dir = new THREE.Vector2(Math.cos(angle / 2), Math.sin(angle / 2));

                let r = new THREE.Vector2();
                r.addScaledVector(dir, 10)

                let sphere1 = this.makeSphere(0xff0000);
                sphere1.position.set(dir.x+1, dir.y+1, 0);
                this.scene.add(sphere1);
            }


        }
    }

    getAngle(A, B, C) {
        var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
        var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
        var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
        return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
    }

    makeSphere(c) {
        var geometry = new THREE.SphereGeometry(20, 32, 32);
        var material = new THREE.MeshBasicMaterial({ color: c });
        var sphere = new THREE.Mesh(geometry, material);
        return sphere;
    }

}


