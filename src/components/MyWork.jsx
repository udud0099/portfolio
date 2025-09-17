'use client'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const MyWork = () => {
  return (
     <>
     <h1>hi</h1>
     <Canvas >
<mesh>
    <boxGeometry  / >
    <meshBasicMaterial />
</mesh>
     </Canvas>
     </>
  )
}

export default MyWork