// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-layout
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Button from "@khanacademy/wonder-blocks-button";
import {
    Spring,
    Strut,
    MediaLayout,
    MediaLayoutContext,
} from "@khanacademy/wonder-blocks-layout";
import {
    Body,
    HeadingLarge,
    HeadingSmall,
} from "@khanacademy/wonder-blocks-typography";

describe("wonder-blocks-layout", () => {
    it("example 1", () => {
        const styles = StyleSheet.create({
            container: {
                flexDirection: "row",
                border: `solid 1px ${Color.offBlack50}`,
            },
            button: {
                width: 100,
            },
        });
        const example = (
            <View style={styles.container}>
                <Button style={styles.button}>A</Button>
                <Strut size={Spacing.small} />
                <Button style={styles.button}>B</Button>
                <Strut size={Spacing.small} />
                <Button style={styles.button}>C</Button>
                <Spring />
                <Button style={styles.button}>Cancel</Button>
                <Strut size={Spacing.small} />
                <Button style={styles.button}>Accept</Button>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 2", () => {
        const styleSheets = {
            large: StyleSheet.create({
                test: {
                    backgroundColor: Color.darkBlue,
                    color: Color.white,
                },
            }),
            medium: StyleSheet.create({
                test: {
                    backgroundColor: Color.blue,
                    color: Color.white,
                },
            }),
            small: StyleSheet.create({
                test: {
                    backgroundColor: Color.lightBlue,
                    color: Color.white,
                },
            }),
        };
        const example = (
            <MediaLayout styleSheets={styleSheets}>
                {({mediaSize, mediaSpec, styles}) => {
                    return <View style={styles.test}>Hello, world!</View>;
                }}
            </MediaLayout>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 3", () => {
        const styleSheets = {
            all: StyleSheet.create({
                // use shared styles for all sizes
                test: {
                    color: Color.white,
                    padding: Spacing.medium,
                },
            }),
            large: StyleSheet.create({
                // override the `padding` prop` here
                test: {
                    backgroundColor: Color.darkBlue,
                    padding: Spacing.xxLarge,
                },
            }),
            medium: StyleSheet.create({
                test: {
                    backgroundColor: Color.blue,
                },
            }),
            small: StyleSheet.create({
                test: {
                    backgroundColor: Color.lightBlue,
                },
            }),
        };
        const example = (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => {
                    return <View style={styles.test}>Hello, world!</View>;
                }}
            </MediaLayout>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 4", () => {
        // If you're using flow, make sure to import these types by uncommenting the following line
        // import type {MediaSpec, MediaLayoutContextValue} from "@khanacademy/wonder-blocks-layout";
        const styleSheets = {
            large: StyleSheet.create({
                example: {
                    alignItems: "center",
                    backgroundColor: Color.darkBlue,
                    color: Color.white,
                    padding: Spacing.xxxLarge,
                },
            }),
            small: StyleSheet.create({
                example: {
                    backgroundColor: Color.lightBlue,
                    padding: Spacing.small,
                },
            }),
        }; // Custom media spec definition
        // Make sure to add the type `MediaSpec`

        const MEDIA_CUSTOM_SPEC = {
            small: {
                query: "(max-width: 767px)",
                totalColumns: 4,
                gutterWidth: Spacing.medium,
                marginWidth: Spacing.medium,
            },
            large: {
                query: "(min-width: 768px)",
                totalColumns: 12,
                gutterWidth: Spacing.xLarge,
                marginWidth: Spacing.xxLarge,
            },
        }; // Make sure to add the type `MediaLayoutContextValue`

        const contextValue = {
            ssrSize: "large",
            mediaSpec: MEDIA_CUSTOM_SPEC,
        };
        const example = (
            <MediaLayoutContext.Provider value={contextValue}>
                <MediaLayout styleSheets={styleSheets}>
                    {({mediaSize, styles}) => {
                        const HeadingComponent =
                            mediaSize === "small" ? HeadingSmall : HeadingLarge;
                        return (
                            <View style={styles.example}>
                                <HeadingComponent>
                                    Current mediaSpec: {mediaSize}
                                </HeadingComponent>
                                <Body tag="p">
                                    {
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                    }
                                </Body>
                            </View>
                        );
                    }}
                </MediaLayout>
            </MediaLayoutContext.Provider>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 5", () => {
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={styles.row}>
                <View style={styles.row}>
                    This should
                    <Strut size={16} />
                    not wrap.
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("example 6", () => {
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={styles.row}>
                <View style={styles.row}>
                    No
                    <Strut size={16} />
                    overlap!
                </View>
                <View style={styles.row}>
                    No
                    <Strut size={16} />
                    overlap!
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
