###
Auto-generated from Core/Controls/SlidePanel.ctl
###
#if server
require '../../../_jscript/shared/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_Controls_SlidePanel extends smio.Control


#if client
	
	renderTemplate: ->
		ul =
			class: "smio-slidepanel #{@args.class or ''}"
			'li #libefore':
				html: ['&nbsp;']
		if @args.items
			for itemID, item of @args.items
				while _.startsWith itemID, '#'
					itemID = itemID.substr 1
				@items.push itemID
				ul["li #items_#{itemID} .#{@args.itemClass or ''}"] = item
		ul['li #liafter'] =
			html: ['&nbsp;']
		div:
			id: ''
			class: "smio-slidepanel #{@args.class}"
			'div #scrollbox .smio-slidepanel-scrollbox':
				'ul #items': ul
			'div #edgeprev .smio-slidepanel-edge .smio-slidepanel-edge-left':
				'div .smio-slidepanel-edge-arr .x9668': text: [@r 'slidepanel_prev']
			'div #edgenext .smio-slidepanel-edge .smio-slidepanel-edge-right':
				'div .smio-slidepanel-edge-arr .x9658': text: [@r 'slidepanel_next']
	
	init: ->
		@curItem = 0
		@items = []
		@scrolling = false
		super()
		if @args.onItemSelect and _.isFunction @args.onItemSelect
			@on 'itemSelect', @args.onItemSelect
	
	onLoad: ->
		super()
		(@edgePrev = $("##{@id 'edgeprev'}")).click => @scrollTo @curItem - 1
		(@edgeNext = $("##{@id 'edgenext'}")).click => @scrollTo @curItem + 1
		(@scrollBox = $("##{@id 'scrollbox'}")).scroll _.debounce (=> @scrollTo null, true if not @scrolling), 250
		@scrollTo 0, true
	
	onWindowResize: (w, h) ->
		@scrollTo @curItem, true
	
	scrollTo: (item, force) ->
		if item is null
			scrollLefts = []
			distances = []
			for i in [0...@items.length]
				scrollLefts.push (tmp = (@scrollBox.scrollLeft() + $("##{@id 'items_' + @items[i]}").position().left - @edgePrev.width()))
				distances.push Math.abs tmp - @scrollBox.scrollLeft()
			item = distances.indexOf Math.min distances...
		if _.isString item
			item = @items.indexOf item
		if ((item < 0) or (item >= @items.length)) and force
			item = 0
		if (force or item isnt @curItem) and (item >= 0) and (item < @items.length)
			@scrolling = true
			@edgePrev.css display: if (item is 0) then 'none' else 'block'
			@edgeNext.css display: if (item is (@items.length - 1)) then 'none' else 'block'
			@on 'itemSelect', [@curItem = item, @items[item]]
			morpheus.tween 250, ((pos) => @scrollBox.scrollLeft pos), (=> @scrolling = false), null, @scrollBox.scrollLeft(), @scrollBox.scrollLeft() + $("##{@id 'items_' + @items[item]}").position().left - @edgePrev.width()
	
#endif
	
	


	constructor: (client, parent, args) ->
		super client, parent, args
		@init()

	className: ->
		"Core_Controls_SlidePanel"

	classNamespace: ->
		"Core_Controls"