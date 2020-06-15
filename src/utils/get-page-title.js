import defaultSettings from '@/settings'

const title = defaultSettings.title || 'iDOM'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
