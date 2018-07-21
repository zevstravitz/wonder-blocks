// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-button
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import Button from "./components/button.js";

describe("wonder-blocks-button", () => {
    it("example 1", () => {
        const Button = require("./index.js").default;
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            sideMargins: {
                marginRight: 10,
            },
        });

        const example = (
            <View style={[styles.row]}>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                >
                    Label
                </Button>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    kind="secondary"
                >
                    Label
                </Button>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    kind="tertiary"
                >
                    Label
                </Button>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    size="small"
                >
                    Label
                </Button>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const Button = require("./index.js").default;
        const {View} = require("@khanacademy/wonder-blocks-core");
        const Color = require("@khanacademy/wonder-blocks-color").default;
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
                backgroundColor: Color.darkBlue,
                padding: 10,
            },
            sideMargins: {
                marginLeft: 10,
            },
        });

        const example = (
            <View style={[styles.row]}>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    light
                >
                    Label
                </Button>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    kind="secondary"
                    light
                >
                    Label
                </Button>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    kind="tertiary"
                    light
                >
                    Label
                </Button>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    size="small"
                    light
                >
                    Label
                </Button>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const Button = require("./index.js").default;

        const example = (
            <Button
                onClick={(e) => console.log("Hello, world!")}
                href="#button-1"
            >
                Label
            </Button>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const Button = require("./index.js").default;
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            sideMargins: {
                marginRight: 10,
            },
        });

        const example = (
            <View style={[styles.row]}>
                <Button
                    style={[styles.sideMargins]}
                    onClick={(e) => console.log("Hello, world!")}
                    disabled={true}
                >
                    Label
                </Button>
                <Button
                    style={[styles.sideMargins]}
                    href={"https://khanacademy.org"}
                    disabled={true}
                >
                    Button with href
                </Button>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 5", () => {
        const Button = require("./index.js").default;
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                display: "row",
            },
            wideButton: {
                width: 200,
            },
            centerInDiv: {
                display: "block",
                margin: "0 auto",
            },
            sideMargins: {
                marginRight: 10,
            },
        });

        const example = (
            <table>
                <thead>
                    <tr>
                        <th style={{minWidth: "250px"}}>Styles</th>
                        <th style={{width: "100%"}}>Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>width: '200px'</td>
                        <td>
                            <Button
                                onClick={(e) => console.log("Hello, world!")}
                                style={[styles.wideButton]}
                            >
                                Label
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>width: '75%'</td>
                        <td>
                            <Button
                                onClick={(e) => console.log("Hello, world!")}
                                style={{width: "75%"}}
                            >
                                Label
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>display: 'block', margin: '0 auto'</td>
                        <td>
                            <Button
                                onClick={(e) => console.log("Hello, world!")}
                                style={[styles.centerInDiv]}
                            >
                                Label
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td>flexGrow: 1</td>
                        <td>
                            <div style={{display: "flex"}}>
                                <Button
                                    onClick={(e) =>
                                        console.log("Hello, world!")
                                    }
                                    style={{flexGrow: 1}}
                                >
                                    Label
                                </Button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>flexShrink: 2, width: '300px'</td>
                        <td>
                            <div style={{display: "flex"}}>
                                <Button
                                    onClick={(e) =>
                                        console.log("Hello, world!")
                                    }
                                    style={[
                                        {flexShrink: 2, width: "300px"},
                                        styles.sideMargins,
                                    ]}
                                >
                                    Label
                                </Button>
                                <div
                                    onClick={(e) =>
                                        console.log("Hello, world!")
                                    }
                                    style={{
                                        width: "100%",
                                        background: "#eee",
                                        textAlign: "center",
                                        lineHeight: "40px",
                                    }}
                                >
                                    Not a button
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>alignSelf: 'flex-end'</td>
                        <td>
                            <div style={{display: "flex"}}>
                                <Button
                                    onClick={(e) =>
                                        console.log("Hello, world!")
                                    }
                                    style={[
                                        {alignSelf: "flex-end"},
                                        styles.sideMargins,
                                    ]}
                                >
                                    Label
                                </Button>
                                <div
                                    onClick={(e) =>
                                        console.log("Hello, world!")
                                    }
                                    style={{
                                        background: "#eee",
                                        textAlign: "center",
                                        lineHeight: "100px",
                                        height: "100px",
                                        padding: "0px 4px",
                                    }}
                                >
                                    Not a button
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>justifySelf: 'flex-end'</td>
                        <td>
                            <div style={{display: "flex"}}>
                                <div style={{display: "grid", width: "100%"}}>
                                    <Button
                                        onClick={(e) =>
                                            console.log("Hello, world!")
                                        }
                                        style={{justifySelf: "flex-end"}}
                                    >
                                        Label
                                    </Button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
