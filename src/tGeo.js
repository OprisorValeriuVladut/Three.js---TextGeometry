Array.prototype.extends = function(index){ if(index>=this.length){ return index - this.length+1}else if(index < 0){ return this[this.length+index]}else{return this[index]}}
                                          
import offset from './offset'
export default class tGeo {
    constructor(THREE, scene) {
        var loader = new THREE.FontLoader();

        loader.load('fonts/munistic.json', function (font) {
            let glyphs = font["data"]["glyphs"];
            let outlines = glyphs["T"].o.split(' ');

            let paths = [];
            for (let i = 0; i < outlines.length; i++) {
                switch (outlines[i]) {
                    case 'm':
                        paths[paths.length] = new THREE.Shape();
                        paths[paths.length - 1].moveTo(Number(outlines[i + 1]), Number(outlines[i + 2]));
                        // console.log('m: ', Number(outlines[i + 1]), Number(outlines[i + 2]));
                        break;
                    case 'l':
                        paths[paths.length - 1].lineTo(Number(outlines[i + 1]), Number(outlines[i + 2]));
                        // console.log('l: ', Number(outlines[i + 1]), Number(outlines[i + 2]));
                        break;
                    case 'q':
                        paths[paths.length - 1].quadraticCurveTo(Number(outlines[i + 3]), Number(outlines[i + 4]), Number(outlines[i + 1]), Number(outlines[i + 2]));
                        // console.log('q: ', Number(outlines[i + 1]), Number(outlines[i + 2]), Number(outlines[i + 3]), Number(outlines[i + 4]));
                        break;
                    case 'b':
                        paths[paths.length - 1].bezierCurveTo(Number(outlines[i + 3]), Number(outlines[i + 4]), Number(outlines[i + 5]), Number(outlines[i + 6]), Number(outlines[i + 1]), Number(outlines[i + 2]));
                        // console.log('q: ', Number(outlines[i + 1]), Number(outlines[i + 2]), Number(outlines[i + 3]), Number(outlines[i + 4]), Number(outlines[i + 5]), Number(outlines[i + 6]));
                        break;
                }
            }

            let o = new offset(scene);
            o.setPath(paths);

            for (let i = 0; i < paths.length; i++) {

                var points = paths[i].getPoints();
                
                var geometry = new THREE.BufferGeometry().setFromPoints(points);
                var material = new THREE.LineBasicMaterial({ color: 0xffffff });

                var line = new THREE.Line(geometry, material);
                scene.add(line);
            }

            var hole = getHoles(paths, points)
            extrudeText(paths, hole);

        });

        var getHoles = function (paths, points) {
            var hole = new THREE.Path();
            if (isClockWise(points)) {
                hole.setFromPoints(points);
            }
            return hole;
        }

        var extrudeText = function (paths, hole) {

            var extrudeSettings = {
                depth: 200,
                steps: 2,
                depth: 16,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 10,
                bevelSegments: 5
            };

            for (let i = 0; i < paths.length; i++) {
                paths[i].holes.push(hole);
                var extrudedGeometry = new THREE.ExtrudeGeometry(paths[i], extrudeSettings);
                var extrudedMesh = new THREE.Mesh(extrudedGeometry, new THREE.MeshNormalMaterial);
                scene.add(extrudedMesh);
            }
        }

        var isClockWise = function (pts) {
            return area(pts) < 0;
        };

        var area = function (contour) {

            var n = contour.length;
            var a = 0.0;

            for (var p = n - 1, q = 0; q < n; p = q++) {

                a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;

            }

            return a * 0.5;

        };
    }




}