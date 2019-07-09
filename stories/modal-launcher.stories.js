// @flow
import React from "react";
import {storiesOf} from "@storybook/react";
import centered from "@storybook/addon-centered/react.js";
import {StyleSheet} from "aphrodite";

import Button from "@khanacademy/wonder-blocks-button";
import {View} from "@khanacademy/wonder-blocks-core";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import {Body} from "@khanacademy/wonder-blocks-typography";
import {ActionMenu, ActionItem} from "@khanacademy/wonder-blocks-dropdown";

import {ModalLauncher, OnePaneDialog} from "@khanacademy/wonder-blocks-modal";

// Custom styles goes here
const styles = StyleSheet.create({
    example: {
        padding: Spacing.xLarge,
        alignItems: "center",
    },

    title: {
        marginBottom: Spacing.medium,
    },

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

storiesOf("components|Modal/ModalLauncher", module)
    .addParameters({
        component: ModalLauncher,
        backgrounds: [
            {name: "darkBlue", value: "#0a2a66", default: true},
            {name: "teal", value: "#14bf96"},
            {name: "lightBlue", value: "#37c5fd"},
            {name: "pink", value: "#fa50ae"},
        ],
    })
    .addDecorator(centered)
    .add("Default", () => (
        <ModalLauncher
            modal={({closeModal}) => (
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
                    footer={<Button onClick={closeModal}>Close modal</Button>}
                />
            )}
        >
            {({openModal}) => (
                <Button onClick={openModal}>OnePaneDialog</Button>
            )}
        </ModalLauncher>
    ))
    .add("Disabling backdrop dismission", () => {
        const styles = StyleSheet.create({
            modalContent: {
                margin: "0 auto",
                maxWidth: 544,
            },
        });

        return (
            <ModalLauncher
                modal={({closeModal}) => (
                    <OnePaneDialog
                        title="Backdrop dismission disabled"
                        content={
                            <View style={styles.modalContent}>
                                <Body tag="p">
                                    {
                                        "This window won't be closed if you click/tap outside of the ModalPanel. To do that, you can still press `esc` or use the close button located on the top right."
                                    }
                                </Body>
                            </View>
                        }
                    />
                )}
                backdropDismissEnabled={false}
            >
                {({openModal}) => (
                    <Button onClick={openModal}>Open modal</Button>
                )}
            </ModalLauncher>
        );
    })
    .add("Triggering programmatically", () => {
        class Example extends React.Component<{}, {opened: boolean}> {
            constructor(props) {
                super(props);
                this.state = {
                    opened: false,
                };
            }

            handleOpen() {
                // eslint-disable-next-line no-console
                console.log("opening modal");
                this.setState({opened: true});
            }

            handleClose() {
                // eslint-disable-next-line no-console
                console.log("closing modal");
                this.setState({opened: false});
            }

            render() {
                return (
                    <View>
                        <ActionMenu menuText="actions">
                            <ActionItem
                                label="Open modal"
                                onClick={() => this.handleOpen()}
                            />
                        </ActionMenu>
                        <ModalLauncher
                            onClose={() => this.handleClose()}
                            opened={this.state.opened}
                            modal={({closeModal}) => (
                                <OnePaneDialog
                                    title="Triggered from action menu"
                                    content={
                                        <View>
                                            <Body>Hello, world</Body>
                                        </View>
                                    }
                                    footer={
                                        <Button onClick={closeModal}>
                                            Close Modal
                                        </Button>
                                    }
                                />
                            )}
                        />
                    </View>
                );
            }
        }

        return <Example />;
    });
