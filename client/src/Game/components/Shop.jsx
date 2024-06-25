import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export const Shop = ({ geometry }) => {
	console.log(1)
	const meshRef = useRef()
	const { camera, gl } = useThree()

	useEffect(() => {
		camera.position.z = 2
	}, [camera])

	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.y = Date.now() * 0.001
		}
	})

	return (
		<>
			<orbitControls
				args={[camera, gl.domElement]}
				minDistance={2}
				maxDistance={5}
				enablePan={false}
				enableZoom={false}
			/>
			<mesh ref={meshRef} geometry={geometry}>
				<meshStandardMaterial
					color={new THREE.Color().setHSL(Math.random(), 1, 0.75)}
					roughness={0.5}
					metalness={0}
					flatShading={true}
				/>
			</mesh>
			<hemisphereLight color={0xaaaaaa} groundColor={0x444444} intensity={3} />
			<directionalLight color={0xffffff} intensity={1.5} position={[1, 1, 1]} />
		</>
	)
}

const MultipleElements = () => {
	const [geometries] = useState([
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.SphereGeometry(0.5, 12, 8),
		new THREE.DodecahedronGeometry(0.5),
		new THREE.CylinderGeometry(0.5, 0.5, 1, 12),
	])

	return (
		<div
			id='content'
			style={{
				position: 'absolute',
				top: 0,
				width: '100%',
				zIndex: 1,
				padding: '3em 0 0 0',
			}}
		>
			<div id='info'>
				<a href='https://threejs.org' target='_blank' rel='noopener noreferrer'>
					three.js
				</a>{' '}
				- multiple elements - webgl
			</div>
			{Array.from({ length: 40 }, (_, i) => (
				<div
					key={i}
					className='list-item'
					style={{
						display: 'inline-block',
						margin: '1em',
						padding: '1em',
						boxShadow: '1px 2px 4px 0px rgba(0,0,0,0.25)',
					}}
				>
					<div style={{ width: '200px', height: '200px' }}>
						<Canvas style={{ width: '200px', height: '200px' }}>
							<Scene
								geometry={
									geometries[Math.floor(Math.random() * geometries.length)]
								}
							/>
						</Canvas>
					</div>
					<div
						style={{
							color: '#888',
							fontFamily: 'sans-serif',
							fontSize: 'large',
							width: '200px',
							marginTop: '0.5em',
						}}
					>
						Scene {i + 1}
					</div>
				</div>
			))}
		</div>
	)
}

export default MultipleElements
