/**
 * @fileoverview 
 * This is our main A-Frame application.
 * It defines the main A-Frame Scene which gets mounted root div.
 */

import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

const COLORS = ['#D92B6A', '#9564F2', '#FFCF59']

class Main extends Component {
	constructor() {
    	super()
		this.state = {
			colorIndex: 0,
			spherePosition: { x: 0.0, y: 4, z: -10.0 }
		}
	}

	render() {
    	return (
			<Scene
				effects = "bloom, film, fxaa"
				fxaa
				bloom = {{
					radius: 0.99
				}}
				film = {{
					sIntensity: 0.15,
					nIntensity: 0.15
				}}
				environment = {{
					preset: 'starry',
					seed: 2,
					lightPosition: { x: 0.0, y: 0.03, z: -0.5 },
					fog: 0.8,
					ground: 'canyon',
					groundYScale: 6.31,
					groundTexture: 'walkernoise',
					groundColor: '#8a7f8a',
					grid: 'none'
				}}
			>
			<Entity primitive="a-camera" look-controls>
				<Entity primitive="a-cursor"
					cursor= {{ fuse: false }}
					material= {{ color: 'white', shader: 'flat', opacity: 0.75 }}
					geometry= {{ radiusInner: 0.005, radiusOuter: 0.007 }}
					event-set__1={{
						_event: 'mouseenter',
						scale: { x: 1.4, y: 1.4, z: 1.4 }
					}}
					event-set__1={{
						_event: 'mouseleave',
						scale: { x:1, y: 1, z: 1 }
					}}
					raycaster="objects: .clickable"
				/>
			</Entity>
			<Entity 
				class="clickable"
				lowpoly={{
					color: COLORS[this.state.colorIndex],
				}}
				primitive="a-octahedron"
				detail={2}
				radius={2}
				position={ this.state.spherePosition }
				color="#FAFAF1"
				events={{
					click: this._handleClick.bind(this)
				}}
				animation__rotate={{
					property: 'rotation',
					dur: 60000,
					easing: 'linear',
					loop: true,
					to: { x: 0, y: 360, z: 0}
				}}
				animation__oscillate={{
					property: 'position',
					dur: 2000,
					dir: 'alternative',
					easing: 'linear',
					loop: true,
					from: this.state.spherePosition,
					to: {
						x: this.state.spherePosition.x,
						y: this.state.spherePosition.y + 0.25,
						z: this.state.spherePosition.z
					}
				}}
			/>
			<Entity
				primitive="a-light"
				type="directional"
				color="#FFF"
				intensity={1}
				position={{ x: 2.5, y: 0.0, z: 0.0 }}
			/>

			</Scene>
		)
	}
	_handleClick(){
		this.setState({
			colorIndex: (this.state.colorIndex + 1) % COLORS.length
		})
	}
}

export default Main