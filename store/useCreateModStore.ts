import { defineStore } from 'pinia';
import type { ModTags } from '~/types/mod-tags.enum';
import type { PresetTags } from '~/types/preset-tags.enum';

export interface UseCreateModStoreInterface {
  type: 'mod' | 'preset' | null
  name: string
  shortDescription: string
  description: string
  installGuide: string
  tags: ModTags[] | PresetTags[]
  downloadLink: string
  additionalLinks: {name: string, url: string}[]
  images: (File | string)[],
  isDropped: boolean
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
    images: [],
    isDropped: true
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
    setTags(tags: ModTags[] | PresetTags[]) {
      this.tags = tags
    },
    setDownloadLink(downloadLink: string) {
      this.downloadLink = downloadLink
    },
    setAdditionalLinks(additionalLinks: {name: string, url: string}[]) {
      this.additionalLinks = additionalLinks
    },
    setImages(images: (File | string)[]) {
      this.images = images
    },
    drop() {
      this.isDropped = true
      this.type = null
      this.name = ''
      this.shortDescription = ''
      this.description = ''
      this.installGuide = ''
      this.tags = []
      this.downloadLink = ''
      this.additionalLinks = []
      this.images = []
    },
    loadFromData(data: UseCreateModStoreInterface) {
      this.type = data.type
      this.name = data.name
      this.shortDescription = data.shortDescription
      this.description = data.description
      this.installGuide = data.installGuide
      this.tags = data.tags
      this.downloadLink = data.downloadLink
      this.additionalLinks = data.additionalLinks
      this.images = data.images
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
    getIsDropped: (state) => state.isDropped,
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