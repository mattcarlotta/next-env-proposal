require("@noshot/env");
const React = require("react");
const { JSDOM } = require("jsdom");
const { configure } = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");

configure({ adapter: new Adapter() });

/* THE BELOW ARE ACCESSIBLE AND PREDEFINED FOR ALL *.TEST.JS FILES */

const { document } = new JSDOM(
  "<!DOCTYPE html><body><div id='root'></div></body>"
).window;
global.document = document;
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;
global.React = React;

global.navigator = {
  userAgent: "node",
};
