// @flow
// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-dropdown
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");
import ActionItem from "./components/action-item.js";
import SelectItem from "./components/select-item.js";
import SeparatorItem from "./components/separator-item.js";
import SelectBox from "./components/select-box.js";

describe("wonder-blocks-dropdown", () => {
    it("example 1", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            darkBackgroundWrapper: {
                background: "black",
                padding: 10,
            },
            strutLike: {
                width: 8,
                height: 8,
            },
            sepContainer: {
                width: 200,
                height: 10,
            },
        });
        const example = (
            <View style={[styles.darkBackgroundWrapper]}>
                <View style={[styles.row]}>
                    <ActionItem
                        label={"Go to KA"}
                        href={"https://khanacademy.org"}
                    />
                    <View style={[styles.strutLike]} />
                    <ActionItem
                        label={"Disabled"}
                        disabled={true}
                        href={"https://khanacademy.org"}
                    />
                    <View style={[styles.strutLike]} />
                    <ActionItem
                        label={"Calls an onClick"}
                        onClick={() => console.log("Action item clicked")}
                    />
                    <View style={[styles.strutLike]} />
                    <ActionItem
                        label={"Indented"}
                        onClick={() => console.log("Intended item clicked")}
                    />
                </View>

                <View style={[styles.strutLike]} />

                <View style={[styles.row]}>
                    <SelectItem
                        label={"Item 1"}
                        selected={true}
                        value={"1"}
                        variant={"check"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 2"}
                        selected={false}
                        value={"2"}
                        variant={"check"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 3"}
                        selected={true}
                        value={"3"}
                        variant={"checkbox"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 4"}
                        selected={false}
                        value={"4"}
                        variant={"checkbox"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                    <View style={[styles.strutLike]} />
                    <SelectItem
                        label={"Item 5"}
                        selected={false}
                        disabled={true}
                        value={"5"}
                        variant={"checkbox"}
                        onToggle={(v, s) =>
                            console.log(`would now be ${s.toString()}`)
                        }
                    />
                </View>
            </View>
        );

        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {Strut} = require("@khanacademy/wonder-blocks-layout");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={[styles.row]}>
                <SelectBox
                    isPlaceholder={false}
                    onClick={() => console.log("regular selectbox selected")}
                    style={{width: 200}}
                >
                    Regular selectbox
                </SelectBox>
                <Strut size={8} />
                <SelectBox
                    isPlaceholder={true}
                    onClick={() => console.log("Selected")}
                    style={{width: 150}}
                >
                    Placeholder
                </SelectBox>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const Color = require("@khanacademy/wonder-blocks-color");
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        console.log(Color);
        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
            darkBackgroundWrapper: {
                backgroundColor: Color.default.darkBlue,
                padding: 10,
            },
        });
        const example = (
            <View style={[styles.row]}>
                <View style={[styles.darkBackgroundWrapper]}>
                    <SelectBox
                        light={true}
                        isPlaceholder={false}
                        onClick={() => console.log("light selectbox selected")}
                    >
                        Light version
                    </SelectBox>
                </View>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 4", () => {
        const {View} = require("@khanacademy/wonder-blocks-core");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            row: {
                flexDirection: "row",
            },
        });
        const example = (
            <View style={[styles.row]}>
                <SelectBox
                    disabled={true}
                    onClick={() => console.log("error error!!")}
                >
                    Disabled
                </SelectBox>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});