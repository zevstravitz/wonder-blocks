### mockOnFirstRender false

When `mockOnFirstRender` is `false`, the `children` prop is only called after the initial render. Each call provides the same identifier factory, meaning the same identifier gets returned. Try it below.

```jsx
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import Button from "@khanacademy/wonder-blocks-button";

let providerRef = null;

const renders = [];
const provider = (
    <UniqueIDProvider mockOnFirstRender={false} ref={ref => providerRef = ref}>
        {ids => {
            renders.push(ids.get("my-unique-id"));
            return (
                <View>
                    {renders.map((id,i) => (
                        <Body key={i}>Render {i}: {id}</Body>
                    ))}
                </View>
            );
        }}
    </UniqueIDProvider>
);

const onClick = () => {
    if (providerRef) {
        providerRef.forceUpdate();
    }
};

<View>
    <View style={{flexDirection: "row"}}>
        <Button onClick={onClick}>Click Me to Rerender</Button>
        <Spring />
    </View>
    <Strut size={16} />
    <HeadingSmall>The UniqueIDProvider:</HeadingSmall>
    {provider}
</View>
```

### mockOnFirstRender is true

When specifying `mockOnFirstRender` to be `true`, the first render will use a mock identifier factory that doesn't guarantee identifier uniqueness. Mock mode can help things appear on the screen during the initial render, but is not the default, because it is not always safe (e.g., we need actual IDs for some SVG constructs).

```jsx
import {Body, BodyMonospace, HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {Spring, Strut} from "@khanacademy/wonder-blocks-layout";
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";

let firstId = null;
let secondId = null;

const children = (idf) => {
    const id1 = idf.get("an-id");
    const id2 = idf.get("something");
    firstId = firstId || id1;
    secondId = secondId || id2
    return (
        <View>
            <HeadingSmall>The initial render:</HeadingSmall>
            <View>
                <BodyMonospace>get("an-id"): {firstId}</BodyMonospace>
                <BodyMonospace>get("something"): {secondId}</BodyMonospace>
            </View>
            <Strut size={16} />
            <HeadingSmall>Subsequent requests:</HeadingSmall>
            <View>
                <BodyMonospace>get("an-id"): {id1}</BodyMonospace>
                <BodyMonospace>get("something"): {id2}</BodyMonospace>
            </View>
        </View>
    );
};

<UniqueIDProvider mockOnFirstRender={true}>
    {children}
</UniqueIDProvider>
```

### Scoped

`UniqueIDProvider` ensures every identifier factory is unique using a unique number for each one. However, this isn't very readable when wanting to differentiate the types of things using unique identifiers. If we want to, we can provide a `scope` prop that adds some text to each identifier provided. This can be useful for providing some quick at-a-glance component identification to identifiers when there are multiple providers.

```jsx
import {Body, HeadingSmall} from "@khanacademy/wonder-blocks-typography";
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";

const children = ({get}) => (
    <View>
        <Body>
            The id returned for "my-identifier": {get("my-identifier")}
        </Body>
    </View>
);

<View>
    <HeadingSmall>First Provider with scope: first</HeadingSmall>
    <UniqueIDProvider mockOnFirstRender={false} scope="first">
        {children}
    </UniqueIDProvider>
    <HeadingSmall>Second Provider with scope: second</HeadingSmall>
    <UniqueIDProvider mockOnFirstRender={false} scope="second">
        {children}
    </UniqueIDProvider>
</View>
```

### IIdentifierFactory

```jsx
import {BodyMonospace} from "@khanacademy/wonder-blocks-typography";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import {UniqueIDProvider, View} from "@khanacademy/wonder-blocks-core";

// TODO(somewhatabstract): Update this to be nice once we can get BodyMonospace
// to allow us to properly preserve whitespace or have an alternative. Or remove
// this entirely when our styleguide renders our interface definitions.
<View>
    <BodyMonospace>interface IIdentifierFactory &#123;</BodyMonospace>
    <View style={{flexDirection: "row"}}>
        <Strut size={"2em"} /><BodyMonospace>get(id: string): string;</BodyMonospace>
    </View>
    <BodyMonospace>&#125;</BodyMonospace>
</View>
```
