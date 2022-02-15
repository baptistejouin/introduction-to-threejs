/**
 * Our canvas html element
 */
const canvas = document.querySelector('#canvas')

/**
 * Our Webgl renderer, an object that will draw everything in our canvas
 * https://threejs.org/docs/?q=rend#api/en/renderers/WebGLRenderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

/**
 * This is our scene, we'll add any object
 * https://threejs.org/docs/?q=scene#api/en/scenes/Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xFFFFFF)

/**
 * Axes Helper
 * https://threejs.org/docs/?q=Axesh#api/en/helpers/AxesHelper
 */
 const axesHelper = new THREE.AxesHelper(3)
 scene.add(axesHelper)

/**
 * Our Perspective camera, this is the point of view that we'll have
 * of our scene.
 * A perscpective camera is mimicing the human eyes so something far we'll
 * look smaller than something close
 * https://threejs.org/docs/?q=pers#api/en/cameras/PerspectiveCamera
 */
const FOV = 60
const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 5
camera.position.y = 3
camera.position.z = 5
camera.lookAt(0,0,0)
scene.add(camera)


/**
 * Create a BoxGeometry
 * https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry
 * with a Basic material
 * https://threejs.org/docs/?q=mesh#api/en/materials/MeshBasicMaterial
 */
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)

scene.add(box)

renderer.render(scene, camera)
