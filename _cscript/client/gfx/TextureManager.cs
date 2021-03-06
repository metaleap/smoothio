smio = global.smoothio

class smio.gfx.TextureManager

	constructor: (@engine) ->
		@texQuality = 2 # @engine.gl.LINEAR # LINEAR or NEAREST
		@textures = {}

	load: (name, url, forceReload) =>
		if (gl = @engine.gl) and ((not (tex = @textures[url])) or forceReload)
			if not tex
				tex = gl.createTexture()
			img = new Image()
			img.onerror = =>
				@load('/_/file/images/textures/particle.png', forceReload, url)
			img.onload = =>
				@textures[name] = tex
				mipmap = @texQuality is 2
				linear = @texQuality isnt 0
				@withTexture tex, ->
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, if linear then gl.LINEAR else  gl.NEAREST)
					gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, if mipmap then gl.LINEAR_MIPMAP_NEAREST else if linear then gl.LINEAR else gl.NEAREST)
					if mipmap
						gl.generateMipmap(gl.TEXTURE_2D)
			img.src = url

	remove: (url) =>
		if (tex = @textures[url])
			@engine.deleteTexture(tex)
			delete @textures[url]

	withTexture: (texOrUrl, fn) =>
		if _.isString(tex = texOrUrl)
			tex = @textures[texOrUrl]
		if tex
			@engine.gl.bindTexture(@engine.gl.TEXTURE_2D, tex)
			try
				fn(tex)
			finally
				@engine.gl.bindTexture(@engine.gl.TEXTURE_2D, null)

