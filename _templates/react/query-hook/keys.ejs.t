---
to: "<%= locals.path ? `${path}/${h.changeCase.camelCase(name)}/keys.js` : `query-hooks/${h.changeCase.pascalCase(name)}/keys.js` %>"
---
export const exampleKeys = {
    all: () => ['example'],
};

export default exampleKeys;