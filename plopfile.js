/* eslint-disable @typescript-eslint/no-var-requires */
const _ = require('lodash');

module.exports = function(plop) {
  plop.setGenerator('component', {
    description: 'A public React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter component name',
      },
    ],
    actions: [
      {
        path: 'src/components/{{pascalCase name}}.tsx',
        templateFile: '.plop/component.hbs',
        type: 'add',
      },
      {
        path: 'stories/Components/{{pascalCase name}}.stories.tsx',
        templateFile: '.plop/componentStories.hbs',
        type: 'add',
      },
      {
        path: 'src/components/index.ts',
        transform: (content, action) => {
          const lines = content.split('\n').filter(line => line !== '');
          const filename = _.startCase(_.camelCase(action.name));
          const lineToAdd = `export * from './${filename}';`;

          if (lines.includes(lineToAdd)) return content;

          const result = [...lines, lineToAdd].sort().join('\n');

          return `${result}\n`;
        },
        type: 'modify',
      },
    ],
  });
};
