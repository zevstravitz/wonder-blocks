// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests
// edit packages/wonder-blocks-core/docs.md and run `npm run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";
import Text from "./components/text.js";
import View from "./components/view.js";

describe("wonder-blocks-core", () => {
    it("example 1", () => {
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            container: {
                padding: 32,
                backgroundColor: "plum",
            },
            text: {
                fontFamily: "sans-serif",
                fontSize: 24,
            },
        });

        const example = (
            <View style={styles.container}>
                <Text style={styles.text}>Hello, world!</Text>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const example = (
            <View>
                <View onClick={() => alert("Clicked!")}>Click me!</View>

                <Text aria-hidden>
                    This text is hidden from screen readers.
                </Text>
            </View>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 3", () => {
        const {addStyle} = require("./index.js");
        const {StyleSheet} = require("aphrodite");

        const styles = StyleSheet.create({
            // default style for all instances of StyledInput
            input: {
                fontSize: 30,
            },
            // style for a particular instance of StyledInput
            pink: {
                backgroundColor: "pink",
            },
        });

        const StyledInput = addStyle("input", styles.input);

        const example = (
            <StyledInput
                style={styles.pink}
                type="text"
                placeholder="hello, world"
            />
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
