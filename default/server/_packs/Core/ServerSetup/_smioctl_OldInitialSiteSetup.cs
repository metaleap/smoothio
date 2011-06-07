###
Auto-generated from Core/ServerSetup/OldInitialSiteSetup.ctl
###
#if server
require '../../../_jscript/Control'
#endif
smio = smoothio = global.smoothio
class smio.Packs_Core_ServerSetup_OldInitialSiteSetup extends smio.Control


	onSlide: (index, itemID) ->
		@controls.steptabs.selectTab itemID

	onTabSelect: (tabID) ->
		@controls.stepslide.scrollTo tabID


#if client
	constructor: (client, parent, args) ->
		super client, parent, args, "Core_ServerSetup", "Core_ServerSetup_OldInitialSiteSetup"
		@jsSelf = "smio.client.allControls['" + @id() + "']"
		@init()
	renderHtml: ($el) ->
		if not @_html
			__r = ctls: [], m: []
			__r.o = __r.m

			__r.o.push "\n<div class=\"smio-setup\" id=\""
			__r.o.push @id()
			__r.o.push "\">\n\t<div class=\"smio-setup-outer smio-setup-outer-top\">\n\t\t<div class=\"smio-setup-header\">"
			__r.o.push @renderTag "r", "title", null
			__r.o.push "</div>\n\t\t<div class=\"smio-setup-header-desc\">"
			__r.o.push @renderTag "r", "desc", null
			__r.o.push "</div>\n\t</div>\n\t<div class=\"smio-setup-inner\">\n\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "SlidePanel", args: { id: 'stepslide', class: 'smio-setup-stepslide', itemClass: 'smio-setup-stepbox', onItemSelect: (i, id) => @onSlide i, id } 
			__r.o = tmp
			__r.o.push "\n\t\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "item", args: { id: 'owner' } 
			__r.o = tmp
			__r.o.push "\n\t\t\t\t<div class=\"smio-setup-stepbox-title\">"
			__r.o.push t: "r", s: "steptitle_owner", a: null
			__r.o.push "</div>\n\t\t\t\t<div class=\"smio-setup-stepbox-form\">\n\t\t\t\t\tblaa\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tfoo\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tyeah right\n\t\t\t\t</div>\n\t\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.ctls[0].o
			__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)
			__r.o.push "\n\t\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "item", args: { id: 'template' } 
			__r.o = tmp
			__r.o.push "\n\t\t\t\t<div class=\"smio-setup-stepbox-title\">"
			__r.o.push t: "r", s: "steptitle_template", a: null
			__r.o.push "</div>\n\t\t\t\t<div class=\"smio-setup-stepbox-form\">\n\t\t\t\t\tblaa\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tfoo\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tyeah right\n\t\t\t\t</div>\n\t\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.ctls[0].o
			__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)
			__r.o.push "\n\t\t\t"
			tmp = []
			__r.ctls.push o: tmp, c: "item", args: { id: 'finish' } 
			__r.o = tmp
			__r.o.push "\n\t\t\t\t<div class=\"smio-setup-stepbox-title\">"
			__r.o.push t: "r", s: "steptitle_finish", a: null
			__r.o.push "</div>\n\t\t\t\t<div class=\"smio-setup-stepbox-form\">\n\t\t\t\t\tthe finish line!!\n\t\t\t\t\t<br/>\n\t\t\t\t\tthis is where we ROLL...\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tcrazy innit?!\n\t\t\t\t</div>\n\t\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.ctls[0].o
			__r.o.push t: 'ctl', s: tmp.c, a: (smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o)
			__r.o.push "\n\t\t"
			tmp = __r.ctls.pop()
			__r.o = __r.m
			__r.o.push @renderTag 'ctl', tmp.c, smio.Util.Object.mergeDefaults tmp.args, __o: tmp.o
			__r.o.push "\n\t</div>\n\t"
			__r.o.push @renderTag "ctl", "TabStrip", { id: 'steptabs', class: 'smio-setup-outer smio-setup-steptabs', tabClass: 'smio-setup-steptab', tabs: ['owner', 'template', 'finish'], resPrefix: 'steps_', onTabSelect: (tabID) => @onTabSelect tabID }
			__r.o.push "\n</div>\n\n"
			@_html = __r.o.join ''
		if $el
			$el.html @_html
		@_html
#endif