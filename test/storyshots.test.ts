import * as path from 'path';
import {pathToFileURL} from "url";
import initStoryshots from '@storybook/addon-storyshots';
import {imageSnapshot} from '@storybook/addon-storyshots-puppeteer';
import {connect} from "puppeteer";

/**
 * Detect if running locally on or CI
 */
const IS_CI = Boolean(process.env.CI);

/**
 * URL to Chromium instance running inside docker container
 */
const CHROMIUM_URL = 'http://127.0.0.1:19222';

/**
 * URL to local instance of Storybook, accessible from inside docker container
 */
const STORYBOOK_DEV_URL = 'http://host.docker.internal:9001';

/**
 * Define URL to static build of Storybook
 */
const STORYBOOK_BUILD_URL = pathToFileURL(path.join(__dirname, '../dist'));

/**
 * Function returning config object that will be passed to jest-image-snapshot
 */
function getMatchOptions({ context }) {
    return {
        customSnapshotsDir: path.join(path.dirname(context.fileName), '__image_snapshots__'),
        customSnapshotIdentifier: [context.kind, context.story]
            .join('-')
            .toLowerCase()
            .replace(/[\W\s]/g, '-'),
    };
}

/**
 * Run storyshots
 */
initStoryshots({
    suite: 'Image storyshots',
    config: ({ configure }) => {
        configure(() => {
            require('../src/button/button.story.tsx');
        }, module)
    },
    test: imageSnapshot({
        storybookUrl: IS_CI ? STORYBOOK_BUILD_URL : STORYBOOK_DEV_URL,
        getCustomBrowser: () => connect({browserURL: CHROMIUM_URL}),
        getMatchOptions
    }),
});