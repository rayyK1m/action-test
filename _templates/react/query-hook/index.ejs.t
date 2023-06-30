---
to: "<%= locals.path ? `${path}/${h.changeCase.camelCase(name)}/index.js` : `query-hooks/${h.changeCase.pascalCase(name)}/index.js` %>"
---
<%
 hookName = h.changeCase.camelCase(name)
%>import { useQuery } from '@tanstack/react-query';
import { EXAMPLE_KEYS } from './keys';
import { fetchExample } from './apis';

const GET = () => {
    return useQuery({ queryKey: EXAMPLE_KEYS.all, queryFn: fetchExample });
};

const <%= hookName %> = {
    GET,
};

export { fetchExample, EXAMPLE_KEYS };
export default <%= hookName %>;
