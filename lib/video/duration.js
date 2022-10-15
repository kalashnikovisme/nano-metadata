export default (file) => {
  const video = document.createElement('video')
  video.preload = 'metadata'

  const onLoadedMetaDataPromise = new Promise((resolve) => {
    video.onloadedmetadata = () => {
      console.log('work2')
      window.URL.revokeObjectURL(video.src)
      resolve(video.duration)
      video.remove()
    }
  })

  video.src = window.URL.createObjectURL(file)

  return onLoadedMetaDataPromise
}
