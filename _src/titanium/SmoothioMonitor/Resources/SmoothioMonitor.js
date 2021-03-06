var $j = jQuery.noConflict(),
	$t = Titanium,
	lang,
	res,
	resources = {},
	smio = {
		curTabID: '_welcome',
		defs: {
			host: '127.0.0.1',
			port: 61234,
			uptime: 60
		},
		exiting: false,
		instances: {},
		lastWinPos : null,
		winActive: true,
		configOnChanged: function(noModified) {
			var tmp;
			$j('#config_log_lang_o').attr('disabled', !$j('#config_log_lang_other').attr('checked'));
			if ($j('#config_log_lang_en').attr('checked'))
				$j('#config_log_lang_o').val('en');
			else if ($j('#config_log_lang_de').attr('checked'))
				$j('#config_log_lang_o').val('de');
			else if ($j('#config_log_lang_o').val() == 'de')
				$j('#config_log_lang_de').attr('checked', true);
			else if ($j('#config_log_lang_o').val() == 'en')
				$j('#config_log_lang_en').attr('checked', true);
			if (isNaN(parseInt($j('#config_rs_fc').val())))
				$j('#config_rs_fc').val(smio.defs.uptime);
			$j('#span_config_dns')[$j('#config_dns').attr('checked') ? 'show' : 'hide']();
			if ($j('#config_db_host').val() == smio.defs.host)
				$j('#config_db_am_em').attr('checked', true);
			if ($j('#config_db_am_ex').attr('checked')) {
				$j('#config_db_host').attr('disabled', false);
				$j('#config_db_path, #config_db_log').attr('disabled', true);
				$j('#config_db_ar').attr('disabled', false);
			} else {
				$j('#config_db_am_em').attr('checked', true);
				$j('#config_db_host').val(smio.defs.host).attr('disabled', true);
				$j('#config_db_path, #config_db_log').attr('disabled', false);
				$j('#config_db_ar').attr('disabled', true).attr('checked', false);
			}
			if (isNaN(parseInt($j('#config_db_port').val())))
				$j('#config_db_port').val(smio.defs.port);
			$j('#span_config_db_ar')[(tmp = $j('#config_db_ar').attr('checked')) ? 'show' : 'hide']();
			if(!tmp)
				$j('#config_db_au, #config_db_ap').val('');
			if (!noModified) {
				$j('#config_unsaved').css({ "display": "block" });
				$j('#config_info').css({ "display": "none" });
			}
		},
		configRefreshLog: function(logFilePath) {
			var html = '', file, fileStream, lines = [], isQ, ld, lc, lm, ln, lp, lp1, lp2, skip;
			if (logFilePath && (file = $t.Filesystem.getFile(logFilePath)) && file.exists() && file.isFile() && (fileStream = file.open($t.Filesystem.MODE_READ, false, false)))
				try {
					while (line = fileStream.readLine())
						lines.push(line);
					if (lines.length) {
						isQ = ('"' == lines[0].substr(0, 1));
						for (var i = 0; i < lines.length; i++) {
							ln = lines[i];
							skip = false;
							if (isQ) {
								if (skip = (ln.substr(0, 1) != '"'))
									lines[i - 1][2] += ('\n' + ln);
								else {
									ld = ln.substr(1, ln.indexOf('"', 1) - 6);
									lc = ln.substr(lp = ln.indexOf('['), (ln.lastIndexOf(']')) - lp + 1);
									lm = ln.substr(ln.lastIndexOf(']') + 2);
								}
							} else {
								ld = ln.substr(0, (lp = ln.indexOf(':', ln.indexOf(':') + 1) + 3));
								if (((lp1 = ln.indexOf('[', lp)) > 0) && ((lp2 = ln.indexOf(']', lp1)) > lp1)) {
									lc = ln.substr(lp1, lp2 - lp1 + 1);
									lm = ln.substr(lp2 + 2);
								} else {
									lc = "";
									lm = ln.substr(lp + 2);
								}
							}
							if (skip)
								lines[i] = null;
							else
								lines[i] = [ld, lc, lm];
						}
					}
				} catch(err) {
					alert(err + '');
				} finally {
					if (fileStream)
						fileStream.close();
				}
			if (lines && lines.length) {
				html += '<table border="0"><tr><td>Date/Time</td><td>Category</td><td>Message</td></tr>';
				for (var i = 0; i < lines.length; i++)
					if (lines[i])
						html += ('<tr><td>' + _s.escapeHTML(lines[i][0]) + '</td><td>' + _s.escapeHTML(lines[i][1]) + '</td><td>' + _s.escapeHTML(lines[i][2]) + '</td></tr>');
				html += '</table>';
			}
			$j('#subtab_logs_table').html(html);
		},
		configRefreshUI: function(instName, config) {
			var tmp = config.smoothio.language, lastLang = lang, nuLang, arr1, arr2, html;
			$j('#config_log_lang_o').val(tmp);
			if (tmp == 'en')
				$j('#config_log_lang_en').attr('checked', true);
			else if (tmp == 'de')
				$j('#config_log_lang_de').attr('checked', true);
			else
				$j('#config_log_lang_other').attr('checked', true);
			$j('#config_log_path').val(config.smoothio.logging.path);
			$j('#config_log_d').attr('checked', config.smoothio.logging.details);
			$j('#config_log_s').attr('checked', config.smoothio.logging.stack);
			$j('#config_min').attr('checked', config.smoothio.minify);
			$j('#config_rs_cf').attr('checked', config.smoothio.autorestart.on_files_changed);
			$j('#config_rs_fc').val(config.smoothio.autorestart.on_crash_after_uptime_secs + '');
			$j('#config_dns').attr('checked', (smio.platform == 'windows') || config.smoothio.dns_preresolve.enabled);
			if (smio.platform == 'windows')
				$j('#config_dns').attr('disabled', true);
			tmp = '';
			if (config.smoothio.dns_preresolve.hostnames)
				for (var p in config.smoothio.dns_preresolve.hostnames)
					tmp += (p + ':' + config.smoothio.dns_preresolve.hostnames[p] + '\n');
			$j('#config_dns_p').val(tmp).text(tmp);
			$j('#config_db_am_em').attr('checked', config.mongodb.host == smio.defs.host);
			$j('#config_db_am_ex').attr('checked', config.mongodb.host != smio.defs.host);
			$j('#config_db_host').val(config.mongodb.host);
			$j('#config_db_port').val(config.mongodb.port);
			$j('#config_db_path').val(config.mongodb.dbpath);
			$j('#config_db_log').val(config.mongodb.logpath);
			$j('#config_db_ar').attr('checked', config.mongodb.auth);
			if (config.mongodb.auth) {
				$j('#config_db_au').val(config.mongodb.auth.user);
				$j('#config_db_ap').val(config.mongodb.auth.pass);
			}
			smio.configOnChanged(true);
			if (lastLang != (nuLang = $j('#config_log_lang_o').val())) {
				smio.setLang(resources[nuLang] ? nuLang : 'en');
				smio.refreshUI(true, false, false);
			}
			html = '';
			for (var j = 0, l = (arr1 = [config.smoothio.logging.path, config.mongodb.logpath]).length; j < l; j++)
				if (arr1[j] && (arr2 = $t.Filesystem.getFile(smio.rootDir, instName, arr1[j]).parent().getDirectoryListing()))
					for (var k = 0, ll = arr2.length; k < ll; k++)
						if (arr2[k] && arr2[k].isFile())
							html += ('<option value="' + arr2[k] + '">' + _s.escapeHTML((arr2[k] + '').substr(2 + instName.length + (smio.rootDir + '').length)) + '</option>');
			$j('#subtab_logs_select').html(html);
			smio.configRefreshLog();
		},
		configSaveChanges: function(notToFile) {
			var instName = smio.curTabID, config = smio.instances[instName], tmp, tmp2, tmp3, file, fileStream;
			if (config && (notToFile || (smio.daemonPrompt(true) && (file = $t.Filesystem.getFile(smio.rootDir, instName, 'instance.config')))))
				try {
					config.smoothio.language = ((tmp = $j('#config_log_lang_o').val()) ? tmp : 'en');
					config.smoothio.minify = $j('#config_min').attr('checked');
					config.smoothio.logging.path = $j('#config_log_path').val();
					config.smoothio.logging.details = $j('#config_log_d').attr('checked');
					config.smoothio.logging.stack = $j('#config_log_s').attr('checked');
					config.smoothio.autorestart.on_files_changed = $j('#config_rs_cf').attr('checked');
					config.smoothio.autorestart.on_crash_after_uptime_secs = parseInt($j('#config_rs_fc').val());
					config.smoothio.dns_preresolve.enabled = (smio.platform == 'windows') || $j('#config_dns').attr('checked');
					tmp = {};
					if ((tmp2 = $j('#config_dns_p').val().split('\n')) && tmp2.length)
						for (var i = 0, l = tmp2.length; i < l; i++)
							if ((tmp3 = tmp2[i].split(':')) && tmp3.length)
								tmp[tmp3[0]] = tmp3[1];
					config.smoothio.dns_preresolve.hostnames = tmp;
					config.mongodb.host = $j('#config_db_host').val();
					config.mongodb.port = parseInt($j('#config_db_port').val());
					config.mongodb.dbpath = $j('#config_db_path').val();
					config.mongodb.logpath = $j('#config_db_log').val();
					if (tmp = $j('#config_db_ar').attr('checked') ? {} : null) {
						tmp['user'] = $j('#config_db_au').val();
						tmp['pass'] = $j('#config_db_ap').val();
						config.mongodb.auth = tmp;
					} else
						delete config.mongodb['auth'];
					if ((!notToFile) && (fileStream = file.open($t.Filesystem.MODE_WRITE, false, false)))
						fileStream.write(smio.jsonPrettify($t.JSON.stringify(config)));
				} catch(err) {
					alert(err);
				} finally {
					if (fileStream) {
						fileStream.close();
						setTimeout(function() { smio.refreshUI(false, false, true); }, 750);
					}
				}
		},
		daemonGetStatus: function() {
			return 10;
		},
		daemonPrompt: function(temporary) {
			return confirm(res.daemon_confirm1 + res['daemon_confirm' + (temporary ? 2 : 3)] + res.daemon_confirm4);
		},		
		daemonRestart: function() {
		},
		daemonStart: function() {
		},
		daemonStop: function() {
		},
		exit: function() {
			smio.exiting = true;
			smio.unload();
			smio.win.hide();
			setTimeout(function() { $t.App.exit(); }, 125);
		},
		getRootPath: function (appDir) {
			var dir = appDir, dirName;
			while ((dir = dir.parent()) && (dirName = dir['name']()))
				if ((dirName == '_src') || (dirName == '_core'))
					return dir.parent();
			return null;
		},
		jsonPrettify: function(s) {
			var p = [], il = 0, c, e, q = false, t;
			for (var i = 0, l = s.length; i < l; i++)
				if (!(e = ((c = s.substr(i, 1)) == '\\')))
					if (c == '{') {
						il++;
						if (il > 2)
							p.push(c + ' ');
						else {
							p.push(c + '\n');
							for (var j = 0; j < il; j++)
								p.push('\t');
						}
					} else if (c == '}') {
						il--;
						if (il >= 2)
							p.push(' ');
						else {
							p.push('\n');
							for (var j = 0; j < il; j++)
								p.push('\t');
						}
						p.push(c);
					} else if (c == '"') {
						q = !q;
						p.push(c);
					} else if ((!q) && ((c == ':') || (c == ','))) {
						p.push(c + ((t = ((c == ',') && (il <= 2))) ? '\n' : ' '));
						if (t)
							for (var j = 0; j < il; j++)
								p.push('\t');
					} else
						p.push(c);
			return p.join('');
		},
    	mergeDefaults: function(cfg, defs) {
			var defKey, defVal;
			for (defKey in defs) {
				defVal = defs[defKey];
				if ((!(cfg[defKey] != null)) || (typeof cfg[defKey] !== typeof defVal))
					cfg[defKey] = defVal;
				else if ((typeof cfg[defKey] === 'object') && (typeof defVal === 'object'))
					cfg[defKey] = smio.mergeDefaults(cfg[defKey], defVal);
			}
			return cfg;
		},
		onClose: function(ev) {
			smio.lastWinPos = [smio.win.getX(), smio.win.getY()]
			if (smio.exiting)
				return true;
			if (ev && ev['preventDefault'])
				ev.preventDefault();
			setTimeout(smio.win.hide, 250);
			return false;
		},
		refreshUI: function(locs, status, instances) {
			var config, dirName, subFile, subFileStream, lastTab = smio.curTabID, lastTabFound = false, locChanged = false, subDirs, line;
			if (instances) {
				smio.selectTab('_welcome');
				$j('.smon-instnav-institem').remove();
				smio.instances = {};
				try {
					$j('#smon_main').css({ visibility: 'hidden' });
					$j('#config_unsaved').css({ "display": "none" });
					$j('#config_info').css({ "display": "block" });
					if ((subDirs = smio.rootDir.getDirectoryListing()) && subDirs.length)
						for (var i = 0; i < subDirs.length; i++)
							if (subDirs[i].isDirectory() && subDirs[i]['name'] && (dirName = subDirs[i].name()) && dirName.length && (dirName.substr(0, 1) != '_') && (dirName != 'node_modules') && (subFile = $t.Filesystem.getFile(subDirs[i], 'instance.config')) && subFile.exists() && subFile.isFile())
								try {
									subFileStream = null;
									config = '';
									subFileStream = subFile.open($t.Filesystem.MODE_READ, false, false);
									while (line = subFileStream.readLine())
										config += (line + '');
									config = smio.mergeDefaults($t.JSON.parse(config), {
										"smoothio": {
											"enabled": true,
											"processes": 1,
											"autorestart": { "on_files_changed": false, "on_crash_after_uptime_secs": smio.defs.uptime },
											"logging": { "details": false, "stack": false, "path": "server/log/smoothio.log" },
											"language": "en",
											"minify": true,
											"dns_preresolve": { "enabled": (smio.platform == 'windows'), "hostnames": { "localhost": smio.defs.host, "$localhostname": smio.defs.host } }
										},
										"mongodb": {
											"host": smio.defs.host,
											"port": smio.defs.port,
											"dbpath": "server/dbs/",
											"logpath": "server/log/mongodb/mongodb.log"
										}
									});
									smio.instances[dirName] = config;
									if (lastTab == dirName)
										lastTabFound = true;
									$j('.smon-instnav ul').append('<li class="smon-instnav-institem"><a href="#" onclick="smio.selectTab(\'' + dirName + '\');" id="smon_tab_' + dirName + '"><span smon-loc="tabs_title1"></span>' + dirName + '<span smon-loc="tabs_title2"></span></a></li>');
									locChanged = true;
								} catch(err) {
									alert(res.tabs_insterror1 + dirName + res.tabs_insterror2 + '\n\n' + err);
								} finally {
									if (subFileStream)
										subFileStream.close();
								}
				} catch(err2) {
					alert(err2 + "");
				} finally {
					if (lastTabFound)
						smio.selectTab(lastTab);
					$j('#smon_main').css({ visibility: 'visible' });
				}
			}
			if (status) {
				$j('#smon_status').attr('smon-loc', 'toolbar_status_' + smio.daemonGetStatus());
			}
			if (locs || locChanged)
				$j('[smon-loc]').each(function(i, el) {
					var $el = $j(el), rk = $el.attr('smon-loc');
					$el.html(res[rk] + ((rk == 'tabs_welcome') ? (', <b>' + $t.Platform.getUsername() + '</b>') : ''));
				});
		},
		selectSubTab: function(tabID) {
			$j('.smon-subnav').removeClass('smon-subnav-active');
			$j("[smon-loc='subtab_" + tabID + "']").addClass('smon-subnav-active');
			$j('.smon-insttabs-tab').css({ 'display': 'none' });
			setTimeout(function() { $j('#subtab_' + tabID).css({ 'display': 'block' }); }, 10);
		},
		selectTab: function(tabID) {
			var otherID = ((tabID == '_welcome') ? '_inst' : '_welcome'), panelID = ((tabID == '_welcome') ? '_welcome' : '_inst');
			$j('.smon-instnav ul li a').removeClass('smon-instnav-active');
			$j('#smon_tab_' + tabID).addClass('smon-instnav-active');
			$j('#smon_box_' + otherID).slideUp();
			$j('#smon_box_' + panelID).slideDown();
			$j('#inst_headline').html($j('#smon_tab_' + tabID).html());
			smio.curTabID = tabID;
			$j('#config_unsaved').css({ "display": "none" });
			$j('#config_info').css({ "display": "block" });
			if (tabID.substr(0, 1) != '_')
				smio.configRefreshUI(tabID, (smio.instances[tabID]));
		},
		setLang: function(language) {
			res = resources[lang = language];
		},
		show: function() {
			var doShow = !smio.win.isVisible();
			if (doShow) {
				smio.win.show();
				if (smio.lastWinPos) {
					smio.win.setX(smio.lastWinPos[0]);
					smio.win.setY(smio.lastWinPos[1]);
				}
			}
			setTimeout(function() { smio.win.focus(); }, 250);
		},
		toggle: function() {
			if (smio.win.isVisible() && smio.winActive && !smio.win.isMinimized()) {
				smio.lastWinPos = [smio.win.getX(), smio.win.getY()]
				smio.win.close();
			} else
				smio.show();
		},
		unload: function() {
			try {
				smio.tray.remove();
			} catch(err) {
			} finally {
				$t.UI.clearTray();
			}
		}
	};

jQuery(document).ready(function() {
	var l;
	smio.setLang('en');
	if (navigator.language && navigator.language.length && resources[l = navigator.language.substr(0, 2)])
		smio.setLang(l);
	smio.win = $t.UI.getCurrentWindow();
	smio.win.addEventListener($t.CLOSE, smio.onClose);
	smio.trayMenu = $t.UI.createMenu();
	smio.trayMenu.addItem(res.tray_menu_show, smio.show);
	smio.trayMenu.addItem(res.tray_menu_exit, smio.exit);
	smio.tray = $t.UI.addTray("app://smoothio.png", smio.toggle);
	smio.tray.setHint(res.tray_hint);
	smio.tray.setMenu(smio.trayMenu);
	smio.rootDir = smio.getRootPath($t.Filesystem.getApplicationDirectory());
	$j('#smon_os').text($t.Platform.getName());
	$j('#smon_ov').text($t.Platform.getVersion());
	$j('#smon_tv').text($t.getVersion());
	$j('#smon_ar').text($t.Platform.getArchitecture());
	$j('#smon_pc').text($t.Platform.getProcessorCount());
	$j('#smon_pn').text(smio.platform = $t.getPlatform().toLowerCase());
	if (smio.platform.substr(0, 3) == 'win')
		smio.platform = 'windows';
	$j('fieldset div a').each(function(i, a) {
		var $a = $j(a);
		$a.click(function() {
			var att = $a.attr('smon-loc');
			alert($a.text() + '\n\n' + res['h_' + att]);
		});
	}).attr('href', '#');
});

jQuery(window).load(function() {
	smio.refreshUI(true, true, true);
	setInterval(function() { smio.refreshUI(false, true, false); }, 1000);
});

