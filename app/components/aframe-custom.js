/**
 * @fileoverview 
 * This is our custom A-Frame component.
 * It is responsible for adding the outer wireframe mesh
 * and nodes to its vertices.
 */

AFRAME.registerComponent('lowpoly', {
	schema: {
		// define properties, types and default vals
		color: { type: 'string', default: '#FFF' },
		nodes: { type: 'boolean', default: false },
		opacity: { type: 'number', default: 1.0 },
		wireframe: { type: 'boolean', default: false }
	},

	init: function() {
		// Get the ref of the object to which the component is attached
		const obj = this.el.getObject3D('mesh')
	
		// Grab the reference to the main WebGL scene
		const scene = document.querySelector('a-scene').object3D

		// modify material color
		obj.material = new THREE.MeshPhongMaterial({
			color: this.data.color,
			shading: THREE.FlatShading
		})

		// define the geometry for the outer wireframe
		const frameGeom = new THREE.OctahedronGeometry(2.5, 2)
		
		// define the material for it
		const frameMat = new THREE.MeshPhongMaterial({
			color: '#FFFFFF',
			opacity: this.data.opacity,
			transparent: true,
			wireframe: true
		})

		// the final mesh is a composition of the geometry and material
		const icosFrame = new THREE.Mesh(frameGeom, frameMat)

		// set position of the mesh to the position of the sphere
		const { x, y, z } = obj.position
		icosFrame.position.set(0.0, 4, -10.0)

		// if the wireframe prop = true, we attach the new object
		if (this.data.wireframe){
			scene.add(icosFrame)
		}

		// if nodes attribute = true
		if (this.data.nodes){
			let spheres = new THREE.Group()
			let vertices = icosFrame.geometry.vertices

			// traverse the vertices of wireframe and attach small spheres
			for (var i in vertices){
				// create basic sphere
				let geometry = new THREE.SphereGeometry(0.045, 16, 16)
				let material = new THREE.MeshBasicMaterial({
					color: '#FFFFFF',
					opacity: this.data.opacity,
					shading: THREE.FlatShading,
					transparent: true
				})
				let sphere = new THREE.Mesh(geometry, material)
				// reposition them correctly
				sphere.position.set(
					vertices[i].x,
					vertices[i].y + 4,
					vertices[i].z + -10.0
				)

				spheres.add(sphere)
			}
			scene.add(spheres)
		}
	},
	update: function(){
		// get the ref of object ot whicht the component is attached
		const obj = this.el.getObject3D('mesh')

		// modify color of the material during runtime
		obj.material.color = new THREE.Color(this.data.color)
	}
})