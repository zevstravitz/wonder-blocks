import {addDecorator, addParameters, load} from "@storybook/react";
import {getPropDefs} from "@storybook/addon-docs/react";
import {DocsPage} from "@storybook/addon-docs/blocks";
import {withA11y} from "@storybook/addon-a11y";

import theme from './theme.js';

addDecorator(withA11y);

addParameters({
    options: {
        panelPosition: 'right',
        /**
         * custom theme
         */
        theme: theme
    },
    // docs: DocsPage,
});

load(require.context("../stories", true, /\.stories\.js$/), module);
load(require.context("../stories", true, /\.stories\.mdx$/), module);
