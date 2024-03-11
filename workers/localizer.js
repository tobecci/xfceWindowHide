import { localizeWindows } from "../src/core/actions/localizeWindows.js"
import { sleep } from "../src/utils/utils.js";


async function startWindowLocalizer() {
	// eslint-disable-next-line no-constant-condition
	while (true) {
		await localizeWindows();
		await sleep(9000)
	}
}

startWindowLocalizer();

