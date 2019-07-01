// @flow
import React from "react";
import {StyleSheet} from "aphrodite";
import PropTypes from "prop-types";

import Color, {
    SemanticColor,
    mix,
    fade,
} from "@khanacademy/wonder-blocks-color";
import {Clickable} from "@khanacademy/wonder-blocks-core";
import type {
    ClickableHandlers,
    ClickableState,
} from "@khanacademy/wonder-blocks-core";
import Icon from "@khanacademy/wonder-blocks-icon";
import type {SharedProps} from "./icon-button.js";

type Props = {|
    ...SharedProps,
    ...ClickableHandlers,
    ...ClickableState,

    /**
     * URL to navigate to.
     *
     * Used to determine whether to render an `<a>` or `<button>` tag. Also
     * passed in as the `<a>` tag's `href` if present.
     */
    href?: string,
|};

export default class IconButtonCore extends React.Component<Props> {
    static contextTypes = {router: PropTypes.any};

    render() {
        const {
            // eslint-disable-next-line no-unused-vars
            skipClientNav,
            color,
            disabled,
            focused,
            hovered,
            // eslint-disable-next-line no-unused-vars
            href,
            icon,
            kind,
            light,
            pressed,
            style,
            testId,
            ...handlers
        } = this.props;

        const buttonColor =
            color === "destructive"
                ? SemanticColor.controlDestructive
                : SemanticColor.controlDefault;

        const buttonStyles = _generateStyles(buttonColor, kind, light);

        const defaultStyle = [
            sharedStyles.shared,
            disabled && sharedStyles.disabled,
            buttonStyles.default,
            disabled && buttonStyles.disabled,
            !disabled &&
                (pressed
                    ? buttonStyles.active
                    : (hovered || focused) && buttonStyles.focus),
        ];

        return (
            <Clickable
                href={href}
                data-test-id={testId}
                style={[defaultStyle, style]}
                handlers={handlers}
            >
                {(eventState) => (
                    <Icon size="medium" color="currentColor" icon={icon} />
                )}
            </Clickable>
        );
    }
}

const sharedStyles = StyleSheet.create({
    shared: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        height: 40,
        width: 40,
        padding: 0,
        cursor: "pointer",
        border: "none",
        outline: "none",
        textDecoration: "none",
        background: "none",
        margin: -8,
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        ":focus": {
            // Mobile: Removes a blue highlight style shown when the user clicks a button
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
        },
    },
    disabled: {
        cursor: "default",
    },
});

const styles = {};

const _generateStyles = (color, kind, light) => {
    const buttonType = color + kind + light.toString();
    if (styles[buttonType]) {
        return styles[buttonType];
    }

    if (light && kind !== "primary") {
        throw new Error("Light is only supported for primary IconButtons");
    }

    const {white, offBlack32, offBlack64, offBlack} = Color;

    const newStyles = {
        default: {},
        focus: {
            color: light ? white : color,
            borderWidth: 2,
            borderColor: light ? white : color,
            borderStyle: "solid",
            borderRadius: 4,
        },
        active: {
            color: light
                ? mix(fade(color, 0.32), white)
                : mix(offBlack32, color),
            borderWidth: 2,
            borderColor: light
                ? mix(fade(color, 0.32), white)
                : mix(offBlack32, color),
            borderStyle: "solid",
            borderRadius: 4,
        },
        disabled: {
            color: light ? mix(fade(white, 0.32), color) : offBlack32,
            cursor: "default",
        },
    };
    if (kind === "primary") {
        newStyles["default"] = {
            color: light ? white : color,
        };
    } else if (kind === "secondary") {
        newStyles["default"] = {
            color: offBlack,
        };
    } else if (kind === "tertiary") {
        newStyles["default"] = {
            color: offBlack64,
        };
    } else {
        throw new Error("IconButton kind not recognized");
    }

    styles[buttonType] = StyleSheet.create(newStyles);
    return styles[buttonType];
};
