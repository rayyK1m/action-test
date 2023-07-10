---
to: "<%= locals.path ? `${path}/${h.changeCase.camelCase(name)}/apis.js` : `query-hooks/${h.changeCase.camelCase(name)}/apis.js` %>"
---
import axios from 'axios';

const exampleApis = {
    getExample,
};
export default exampleApis;