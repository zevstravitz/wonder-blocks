// @flow
import React from "react";
import {storiesOf} from "@storybook/react";
import centered from "@storybook/addon-centered/react.js";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import {MediaLayout} from "@khanacademy/wonder-blocks-layout";
import {Body} from "@khanacademy/wonder-blocks-typography";

import {OnePaneDialog} from "@khanacademy/wonder-blocks-modal";

storiesOf("components|Modal/OnePaneDialog", module)
    .addParameters({
        component: OnePaneDialog,
        backgrounds: [
            {name: "darkBlue", value: "#0a2a66", default: true},
            {name: "teal", value: "#14bf96"},
            {name: "lightBlue", value: "#37c5fd"},
            {name: "pink", value: "#fa50ae"},
        ],
    })
    .addDecorator(centered)
    .add("OnePaneDialog", () => {
        // Custom styles goes here
        const styles = StyleSheet.create({
            modalContent: {
                margin: "0 auto",
                maxWidth: 544,
            },

            above: {
                background: "url(/modal-above.png)",
                width: 874,
                height: 551,
                position: "absolute",
                top: 40,
                left: -140,
            },

            below: {
                background: "url(/modal-below.png)",
                width: 868,
                height: 521,
                position: "absolute",
                top: -100,
                left: -300,
            },
        });

        return (
            <OnePaneDialog
                title="Title"
                subtitle="You're reading the subtitle!"
                above={<View style={styles.above} />}
                below={<View style={styles.below} />}
                content={
                    <View style={styles.modalContent}>
                        <Body tag="p">
                            {
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."
                            }
                        </Body>
                    </View>
                }
                footer={<Button>Close modal</Button>}
            />
        );
    })
    .add("with above and below containers", () => {
        const styleSheets = {
            mdOrLarger: StyleSheet.create({
                customModal: {
                    maxWidth: 300,
                    maxHeight: 200,
                },

                below: {
                    background: "url(/blue-blob.png)",
                    backgroundSize: "cover",
                    width: 294,
                    height: 306,
                    position: "absolute",
                    top: 0,
                    left: -60,
                },

                above: {
                    background: "url(/asteroid.png)",
                    backgroundSize: "cover",
                    width: 418,
                    height: 260,
                    position: "absolute",
                    top: -10,
                    left: -5,
                },
            }),
        };

        return (
            <MediaLayout styleSheets={styleSheets}>
                {({styles}) => (
                    <OnePaneDialog
                        style={styles.customModal}
                        title="Single-line title"
                        content={
                            <View>
                                <Body>Hello World!</Body>
                            </View>
                        }
                        onClose={() => {
                            // eslint-disable-next-line no-console
                            console.log("This would close the modal.");
                        }}
                        below={<View style={styles.below} />}
                        above={<View style={styles.above} />}
                    />
                )}
            </MediaLayout>
        );
    });
