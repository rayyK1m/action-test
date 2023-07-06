---
to: "<%= locals.path ? `${path}/${h.changeCase.camelCase(name)}/index.js` : `query-hooks/${h.changeCase.pascalCase(name)}/index.js` %>"
---
<%
 hookName = h.changeCase.camelCase(name)
%>import { useQuery } from '@tanstack/react-query';
import { fetchExample } from './apis';
import exampleKeys from './keys';

const GET = () => {
    return useQuery({ queryKey: exampleKeys.all, queryFn: fetchExample });
};

const <%= hookName %> = {
    GET,
};

export { fetchExample, exampleKeys };
export default <%= hookName %>;
