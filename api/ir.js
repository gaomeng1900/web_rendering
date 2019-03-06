// IR 设计

const ir = {}

// 输入

let id = 0 // 递增

// data without dataview
// io operations
ir.data = [
    // attributes in
    {
        id: 1,
        type: 'buffer',
        // version: 0, //
        operation: 0, // backend decide; 1: update; 2: sub update
        data: new Float32Array(1),
        update: [0, 0],
        // dynamic: true,
    },
    // uniforms in
    {
        id: 2,
        type: 'buffer',
        data: new Float32Array(1),
        // dynamic: true,
    },
    // texture html
    {
        id: 3,
        type: 'image',
        data: new HTMLImageElement(),
        operation: 0,
        update: [0, 0, 0, 0],
        // dynamic: false,
    },
    // texture data
    {
        id,
        type: 'image',
        data: new Float32Array(4),
        operation: 0,
        update: [0, 0, 0, 0],
        // dynamic: false,
    },

    // remote data
    // TODO do we need a placeholder here
]

// dataview
// 关于data如何被读取
ir.cache = [
    {
        id,
        type: 'vertex',
        target: 1,
        // itemSize
        // count
        // normalized
        // offset
    }, 
    {
        id,
        type: 'uniform',
        target: 2,
    },
    {
        id,
        type: 'texture',
        target: 3,
        // wrapS
        // wrapT
        // magFilter
        // minFilter
        // anisotropy
        // format
        // type
        // premultiplyAlpha
        // flipY
    },

    {
        id,
        type: 'stage',
        // TODO 
        // WebGPU中 整个program一起编译，然后通过函数名选择vs/fs
        // Obsidian中 分别编译，然后组合成一个stage，在对stage进行编译，类似GL
        fragment: '',
        vertex: '',
    },
]

ir.textures = [ ]

// 过程描述的部分应该参考webgpu

// describ one draw
ir.pipelines = [
    {
        id,
        type: 'pipeline',
        // Obsidian - like
        stages: {
            // metal
            // vertex: '',
            // fragment: '',
            target,
        },
        vertexInput: { },
        uniformsInput: { },
        state: {
            primitive: 'trangle',
            viewports: [],
            scissors: [],
            // rasterization,
            // multisample,
            // blend,
        }
    }
]

// describ a rendering to a fbo
// vulkan defines sub pass, which is not a part of metal
ir.passes = [

]


class IR {
    constructor() {
        this.cacheMap = new WeakMap()
        this.dataMap = new WeakMap()
    }

    setCache(ref, cache, data) {
        this.cacheMap.set(ref, cache)
        this.dataMap.set(ref, data)
    }
}

class Backend {
    constructor() {}

    render(ir) {}
}

class Frontend {
    constructor() {
        this.ir = new IR()
    }

    tick() { }
}

const frontend = new Frontend()
const backend = new Backend()

// render
frontend.tick()
backend.render(frontend.ir)