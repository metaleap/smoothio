smio = global.smoothio

class smio.gfx.Mesh

	constructor: (@engine, @posX = 0.0, @posY = 0.0, @posZ = 0.0) ->
		@bufferIndex = 0

	beforeDraw: (gl, timings) =>

	deleteBuffers: =>
		if (gl = @engine.gl)
			if @colorBuffer
				gl.deleteBuffer(@colorBuffer)
				delete @colorBuffer
			if @vertexBuffer
				gl.deleteBuffer(@vertexBuffer)
				delete @vertexBuffer

	draw: (gl, timings) =>

	updateBuffers: (onlyIfCreated) =>
		createBuf = false
		if (gl = @engine.gl)
			if @vertices and @vertices.length
				if (createBuf = not @vertexBuffer)
					@vertexBuffer = gl.createBuffer()
				if (not onlyIfCreated) or createBuf
					gl.bindBuffer(gl.ARRAY_BUFFER, @vertexBuffer)
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_.flatten(@vertices)), gl.STATIC_DRAW)
			if @colors and @colors.length
				if (createBuf = not @colorBuffer)
					@colorBuffer = gl.createBuffer()
				if (not onlyIfCreated) or createBuf
					gl.bindBuffer(gl.ARRAY_BUFFER, @colorBuffer)
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_.flatten(@colors)), gl.STATIC_DRAW)
