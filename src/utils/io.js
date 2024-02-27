import { readFileSync, writeFileSync } from "fs";
import { configFile } from "../constants.js";

export function getConfigData() {
	let fileData = readFileSync(configFile, { encoding: 'utf8' })
	return JSON.parse(fileData);
}

export function updateConfigData(data) {
	writeFileSync(configFile, JSON.stringify(data, null, 2))
}

export function updateConfigField(fieldName, data) {
	let config = getConfigData()
	config[fieldName] = data
	updateConfigData(config)
}