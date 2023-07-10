---
to: "<%= locals.path ? `${path}/${h.changeCase.camelCase(name)}/index.js` : `query-hooks/${h.changeCase.pascalCase(name)}/index.js` %>"
---
<%
 hookName = h.changeCase.camelCase(name)
%>import { useQuery } from '@tanstack/react-query';
import exampleKeys from './keys';
import exampleApis from './apis';

const useGetExample = () => {
    return useQuery({ queryKey: exampleKeys.all(), queryFn: exampleApis.getExample });
};


export { useGetExample, exampleKeys, exampleApis };
