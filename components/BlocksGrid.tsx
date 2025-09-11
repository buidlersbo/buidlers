import React from 'react'
import { Block } from './Block'

interface BlocksGridProps {
  rows?: number
  columns?: number
  spacing?: number
}

export const BlocksGrid: React.FC<BlocksGridProps> = ({
  rows = 10,
  columns = 10,
  spacing = 2
}) => {
  // Calculate offset to center the grid
  const offsetX = ((columns - 1) * spacing) / 2
  const offsetZ = ((rows - 1) * spacing) / 2

  // Generate grid colors (simple pattern for variety)
  const getBlockColor = (row: number, col: number): string => {
    const colors = [
      '#ff6b6b', // Red
      '#4ecdc4', // Teal
      '#45b7d1', // Blue
      '#96ceb4', // Green
      '#feca57', // Yellow
      '#ff9ff3', // Pink
      '#54a0ff', // Light Blue
      '#5f27cd', // Purple
      '#00d2d3', // Cyan
      '#ff9f43'  // Orange
    ]
    return colors[(row + col) % colors.length]
  }

  return (
    <group>
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: columns }, (_, col) => {
          const x = col * spacing - offsetX
          const z = row * spacing - offsetZ
          const y = 0

          return (
            <Block
              key={`block-${row}-${col}`}
              position={[x, y, z]}
              color={getBlockColor(row, col)}
              scale={[0.8, 0.8, 0.8]} // Slightly smaller for better visual spacing
              animate={true} // Enable animation for all blocks
            />
          )
        })
      )}
    </group>
  )
}
