// This file is auto-generated by gen-snapshot-tests.js
// Do not edit this file.  To make changes to these snapshot tests:
//   1. edit the markdown documentation files in the package,
//        packages/wonder-blocks-timing
//   2. Run `yarn run gen-snapshot-tests`.
import React from "react";
import renderer from "react-test-renderer";

// Mock react-dom as jest doesn't like findDOMNode.
jest.mock("react-dom");

describe("wonder-blocks-timing", () => {
    it("example 1", () => {
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {IDProvider, View} = require("@khanacademy/wonder-blocks-core");

        class Unmounter extends React.Component {
            constructor() {
                super();
                this.state = {
                    mountKids: true,
                };
            }

            maybeRenderKids() {
                if (this.state.mountKids) {
                    return (
                        <React.Fragment>
                            <Button onClick={() => this.onClick()}>
                                Unmount
                            </Button>
                            {this.props.children}
                        </React.Fragment>
                    );
                } else {
                    return "Children unmounted";
                }
            }

            onClick() {
                this.setState({mountKids: false});
            }

            render() {
                return <View>{this.maybeRenderKids()}</View>;
            }
        }

        class MyNaughtyComponent extends React.Component {
            componentDidMount() {
                const {targetId} = this.props;
                let counter = 0;
                const domElement = document.getElementById(targetId);
                setInterval(() => {
                    domElement.innerText =
                        "Naughty interval logged: " + counter++;
                }, 200);
            }

            render() {
                return <View>NaughtyComponent here</View>;
            }
        }

        const example = (
            <IDProvider>
                {(id) => (
                    <View>
                        <Unmounter>
                            <MyNaughtyComponent targetId={id} />
                        </Unmounter>
                        <View>
                            <View id={id} />
                        </View>
                    </View>
                )}
            </IDProvider>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("example 2", () => {
        const {
            withActionScheduler,
        } = require("@khanacademy/wonder-blocks-timing");
        const Button = require("@khanacademy/wonder-blocks-button").default;
        const {IDProvider, View} = require("@khanacademy/wonder-blocks-core");

        class Unmounter extends React.Component {
            constructor() {
                super();
                this.state = {
                    mountKids: true,
                };
            }

            maybeRenderKids() {
                if (this.state.mountKids) {
                    return (
                        <React.Fragment>
                            <Button onClick={() => this.onClick()}>
                                Unmount
                            </Button>
                            {this.props.children}
                        </React.Fragment>
                    );
                } else {
                    return "Children unmounted";
                }
            }

            onClick() {
                this.setState({mountKids: false});
            }

            render() {
                return <View>{this.maybeRenderKids()}</View>;
            }
        }

        class MyGoodComponent extends React.Component {
            componentDidMount() {
                const {targetId, schedule} = this.props;
                let counter = 0;
                const domElement = document.getElementById(targetId);
                schedule.interval(() => {
                    domElement.innerText =
                        "Naughty interval logged: " + counter++;
                }, 200);
            }

            render() {
                return <View>GoodComponent here</View>;
            }
        }

        const MyGoodComponentWithScheduler = withActionScheduler(
            MyGoodComponent,
        );

        const example = (
            <IDProvider>
                {(id) => (
                    <View>
                        <Unmounter>
                            <MyGoodComponentWithScheduler targetId={id} />
                        </Unmounter>
                        <View>
                            <View id={id} />
                        </View>
                    </View>
                )}
            </IDProvider>
        );
        const tree = renderer.create(example).toJSON();
        expect(tree).toMatchSnapshot();
    });
});