import test from 'ava'
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'
import File from 'file-class'

async function videoFile(){
  let response = await fetch('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4')
  let data = await response.blob();
  let metadata = {
    lastModified: '1665320297477',
    name: 'BigBuckBunny.mp4',
    type: 'video/mp4',
  };
  let file = new File([data], "BigBuckBunny.mp4", metadata);
  return file
}

export default (func) => {
  test.before(() => {
    const dom = new JSDOM('<input id="input" name="file" type="file" accept=".mp4">')
    global.document = dom.window.document
    global.window = dom.window
    global.window.URL.createObjectURL = () => {}
    global.File = dom.File
  });

  test('Video Duration', async (t) => {
    const file = await videoFile()
    func.call(file).then((duration) => {
      t.is(duration, 595)
    }) 
    setTimeout(() => document.getElementsByTagName('video').loadmetadata(), 1000)
  })
}
