NODE := node
NPM := npm

build: package.json package-lock.json node_modules/.timestamp
	${NPM} run build
.PHONY: build

clean:
	rm -rf dist/
.PHONY: clean

distclean:
.PHONY: clean

lint:
	${NPM} run lint
.PHONY: clean

test:
	${NPM} run test
.PHONY: test

server: dist/cli.js
	${NPM} run server
.PHONY: server

dist/cli.js: build

node_modules/.timestamp:
	rm -rf node_modules/
	${NPM} install
	touch ${.TARGET}
