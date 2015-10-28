# Rendr Applications Test Suite
[work in progress]

This repository is for testing Rendr integration into different build processes and environments.
Simplified version (with automated tests) of [rendr-examples](https://github.com/rendrjs/rendr-examples).


## __api

Shared API service between all the instances, relying on Github API (as Examples do) is not feasible for automated tests.

Should start before any other app.

## grunt__browserify

Tests building Rendr with browserify via grunt.

## grunt__requirejs

Tests building with r.js via grunt, and loading resources with requirejs in the browser.
