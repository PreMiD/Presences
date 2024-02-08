interface ImageKeyMap {
	[key: string]: { image: string };
}

const presence = new Presence({
		clientId: "778572824708775946",
	}),
	// Maps editor mode titles to respective images
	langMap: ImageKeyMap = {
		"arma header file": { image: "sqf" },
		actionscript: { image: "as" },
		autohotkey: { image: "ahk" },
		"babel javascript": { image: "babel" },
		batch: { image: "bat" },
		"c#": { image: "csharp" },
		"c++": { image: "cpp" },
		"cmake cache": { image: "cmake" },
		coffeescript: { image: "coffee" },
		"cuda c++": { image: "cuda" },
		diet: { image: "d" },
		"d++": { image: "d" },
		"dm script": { image: "dm" },
		"denizen script": { image: "denizen" },
		"dlangui markup language": { image: "d" },
		dockerfile: { image: "docker" },
		"embedded elixir": { image: "elixir" },
		"f#": { image: "fsharp" },
		gdscript: { image: "godot" },
		"git commit message": { image: "git" },
		"git rebase message": { image: "git" },
		"html (c#)": { image: "cshtml" },
		"html (embedded elixir)": { image: "elixir" },
		"html (twig)": { image: "twig" },
		hxml: { image: "haxe" },
		"haxe ast dump": { image: "haxe" },
		ignore: { image: "git" },
		jsonc: { image: "json" },
		javascript: { image: "js" },
		"javascript react": { image: "jsx" },
		"javascript for automation (jxa)": { image: "js" },
		"julia markdown": { image: "julia" },
		"literate haskell": { image: "haskell" },
		"markdown react": { image: "markdownx" },
		merlin: { image: "ocaml" },
		ocamlbuild: { image: "ocaml" },
		opam: { image: "ocaml" },
		nimble: { image: "nim" },
		"objective-c": { image: "objc" },
		"objective-c++": { image: "objc" },
		"perl 6": { image: "perl" },
		"plain text": { image: "txt" },
		reason: { image: "reasonml" },
		sass: { image: "scss" },
		"shell script": { image: "shell" },
		typescript: { image: "ts" },
		"typescript react": { image: "tsx" },
		"visual basic": { image: "vb" },
		"vue.js": { image: "vue" },
		"vue-postcss": { image: "postcss" },
		"vue-html": { image: "html" },
		xsl: { image: "xml" },
		webassembly: { image: "wasm" },
		"arsd.dscript": { image: "d" },
		"haxe.argument": { image: "haxe" },
		"haxe.type": { image: "haxe" },
		"ocaml.hover.info": { image: "ocaml" },
		"ocaml.hover.type": { image: "ocaml" },
		"reason.hover.info": { image: "reasonml" },
		"reason.hover.signature": { image: "reasonml" },
		"reason.hover.type": { image: "reasonml" },
		"jest-snapshot": { image: "jest" },
		erb: { image: "ruby" },
		"x86 and x86_64 Assembly": { image: "assembly" },
		// Auto-maps keys to identical image keys
	},
	// https://github.com/iCrawl/discord-vscode/blob/master/src/data/languages.json
	knownExtensions: ImageKeyMap = {
		".ahk": { image: "ahk" },
		".ahkl": { image: "ahk" },
		"androidmanifest.xml": { image: "android" },
		"/^angular[^.]*\\.js$/i": { image: "angular" },
		".applescript": { image: "applescript" },
		"/(\\.)?appveyor\\.yml/i": { image: "appveyor" },
		".ino": { image: "arduino" },
		".swf": { image: "as" },
		".as": { image: "as" },
		".jsfl": { image: "as" },
		".swc": { image: "as" },
		".asp": { image: "asp" },
		".asax": { image: "asp" },
		".ascx": { image: "asp" },
		".ashx": { image: "asp" },
		".asmx": { image: "asp" },
		".aspx": { image: "asp" },
		".axd": { image: "asp" },
		"/\\.setTrayTitle(l?a|[ls]?o|out|s|a51|asm|axf|elf|prx|puff|z80)$/i": {
			image: "assembly",
		},
		".agc": { image: "assembly" },
		".ko": { image: "assembly" },
		".lst": { image: "assembly" },
		"/\\.setTrayTitle((c([+px]{2}?)?-?)?objdump|bsdiff|bin|dat|pak|pdb)$/i": {
			image: "assembly",
		},
		".d-objdump": { image: "assembly" },
		"/\\.gcode|\\.gco/i": { image: "assembly" },
		"/\\.rpy[bc]$/i": { image: "assembly" },
		"/\\.py[co]$/i": { image: "assembly" },
		".swp": { image: "assembly" },
		".DS_Store": { image: "assembly" },
		".au3": { image: "autoit" },
		"babel.config.js": { image: "babel" },
		"/\\.babelrc/i": { image: "babel" },
		".bat": { image: "bat" },
		".batch": { image: "bat" },
		".cmd": { image: "bat" },
		"/\\.setTrayTitle(exe|com|msi)$/i": { image: "bat" },
		".reg": { image: "bat" },
		"/^(\\.bowerrc|bower\\.json|Bowerfile)$/i": { image: "bower" },
		"/\\.bf?$/i": { image: "brainfuck" },
		"/\\.c$/i": { image: "c" },
		"/(cargo.toml|cargo.lock)/i": { image: "cargo" },
		"circle.yml": { image: "circleci" },
		".clj": { image: "clojure" },
		".cl2": { image: "clojure" },
		".cljc": { image: "clojure" },
		".cljx": { image: "clojure" },
		".hic": { image: "clojure" },
		"/\\.cljs(cm)?$/i": { image: "clojure" },
		".cmake": { image: "cmake" },
		"/^CMakeLists\\.txt$/": { image: "cmake" },
		"/\\.codeclimate\\.setTrayTitle(yml|json)/i": { image: "codeclimate" },
		".coffee": { image: "coffee" },
		".cjsx": { image: "coffee" },
		".coffee.ecr": { image: "coffee" },
		".coffee.erb": { image: "coffee" },
		".litcoffee": { image: "coffee" },
		".iced": { image: "coffee" },
		"/\\.c[+px]{2}$|\\.cc$/i": { image: "cpp" },
		"/\\.h[+px]{2}$/i": { image: "cpp" },
		"/\\.[it]pp$/i": { image: "cpp" },
		"/\\.setTrayTitle(tcc|inl)$/i": { image: "cpp" },
		".cats": { image: "cpp" },
		".idc": { image: "cpp" },
		".w": { image: "cpp" },
		".nc": { image: "cpp" },
		".upc": { image: "cpp" },
		".xpm": { image: "cpp" },
		"/\\.e?cr$/i": { image: "crystal" },
		".cs": { image: "csharp" },
		".csx": { image: "csharp" },
		".cshtml": { image: "cshtml" },
		//    ".css": { "image": "css" },
		".css.map": { image: "cssmap" },
		".cu": { image: "cuda" },
		"/\\.di?$/i": { image: "d" },
		".dart": { image: "dart" },
		".dfm": { image: "delphi" },
		".dpr": { image: "delphi" },
		".dsc": { image: "denizen" },
		".dm": { image: "dm" },
		".dme": { image: "dm" },
		".dmm": { image: "dm" },
		"/^(Dockerfile|docker-compose)|\\.docker(file|ignore)$/i": {
			image: "docker",
		},
		"/^docker-sync\\.yml$/i": { image: "docker" },
		".editorconfig": { image: "editorconfig" },
		".ejs": { image: "ejs" },
		".ex": { image: "elixir" },
		"/\\.setTrayTitle(exs|l?eex)$/i": { image: "elixir" },
		"/^mix\\.setTrayTitle(exs?|lock)$/i": { image: "elixir" },
		".elm": { image: "elm" },
		".env": { image: "env" },
		".erl": { image: "erlang" },
		".beam": { image: "erlang" },
		".hrl": { image: "erlang" },
		".xrl": { image: "erlang" },
		".yrl": { image: "erlang" },
		".app.src": { image: "erlang" },
		"/^Emakefile$/": { image: "erlang" },
		"/^rebar(\\.config)?\\.lock$/i": { image: "erlang" },
		"/\\.setTrayTitle(eslintrc|eslintignore)/i": { image: "eslint" },
		"/(\\.firebaserc|firebase\\.json)/i": { image: "firebase" },
		".flowconfig": { image: "flowconfig" },
		".fs": { image: "fsharp" },
		".fsi": { image: "fsharp" },
		".fsscript": { image: "fsharp" },
		".fsx": { image: "fsharp" },
		"/gatsby-(browser|node|ssr|config)\\.js/i": { image: "gatsbyjs" },
		"/^Gemfile(\\.lock)?$/i": { image: "gemfile" },
		"/^\\.git|^\\.keep$|\\.mailmap$/i": { image: "git" },
		".go": { image: "go" },
		".gd": { image: "godot" },
		".gradle": { image: "gradle" },
		gradlew: { image: "gradle" },
		".gql": { image: "graphql" },
		".graphql": { image: "graphql" },
		".groovy": { image: "groovy" },
		".gvy": { image: "groovy" },
		".gy": { image: "groovy" },
		".gsh": { image: "groovy" },
		"/gruntfile\\.setTrayTitle(js|coffee)/i": { image: "gruntfile" },
		"gulpfile.js": { image: "gulp" },
		"/\\.setTrayTitle(hbs|handlebars|(mu)?stache)$/i": { image: "handlebars" },
		".prg": { image: "harbour" },
		".hbp": { image: "harbour" },
		".hbc": { image: "harbour" },
		".rc": { image: "harbour" },
		".fmg": { image: "harbour" },
		".hs": { image: "haskell" },
		".hsc": { image: "haskell" },
		".c2hs": { image: "haskell" },
		".lhs": { image: "haskell" },
		".hx": { image: "haxe" },
		".hxml": { image: "haxe" },
		"/^procfile/i": { image: "heroku" },
		"heroku.yml": { image: "heroku" },
		".hjson": { image: "hjson" },
		"/\\.x?html?$/i": { image: "html" },
		".http": { image: "http" },
		".rest": { image: "http" },
		".jar": { image: "java" },
		".java": { image: "java" },
		"jest.config.js": { image: "jest" },
		//    ".js": { "image": "js" },
		".es6": { image: "js" },
		".es": { image: "js" },
		".mjs": { image: "js" },
		".js.map": { image: "jsmap" },
		//    ".json": { "image": "json" },
		".jsonc": { image: "json" },
		".jsx": { image: "jsx" },
		"/\\.setTrayTitle(jil|jl)/i": { image: "julia" },
		".ipynb": { image: "jupyter" },
		".kt": { image: "kotlin" },
		".ktm": { image: "kotlin" },
		".kts": { image: "kotlin" },
		".less": { image: "less" },
		".lsp": { image: "lisp" },
		".lisp": { image: "lisp" },
		".l": { image: "lisp" },
		".nl": { image: "lisp" },
		".ny": { image: "lisp" },
		".podsl": { image: "lisp" },
		".sexp": { image: "lisp" },
		".ls": { image: "livescript" },
		".log": { image: "log" },
		".lua": { image: "lua" },
		".pd_lua": { image: "lua" },
		".rbxs": { image: "lua" },
		".wlua": { image: "lua" },
		"/^Makefile/": { image: "makefile" },
		"/^mk\\.config$/": { image: "makefile" },
		"/\\.setTrayTitle(mk|mak|make)$/i": { image: "makefile" },
		"/^BSDmakefile$/i": { image: "makefile" },
		"/^GNUmakefile$/i": { image: "makefile" },
		"/^makefile\\.sco$/i": { image: "makefile" },
		"/^Kbuild$/": { image: "makefile" },
		"/^makefile$/": { image: "makefile" },
		"/^mkfile$/i": { image: "makefile" },
		"/^\\.?qmake$/i": { image: "makefile" },
		"/\\.setTrayTitle(h|geo|topo)$/i": { image: "manifest" },
		".cson": { image: "manifest" },
		".json5": { image: "manifest" },
		".ndjson": { image: "manifest" },
		".fea": { image: "manifest" },
		".json.eex": { image: "manifest" },
		".proto": { image: "manifest" },
		".pytb": { image: "manifest" },
		".pydeps": { image: "manifest" },
		"/\\.pot?$/i": { image: "manifest" },
		".ejson": { image: "manifest" },
		".edn": { image: "manifest" },
		".eam.fs": { image: "manifest" },
		".qml": { image: "manifest" },
		".qbs": { image: "manifest" },
		".ston": { image: "manifest" },
		".ttl": { image: "manifest" },
		".rviz": { image: "manifest" },
		".syntax": { image: "manifest" },
		".webmanifest": { image: "manifest" },
		"/^pkginfo$/": { image: "manifest" },
		"/^mime\\.types$/i": { image: "manifest" },
		"/^METADATA\\.pb$/": { image: "manifest" },
		"/[\\/\\\\](?:magic[\\/\\\\]Magdir|file[\\/\\\\]magic)[\\/\\\\][-.\\w]+$/i":
			{
				image: "manifest",
			},
		"/(\\\\|\\/)dev[-\\w]+\\1(?:[^\\\\\\/]+\\1)*(?!DESC|NOTES)(?:[A-Z][-A-Z]*)(?:\\.in)?$/":
			{
				image: "manifest",
			},
		"lib/icons/.icondb.js": { image: "manifest" },
		"/\\.git[\\/\\\\](.*[\\/\\\\])?(HEAD|ORIG_HEAD|packed-refs|logs[\\/\\\\](.+[\\/\\\\])?[^\\/\\\\]+)$/":
			{
				image: "manifest",
			},
		"/\\.setTrayTitle(md|mdown|markdown|mkd|mkdown|mdwn|mkdn|rmd|ron|pmd)$/i": {
			image: "markdown",
		},
		".mdx": { image: "markdownx" },
		".marko": { image: "marko" },
		".nim": { image: "nim" },
		".nims": { image: "nim" },
		".nimble": { image: "nim" },
		".nix": { image: "nix" },
		"nodemon.json": { image: "nodemon" },
		".npmrc": { image: "npm" },
		"/\\.mm?$/i": { image: "objc" },
		".pch": { image: "objc" },
		".x": { image: "objc" },
		".ml": { image: "ocaml" },
		".mli": { image: "ocaml" },
		".eliom": { image: "ocaml" },
		".eliomi": { image: "ocaml" },
		".ml4": { image: "ocaml" },
		".mll": { image: "ocaml" },
		".mly": { image: "ocaml" },
		"/\\.pas(cal)?$/i": { image: "pascal" },
		".lpr": { image: "pascal" },
		".p": { image: "pawn" },
		".inc": { image: "pawn" },
		".sma": { image: "pawn" },
		".pwn": { image: "pawn" },
		".sp": { image: "pawn" },
		"/\\.p(er)?l$/i": { image: "perl" },
		".al": { image: "perl" },
		".ph": { image: "perl" },
		".plx": { image: "perl" },
		".pm": { image: "perl" },
		"/\\.setTrayTitle(psgi|xs)$/i": { image: "perl" },
		".pl6": { image: "perl" },
		"/\\.[tp]6$|\\.6pl$/i": { image: "perl" },
		"/\\.setTrayTitle(pm6|p6m)$/i": { image: "perl" },
		".6pm": { image: "perl" },
		".nqp": { image: "perl" },
		".p6l": { image: "perl" },
		".pod6": { image: "perl" },
		"/^Rexfile$/": { image: "perl" },
		"/\\.php([st\\d]|_cs)?$/i": { image: "php" },
		"/^Phakefile/": { image: "php" },
		".pony": { image: "ponylang" },
		".pcss": { image: "postcss" },
		".ps1": { image: "powershell" },
		".psd1": { image: "powershell" },
		".psm1": { image: "powershell" },
		".ps1xml": { image: "powershell" },
		".prettierignore": { image: "prettier" },
		"/\\.prettier((rc)|(\\.setTrayTitle(toml|yml|yaml|json|js))?$){2}/i": {
			image: "prettier",
		},
		"prettier.config.js": { image: "prettier" },
		"prisma.yml": { image: "prisma" },
		".pde": { image: "processing" },
		".jade": { image: "pug" },
		".pug": { image: "pug" },
		".purs": { image: "purescript" },
		".py": { image: "python" },
		".ipy": { image: "python" },
		".isolate": { image: "python" },
		".pep": { image: "python" },
		".gyp": { image: "python" },
		".gypi": { image: "python" },
		".pyde": { image: "python" },
		".pyp": { image: "python" },
		".pyt": { image: "python" },
		".py3": { image: "python" },
		".pyi": { image: "python" },
		".pyw": { image: "python" },
		".tac": { image: "python" },
		".wsgi": { image: "python" },
		".xpy": { image: "python" },
		".rpy": { image: "python" },
		"/\\.?(pypirc|pythonrc|python-venv)$/i": { image: "python" },
		"/^(SConstruct|SConscript)$/": { image: "python" },
		"/^(Snakefile|WATCHLISTS)$/": { image: "python" },
		"/^wscript$/": { image: "python" },
		"/\\.setTrayTitle(r|Rprofile|rsx|rd)$/i": { image: "r" },
		".re": { image: "reasonml" },
		"/\\.setTrayTitle(rb|ru|ruby|erb|gemspec|god|mspec|pluginspec|podspec|rabl|rake|opal)$/i":
			{
				image: "ruby",
			},
		"/^\\.?(irbrc|gemrc|pryrc|ruby-(gemset|version))$/i": { image: "ruby" },
		"/^(Appraisals|(Rake|[bB]uild|Cap|Danger|Deliver|Fast|Guard|Jar|Maven|Pod|Puppet|Snap)file(\\.lock)?)$/":
			{
				image: "ruby",
			},
		"/\\.setTrayTitle(jbuilder|rbuild|rb[wx]|builder)$/i": { image: "ruby" },
		"/^rails$/": { image: "ruby" },
		".watchr": { image: "ruby" },
		".rs": { image: "rust" },
		"/\\.setTrayTitle(sc|scala)$/i": { image: "scala" },
		".scss": { image: "scss" },
		".sass": { image: "scss" },
		"/\\.setTrayTitle(sh|rc|bats|bash|tool|install|command)$/i": {
			image: "shell",
		},
		"/^(\\.?bash(rc|[-_]?(profile|login|logout|history|prompt))|_osc|config|install-sh|PKGBUILD)$/i":
			{
				image: "shell",
			},
		"/\\.setTrayTitle(ksh|mksh|pdksh)$/i": { image: "shell" },
		".sh-session": { image: "shell" },
		"/\\.zsh(-theme|_history)?$|^\\.?(antigen|zpreztorc|zlogin|zlogout|zprofile|zshenv|zshrc)$/i":
			{
				image: "shell",
			},
		"/\\.fish$|^\\.fishrc$/i": { image: "shell" },
		"/^\\.?(login|profile)$/": { image: "shell" },
		".inputrc": { image: "shell" },
		".tmux": { image: "shell" },
		"/^(configure|config\\.setTrayTitle(guess|rpath|status|sub)|depcomp|libtool|compile)$/":
			{
				image: "shell",
			},
		"/^\\/(private\\/)?etc\\/([^\\/]+\\/)*(profile$|nanorc$|rc\\.|csh\\.)/i": {
			image: "shell",
		},
		"/^\\.?cshrc$/i": { image: "shell" },
		".profile": { image: "shell" },
		".tcsh": { image: "shell" },
		".csh": { image: "shell" },
		".sqf": { image: "sqf" },
		"/\\.setTrayTitle(my)?sql$/i": { image: "sql" },
		".ddl": { image: "sql" },
		".udf": { image: "sql" },
		".hql": { image: "sql" },
		".viw": { image: "sql" },
		".prc": { image: "sql" },
		".cql": { image: "sql" },
		".db2": { image: "sql" },
		"/\\.setTrayTitle(styl|stylus)$/i": { image: "stylus" },
		".svelte": { image: "svelte" },
		".svg": { image: "svg" },
		".swift": { image: "swift" },
		".tex": { image: "tex" },
		".ltx": { image: "tex" },
		".aux": { image: "tex" },
		".sty": { image: "tex" },
		".dtx": { image: "tex" },
		".cls": { image: "tex" },
		".ins": { image: "tex" },
		".lbx": { image: "tex" },
		".mkiv": { image: "tex" },
		".mkvi": { image: "tex" },
		".mkii": { image: "tex" },
		".texi": { image: "tex" },
		"/^hyphen(ex)?\\.setTrayTitle(cs|den|det|fr|sv|us)$/": { image: "tex" },
		"/\\.te?xt$/i": { image: "text" },
		".rtf": { image: "text" },
		"/\\.i?nfo$/i": { image: "text" },
		".msg": { image: "text" },
		"/\\.setTrayTitle(utxt|utf8)$/i": { image: "text" },
		".toml": { image: "toml" },
		".travis.yml": { image: "travis" },
		".ts": { image: "ts" },
		".tsx": { image: "tsx" },
		".twig": { image: "twig" },
		".v": { image: "v" },
		".vh": { image: "v" },
		".vala": { image: "vala" },
		".vapi": { image: "vala" },
		".vb": { image: "vb" },
		".vbs": { image: "vb" },
		".vbhtml": { image: "vb" },
		".vbproj": { image: "vb" },
		".vba": { image: "vba" },
		".vcxproj": { image: "vcxproj" },
		".vscodeignore": { image: "vscodeignore" },
		".vue": { image: "vue" },
		".wat": { image: "wasm" },
		".wast": { image: "wasm" },
		".wasm": { image: "wasm" },
		"/webpack(\\.dev|\\.development|\\.prod|\\.production)?\\.config(\\.babel)?\\.setTrayTitle(js|jsx|coffee|ts|json|json5|yaml|yml)/i":
			{
				image: "webpack",
			},
		".xml": { image: "xml" },
		"/\\.ya?ml$/i": { image: "yaml" },
		"/^yarn(\\.lock)?$/i": { image: "yarn" },
		".yarnrc": { image: "yarn" },
		".zig": { image: "zig" },

		".json": { image: "json" },
		".js": { image: "js" },
		".css": { image: "css" },
	},
	assets = {
		arduino:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626496792363050.png?size=512",
		appveyor:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626496792494113.png?size=512",
		assembly:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626496993820694.png?size=512",
		ahk: "https://cdn.discordapp.com/app-assets/778572824708775946/778626496998801408.png?size=512",
		angular:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626497085702185.png?size=512",
		android:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626497098809395.png?size=512",
		as: "https://cdn.discordapp.com/app-assets/778572824708775946/778626497237352488.png?size=512",
		applescript:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626497249280060.png?size=512",
		c: "https://cdn.discordapp.com/app-assets/778572824708775946/778626497435009074.png?size=512",
		asp: "https://cdn.discordapp.com/app-assets/778572824708775946/778626497459388466.png?size=512",
		bower:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626497480753162.png?size=512",
		bat: "https://cdn.discordapp.com/app-assets/778572824708775946/778626497568702534.png?size=512",
		autoit:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626497695055942.png?size=512",
		cargo:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626497791393834.png?size=512",
		cmake:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626498584117309.png?size=512",
		clojure:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626498915467304.png?size=512",
		circleci:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626499082977310.png?size=512",
		brainfuck:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626499493494815.png?size=512",
		css: "https://cdn.discordapp.com/app-assets/778572824708775946/778626499553001504.png?size=512",
		crystal:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626499577643049.png?size=512",
		elm: "https://cdn.discordapp.com/app-assets/778572824708775946/778626603818156032.png?size=512",
		cshtml:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626499674112071.png?size=512",
		docker:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626499728113735.png?size=512",
		cssmap:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626499750264833.png?size=512",
		coffee:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626499762454569.png?size=512",
		dart: "https://cdn.discordapp.com/app-assets/778572824708775946/778626499874914304.png?size=512",
		dm: "https://cdn.discordapp.com/app-assets/778572824708775946/778626499938091038.png?size=512",
		elixir:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626603764416543.png?size=512",
		d: "https://cdn.discordapp.com/app-assets/778572824708775946/778626500042948648.png?size=512",
		cuda: "https://cdn.discordapp.com/app-assets/778572824708775946/778626500068245514.png?size=512",
		denizen:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626500080697344.png?size=512",
		cpp: "https://cdn.discordapp.com/app-assets/778572824708775946/778626500097474591.png?size=512",
		ejs: "https://cdn.discordapp.com/app-assets/778572824708775946/778626603915804722.png?size=512",
		delphi:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626500324753419.png?size=512",
		csharp:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626500340613121.png?size=512",
		editorconfig:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626500462903376.png?size=512",
		fsharp:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626603567677501.png?size=512",
		flowconfig:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626603625873468.png?size=512",
		env: "https://cdn.discordapp.com/app-assets/778572824708775946/778626603626266624.png?size=512",
		firebase:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626603861016596.png?size=512",
		git: "https://cdn.discordapp.com/app-assets/778572824708775946/778626603898634251.png?size=512",
		gemfile:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626603974000653.png?size=512",
		haskell:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604011225120.png?size=512",
		erlang:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604058279943.png?size=512",
		heroku:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604255019048.png?size=512",
		gradle:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604263145472.png?size=512",
		go: "https://cdn.discordapp.com/app-assets/778572824708775946/778626604317802556.png?size=512",
		handlebars:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604318195752.png?size=512",
		eslint:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604410339348.png?size=512",
		haxe: "https://cdn.discordapp.com/app-assets/778572824708775946/778626604451889202.png?size=512",
		harbour:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604481511454.png?size=512",
		gulp: "https://cdn.discordapp.com/app-assets/778572824708775946/778626604515590194.png?size=512",
		godot:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604522930207.png?size=512",
		graphql:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604536299530.png?size=512",
		groovy:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604611403786.png?size=512",
		gruntfile:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626604862537748.png?size=512",
		json: "https://cdn.discordapp.com/app-assets/778572824708775946/778626758777372714.png?size=512",
		julia:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626758819446795.png?size=512",
		log: "https://cdn.discordapp.com/app-assets/778572824708775946/778626758936494100.png?size=512",
		hjson:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626758995083265.png?size=512",
		jsx: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759019986965.png?size=512",
		js: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759079755776.png?size=512",
		jsmap:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626759167442984.png?size=512",
		makefile:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626759196672020.png?size=512",
		kotlin:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626759264043049.png?size=512",
		html: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759309787136.png?size=512",
		http: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759326957588.png?size=512",
		lua: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759330365480.png?size=512",
		less: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759347142726.png?size=512",
		livescript:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626759356186624.png?size=512",
		jest: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759423688755.png?size=512",
		java: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759427489833.png?size=512",
		lisp: "https://cdn.discordapp.com/app-assets/778572824708775946/778626759494467584.png?size=512",
		jupyter:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626759566426112.png?size=512",
		manifest:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626863445704714.png?size=512",
		marko:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626863508619265.png?size=512",
		npm: "https://cdn.discordapp.com/app-assets/778572824708775946/778626863568125963.png?size=512",
		nim: "https://cdn.discordapp.com/app-assets/778572824708775946/778626863626846239.png?size=512",
		markdownx:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626863802220544.png?size=512",
		markdown:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626863849275432.png?size=512",
		nodemon:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864062529536.png?size=512",
		r: "https://cdn.discordapp.com/app-assets/778572824708775946/778626864168042518.png?size=512",
		prisma:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864247472140.png?size=512",
		reasonml:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864256253972.png?size=512",
		python:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864309731370.png?size=512",
		php: "https://cdn.discordapp.com/app-assets/778572824708775946/778626864310779915.png?size=512",
		powershell:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864457318400.png?size=512",
		ocaml:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864473178162.png?size=512",
		perl: "https://cdn.discordapp.com/app-assets/778572824708775946/778626864590880770.png?size=512",
		prettier:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864625352755.png?size=512",
		pawn: "https://cdn.discordapp.com/app-assets/778572824708775946/778626864632954891.png?size=512",
		purescript:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864679616522.png?size=512",
		objc: "https://cdn.discordapp.com/app-assets/778572824708775946/778626864754196501.png?size=512",
		ponylang:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864779362315.png?size=512",
		postcss:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626864801382441.png?size=512",
		pug: "https://cdn.discordapp.com/app-assets/778572824708775946/778626864889069638.png?size=512",
		pascal:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626865006379018.png?size=512",
		processing:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626865317150780.png?size=512",
		ruby: "https://cdn.discordapp.com/app-assets/778572824708775946/778626966601465857.png?size=512",
		rust: "https://cdn.discordapp.com/app-assets/778572824708775946/778626966831366158.png?size=512",
		scss: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967024042056.png?size=512",
		stylus:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626967082762293.png?size=512",
		shell:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626967137288253.png?size=512",
		scala:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626967272423444.png?size=512",
		sqf: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967373086730.png?size=512",
		sql: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967502716958.png?size=512",
		svelte:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626967619633182.png?size=512",
		swift:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626967653056523.png?size=512",
		svg: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967657381898.png?size=512",
		toml: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967665901589.png?size=512",
		txt: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967741530153.png?size=512",
		travis:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626967754113034.png?size=512",
		tex: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967783342097.png?size=512",
		text: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967834066985.png?size=512",
		tsx: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967846125629.png?size=512",
		ts: "https://cdn.discordapp.com/app-assets/778572824708775946/778626967871422494.png?size=512",
		v: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968030806086.png?size=512",
		yaml: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968077205515.png?size=512",
		vb: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968093589515.png?size=512",
		vcxproj:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626968236720139.png?size=512",
		yarn: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968471863327.png?size=512",
		wasm: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968497291294.png?size=512",
		vala: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968542773268.png?size=512",
		xml: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968546443264.png?size=512",
		vue: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968559550474.png?size=512",
		vba: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968563744808.png?size=512",
		vscodeignore:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626968580653066.png?size=512",
		zig: "https://cdn.discordapp.com/app-assets/778572824708775946/778626968656281621.png?size=512",
		webpack:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778626968668078089.png?size=512",
		twig: "https://cdn.discordapp.com/app-assets/778572824708775946/778665403249328168.png?size=512",
		gatsbyjs:
			"https://cdn.discordapp.com/app-assets/778572824708775946/778669774548238357.png?size=512",
	};

const enum Assets {
	Logo = "https://cdn.discordapp.com/app-assets/778572824708775946/778589484630802472.png?size=512",
	Idle = "https://cdn.discordapp.com/app-assets/778572824708775946/778589525693562881.png?size=512",
	Logo2 = "https://cdn.discordapp.com/app-assets/778572824708775946/778599011362930688.png?size=512",
}
let lastFileChange: number = null,
	lastFile: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			smallImageKey: Assets.Logo,
			smallImageText: "GitHub Codespaces",
		},
		activeTab = document.querySelector(".tab.active"),
		editorMode = document.querySelector("#status.editor.mode");

	// Preparing Screen
	if (document.querySelector(".vscs-splash-screen-steps-pane")) {
		presenceData.largeImageKey = Assets.Logo2;
		presenceData.details = "Preparing a codespace...";
		delete presenceData.smallImageKey;

		if (document.querySelector(".vso-splash-screen__button"))
			presenceData.details = "Inactive Codespace";
		// Idle/Start Screen
	} else if (activeTab && editorMode) {
		const scmTab = Array.from(document.querySelectorAll("#status\\.scm"))
				.reverse()
				.find(scmTab => scmTab && scmTab.hasAttribute("aria-label")),
			workspace = scmTab
				? scmTab.getAttribute("aria-label").split("(Git)")[0]
				: null,
			filename = activeTab.getAttribute("data-resource-name"),
			filepath = activeTab.getAttribute("title"),
			syntaxMode = editorMode.getAttribute("aria-label").toLowerCase(),
			largeImageKey =
				knownExtensions[
					Object.keys(knownExtensions).find(key => {
						if (filename.endsWith(key)) return true;
						const match = /^\/(.*)\/([mgiy]+)$/.exec(key);
						if (!match) return false;
						return new RegExp(match[1], match[2]).test(filename);
					})
				] ?? (syntaxMode in langMap ? langMap[syntaxMode] : null);

		if (lastFile !== filepath) {
			lastFile = filepath;
			lastFileChange = Date.now();
		}

		presenceData.startTimestamp = lastFileChange;
		presenceData.largeImageKey =
			assets[
				(largeImageKey ? largeImageKey.image : "txt") as keyof typeof assets
			];
		presenceData.details = (await presence.getSetting<string>("details"))
			.replaceAll("%file%", filename)
			.replaceAll("%path%", filepath)
			.replaceAll("%folder%", filepath.split("/").reverse()[1])
			.replaceAll(
				"%ext%",
				(largeImageKey ? largeImageKey.image : "txt").toUpperCase()
			)
			.replaceAll("%workspace%", workspace || "N/A")
			.replaceAll(
				"%workspaceOrFolder%",
				workspace || filepath.split("/").reverse()[1]
			);
		presenceData.state = (await presence.getSetting<string>("state"))
			.replaceAll("%file%", filename)
			.replaceAll("%path%", filepath)
			.replaceAll("%folder%", filepath.split("/").reverse()[1])
			.replaceAll(
				"%ext%",
				(largeImageKey ? largeImageKey.image : "txt").toUpperCase()
			)
			.replaceAll("%workspace%", workspace || "N/A")
			.replaceAll(
				"%workspaceOrFolder%",
				workspace || filepath.split("/").reverse()[1]
			);
	} else if (!editorMode) {
		presenceData.largeImageKey = Assets.Idle;
		presenceData.details = "Idling";
	}

	if (!presenceData.largeImageKey) presence.setActivity();
	else presence.setActivity(presenceData);
});
