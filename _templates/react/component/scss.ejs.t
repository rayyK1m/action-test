---
to: "<%= locals.path ? `${path}/${h.changeCase.pascalCase(name)}/${h.changeCase.pascalCase(name)}.module.scss` : `components/${h.changeCase.pascalCase(name)}/${h.changeCase.pascalCase(name)}.module.scss` %>"
---