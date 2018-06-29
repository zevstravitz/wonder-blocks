// @flow
import * as React from "react";
import * as ReactDOM from "react-dom";
import {mount} from "enzyme";

import {View} from "@khanacademy/wonder-blocks-core";
import TooltipBubble from "./tooltip-bubble.js";
import TooltipContent from "./tooltip-content.js";

/**
 * A little wrapper for the TooltipBubble so that we can provide an anchor
 * element reference and test that the children get rendered.
 */
class BubbleTest extends React.Component<*, {ref: ?HTMLElement}> {
    state = {
        ref: null,
    };

    updateRef(ref) {
        const actualRef = ref && ReactDOM.findDOMNode(ref);
        if (actualRef && this.state.ref !== actualRef) {
            this.setState({ref: ((actualRef: any): ?HTMLElement)});
        }
    }

    render() {
        return (
            <View>
                <View ref={(ref) => this.updateRef(ref)}>Anchor</View>
                <TooltipBubble
                    placement={this.props.placement}
                    anchorElement={this.state.ref}
                >
                    <TooltipContent ref={(ref) => this.props.resultRef(ref)}>
                        This is a pretend string with a ref so we can detect it
                        being rendered
                    </TooltipContent>
                </TooltipBubble>
            </View>
        );
    }
}

describe("TooltipBubble", () => {
    // The TooltipBubble component is just a wrapper around react-popper.
    // PopperJS requires full visual rendering and we don't do that here as
    // we're not in a browser.
    // So, let's do a test that we at least render the content how we expect
    // and use other things to test the overall placement things.
    test("ensure component renders", (done) => {
        // Arrange
        const arrange = (actAssert) => {
            const nodes = (
                <View>
                    <BubbleTest placement={"bottom"} resultRef={actAssert} />
                </View>
            );
            mount(nodes);
        };

        const actAndAssert = (resultRef) => {
            if (!resultRef) {
                return;
            }

            // Act
            // Assert
            expect(resultRef).toBeDefined();
            done();
        };

        arrange(actAndAssert);
    });
});