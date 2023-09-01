BASE_DIR=$(CURDIR)

.PHONY: install dist test clean

install:
	npm install

dist:
	npm run build

test:
	npm test

clean:
	rm -rf dist
	rm -rf node_modules
	rm -f package-lock.json
