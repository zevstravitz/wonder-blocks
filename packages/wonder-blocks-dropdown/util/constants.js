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

export const searchInputStyle = {
    margin: Spacing.xSmall,
    marginTop: Spacing.xxxSmall,
};

// The default item height
export const DROPDOWN_ITEM_HEIGHT = 40;

export const SEPARATOR_ITEM_HEIGHT = 9;

export const SEARCH_ITEM_HEIGHT =
    DROPDOWN_ITEM_HEIGHT + searchInputStyle.margin + searchInputStyle.marginTop;

// The default labels that will be used by different components
export const defaultLabels = {
    clearSearch: "Clear search",
    filter: "Filter",
    noResults: "No results",
    selectNoneLabel: "Select none",
    selectAllLabel: (numOptions: number) => `Select all (${numOptions})`,
    noneSelected: "0 items",
    someSelected: (numSelectedValues: number) => `${numSelectedValues} items`,
    allSelected: "All items",
};
