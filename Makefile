6TO5_CMD=./node_modules/.bin/6to5
MOCHA_CMD=./node_modules/.bin/mocha

SRC_JS = $(shell find src -name "*.js")
LIB_JS = $(patsubst src/%.js,lib/%.js,$(SRC_JS))

build: js

test: build
	$(MOCHA_CMD) lib/**/__tests__/*-test.js --require ./lib/test-init.js

js: $(LIB_JS) lib/bin/json-sass

$(LIB_JS): lib/%.js: src/%.js
	mkdir -p $(dir $@) && $(6TO5_CMD) $< -o $@ --experimental

lib/bin/json-sass:
	mkdir -p $(dir $@) && $(6TO5_CMD) src/bin/json-sass -o $@ --experimental

clean:
	rm -rf lib/

.PHONY: build test js clean
