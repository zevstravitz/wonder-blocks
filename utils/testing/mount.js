// @flow
import {mount as enzymeMount} from "enzyme";
import type {ReactWrapper} from "enzyme";

/**
 * Enzyme doesn't unmount mounted things and all tests share the same DOM
 * so if we don't unmount the wrappers, then we run the risk of one test having
 * side-effects on another. So here we make some helpers that track mount
 * calls and can be used to unmount all wrappers in an afterEach.
 */
const ACTIVE_WRAPPERS = {};

const unmountAll = () => {
    const wrappersToUnmount = Object.keys(ACTIVE_WRAPPERS);
    for (const key of wrappersToUnmount) {
        const wrapper = ACTIVE_WRAPPERS[key];
        delete ACTIVE_WRAPPERS[key];
        if (wrapper.first().length) {
            wrapper.unmount();
        }
    }
};

function mount<T>(nodes: React$Element<T>): ReactWrapper<T> {
    const wrapper = enzymeMount<T>(nodes);
    const identity = ACTIVE_WRAPPERS.length;
    ACTIVE_WRAPPERS[identity] = wrapper;
    return wrapper;
}

export {mount, unmountAll};
