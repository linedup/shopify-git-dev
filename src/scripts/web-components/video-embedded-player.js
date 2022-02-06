class VideoEmbeddedPlayer extends HTMLElement {
  constructor() {
    super();

    this.selectors = {
      showVideoTrigger: '[data-show-video]',
      videoSplashScreen: '[data-video-splashscreen]',
      videoPlayer: 'video'
    };

    const showVideoTrigger = this.querySelector(this.selectors.showVideoTrigger);
    showVideoTrigger.addEventListener('click', this.onClickShowVideoHandler.bind(this));
  }

  onClickShowVideoHandler(evt) {
    const videoSplashScreen = this.querySelector(this.selectors.videoSplashScreen);
    const myVideo = this.querySelector(this.selectors.videoPlayer);
    videoSplashScreen.classList.add('invisible'); // Use 'invisible' to retain height within the DOM
    myVideo.classList.remove('hidden');
    myVideo.play();
  }

}

customElements.define('video-embedded-player', VideoEmbeddedPlayer);