import { defineStore } from 'pinia';
import type { ModTags } from '~/types/mod-tags.enum';
import type { PresetTags } from '~/types/preset-tags.enum';
import { BoostyTierEnum } from '~/types/boosty-tier.enum';
import { useFilesApi } from '~/composables/useFilesApi';
import resolveCDNImage from '~/utils/resolveCDNImage';
import { useAuthStore } from '~/store/useAuthStore';
import { usePresetsApi } from '~/composables/usePresetsApi';
import { useModsApi } from '~/composables/useModsApi';
import { useBoostyApi } from '~/composables/useBoostyApi';

export interface UseCreateModStoreInterface {
  name: string
  shortDescription: string
  description: string
  installGuide: string
  tags: ModTags[] | PresetTags[]
  downloadLink: string
  additionalLinks: {name: string, url: string}[]
  images: (string | File)[],
  requiredTier: BoostyTierEnum | null,
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
    requiredTier: null,
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
    setImages(images: (string | File)[]) {
      this.images = images
    },
    setMinimalTier(minimalTier: BoostyTierEnum) {
      this.requiredTier = minimalTier
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
      this.requiredTier = null
    },
    loadFromData(data: UseCreateModStoreInterface) {
      this.name = data.name
      this.shortDescription = data.shortDescription
      this.description = data.description
      this.installGuide = data.installGuide
      this.tags = data.tags
      this.downloadLink = data.downloadLink
      this.additionalLinks = data.additionalLinks
      this.images = data.images
      this.requiredTier = data.requiredTier
      this.isDropped = data.isDropped
    },
    async uploadInfo(id: string) {
      if (!this.requiredTier) return;

      const images = [];

      for await (const file of this.getImages) {
        if (typeof file === 'string') {
          images.push(file)
          continue
        }

        const { hash } = await useFilesApi().uploadFile(file as File)
        images.push(resolveCDNImage(useAuthStore().getUser!.id, hash, false))
      }

      await useBoostyApi().modify(id, {
        name: this.name,
        shortDescription: this.shortDescription,
        description: this.description,
        installGuide: this.installGuide,
        tags: this.tags as ModTags[],
        downloadLink: this.downloadLink,
        additionalLinks: this.additionalLinks,
        images: images,
        requiredTier: this.requiredTier
      })
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
    getMinimalTier: (state) => state.requiredTier,
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