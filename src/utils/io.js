import { readFileSync, writeFileSync } from "fs";
import { configFile, errorFile } from "../constants.js";

export function getConfigData() {
	let fileData = readFileSync(configFile, { encoding: 'utf8' })
	return JSON.parse(fileData);
}

export function updateConfigData(data) {
	writeFileSync(configFile, JSON.stringify(data, null, 2))
}

export function writeErrorToFile(errorData){
	let fileData = readFileSync(errorFile, { encoding: 'utf8' })
	fileData = `${fileData} \n \n \n \n ${JSON.stringify(errorData)}`;
	writeFileSync(errorFile, fileData)
}

export function updateConfigField(fieldName, data) {
	let config = getConfigData()
	config[fieldName] = data
	updateConfigData(config)
}