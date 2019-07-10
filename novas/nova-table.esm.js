/*
* nova-table v0.1.0
* Copyright (c) 2019 erikwett <erik.wetterberg@gmail.com>
* Released under the MIT license.
*/

var properties = {
  showTitles: true,
  title: '',
  subtitle: '',
  footnote: '',
  qHyperCubeDef: {
    qDimensions: [],
    qMeasures: [],
    qInitialDataFetch: [{
      qWidth: 10,
      qHeight: 50
    }]
  }
};

var data = {
  targets: []
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".nova-table {\r\n    font-family: \"Source Sans Pro\", \"Segoe UI\", \"Helvetica Neue\", -apple-system, Arial, sans-serif;\r\n    height: 100%;\r\n    overflow: auto;\r\n}\r\n\r\n.nova-table table td,\r\n.nova-table table th {\r\n    text-align: left;\r\n}\r\n.nova-table table td.numeric {\r\n    text-align: right;\r\n}";
styleInject(css);

function supernova(env) {
  return {
    qae: {
      properties: properties,
      data: data
    },
    component: {
      created: function created() {
        console.log('created', env);
      },
      mounted: function mounted(element) {
        this.element = element;
        this.element.innerHTML = 'nova-table';
      },
      render: function render(_ref) {
        var layout = _ref.layout,
            context = _ref.context;
        var hypercube = layout.qHyperCube;
        var html = '<div class="nova-table"><table><thead><tr>';
        html += hypercube.qDimensionInfo.map(function (d) {
          return "<th>".concat(d.qFallbackTitle, "</th>");
        }).join('');
        html += hypercube.qMeasureInfo.map(function (m) {
          return "<th>".concat(m.qFallbackTitle, "</th>");
        }).join('');
        html += '</tr></thead><tbody>';
        html += hypercube.qDataPages[0].qMatrix.map(function (row) {
          return "<tr>".concat(row.map(function (cell) {
            return "<td".concat(cell.qNum === 'NaN' ? '' : ' class="numeric"', ">").concat(cell.qText, "</td>");
          }).join(''), "</tr>");
        }).join('');
        html += '</tbody></table></div>';
        this.element.innerHTML = html;
      },
      resize: function resize() {},
      willUnmount: function willUnmount() {},
      destroy: function destroy() {}
    }
  };
}

export default supernova;
//# sourceMappingURL=nova-table.esm.js.map
