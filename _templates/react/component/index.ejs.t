---
to: "<%= locals.path ? `${path}/${h.changeCase.pascalCase(name)}/index.js` : `components/${h.changeCase.pascalCase(name)}/index.js` %>"
---
<%
 componentName = h.changeCase.pascalCase(name)
%>import <%= componentName %> from './<%= componentName %>';

export default <%= componentName %>;
