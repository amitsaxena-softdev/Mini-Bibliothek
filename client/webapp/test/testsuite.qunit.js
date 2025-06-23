sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: my.bookapp",
		defaults: {
			page: "ui5://test-resources/my/bookapp/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "my/bookapp/",
				never: "test-resources/my/bookapp/"
			},
			loader: {
				paths: {
					"my/bookapp": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for my.bookapp"
			},
			"integration/opaTests": {
				title: "Integration tests for my.bookapp"
			}
		}
	};
});
