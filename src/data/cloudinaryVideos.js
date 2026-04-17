const base = 'https://res.cloudinary.com/demo/video/upload'

const clip = (path) => `${base}/${path}`

export const cloudinaryVideos = {
  heroHome: [
    clip('f_auto,q_auto,w_1920,h_1080,c_fill/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1920,h_1080,c_fill/dog.mp4'),
    clip('f_auto,q_auto,w_1920,h_1080,c_fill/samples/cld_rubiks.mp4'),
  ],

  heroWarm: [
    clip('f_auto,q_auto,e_saturation:38,e_contrast:14,w_1920,h_1080,c_fill/samples/elephants.mp4'),
    clip('f_auto,q_auto,e_saturation:28,e_contrast:14,w_1920,h_1080,c_fill/dog.mp4'),
    clip('f_auto,q_auto,e_saturation:42,e_contrast:14,e_brightness:6,w_1920,h_1080,c_fill/samples/cld_rubiks.mp4'),
  ],

  heroDark: [
    clip('f_auto,q_auto,e_brightness:-24,e_contrast:24,w_1920,h_1080,c_fill/samples/elephants.mp4'),
    clip('f_auto,q_auto,e_brightness:-22,e_contrast:24,w_1920,h_1080,c_fill/dog.mp4'),
    clip('f_auto,q_auto,e_brightness:-28,e_contrast:24,w_1920,h_1080,c_fill/samples/cld_rubiks.mp4'),
  ],

  gridSoft: [
    clip('f_auto,q_auto,e_brightness:14,e_contrast:8,w_1920,h_1080,c_fill/samples/cld_rubiks.mp4'),
    clip('f_auto,q_auto,e_brightness:10,e_contrast:8,w_1920,h_1080,c_fill/samples/elephants.mp4'),
    clip('f_auto,q_auto,e_brightness:12,e_contrast:8,w_1920,h_1080,c_fill/dog.mp4'),
  ],

  gridCrop: [
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_contrast:20/samples/cld_rubiks.mp4'),
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_contrast:20/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_contrast:20/dog.mp4'),
  ],
  gridRubikWarm: [
    clip('f_auto,q_auto,e_saturation:42,e_contrast:14,e_brightness:6,w_1920,h_1080,c_fill/samples/cld_rubiks.mp4'),
    clip('f_auto,q_auto,e_saturation:42,e_contrast:14,e_brightness:6,w_1920,h_1080,c_fill/samples/elephants.mp4'),
  ],
  gridRubikCrop: [
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_contrast:20/samples/cld_rubiks.mp4'),
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_contrast:20/samples/elephants.mp4'),
  ],

  contactMain: [
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_saturation:26/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_saturation:22/dog.mp4'),
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_saturation:26/samples/cld_rubiks.mp4'),
  ],

  contactClipA: [
    clip('f_auto,q_auto,w_960,h_720,c_fill,e_contrast:12/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_960,h_720,c_fill,e_contrast:12/samples/cld_rubiks.mp4'),
  ],

  contactClipB: [
    clip('f_auto,q_auto,w_960,h_720,c_fill,e_saturation:26/dog.mp4'),
    clip('f_auto,q_auto,w_960,h_720,c_fill,e_saturation:26/samples/cld_rubiks.mp4'),
  ],

  serviceSky: [
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_contrast:18/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_contrast:18/dog.mp4'),
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_contrast:18/samples/cld_rubiks.mp4'),
  ],

  aboutHero: [
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_contrast:20/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1920,h_1080,c_fill,e_contrast:20/samples/cld_rubiks.mp4'),
  ],

  aboutReel: [
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_contrast:16/samples/cld_rubiks.mp4'),
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_contrast:16/samples/elephants.mp4'),
  ],

  teamCinema: [
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_saturation:30/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_saturation:30/dog.mp4'),
    clip('f_auto,q_auto,w_1400,h_1400,c_fill,e_saturation:30/samples/cld_rubiks.mp4'),
  ],

  portfolioSlideA: [
    clip('f_auto,q_auto,w_1600,h_1000,c_fill/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1600,h_1000,c_fill/samples/cld_rubiks.mp4'),
  ],

  portfolioSlideB: [
    clip('f_auto,q_auto,w_1600,h_1000,c_fill/dog.mp4'),
    clip('f_auto,q_auto,w_1600,h_1000,c_fill/samples/cld_rubiks.mp4'),
  ],

  portfolioSlideC: [
    clip('f_auto,q_auto,w_1600,h_1000,c_fill,e_saturation:38/samples/elephants.mp4'),
    clip('f_auto,q_auto,w_1600,h_1000,c_fill,e_saturation:38/dog.mp4'),
  ],

  introAmbientSets: [
    [clip('f_auto,q_auto,w_520,h_360,c_fill,e_contrast:14/samples/elephants.mp4'), clip('f_auto,q_auto,w_520,h_360,c_fill,e_contrast:14/samples/cld_rubiks.mp4')],
    [clip('f_auto,q_auto,w_520,h_360,c_fill,e_saturation:30/dog.mp4'), clip('f_auto,q_auto,w_520,h_360,c_fill,e_saturation:30/samples/cld_rubiks.mp4')],
    [clip('f_auto,q_auto,w_520,h_360,c_fill,e_brightness:-8/samples/elephants.mp4'), clip('f_auto,q_auto,w_520,h_360,c_fill,e_brightness:-8/dog.mp4')],
  ],
}
