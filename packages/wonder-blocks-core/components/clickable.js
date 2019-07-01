// @flow
import * as React from "react";
import {StyleSheet} from "aphrodite";

import {Link} from "react-router-dom";
import addStyle from "../util/add-style.js";
import getClickableBehavior from "../util/get-clickable-behavior.js";
import type {ClickableRole, ClickableState} from "./clickable-behavior.js";
import type {StyleType, AriaProps} from "../util/types.js";

type Props = {|
    "aria-label": string,
    children: (state: ClickableState) => React.Node,
    disabled: boolean,
    href?: string,
    onClick?: (e: SyntheticEvent<>) => mixed,
    role?: ClickableRole,
    to?: mixed,
    skipClientNav?: boolean,
    style?: StyleType,
    testId?: string,
    "data-test-id"?: string,
    handlers: mixed,
    ...$Rest<AriaProps, {|"aria-disabled": "true" | "false" | void|}>,
|};

const StyledAnchor = addStyle<"a">("a");
const StyledButton = addStyle<"button">("button");
const StyledLink = addStyle<typeof Link>(Link);

export default class Clickable extends React.Component<Props> {
    static defaultProps = {
        disabled: false,
        "aria-label": "",
    };

    render() {
        const {router} = this.context;
        const {
            // eslint-disable-next-line no-unused-vars
            "aria-label": ariaLabel, // eslint-disable-line react/prop-types
            children,
            disabled,
            href,
            onClick,
            role,
            skipClientNav,
            // eslint-disable-next-line no-unused-vars
            style,
            // eslint-disable-next-line no-unused-vars
            testId,
            // eslint-disable-next-line no-unused-vars
            ...handlers
        } = this.props;

        const ClickableBehavior = getClickableBehavior(
            href,
            skipClientNav,
            this.context.router,
        );

        return (
            <ClickableBehavior
                disabled={disabled}
                href={href}
                onClick={onClick}
            >
                {(state, handlers) => {
                    const content = children(state);
                    if ((href || this.props.to) && !disabled) {
                        return router && !skipClientNav ? (
                            <StyledLink
                                {...this.props.handlers}
                                to={href}
                                aria-label={ariaLabel}
                                data-test-id={testId}
                                role={role}
                                style={this.props.style}
                                aria-disabled={disabled ? "true" : undefined}
                            >
                                {content}
                            </StyledLink>
                        ) : (
                            <StyledAnchor
                                {...this.props.handlers}
                                href={href}
                                style={this.props.style}
                                aria-label={ariaLabel}
                                data-test-id={testId}
                                role={role}
                            >
                                {content}
                            </StyledAnchor>
                        );
                    } else {
                        return (
                            <StyledButton
                                type="button"
                                style={this.props.style}
                                aria-label={ariaLabel}
                                data-test-id={testId}
                                role={role}
                                {...this.props.handlers}
                            >
                                {content}
                            </StyledButton>
                        );
                    }
                }}
            </ClickableBehavior>
        );
    }
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
    reset: {
        border: "none",
        margin: 0,
        padding: 0,
        width: "auto",
        overflow: "visible",

        background: "transparent",
        textDecoration: "none",

        /* inherit font & color from ancestor */
        color: "inherit",
        font: "inherit",

        boxSizing: "border-box",
        // This removes the 300ms click delay on mobile browsers by indicating that
        // "double-tap to zoom" shouldn't be used on this element.
        touchAction: "manipulation",
        userSelect: "none",

        // This is usual frowned upon b/c of accessibility.  We expect users of Clickable
        // to define their own focus styles.
        outline: "none",

        /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
        lineHeight: "normal",

        /* Corrects font smoothing for webkit */
        WebkitFontSmoothing: "inherit",
        MozOsxFontSmoothing: "inherit",

        /* Corrects inability to style clickable `input` types in iOS */
        WebkitAppearance: "none",
    },
});
