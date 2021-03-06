#### Example: Custom content

This component provides a flexible variant that can be used for example, for our Confidence Prompt in test prep and popovers that don't fit into other categories. If you want to use a different background, you can set `color` as part of `PopoverContentCore`.

```js
import {StyleSheet} from "aphrodite";
import {View} from "@khanacademy/wonder-blocks-core";
import {HeadingSmall, LabelLarge} from "@khanacademy/wonder-blocks-typography";
import Spacing from "@khanacademy/wonder-blocks-spacing";
import Color from "@khanacademy/wonder-blocks-color";
import Icon, {icons} from "@khanacademy/wonder-blocks-icon";

const customIcon = {
    small: "M6.92820 0L13.85640 4L13.85640 12L6.92820 16L0 12L0 4Z",
};

const styles = StyleSheet.create({
    customPopover: {
        maxWidth: Spacing.medium * 25,
        width: Spacing.medium * 25,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        padding: `${Spacing.small}px 0`
    },
    action: {
        cursor: "pointer",
        margin: Spacing.small,
        padding: Spacing.xxSmall,
        alignItems: "center",
        justifyContent: "center"
    },
});

<View style={styles.row}>
    <PopoverContentCore
        color="darkBlue"
        style={styles.customPopover}
        onClose={() => alert("close popover!")}
    >
        <View>
            <HeadingSmall>Custom popover title</HeadingSmall>
            <View style={styles.row}>
                <View style={styles.action}>
                    <Icon
                        icon={customIcon}
                        color={Color.gold}
                        size="large"
                    />
                    <LabelLarge>Option 1</LabelLarge>
                </View>
                <View style={styles.action}>
                    <Icon
                        icon={customIcon}
                        color={Color.green}
                        size="large"
                    />
                    <LabelLarge>Option 2</LabelLarge>
                </View>
                <View style={styles.action}>
                    <Icon
                        icon={customIcon}
                        color={Color.blue}
                        size="large"
                    />
                    <LabelLarge>Option 3</LabelLarge>
                </View>
            </View>
        </View>
    </PopoverContentCore>
</View>
```