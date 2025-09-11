# 3D Models Directory

## Required File: block.glb

Please place your `block.glb` file in this directory.

The Block component expects to find the model at: `/public/models/block.glb`

### Supported Formats:
- GLB (recommended)
- GLTF with embedded textures

### Model Requirements:
- File size: < 5MB (for optimal performance)
- Texture resolution: 512x512 to 1024x1024 pixels
- Geometry: Keep polygon count reasonable for web performance

### How to Export GLB Models:
1. **From Blender**: File → Export → glTF 2.0 (.glb/.gltf)
2. **From 3ds Max**: Use the Babylon.js exporter or glTF exporter
3. **From Maya**: Use the glTF Maya exporter plugin
4. **Online Converters**: Use tools like https://products.aspose.app/3d/conversion/obj-to-glb

Once you place your `block.glb` file here, the Block component will automatically load and display it in the 3D scene.
