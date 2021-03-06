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
scene.background = new THREE.Color(0xffffff)

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
camera.position.set(0, 0, 5)
camera.lookAt(0, 0, 0)
scene.add(camera)

const textureLoader = new THREE.TextureLoader()
const boxTexture = textureLoader.load('./texture.png')
const matcapTexture = textureLoader.load('./matcap.png')

/**
 * Create a BoxGeometry
 * https://threejs.org/docs/?q=box#api/en/geometries/BoxGeometry
 * with a Basic material
 * https://threejs.org/docs/?q=mesh#api/en/materials/MeshBasicMaterial
 */
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshBasicMaterial({ map: boxTexture })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.x = -2

scene.add(box)

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x7371FC })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)


// Cone
const coneGeometry = new THREE.ConeGeometry(1, 3, 32)
const coneMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
cone.position.x = 2
scene.add(cone)

// Light
const light = new THREE.PointLight(0xffffff, 1.5, 100)
light.position.set(0, 5, 5)
scene.add(light)

// Controls
const controls = new THREE.OrbitControls(camera, canvas)

// Draw
const draw = (now) => {
	box.rotation.y += THREE.MathUtils.degToRad(1)
	box.rotation.x += THREE.MathUtils.degToRad(1)

	box.position.y = Math.sin(now / 1000)

	light.position.x = 4 * Math.sin(now / 1000)

	renderer.render(scene, camera)
	window.requestAnimationFrame(draw)
}
draw()