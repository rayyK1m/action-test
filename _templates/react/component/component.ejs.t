---
to: "<%= locals.path ? `${path}/${h.changeCase.pascalCase(name)}/${h.changeCase.pascalCase(name)}.jsx` : `components/${h.changeCase.pascalCase(name)}/${h.changeCase.pascalCase(name)}.jsx` %>"
---
<%
 componentName = h.changeCase.pascalCase(name)
%>import styles from './<%= componentName %>.module.scss';

function <%= componentName %>({}) {
    return <div></div>;
}

export default <%= componentName %>;