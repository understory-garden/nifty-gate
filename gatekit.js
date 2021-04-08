import { useThing } from 'swrlit'
import { getSolidDataset, getStringNoLocale, getThing } from '@inrupt/solid-client'
import * as base58 from 'micro-base58'

const UG = {
  noteBody: "https://understory.coop/vocab/garden#noteBody"
}

export const conceptNameToUrlSafeId = (name) =>
  base58.encode(name)

export const urlSafeIdToConceptName = (id) => {
  return new TextDecoder().decode(base58.decode(id))
}

export function conceptUriToName(conceptUri){
  return urlSafeIdToConceptName(conceptUri.split("#").slice(-1)[0])
}

export function noteUriToName(noteUri){
  return urlSafeIdToConceptName(noteUri.split("/").slice(-1)[0].split("\.")[0])
}

export function tagNameToUrlSafeId(tagName){
  return encodeURIComponent(tagName)
}

export async function loadNote(uri){
  const name = noteUriToName(uri)
  const noteResource = await getSolidDataset(uri)
  const note = getThing(noteResource, uri)
  const body = getStringNoLocale(note, UG.noteBody)
  return { name, body }
}