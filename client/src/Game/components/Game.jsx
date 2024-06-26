import { Canvas } from '@react-three/fiber'
import { ScrollControls, useProgress } from '@react-three/drei'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Experience } from './Experience.jsx'
import { Loader } from './Loader.jsx'
import {
    SocketManager,
    itemsAtom,
    roomIDAtom,
} from './SocketManager.jsx'
import { UI } from './UI.jsx'

function Game() {
    const [roomID] = useAtom(roomIDAtom)

    const { progress } = useProgress()
    const [loaded, setLoaded] = useState(false)
    const [items] = useAtom(itemsAtom)

    useEffect(() => {
        if (progress === 100 && items) {
            setLoaded(true) // As progress can go back to 0 when new resources are loaded, we need to make sure we don't fade out the UI when that happens
        }
    }, [progress])

    return(
        <>
            <SocketManager />
            <Canvas
                shadows
                camera={{
                    position: [0, 8, 2],
                    fov: 30,
                }}
            >
                <color attach='background' args={['#ffffff']} />
                <ScrollControls pages={roomID ? 4 : 0}>
                    <Experience loaded={loaded} />
                </ScrollControls>
                {/* Impact badly performances without a noticeable good result */}
                {/* <EffectComposer>
          <N8AO intensity={0.42} />
        </EffectComposer> */}
            </Canvas>
            <Loader loaded={loaded} />
            {loaded && <UI />}
        </>
    )
}

export default Game;