/**
 * This script processes the styleguide.config.js to modify the content.
 * This can be used to augment packages with version information as well
 * as optionally strip development only documentation (useful for producing
 * production documentation).
 *
 * The steps it performs are:
 *
 * 1. Adds the design package versions from the package.json of each package so
 *    that we know what design spec and package versions were last released.
 *
 * 2. [Optional] If the PULL_REQUEST environment variable does not have the
 *    value of "true", then any dev-only docs are stripped from the styleguide.
 *    Dev-only docs are defined as any section with the property "private" set
 *    to true and any sections that map to prototype packages (prototypes are
 *    marked as "private" in their package.json).
 *
 * Running `yarn build:styleguidist` will run this script and then run the
 * styleguidist build, which will generate the docs.
 *
 * Running `yarn start` will skip this script so that developers can see both
 * exported and development documentation.
 *
 * Running `yarn start:prod` will run this script and host the subsequent
 * documentation for comparison.
 */
const fs = require("fs");
const path = require("path");
const process = require("process");

const {
    getComponentFilesFromSection,
} = require("./styleguidist-config-utils.js");

const styleguideConfig = require("../styleguide.config.js");

/**
 * Writes a styleguide configuration to a file with the given path.
 */
function writeStyleguideConfig(filepath, config) {
    const lines = [
        `// This file is auto-generated by gen-styleguide-prod-config.js`,
        `// Do not edit this file.`,
        `const {createConfig, babel, postcss} = require("webpack-blocks");`,
        ``,
        `const babelConfig = require("./build-settings/babel.config.js");`,
        ``,
        `module.exports = {`,
    ];

    // Here, we strip some properties that we want to override.
    // If we want to replace them, only if they exist, then we also
    // add a replacement value inside this loop.
    // If we want to set the value, even if it never existed in the original
    // code, then we set it later.
    Object.entries(config).forEach((entry) => {
        // HACK(somewhatabstract): We can't just output the webpackConfig
        // because we executed some things when we loaded it. We could write a
        // whole thing that reads the text and parses things out, but we don't
        // need to. We'll just recreate the executed property here.
        switch (entry[0]) {
            case "webpackConfig":
                lines.push(
                    "    webpackConfig: createConfig([babel(babelConfig), postcss()]),",
                );
                break;

            case "serverPort":
                // Skip. We do a different port for prod so that prod and dev servers can coexist, if necessary.
                break;

            default:
                lines.push(`    ${entry[0]}: ${JSON.stringify(entry[1])},`);
                break;
        }
    });
    // Let's specify the production server port.
    // This is something we want to set even if the original config didn't
    // contain it, so we set it here outside of the loop.
    lines.push(`    serverPort: 6061,`);
    lines.push("};\n");

    const data = lines.join("\n");
    fs.writeFileSync(filepath, data, "utf8");
}

/**
 * This function recurses through the sections and sub-sections, removing
 * any that are marked as private. It returns the modified array with the
 * private sections removed.
 */
function removePrivateSections(sections) {
    if (!sections) {
        return sections;
    }

    for (let i = sections.length; i > 0; i--) {
        const sectionIndex = i - 1;
        if (sections[sectionIndex].private) {
            // eslint-disable-next-line no-console
            console.log(
                `Removing private section ${sections[sectionIndex].name}`,
            );

            // If the section is private, we presume all content of the section is
            // private too.
            sections.splice(sectionIndex, 1);
        } else {
            // And now, we move into the chilren of the section and repeat.
            sections[sectionIndex].sections = removePrivateSections(
                sections[sectionIndex].sections,
            );
        }
    }
    return sections;
}

/**
 * This uses the section content and component paths to try and determine a
 * wonder blocks package folder path. If it can, it returns that path,
 * otherwise it returns null.
 *
 * We use the path later to load the package.json and glean some details about
 * the package.
 */
function maybeGetPackagePathForSection(section) {
    // This takes a single file path and tries to find a wonder-blocks-*
    // folder (we assume that such folders are any folders under the packages
    // directory).
    const getPackageDirFromPath = (filepath) => {
        if (!filepath) {
            return null;
        }

        do {
            const parentPath = path.dirname(filepath);
            if (parentPath) {
                const parentName = path.basename(parentPath);
                if (parentName === "packages") {
                    // We found the path we want.
                    return filepath;
                } else if (parentName === parentPath) {
                    // We should stop searching or we'll get in an infinite loop
                    break;
                } else {
                    // Let's keep looking further up the file hierarchy.
                    filepath = parentPath;
                }
            }
        } while (filepath);

        return null;
    };

    if (section.content) {
        return getPackageDirFromPath(section.content);
    } else {
        // Other option is to get one of the component file paths and use that.
        const files = getComponentFilesFromSection(section);
        if (files.length) {
            return getPackageDirFromPath(files[0]);
        }
    }

    // We get here, we got nothing.
    return null;
}

/**
 * Given a section, see if we can extract some information about a wonder
 * blocks package from it.
 */
function maybeGetPackageInfoForSection(section) {
    const pathForSection = maybeGetPackagePathForSection(section);
    if (!pathForSection) {
        // We can't help you.
        return null;
    }

    const pkgJsonPath = path.join(path.resolve(pathForSection), "package.json");
    if (fs.existsSync(pkgJsonPath)) {
        // We have a package file, let's read it and find out what we can.
        const pkgJson = require(pkgJsonPath);

        // Let's gather the various bits of information for this package.
        return {
            name: pkgJson.name,
            lastRelease: pkgJson.version,
            design: pkgJson.design,
            private: pkgJson.private,
        };
    } else {
        return null;
    }
}

/**
 *
 *
 * This is where the magic begins!
 *
 *
 */
// Here we process the root level sections and augment their descriptions
// with some additional package information. We also mark prototype packages
// as private, so that we can strip them if needed.
for (const section of styleguideConfig.sections) {
    const info = maybeGetPackageInfoForSection(section);
    if (info) {
        // eslint-disable-next-line no-console
        console.log(
            `Adding package information for ${section.name}: ${JSON.stringify(
                info,
            )}`,
        );
        // Let's add some info!
        const currentDescription = section.description;
        const lines = [
            `${info.name}@${info.lastRelease}`,
            info.private ? "**PROTOTYPE**" : null,
            `Design Specification: **${info.design}**\n`,
            currentDescription,
        ];
        // If this is a prototype package, then we don't want this in the prod
        // documentation.
        if (info.private) {
            section.private = true;
        }
        section.description = lines.filter((l) => !!l).join("  \n");
    } else {
        // eslint-disable-next-line no-console
        console.log(`No package information found for ${section.name}`);
    }
}

// See https://www.netlify.com/docs/continuous-deployment/#build-environment-variables
if (process.env.PULL_REQUEST !== "true") {
    // If we're not a pull request, then let's iterate over the configuration
    // and remove private sections.
    styleguideConfig.sections = removePrivateSections(
        styleguideConfig.sections,
    );
}

// Finally, we output the results.
// We assume we're being run from the root.
writeStyleguideConfig("./styleguide.prod.config.js", styleguideConfig);
