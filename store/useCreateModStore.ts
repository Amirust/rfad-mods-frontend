import { defineStore } from 'pinia';
import type { ModTags } from '~/types/mod-tags.enum';

export interface UseCreateModStoreInterface {
  type: 'mod' | 'preset' | null
  name: string
  shortDescription: string
  description: string
  installGuide: string
  tags: ModTags[]
  downloadLink: string
  additionalLinks: {name: string, url: string}[]
  images: string[]
}

export const useCreateModStore = defineStore('createMod', {
  state: () => ({
    type: null,
    name: '',
    shortDescription: '',
    description: '',
    installGuide: '',
    tags: [],
    downloadLink: '',
    additionalLinks: [],
    images: []
  }) as UseCreateModStoreInterface,
  actions: {
    setType(type: 'mod' | 'preset') {
      this.type = type
    },
    setName(name: string) {
      this.name = name
    },
    setShortDescription(shortDescription: string) {
      this.shortDescription = shortDescription
    },
    setDescription(description: string) {
      this.description = description
    },
    setInstallGuide(installGuide: string) {
      this.installGuide = installGuide
    },
    setTags(tags: ModTags[]) {
      this.tags = tags
    },
    setDownloadLink(downloadLink: string) {
      this.downloadLink = downloadLink
    },
    setAdditionalLinks(additionalLinks: {name: string, url: string}[]) {
      this.additionalLinks = additionalLinks
    },
    setImages(images: string[]) {
      this.images = images
    }
  },
  getters: {
    getType: (state) => state.type,
    getName: (state) => state.name,
    getShortDescription: (state) => state.shortDescription,
    getDescription: (state) => state.description,
    getInstallGuide: (state) => state.installGuide,
    getTags: (state) => state.tags,
    getDownloadLink: (state) => state.downloadLink,
    getAdditionalLinks: (state) => state.additionalLinks,
    getImages: (state) => state.images,
    getMod: (state) => {
      return {
        name: state.name,
        shortDescription: state.shortDescription,
        description: state.description,
        installGuide: state.installGuide,
        tags: state.tags,
        downloadLink: state.downloadLink,
        additionalLinks: state.additionalLinks,
        images: state.images
      }
    }
  }
})