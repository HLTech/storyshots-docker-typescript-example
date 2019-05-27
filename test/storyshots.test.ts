import * as path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import {imageSnapshot} from '@storybook/addon-storyshots-puppeteer';
import {connect} from "puppeteer";

/**
 * URL to Chromium instance running inside Docker container
 */
const CHROMIUM_URL = 'http://127.0.0.1:19222';

/**
 * URL to Storybook, accessible from inside docker container
 * (host.docker.internal resolves to the internal IP address used by the host)
 */
const STORYBOOK_DEV_URL = 'http://host.docker.internal:9001';

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
        storybookUrl: STORYBOOK_DEV_URL,
        getCustomBrowser: () => connect({browserURL: CHROMIUM_URL}),
        getMatchOptions
    }),
});
