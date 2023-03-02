export default class Camera {

  constructor() {
    this.video = document.createElement('video');
  }

  static async init () {

    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      throw new Error(
          `Browser API navigator.mediaDevices.getUserMedia not available`
      );
    }

    const viewConfig = {
      audio: false,
      video: {
        width: globalThis.screen.availWidth,
        height: globalThis.screen.availHeight,
        frameRate: {
          ideal: 60
        }
      }
    }

    const stream = await navigator.mediaDevices.getUserMedia(viewConfig);
    const camera = new Camera();
    camera.video.srcObject = stream;

/*    camera.video.width = 320;
    camera.video.height = 240;

    document.body.append(camera.video);*/

    // Aguarda pela camera
    await new Promise((resolve) => {
      camera.video.onloadedmetadata = () => {
       resolve(camera.video);
      }
    });

    camera.video.play();

    return camera;
  }
}