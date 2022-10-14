export default (file) => {
  const video = document.createElement('video');
  video.preload = 'metadata';

  const onLoadedMetaDataPromise = new Promise((resolve) => {
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = video.duration;
      resolve(duration)
    }
  })

  video.src = URL.createObjectURL(file)

  return onLoadedMetaDataPromise
}
