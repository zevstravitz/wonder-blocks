```js
import {StyleSheet} from "aphrodite";
import {Text, View} from "@khanacademy/wonder-blocks-core";
import Color from "@khanacademy/wonder-blocks-color";

const styles = StyleSheet.create({
    contents: {
        flexDirection: "row",
    },
    dark: {
        background: Color.darkBlue,
        color: Color.white,
    },
    block: {
        width: 154,
        height: 154,
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    inline: {
        display: "inline",
    }
});

<View>
    <View style={styles.contents}>
        <View style={styles.block}>
            <CircularSpinner size="large" />
            <Text>size: large (96px)</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="medium" />
            <Text>size: medium (48px)</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="small" />
            <Text>size: small (24px)</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="xsmall" />
            <Text>size: xsmall (16px)</Text>
        </View>
    </View>

    <View style={[styles.contents, styles.dark]}>
        <View style={styles.block}>
            <CircularSpinner size="large" light />
            <Text>light, size: large (96px)</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="medium" light />
            <Text>light, size: medium (48px)</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="small" light />
            <Text>light, size: small (24px)</Text>
        </View>
        <View style={styles.block}>
            <CircularSpinner size="xsmall" light />
            <Text>light, size: xsmall (16px)</Text>
        </View>
    </View>

    <View>
        <Text>
            Inline inside
            <CircularSpinner size="xsmall" style={styles.inline} />
            {" "}some text.
        </Text>
    </View>
</View>
```
