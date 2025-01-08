import { defineStore } from 'pinia';
import type { ModTags } from '~/types/mod-tags.enum';
import type { PresetTags } from '~/types/preset-tags.enum';
import { BoostyTierEnum } from '~/types/boosty-tier.enum';

export interface UseCreateModStoreInterface {
  name: string
  shortDescription: string
  description: string
  installGuide: string
  tags: ModTags[] | PresetTags[]
  downloadLink: string
  additionalLinks: {name: string, url: string}[]
  images: File[],
  minimalTier: BoostyTierEnum | null,
  isDropped: boolean,
}

export const useCreateBoostyModStore = defineStore('createBoostyMod', {
  state: () => ({
    name: '',
    shortDescription: '',
    description: '',
    installGuide: '',
    tags: [],
    downloadLink: '',
    additionalLinks: [],
    images: [],
    minimalTier: null,
    isDropped: true
  }) as UseCreateModStoreInterface,
  actions: {
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
    setImages(images: File[]) {
      this.images = images
    },
    setMinimalTier(minimalTier: BoostyTierEnum) {
      this.minimalTier = minimalTier
    },
    drop() {
      this.isDropped = true
      this.name = ''
      this.shortDescription = ''
      this.description = ''
      this.installGuide = ''
      this.tags = []
      this.downloadLink = ''
      this.additionalLinks = []
      this.images = []
      this.minimalTier = null
    }
  },
  getters: {
    getName: (state) => state.name,
    getShortDescription: (state) => state.shortDescription,
    getDescription: (state) => state.description,
    getInstallGuide: (state) => state.installGuide,
    getTags: (state) => state.tags,
    getDownloadLink: (state) => state.downloadLink,
    getAdditionalLinks: (state) => state.additionalLinks,
    getImages: (state) => state.images,
    getMinimalTier: (state) => state.minimalTier,
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