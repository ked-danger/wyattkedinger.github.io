// Runs the original Morph module (morph.js) without the Next.js app it was built in.
// It supplies the three things the module asks for — React's JSX runtime, React, and GSAP —
// then mounts the component into #morph-root.
(function () {
  var React = window.React;
  var jsx = function (type, props, key) {
    var p = Object.assign({}, props);
    if (key !== undefined) p.key = key;
    return React.createElement(type, p);
  };
  var modules = {
    43476: { jsx: jsx, jsxs: jsx, Fragment: React.Fragment }, // react/jsx-runtime
    71645: React,                                            // react
    89970: { get gsap() { return window.gsap; } }            // gsap
  };
  window.TURBOPACK = {
    push: function (chunk) {
      for (var i = 1; i < chunk.length; i += 2) {
        if (chunk[i] !== 70434) continue;
        chunk[i + 1]({
          i: function (id) { return modules[id]; },
          s: function (list) {
            for (var j = 0; j < list.length; j += 3) if (list[j] === "default") window.__MorphComponent = list[j + 2];
          }
        });
      }
    }
  };
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("morph-root");
    if (root && window.__MorphComponent) {
      window.ReactDOM.createRoot(root).render(React.createElement(window.__MorphComponent, {}));
    }
  });
})();
