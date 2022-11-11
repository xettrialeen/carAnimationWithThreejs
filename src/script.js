import './style.css';
import * as THREE from "three";
import { gsap, Power1, Power2 } from "gsap";
import typefaceFont from "three/examples/fonts/HelveticaNeue_Medium.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
/**
 * Debug
 */

// const gui = new dat.GUI();

const canvas = document.querySelector(".webgl");

////////////////////////////////////////////////////////////////////////////
// END OF DEBUG
////////////////////////////////////////////////////////////////////////////

/**
 * creating scene
 */
const scene = new THREE.Scene();

////////////////////////////////////////////////////////////////////////////
// END OF SCENE
////////////////////////////////////////////////////////////////////////////

/**
 * Geometry
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "white",
});

////////////////////////////////////////////////////////////////////////////
// END OF GEOMETRY
////////////////////////////////////////////////////////////////////////////

/**
 * Mesh
 */

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xfefefef, 1);
ambientLight.position.set(1, -0.5, 1);
pointLight.position.set(1, -0.5, 1);
let mtLoader = new MTLLoader();

////////////////////////////////////////////////////////////////////////////
// END OF MESH
////////////////////////////////////////////////////////////////////////////

// todo size
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

////////////////////////////////////////////////////////////////////////////
// END OF SIZE
////////////////////////////////////////////////////////////////////////////

/**
 * camera
 */

const camera = new THREE.PerspectiveCamera(62, size.width / size.height);
camera.position.z = 2.8;
camera.rotation.y = -0.1;


window.addEventListener("resize", () => {
  // resize canvas

  size.width = window.innerWidth;
  size.height = window.innerHeight;
  //   update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

////////////////////////////////////////////////////////////////////////////
// END OF CAMERA
////////////////////////////////////////////////////////////////////////////

let car_anim = gsap.timeline({
  duration: 1,
  scrollTrigger: {
    trigger: ".slide2",
    endTrigger: ".slide5",
    start: "top top",
    end: "+=5000",
    scrub: 1,
    // markers: true,
  },
});
ScrollTrigger.defaults({
  immediateRender: false,
  ease: Power1.inOut,
});

mtLoader.load("./car.mtl", (material) => {
  material.preload();

  let loader = new OBJLoader();
  console.log(material);
  loader.setMaterials(material);
  loader.load("./car.obj", (obj) => {
    obj.traverse((child) => {
      child.material = new THREE.MeshNormalMaterial({
    
      });
    });
    scene.add(obj, ambientLight);

    obj.position.x = 1;
    obj.position.z = -0.3;
    // Slide 2
    // car_anim.add("slide2", 0).add("slide3", 10).add("slide4", 20);
    car_anim
      .to(obj.rotation, { y: -1.55, duration: 2.9 }, "slide2")
      .to(camera.position, { x: -0.1, duration: 2 }, "slide2")
      // Slide 3
      .to(camera.position, { x: 0.5, duration: 6.1}, "slide3")
      .to(obj.rotation, { z: 1.6, duration: 12}, "slide3")
    
      // Slide 4
      .to(camera.position, { x: -0.15, z: 0.1, duration: 6 }, "slide4")
      .to(obj.rotation, { z: 0.035, y: -2.8, duration: 4 }, "slide4");
  
    });
});

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
scene.add(camera);

////////////////////////////////////////////////////////////////////////////
// END OF RENDERER
////////////////////////////////////////////////////////////////////////////

// controlss
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

////////////////////////////////////////////////////////////////////////////
// END OF CONTROLS
////////////////////////////////////////////////////////////////////////////

/**
 * Animation
 */

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // controls.update();
  // mesh.rotation.x= elapsedTime;
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

////////////////////////////////////////////////////////////////////////////
// END OF ANIMATION
////////////////////////////////////////////////////////////////////////////
