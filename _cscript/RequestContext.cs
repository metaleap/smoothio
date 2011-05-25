
require './Session'
_ = require 'underscore'
node_path = require 'path'
node_uuid = require 'node-uuid'
node_urlq = require 'querystring'
smio = global.smoothio

class smio.RequestContext
	@parseSmioCookie: (cookies, fail) ->
		if _.isString cookies
			cookies = smio.Util.Server.parseCookies cookies
		parse = -> JSON.parse node_urlq.unescape cookies['smoothio']
		if fail
			smioCookie = parse()
		else
			try
				smioCookie = parse()
			catch err
				smioCookie = {}
		smioCookie

	constructor: (@server, @uri, @httpRequest, @httpResponse, @adminDB, @sharedDB, @serverDB) ->
		@inst = @server.inst
		@postData = null
		@smioCookie = smio.RequestContext.parseSmioCookie @cookies = smio.Util.Server.parseCookies @httpRequest.headers['cookie']
		if @httpRequest.method is 'POST'
			@httpRequest.on 'end', () =>
				@handleRequest()
			@httpRequest.on 'data', (data) =>
				@postData += "#{data}"
		else
			@handleRequest()

	handleRequest: ->
		#date.setTime date.getTime() + (@server.inst.config.session.timeout * 60 * 1000)
		#expires=#{smio.Util.DateTime.addMinutes(smio.Util.Number.tryParseInt(@inst.config.session.timeout, 20)).toGMTString()}
		@inst.lastRequestTime = new Date
		if not @smioCookie['sessid']
			@smioCookie['sessid'] = node_uuid()
		respHeaders =
			'Set-Cookie': "smoo=#{node_urlq.escape JSON.stringify @smioCookie}; path=/"
		try
			if hasHandler = @uri.pathItems.length and @uri.pathItems[0] is '_' and @uri.pathItems.length >= 2
				switch @uri.pathItems[1]
					when "poll"
						respHeaders['Content-Type'] = 'text/plain'
						finish = (data) =>
							@httpResponse.writeHead 200, respHeaders
							@httpResponse.end JSON.stringify data
						if @uri.pathItems[2] is 'f'
							(smio.Session.getBySessionID @server, @smioCookie['sessid']).handleFetch @, null, finish
						else
							finish {}
					when "dynfile"
						if (cfgKey = @uri.query['config'])
							if cfgKey is '_res.js'
								respHeaders['Content-Type'] = 'text/javascript'
								@serveFile '_scripts/_res.js', respHeaders
							else if (cfgVal = '' + smio.Util.Object.select @server.inst.config, cfgKey) and (fname = @uri.query[cfgVal])
								if (ctype = @uri.query['type'])
									respHeaders['Content-Type'] = ctype
								@serveFile fname, respHeaders
						else
							respHeaders['Content-Type'] = 'text/plain'
							@httpResponse.writeHead 404, respHeaders
							@httpResponse.end "404 File Not Found: #{node_path.join @server.fileServer.root, fname} (dynamic file)"
					when "file"
						@serveFile (@uri.pathItems[2...].join '/'), respHeaders
					else
						hasHandler = false
			if not hasHandler
				@serveFile 'smoothio.html', respHeaders
		catch err
			respHeaders['Content-Type'] = 'text/plain'
			@httpResponse.writeHead 500, respHeaders
			@httpResponse.end "500 Internal Server Error:\n#{@inst.formatError err}"

	serveFile: (filePath, respHeaders) ->
		if node_path.existsSync node_path.join @server.fileServer.root, filePath
			@server.fileServer.serveFile(filePath, 200, respHeaders, @httpRequest, @httpResponse).addListener 'error', (err) =>
				respHeaders['Content-Type'] = 'text/plain'
				@httpResponse.writeHead err.status, smio.Util.Object.mergeDefaults err.headers, respHeaders
				@httpResponse.end JSON.stringify err
		else
			respHeaders['Content-Type'] = 'text/plain'
			@httpResponse.writeHead 404, respHeaders
			@httpResponse.end "404 File Not Found: #{node_path.join @server.fileServer.root, filePath}"

