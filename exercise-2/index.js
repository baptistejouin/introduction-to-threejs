const canvas = document.querySelector('#canvas')

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

const FOV = 60
const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(4, 8, 8)
camera.lookAt(0, 0, 0)
scene.add(camera)

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./matcap.png')

// Spheres
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)

const NUMER_OF_LINES = 10
const NUMBER_OF_COLUMNS = 10

const spheres = []

for (let i = 0; i < NUMER_OF_LINES; i++) {
	for (let y = 0; y < NUMBER_OF_COLUMNS; y++) {
		const sphereMaterial = new THREE.MeshMatcapMaterial({ color: 0x7371FC, matcap: matcapTexture, transparent: true })
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
		sphere.position.x = i - NUMER_OF_LINES / 2 + 0.5 // center (0.5 is for offset the radius)
		sphere.position.z = y - NUMBER_OF_COLUMNS / 2 + 0.5
		scene.add(sphere)
		spheres.push(sphere)
	}
}


// Controls
const controls = new THREE.OrbitControls(camera, canvas)

// Raycaster for the interactivity
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2(10, 10)

function onPointerMove(event) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1
	pointer.y = - (event.clientY / window.innerHeight) * 2 + 1

}

window.addEventListener('pointermove', onPointerMove)

// Draw
const draw = (now) => {

	spheres.forEach(sphere => {
		const waveXPositions = Math.sin(now / 1000 + sphere.position.x * 50)
		const waveZPositions = Math.sin(now / 1000 + sphere.position.z * 50)

		sphere.position.y = waveXPositions * waveZPositions
	})

	// Update the picking ray with the camera and pointer position
	raycaster.setFromCamera(pointer, camera)

	// Calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children)

	for (let i = 0; i < intersects.length; i++) {

		// intersects[i].object.material.color.set(0xff0000) -> for the color
		intersects[i].object.material.opacity = 0
		window.setTimeout(() => {
			intersects[i].object.material.opacity = 1
		}, 1000)

	}

	renderer.render(scene, camera)
	window.requestAnimationFrame(draw)
}
draw()