//@flow
import Spacing from "@khanacademy/wonder-blocks-spacing";

export const keyCodes = {
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
};

export const selectDropdownStyle = {
    marginTop: Spacing.xSmall,
    marginBottom: Spacing.xSmall,
};

// Filterable dropdown has minimum dimensions requested from Design.
// Note that these can be overridden by the provided style if needed.
export const filterableDropdownStyle = {
    minHeight: 100,
    maxHeight: 384,
};
