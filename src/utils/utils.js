export async function sleep(timeInMilliseconds) {
	return new Promise(function (resolve, reject) {
		try {
			setTimeout(function () { resolve() }, timeInMilliseconds)
		} catch (error) {
			reject(error)
		}
	})

}