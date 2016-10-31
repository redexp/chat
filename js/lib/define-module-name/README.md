# define-module-name
Simple module definition lib

[![Build Status](https://travis-ci.org/redexp/define-module-name.svg?branch=master)](https://travis-ci.org/redexp/define-module-name)

This lib is just like `RequireJS` (which is much more powerful). But `RequireJS` is useful while you developing, on production you no need all of that async loading, all scripts should be concat and minified. For that we using `r.js` with complicated config. 

Main difference between `RequireJS` is that `define-module-name` is created to work with already loaded scripts (much less code ~200 lines) and to give possibility to set a name to anonymous modules without complicated config. 

## Install

`bower install define-module-name`

## Usage

Just call `define('name-of-next-anonymous-module')` before script with anonymous module definition and it will be defined with this name. Every name will be put in FIFO queue so you can define in one file all names and then in same order include anonymous modules.
