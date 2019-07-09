// @flow
import React from "react";

import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {withKnobs, text, boolean, select} from "@storybook/addon-knobs";

import Button from "@khanacademy/wonder-blocks-button";

storiesOf("components|Button", module)
    .addParameters({component: Button})
    .addDecorator(withKnobs)
    .add("with text", () => (
        <Button
            disabled={boolean("Disabled", false)}
            onClick={action("clicked")}
            kind={select(
                "Kind",
                ["primary", "secondary", "tertiary"],
                "primary",
            )}
            color={select("Color", ["default", "destructive"], "default")}
            size={select("Size", ["medium", "small"], "medium")}
            light={boolean("Light", false)}
        >
            {text("Label", "Default Button")}
        </Button>
    ));
