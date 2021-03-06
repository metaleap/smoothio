#const $CC smio-setup

#if server

renderTemplate: =>
	"div .$CC":
		"id": ''
		"div .$CC-outer .$CC-outer-top":
			"div .$CC-header": [@r 'maintemplate_nohub_title']
			"div .$CC-header-desc": [@r 'maintemplate_nohub_desc']

#endif

#if client

renderTemplate: =>
	"div .smio-box":
		"id": ''
		"div .$CC":
			"div .$CC-outer .$CC-outer-top":
				"div .$CC-header":
					html: [@r 'title']
				"div .$CC-header-desc": [@r 'desc']
			"div .$CC-inner":
				"SlidePanel #stepslide .$CC-stepslide":
					itemClass: '$CC-stepbox'
					onItemSelect: @onSlide
					items:
						"#owner":
							'div .$CC-stepbox-title':
								[@r 'steptitle_owner']
							'div .$CC-stepbox-form':
								"Controls #user":
									ctltype: 'TextInput'
									onChange: => @verifyInputs
									required: true
									nospellcheck: true
									labelText: (id) => "owner_#{id}"
									placeholder: (id) => "owner_#{id}hint"
									type: (id) => if (id isnt 'name') then 'password' else ''
									items: ['#name', '#pass', '#pass2']
								"div .$CC-stepbox-form-label":
									html: [@r 'owner_choice']
								"Controls #owner":
									ctltype: 'Toggle'
									disabled: true
									name: @id('owner_toggle')
									items:
										"#create":
											checked: true
											labelHtml: ['owner_create', 'localhost']
										"#login":
											labelHtml: ['owner_login', 'localhost']
						"#template":
							"div .$CC-stepbox-title":
								[@r 'steptitle_template']
							"div .$CC-stepbox-form":
								text: ['Hub templates are not yet available.']
						"#finish":
							"div .$CC-stepbox-title":
								[@r 'steptitle_finish']
							"div .$CC-stepbox-form":
								"TextInput #hubtitle":
									required: true
									placeholder: 'hub_titlehint'
									labelText: 'hub_title'
									onChange: @verifyInputs
								"div .$CC-stepbox-form-label":
									html: [@r 'hub_hint']
								"Controls #bg":
									ctltype: 'Toggle'
									name: @id('hub_bg')
									checked: (id) => id is 'bg0'
									labelHtml: (id) => 'nbsp'
									style: (id) => 'background-image': "url('/_/file/images/#{id}.jpg')"
									onCheck: (id) => (chk) =>
										if chk
											@client.pageBody.css("background-image": "url('/_/file/images/#{id}.jpg')")
									items: ['#bg0', '#bg1', '#bg2', '#bg3', '#bg4']
								"div .$CC-createbtn":
									"LinkButton #hub_create .smio-bigbutton":
										disabled: true
										labelText: 'hub_create'
										invoke:
											html: '&#x279C;'
											'Hub.create': => u: @input('user/name').val(), p: @input('user/pass').val(), t: @input('hubtitle').val()
											onResult: @onCreateHubResult
			"TabStrip #steptabs .$CC-outer .$CC-steptabs":
				"tabClass": '$CC-steptab'
				"tabs": ['owner', 'template', 'finish']
				"resPrefix": 'steps_'
				"onTabSelect": (tabID) => @onTabSelect(tabID)

input: (sp) =>
	@sub("stepslide/#{sp}/input")

onCreateHubResult: (errs, result, fresp) =>
	return
	if errs
		alert JSON.stringify errs
	else if result
		alert 'no prob'
	else
		alert 'noooo'

onLoad: =>
	super()
	if @urlSeg() isnt '/'
		location.replace('/')
	[$u, $p1, $p2, $t] = [@input('user/name'), @input('user/pass'), @input('user/pass2'), @input('hubtitle')]
	$u.val('test')
	$p1.val('test')
	$p2.val('test')
	$t.val('test')
	@verifyInputs()
	setTimeout((=> @onTabSelect('finish')), 250)

onSlide: (index, itemID) =>
	@ctl('steptabs').selectTab(itemID)

onTabSelect: (tabID) =>
	@ctl('stepslide').scrollTo(tabID)

urlSeg: =>
	if (urlseg = _.trim(@client.pageUrl.attr('path'), '/')) then "/#{urlseg}/" else '/'

verifyInputs: () =>
	[$u, $p1, $p2, $t] = [@input('user/name'), @input('user/pass'), @input('user/pass2'), @input('hubtitle')]
	if ($u.val() isnt (tmp = smio.Util.String.idify(_.trim($u.val()))))
		$u.val(tmp)
	if ($t.val() isnt (tmp = _.trim($t.val())))
		$t.val(tmp)
	@ctl('stepslide/hub_create').disable(not($u.val() and $p1.val() and $p2.val() and ($p1.val() is $p2.val()) and $t.val()))

#endif

